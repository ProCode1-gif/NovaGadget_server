const adminRouter = require("express").Router();
const auth = require("../controllers/auth.controller");
const profile = require("../controllers/profile.controller");
const verifyauth = require("../middlewares/verifyAuth.middleware");
const admin = require("../middlewares/admin.middleware");
const verification = require("../middlewares/verification.middleware");
const product = require("../controllers/product.controller");
const upload = require("../middlewares/upload.middleware");
const order = require('../controllers/order.controller')
const address = require('../controllers/address.controller')
const payment = require('../controllers/payment.controller')
const review = require('../controllers/review.controller')
const products = require("../controllers/product.controller");

adminRouter.post("/signup", admin, verifyauth, auth.adminSignup);
adminRouter.post("/signin", verifyauth, auth.adminSignin);
adminRouter.get("/:adminname", verification, profile.adminProfile);
adminRouter.get("/customers", admin, verification, profile.customers);
adminRouter.get("/customersAddress", admin, verification, address.getAllAddress);
adminRouter.get("/customersPayment", admin, verification, payment.getAllPayment);   
adminRouter.get("/customersReview", admin, verification, review.getAllReview);
adminRouter.get("/customersOrder", admin, verification, order.customerOrder);
adminRouter.get("/categorySales", admin, verification, order.salesByCategory);
adminRouter.get("/monthlySales", admin, verification, order.monthlySales);
adminRouter.get("/adminProducts", admin, verification, product.getAdminProducts);
adminRouter.get("/admins", admin, verification, profile.admins);
adminRouter.get("/myProducts", admin, verification, product.getAdminProducts);
adminRouter.post(
  "/addProduct",
  admin,
  verification,
  upload.single("image"),
  product.addProducts,
);

module.exports = adminRouter;
