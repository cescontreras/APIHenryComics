const mercadopago = require("mercadopago");

// Agrega credenciales
mercadopago.configure({
	access_token:
		"TEST-1734679437296408-102402-1fa3989d31a61cf885637d1f2882494b-489283197",
});

const linkPago = async (req, res, done) => {
	let arrItems = req.body.items.map((p) => ({
		title: p.name,
		unit_price: p.price,
		quantity: p.lineaDeOrden.quantity,
	}));

	let name = req.body.payer.firstname ? req.body.payer.firstname : "";
	let surname = req.body.payer.lastname ? req.body.payer.lastname : "";
	let phone = req.body.payer.telefono ? Number(req.body.payer.telefono) : 0;
	let direccion = req.body.payer.direccion ? req.body.payer.direccion : "";

	var payer = {
		name: name,
		surname: surname,
		email: req.body.payer.email,
		date_created: req.body.payer.createdAt,
		phone: {
			area_code: "",
			number: phone,
		},

		identification: {
			type: "",
			number: "",
		},

		address: {
			street_name: direccion,
			street_number: 0,
			zip_code: "",
		},
  };
  
	let preference = {};
	preference = {
		items: arrItems,
		payer: payer,
		back_urls: {
			// declaramos las urls de redireccionamiento
			success: "https://henry-comics.vercel.app/payment?status=Pagado",
			// url a la que va a redireccionar si sale todo bien
			pending: "https://henry-comics.vercel.app/payment?status=Pendiente",
			// url a la que va a redireccionar si decide pagar en efectivo
			failure: "https://henry-comics.vercel.app/payment?status=Cancelado",
			// url a la que va a redireccionar si falla el pago
		},
		binary_mode: true,
		auto_return: "approved",
	};

	let response = await mercadopago.preferences.create(preference);
	res.status(200).json(response.body);
	return done(null, response);	
};

module.exports = linkPago;
