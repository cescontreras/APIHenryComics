const server = require("express").Router();
const { User, Orden, LineaDeOrden, Product } = require("../db");
const bcrypt = require("bcrypt");
const passport = require("passport");
const { isAdmin, isAuthenticated } = require("../middleware/helper");
const { EMAILPASS } = process.env;
//---------------------GrandJs--------------------
const { View } = require("grandjs");
View.settings.set("views", "../views");
const ResetPassUser = View.importJsx("../../views/resetPassUser.jsx");
//---------------------Nodemailer-----------------
const nodemailer = require("nodemailer");
const path = require("path");
const hbs = require("nodemailer-express-handlebars");

let transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: "henrycomicsarg@gmail.com",
		pass: EMAILPASS,
	},
});

const handlebarOptions = {
	viewEngine: {
		extName: ".handlebars",
		partialsDir: path.resolve(__dirname, "views"),
		defaultLayout: false,
	},
	viewPath: path.resolve(__dirname, "views"),
	extName: ".handlebars",
};

transporter.use("compile", hbs(handlebarOptions));

server.get("/", isAdmin, (req, res, next) => {
	User.findAll()
		.then((users) => {
			res.send(users);
		})
		.catch(next);
});

server.post("/login", (req, res, next) => {
	passport.authenticate("local", { session: true }, (err, user, info) => {
		if (err) {
			res.status(500).json({ message: "error" });
			return;
		}
		if (!user) {
			res.status(401).json({ message: "user" });
			return;
		}

		req.login(user, (error) => {
			if (error) {
				res.status(500).json({ message: "no guardado" });
				return;
			}
			//console.log(req.user, 'user!!!')
			res.status(200).json({ errors: false, user: user });
		});
	})(req, res, next);
});

server.get("/logout", (req, res) => {
	req.logOut();
	console.log("paso logout");
	res.status(200).clearCookie("connect.sid", {
		path: "/",
		secure: false,
		httpOnly: false,
	});
	console.log("paso clearcookies");
	req.session.destroy();
	console.log("paso destroy session");
	res.send("deslogueado");

	console.log("nexxt");
});

server.post("/add", function (req, res) {
	var { firstname, lastname, username, email, password } = req.body;
	User.create({
		firstname: firstname,
		lastname: lastname,
		username: username,
		email: email,
		password: bcrypt.hashSync(password, 10),
	})
		.then(function (user) {
			Orden.create({
				userId: user.id,
				status: "carrito",
			});
			res
				.status(200)
				.json({ message: "Se creo correctamente el usuario", data: user });
		})
		//--- ESTO ES
		.then((emailsaliendo) => {
			console.log(emailsaliendo);
			let mailOptions = {
				from: "henrycomicsarg@gmail.com",
				to: req.body.email,
				subject: "Henry Comics",
				text: "Bienvenido",
				template: "welcom",
				context: {
					nombre: req.body.username,
				},
			};
			transporter.sendMail(mailOptions, (err, data) => {
				if (err) {
					console.log("error", err);
				} else {
					console.log("Enviado");
				}
			});
		})
		//---------
		.catch(function (err) {
			res.status(404).json({ err: "No se pudo crear el usuario", data: err });
		});
});

server.put("/:id/", isAuthenticated, function (req, res) {
	let { id } = req.params;
	const {
		firstname,
		lastname,
		username,
		email,
		password,
		image,
		telefono,
	} = req.body;
	User.update(
		{
			firstname: firstname,
			username: username,
			lastname: lastname,
			email: email,
			password: password,
			image: image,
			telefono: telefono,
		},
		{
			where: {
				id: id,
			},
			returning: true,
		}
	)
		.then((response) => {
			res.status(200).json({ response, message: "Se cambio con exito" });
		})
		.catch((err) => {
			res.status(500).json({ err, message: "No se pudo cambiar" });
		});
});

server.delete("/:id", isAuthenticated, (req, res, next) => {
	const id = req.params.id;
	User.destroy({
		where: { id: id },
	}).then((removed) => {
		if (removed) {
			res.status(200).end();
		} else {
			res.status(404).json({ message: "Not found" });
		}
	});
});

server.delete("/:idUser/cart/:idProduct", (req, res) => {
	const { idUser, idProduct } = req.params;

	Orden.findAll({
		where: {
			userId: idUser,
			status: "carrito",
		},
	})
		.then((carrito) => {
			LineaDeOrden.destroy({
				where: {
					productId: idProduct,
					ordenId: carrito[0].id,
				},
			})
				.then((resp) => {
					res.status(200).json({ message: "success" });
				})
				.catch((error) => {
					res.status(404).json({ message: "Not found" });
				});
		})
		.catch((error) => {
			res.status(404).json({ message: "Not found" });
		});
});

server.put("/:idUser/cart", (req, res) => {
	const { idUser } = req.params;
	const item = req.body;

	Orden.findAll({
		where: {
			userId: idUser,
			status: "carrito",
		},
	})
		.then((carrito) => {
			LineaDeOrden.update(
				{
					quantity: item.quantity,
				},
				{
					where: {
						ordenId: carrito[0].id,
						productId: item.id,
					},
				}
			)
				.then((resp) => {
					res.status(200).json({ message: "success" });
				})
				.catch((error) => {
					res.status(404).json({ message: "Not found", error });
				});
		})
		.catch((error) => {
			res.status(404).json({ message: "Not found", error });
		});
});

