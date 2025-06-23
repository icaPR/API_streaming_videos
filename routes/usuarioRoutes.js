const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarioController");
const auth = require("../middlewares/auth");

router.post("/", usuarioController.inserir);
router.post("/login", usuarioController.acessar);
router.get("/:id", usuarioController.buscarPorId);
router.get("/username/:username", usuarioController.buscarPorUsername);
router.put("/", auth.verifyToken, usuarioController.atualizar);
router.post("/inscrever", auth.verifyToken, usuarioController.inscrever);
router.post("/desinscrever", auth.verifyToken, usuarioController.desinscrever);
router.post(
  "/:id/incrementar-inscritos",
  usuarioController.incrementarInscritos
);
router.post(
  "/:id/decrementar-inscritos",
  usuarioController.decrementarInscritos
);

module.exports = router;
