const express = require("express");
const router = express.Router();
const videoController = require("../controllers/videoController");
const auth = require("../middlewares/auth");

router.post("/", auth.verifyToken, videoController.inserir);
router.get("/", videoController.buscar);
router.get("/:id", videoController.buscarPorId);
router.put("/:id", auth.verifyToken, videoController.atualizar);
router.delete("/:id", auth.verifyToken, videoController.deletar);
router.post("/:id/view", videoController.incrementarVisualizacao);
router.post("/:id/like", auth.verifyToken, videoController.adicionarLike);
router.post("/:id/unlike", auth.verifyToken, videoController.removerLike);

module.exports = router;
