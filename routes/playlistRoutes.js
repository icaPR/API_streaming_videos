const express = require("express");
const router = express.Router();
const playlistController = require("../controllers/playlistController");

router.post("/", playlistController.inserir);
router.get("/:id", playlistController.buscarPorId);
router.get("/usuario/:usuarioId", playlistController.buscarPorUsuario);
router.get("/", playlistController.buscar);
router.put("/:id", playlistController.atualizar);
router.post("/:id/adicionar-video", playlistController.adicionarVideo);
router.post("/:id/remover-video", playlistController.removerVideo);
router.delete("/:id", playlistController.deletar);

module.exports = router;
