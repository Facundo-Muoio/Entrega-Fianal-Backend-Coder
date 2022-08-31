import { Router } from "express";
import { signUpCtrl } from "../controllers/usersControllers/signup.js";
import { loginCtrl } from "../controllers/usersControllers/login.js"
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { logoutCtrl } from "../controllers/usersControllers/logout.js";
import { loginAuthenticate } from "../middlewares/loginAuthenticate.js";
import { signupAuthenticate } from "../middlewares/signupAuthenticate.js";
import { indexCtrl } from "../controllers/indexControllers/index.js";
import { cartCtrl } from "../controllers/cartControllers/cart.js";
import { purchaseCtrl } from "../controllers/purchaseControllers/purchase.js";
import { generosCtrl } from "../controllers/generosControllers/fantasia.js";
const router = Router();

router.get("/", indexCtrl.getIndex);

router.route("/signup")
  .get(signUpCtrl.getSignUp)
  .post(signupAuthenticate, signUpCtrl.postSignUp)

router.route("/login")
  .get(loginCtrl.getLogin)
  .post(loginAuthenticate, loginCtrl.postLogin)

router.route("/products", isAuthenticated)

router.route("/product/:id", isAuthenticated)

router.route("/profile", isAuthenticated)

router.route("/cart")
  .get(isAuthenticated, cartCtrl.getCart)
  .post(isAuthenticated, cartCtrl.postCart)

router.route("/purchase")
  .get(isAuthenticated, purchaseCtrl.getPurchase)  

router.route("/logout")
  .get( isAuthenticated, logoutCtrl.logout)

router.route("/fantasia")
  .get(isAuthenticated, generosCtrl.getFantasia)

router.route("/terror")
  .get(isAuthenticated, generosCtrl.getTerror)

router.route("/infantil")
  .get(isAuthenticated, generosCtrl.getInfantil)

router.route("/ficcion")
  .get(isAuthenticated, generosCtrl.getFiccionLiteratura)


export default router;
