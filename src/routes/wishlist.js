const server = require("express").Router();
const { User, Wishlist } = require("../db.js");
const {
	Sequelize: { Op },
} = require("sequelize");
const { isAdmin, isAuthenticated } = require("../middleware/helper");

server.post("/add/:userId", isAuthenticated, (req, res) => {
	let body = req.body;
	let { userId } = req.params;
	console.log(body);
	Wishlist.findOrCreate({ where: body })
		.then((wish) => {
			console.log("el usuario", userId);
			wish[0]
				.addUser(userId)
				.then((added) =>
					res.status(200).json({ message: "producto agregado", added })
				);
		})
		.catch((err) => res.status(400).json(err));
});

server.get("/", (req, res) => {
	Wishlist.findAll({ include: User })
		.then((wishes) => res.status(200).json(wishes))
		.catch((err) =>
			res.status(404).json({ message: "no se encontraron deseos!", error: err })
		);
});

server.get("/user/:id", (req, res) => {
	let { id } = req.params;
	User.findByPk(id, { include: Wishlist })
		.then((wishes) => {
			console.log(wishes);
			res.status(200).json(wishes.wishlists);
		})
		.catch((err) => res.status(404).json(err));
});

server.delete("/:id/user/:userId", (req, res) => {
	const { id, userId } = req.params;
	Wishlist.findByPk(id, { include: User })
		.then((wishes) => {
			console.log(wishes);
			wishes
				.removeUser(userId)
				.then((deleted) =>
					res.status(200).json({ message: "deseo eliminado", deleted })
				);
		})
		.catch((err) => {
			res.status(400).json({ message: err });
		});
});

module.exports = server;
