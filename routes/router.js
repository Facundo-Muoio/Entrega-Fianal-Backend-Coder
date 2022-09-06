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
import { profileCtrl } from "../controllers/profileControllers/profile.js"
import { productCtrl } from "../controllers/productControllers/product.js";
const router = Router();

router.route("/")
  .get(indexCtrl.getIndex)

router.route("/signup")
  .get(signUpCtrl.getSignUp)
  .post(signupAuthenticate, signUpCtrl.postSignUp)

router.route("/login")
  .get(loginCtrl.getLogin)
  .post(loginAuthenticate, loginCtrl.postLogin)

router.route("/productos")
  .get(isAuthenticated, indexCtrl.getIndexProducts)

router.route("/perfil")
  .get(isAuthenticated, profileCtrl.getProfile)

router.route("/carrito")
  .post(isAuthenticated, cartCtrl.postCart)

router.route("/purchase")
  .get(isAuthenticated, purchaseCtrl.getPurchase)  

router.route("/logout")
  .get( isAuthenticated, logoutCtrl.logout)

router.route("/producto/:id")
  .get(isAuthenticated, productCtrl.getProduct)
  .post(isAuthenticated)
  
router.route("/productos/fantasia")
  .get(isAuthenticated, generosCtrl.getFantasia)

router.route("/productos/terror")
  .get(isAuthenticated, generosCtrl.getTerror)

router.route("/productos/infantil")
  .get(isAuthenticated, generosCtrl.getInfantil)

router.route("/productos/ficcion")
  .get(isAuthenticated, generosCtrl.getFiccionLiteratura)


export default router;
