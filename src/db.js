require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DATABASE_URL } = process.env; 
const bcrypt = require("bcrypt");
// const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;
 
const sequelize = new Sequelize(
	`${DATABASE_URL}`,
	// `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/development`,

	{
		logging: false, // set to console.log to see the raw SQL queries		
	}
);
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
	.filter(
		(file) =>
			file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
	)
	.forEach((file) => {
		modelDefiners.push(require(path.join(__dirname, "/models", file)));
	});

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
	entry[0][0].toUpperCase() + entry[0].slice(1),
	entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const {
	Product,
	Category,
	User,
	Orden,
	LineaDeOrden,
	Reviews,
	Checkout,
	Wishlist,
} = sequelize.models;

//-------RELACIONES
Product.belongsToMany(Category, { through: "ProductXCategory" });
Category.belongsToMany(Product, { through: "ProductXCategory" });

Orden.belongsToMany(Product, { through: LineaDeOrden });
Product.belongsToMany(Orden, { through: LineaDeOrden });

Orden.belongsTo(User);

Reviews.belongsTo(User);
Product.hasMany(Reviews);

Orden.hasMany(Checkout);
Checkout.belongsTo(Orden);

Wishlist.belongsToMany(User, { through: "lista" });
User.belongsToMany(Wishlist, { through: "lista" });

User.findOrCreate({
	where: {
		username: "admin",
		email: "admin@mail.com",
		password: bcrypt.hashSync("admin", 10),
		isAdmin: true,
	},
	raw: true,
})
	.then((admin) =>
		console.log(
			"\n----Super-user---- \n #username: ",
			admin[0].username,
			"\n #email: ",
			admin[0].email,
			"\n #password: ",
			admin[0].password,
			"\n -----------------\n"
		)
	)
	.catch((err) => console.log(err.message));


module.exports = {
	...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
	conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
