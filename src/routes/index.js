const { Router } = require("express");
const productRouter = require("./product.js");
const categoryRouter = require("./categories.js");
const ordenRouter = require("./orders.js");
const userRouter = require("./user.js");
const reviewRouter = require("./review.js");
const authRouter = require("./auth.js");
const wishRouter = require("./wishlist.js");
const router = Router();


router.use("/products", productRouter);
router.use("/category", categoryRouter);
router.use("/user", userRouter);
router.use("/orders", ordenRouter);
router.use("/reviews", reviewRouter);
router.use("/auth", authRouter);
router.use("/wishlist", wishRouter);
module.exports = router;
