const express = require("express");
const router = express.Router();
const videoController = require("../controllers/videoController");

router.post("/", videoController.inserir);
router.get("/", videoController.buscar);
router.get("/:id", videoController.buscarPorId);
router.put("/:id", videoController.atualizar);
router.delete("/:id", videoController.deletar);
router.post("/:id/view", videoController.incrementarVisualizacao);
router.post("/:id/like", videoController.adicionarLike);
router.post("/:id/unlike", videoController.removerLike);

module.exports = router;
