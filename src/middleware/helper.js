//Solo para admin
const isAdmin = (req, res, next) => {
	if (req.user && req.user.isAdmin) {
		return next();
	} else {
		res.status(404).json({ message: "No autorizado" });
	}
};

//Para usuarios
const isAuthenticated = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next();
	} else {
		res.status(404).json({ message: "No autorizado" });
	}
};

module.exports = {
	isAdmin,
	isAuthenticated,
};