//Crea un nuevo carro al usuario si no esta creado y sube productos.
server.post("/:idUser/cart", (req, res) => {
	const { idUser } = req.params;
	const item = req.body;
	let stock;

	Product.findByPk(item.id).then((res) => {
		stock = res.stock;
	});

	Orden.findOrCreate({
		where: {
			userId: idUser,
			status: "carrito",
		},
	}).then((ress) => {
		LineaDeOrden.findOrCreate({
			where: {
				productId: item.id,
				ordenId: ress[0].id,
				price: item.price,
			},
		})
			.then((resp) => {
				if (resp[0].quantity >= stock) {
					res.status(404).send("Producto supera el stock");
					return;
				}
				if (resp[1] === false) {
					LineaDeOrden.increment(
						{ quantity: +1 },
						{ where: { productId: item.id, ordenId: resp[0].ordenId } }
					)
						.then((respuesta) => {
							res.send(respuesta);
						})
						.catch((err) => {
							res.status(404).json({ message: "Not found" });
						});
				} else {
					res.send(resp);
				}
			})
			.catch((err) => {
				res.json(err);
			});
	});
});

//Trae todos los producto del carrito
server.get("/:idUser/cart", (req, res) => {
	const { idUser } = req.params;

	Orden.findOne({
		where: { userId: idUser, status: "carrito" },
		include: Product,
	})
		.then((ress) => {
			res.json(ress);
		})
		.catch((err) => {
			res.status(404).json({ message: "Not found" });
		});
});

// S45 ruta que devuelve todas las ordenes de un usuario
server.get("/:id/orders", (req, res) => {
	const { id } = req.params;

	Orden.findAll({
		where: {
			userId: id,
		},
		include: Product,
	})
		.then((order) => {
			res.status(200).json(order);
		})
		.catch((err) => {
			res.status(404).json({ message: err });
		});
});

server.post("/", (req, res) => {
	const { email } = req.body;

	User.findOne({ where: { email } })
		.then((user) => {
			res.status(200).json(user);
		})
		.catch((err) => {
			console.log(err);
		});
});

// conseguir un usuario
server.get("/:id", isAuthenticated, (req, res) => {
	User.findByPk(req.params.id)
		.then((user) => res.status(200).json(user))
		.catch((err) => res.status(404).json(err));
});

// eliminar producto desde una orden ya comprada
server.delete("/order/:ordenId/product/:productId", (req, res) => {
	let { ordenId, productId } = req.params;
	LineaDeOrden.destroy({ where: { ordenId, productId } })
		.then((eliminado) =>
			res.status(200).json({ message: "se elimino el producto", eliminado })
		)
		.catch((err) => res.status(404).json(err));
});

//70 Resetear un Password y bcrypt el password pluss Enviar mail
server.post("/:id/passwordReset", isAuthenticated, (req, res) => {
	const { id } = req.params;
	const { password } = req.body;
	User.findByPk(id)
		.then((user) => {
			user.update({
				password: bcrypt.hashSync(password, 10),
			});
			//-----------Enviando Email----------
			console.log("User ", user.email);
			let mailOptions = {
				from: "henrycomicsarg@gmail.com",
				to: user.email,
				subject: "Henry Comics",
				template: "resetPass",
				context: {
					name: user.username,
				},
			};
			transporter.sendMail(mailOptions, (err, data) => {
				if (err) {
					console.log("error", err);
				} else {
					console.log("Enviado");
				}
			});
			//----------Fin Enviar email---------
			res.status(200).json({ message: "Password Receteada" });
		})
		.catch((err) => {
			res.status(404).json({ message: "Not Found", err });
		});
});

// Validar Passwod para poder Resetear
server.post("/:id/password", (req, res) => {
	const { id } = req.params;
	let { password } = req.body;
	password = password.toString();
	User.findByPk(id)
		.then((response) => {
			bcrypt.compare(password, response.password).then((adentro) => {
				res.status(200).send(adentro);
			});
		})
		.catch((err) => {
			res.status(404).json({ message: "Paso algo", err });
		});
});

// vaciar carrito
server.delete("/:idUser/cart/", (req, res) => {
	const { idUser } = req.params;

	Orden.findAll({
		where: {
			userId: idUser,
			status: "carrito",
		},
	})
		.then((carrito) => {
			LineaDeOrden.destroy({
				where: {
					ordenId: carrito[0].id,
				},
			}).then((resp) => {
				res.status(200).json({ message: "success" });
			});
		})
		.catch((error) => {
			res.status(404).json({ message: "Not found" });
		});
});

// Recuperar pass
server.post("/resetPass", (req, res) => {
	let { email } = req.body;
	User.findOne({ where: { email } })
		.then((user) => {
			console.log("Usuario ----->", user);
			let datos = {
				username: user.username,
				id: user.id,
			};
			console.log("Datos --->", datos);
			let template = View.renderToHtml(ResetPassUser, { datos });
			let mailOptions = {
				from: "henrycomicsarg@gmail.com",
				to: email,
				subject: "Henry Comics",
				text: "Recuperación de usuario o contraseña",
				html: template,
			};
			console.log(mailOptions);
			transporter.sendMail(mailOptions, (err, data) => {
				if (err) {
					console.log("error", err);
				} else {
					console.log("Enviado");
				}
			});
			res.status(201).json({ message: "mensaje enviado" });
		})
		.catch((err) => res.status(400).json(err));
});

server.put("/resetPass/:id", (req, res) => {
	let { id } = req.params;
	let { password } = req.body;
	User.update(
		{
			password: bcrypt.hashSync(password, 10),
		},
		{ where: { id } }
	)
		.then((response) =>
			res.status(200).json({ message: "contraseña actualizada", response })
		)
		.catch((err) => res.status(404).json(err));
});

module.exports = server;
