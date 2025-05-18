const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarioController");

router.post("/", usuarioController.inserir);
router.get("/:id", usuarioController.buscarPorId);
router.get("/username/:username", usuarioController.buscarPorUsername);
router.put("/:id", usuarioController.atualizar);
router.post("/:id/inscrever", usuarioController.inscrever);
router.post("/:id/desinscrever", usuarioController.desinscrever);
router.post(
  "/:id/incrementar-inscritos",
  usuarioController.incrementarInscritos
);
router.post(
  "/:id/decrementar-inscritos",
  usuarioController.decrementarInscritos
);

module.exports = router;
