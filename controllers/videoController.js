const Video = require("../models/video");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = {
  async inserir(req, res, next) {
    try {
      const token = req.cookies.access_token;
      const decoded = jwt.verify(token, JWT_SECRET);
      const idUsuario = decoded.id;
      req.body.usuarioId = idUsuario;

      const novoVideo = await Video.create(req.body);
      res.status(201).json(novoVideo);
    } catch (err) {
      err.status = 400;
      err.message;
      next(err);
    }
  },

  async buscarPorId(req, res, next) {
    try {
      const video = await Video.findById(req.params.id);
      if (!video)
        return res.status(404).json({ error: "Vídeo não encontrado." });
      res.json(video);
    } catch (err) {
      err.status = 500;
      err.message = "Erro ao buscar vídeo.";
      next(err);
    }
  },

  async buscar(req, res, next) {
    try {
      const filtros = {};
      if (req.query.titulo) filtros.titulo = new RegExp(req.query.titulo, "i");
      if (req.query.categoria) filtros.categoria = req.query.categoria;
      const videos = await Video.find(filtros);
      res.json(videos);
    } catch (err) {
      err.status = 500;
      err.message = "Erro ao buscar vídeos.";
      next(err);
    }
  },

  async atualizar(req, res, next) {
    try {
      const token = req.cookies.access_token;
      const decoded = jwt.verify(token, JWT_SECRET);

      const idUsuario = decoded.id;

      const video = await Video.findById(req.params.id);

      if (!video)
        return res.status(404).json({ error: "Vídeo não encontrado." });

      if (!video.usuarioId.equals(idUsuario)) {
        const err = new Error(
          "Você não tem permissão para atualizar este vídeo."
        );
        err.status = 403;
        return next(err);
      }
      const videoAtualizado = await Video.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.json(videoAtualizado);
    } catch (err) {
      err.status = 400;
      err.message = "Erro ao atualizar vídeo.";
      next(err);
    }
  },

  async deletar(req, res, next) {
    try {
      const token = req.cookies.access_token;
      const decoded = jwt.verify(token, JWT_SECRET);

      const idUsuario = decoded.id;

      const video = await Video.findById(req.params.id);

      if (!video)
        return res.status(404).json({ error: "Vídeo não encontrado." });

      if (!video.usuarioId.equals(idUsuario)) {
        const err = new Error(
          "Você não tem permissão para atualizar este vídeo."
        );
        err.status = 403;
        return next(err);
      }

      await Video.findByIdAndDelete(req.params.id);

      res.status(204).send();
    } catch (err) {
      err.status = 400;
      err.message = "Erro ao deletar vídeo.";
      next(err);
    }
  },

  async incrementarVisualizacao(req, res, next) {
    try {
      const video = await Video.findByIdAndUpdate(
        req.params.id,
        { $inc: { visualizacoes: 1 } },
        { new: true }
      );
      if (!video)
        return res.status(404).json({ error: "Vídeo não encontrado." });
      res.json(video);
    } catch (err) {
      err.status = 500;
      err.message = "Erro ao incrementar visualização.";
      next(err);
    }
  },

  async adicionarLike(req, res, next) {
    try {
      const video = await Video.findByIdAndUpdate(
        req.params.id,
        { $inc: { likes: 1 } },
        { new: true }
      );
      if (!video)
        return res.status(404).json({ error: "Vídeo não encontrado." });
      res.json(video);
    } catch (err) {
      err.status = 500;
      err.message = "Erro ao adicionar like.";
      next(err);
    }
  },

  async removerLike(req, res, next) {
    try {
      const video = await Video.findById(req.params.id);
      if (!video)
        return res.status(404).json({ error: "Vídeo não encontrado." });

      if (video.likes > 0) {
        video.likes--;
        await video.save();
      }
      res.json(video);
    } catch (err) {
      err.status = 500;
      err.message = "Erro ao remover like.";
      next(err);
    }
  },
};
