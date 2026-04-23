const app = require('express');
const router = app.Router();
const usuarioController = require('../controllers/usuarioController')
const {authenticateToken, isAdmin, isSelf} = require("../middlewares/authMiddleware")

router.post("/create", usuarioController.createUsuario);
router.post("/login", usuarioController.login);

router.get("/", authenticateToken, isAdmin, usuarioController.getAll);

router.get("/:id", usuarioController.getById);

router.put("/:id", authenticateToken, isSelf, usuarioController.updateUsuario);

router.delete("/:id", authenticateToken, isAdmin, usuarioController.softDelete);

module.exports = router;