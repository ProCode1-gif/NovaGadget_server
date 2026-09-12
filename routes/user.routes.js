const userRouter = require("express").Router();
const auth = require("../controllers/auth.controller");
const profile = require("../controllers/profile.controller");
const verifyAuth = require("../middlewares/verifyAuth.middleware");
const verification = require("../middlewares/verification.middleware");
const product = require("../controllers/product.controller");
const order = require('../controllers/order.controller')
const cart = require('../controllers/cart.controller')
const address = require('../controllers/address.controller')
const payment = require('../controllers/payment.controller')
const review = require('../controllers/review.controller')

userRouter.post("/signup", verifyAuth, auth.userSignup);
userRouter.post("/signin", auth.userSignin);
userRouter.get("/profile", verification, profile.userProfile);
userRouter.put("/profile", verification, profile.updateUser);
userRouter.get("/myOrder", verification, order.myOrder);
userRouter.post("/placeOrder", verification, order.placeOrder);
userRouter.post("/addToCart", verification, cart.addToCart);
userRouter.get("/myCart", verification, cart.myCart);
userRouter.get("/shop", product.getAllProducts);
userRouter.get("/search", product.searchProduct);
userRouter.get("/address", verification, address.getAddress);
userRouter.put("/address", verification, address.updateAddress);
userRouter.post("/addAddress", verification, address.addAddress);
userRouter.post("/paymentHistory", verification, payment.getPayment);
userRouter.post("/addPaymentMethod", verification, payment.addPaymentMethod);
userRouter.get("/payment", verification, payment.getPaymentMethod);
userRouter.put("/payment", verification, payment.updatePaymentMethod);
userRouter.post("/addReview", verification, review.addReview);
userRouter.get("/review", verification, review.getReview);

module.exports = userRouter;
