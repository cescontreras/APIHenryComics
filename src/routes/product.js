const server = require("express").Router();
const { Product, Category, Reviews, User } = require("../db.js");
const {
	Sequelize: { Op },
} = require("sequelize");

const { isAdmin, isAuthenticated } = require("../middleware/helper");

server.get("/", (req, res, next) => {
	Product.findAll({ include: Category })
		.then((products) => {
			res.send(products);
		})
		.catch(next);
});

server.get("/category/:categoryId", (req, res) => {
	let { categoryId } = req.params;
	Product.findAll({
		include: [
			{
				model: Category,
				where: { id: categoryId },
			},
		],
	})
		.then((products) => res.status(200).json(products))
		.catch((error) =>
			res.status(404).json({
				message: "No se encontraron productos",
				error: error,
			})
		);
});

server.get("/search", (req, res) => {
	let { text } = req.query;
	Product.findAll({
		where: {
			[Op.or]: [
				{
					name: {
						[Op.like]: `%${text}%`,
					},
				},
				{
					description: {
						[Op.substring]: `${text}`,
					},
				},
			],
		},
	})
		.then((products) => res.status(200).json(products))
		.catch((error) =>
			res.status(404).json({
				message: "No se encontraron productos",
				error: error,
			})
		);
});

server.post("/create", (req, res) => {
	let data = req.body;
	Product.create(data)
		.then((newProduct) =>
			res.status(201).json({
				message: "Producto creado exitosamente!",
				newProduct,
			})
		)
		.catch((error) =>
			res.status(400).json({
				message: "El producto ya existe",
				error: error,
			})
		);
});

//Agrega la categoria al producto.
server.post("/:idProduct/category/:idCategory", (req, res) => {
	const { idProduct, idCategory } = req.params;

	Product.findByPk(idProduct)
		.then((product) => {
			product.addCategories(idCategory).then((newCategory) => {
				res.status(201).json({
					message: "Se agregó categoría",
					newCategory,
				});
			});
		})
		.catch((err) => {
			throw new Error(err);
		});
});

// Elimina la categoria al producto.
server.delete("/:idProduct/category/:idCategory", (req, res) => {
	const { idProduct, idCategory } = req.params;

	Product.findByPk(idProduct)
		.then((product) => {
			product.removeCategories(idCategory).then(() => {
				res.status(200).json({ message: "Se eliminó categoría" });
			});
		})
		.catch((err) => {
			throw new Error(err);
		});
});


// Retorna un objeto de tipo producto con todos sus datos. (Incluidas las categorías e imagenes).
server.get("/:id", (req, res) => {
	const id = req.params.id;
	Product.findOne({
		where: { id: id },
	})
		.then((newProduct) => {
			res.send(newProduct);
		})
		.catch((err) => res.send(err));
});
//------------------------------------------------------//

// Modifica el producto con id: id
server.put("/:id", (req, res, next) => {
	const id = req.params.id;
	Product.update(
		{
			name: req.body.name,
			author: req.body.author,
			editorial: req.body.editorial,
			year: req.body.year,
			description: req.body.description,
			stock: req.body.stock,
			price: req.body.price,
			image: req.body.image,
		},
		{
			where: {
				id: id,
			},
			returning: true,
		}
	)
		.then((response) => {
			res.status(200).json(response);
		})
		.catch((err) =>
			res.status(400).send(err, " WARNING! -> You can´t modificate the product")
		);
});

// Retorna 200 si se elimino con exito.
server.delete("/:id", (req, res, next) => {
	const id = req.params.id;
	Product.destroy({
		where: { id: id },
	}).then((removed) => {
		if (removed) {
			res.status(200).end();
		} else {
			res.status(404).json({ message: "Not found" });
		}
	});
});

// GET products/:id/review Todas las reviews de un producto
server.get("/:id/review", (req, res, next) => {
	const id = req.params.id;
	Reviews.findAll({
		where: {
			productId: id,
		},
		include: User,
	})
		.then((reviews) => {
			res.send(reviews);
			console.log(reviews);
		})
		.catch((error) => {
			console.log(error);
			res.sendStatus(400);
		});
});

module.exports = server;
