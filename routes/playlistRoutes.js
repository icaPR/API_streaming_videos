const express = require("express");
const router = express.Router();
const playlistController = require("../controllers/playlistController");
const auth = require("../middlewares/auth");

router.post("/", auth.verifyToken, playlistController.inserir);
router.get("/:id", playlistController.buscarPorId);
router.get(
  "/usuario/:usuarioId",
  auth.verifyToken,
  playlistController.buscarPorUsuario
);
router.get("/", playlistController.buscar);
router.put("/:id", auth.verifyToken, playlistController.atualizar);
router.post(
  "/:id/adicionar-video",
  auth.verifyToken,
  playlistController.adicionarVideo
);
router.post(
  "/:id/remover-video",
  auth.verifyToken,
  playlistController.removerVideo
);
router.delete("/:id", auth.verifyToken, playlistController.deletar);

module.exports = router;
