const Video = require("../models/video");

module.exports = {
  async inserir(req, res) {
    try {
      const novoVideo = await Video.create(req.body);
      res.status(201).json(novoVideo);
    } catch (err) {
      res.status(400).json({ error: "Erro ao inserir vídeo.", details: err });
    }
  },

  async buscarPorId(req, res) {
    try {
      const video = await Video.findById(req.params.id);
      if (!video)
        return res.status(404).json({ error: "Vídeo não encontrado." });
      res.json(video);
    } catch (err) {
      res.status(500).json({ error: "Erro ao buscar vídeo." });
    }
  },

  async buscar(req, res) {
    try {
      const filtros = {};
      if (req.query.titulo) filtros.titulo = new RegExp(req.query.titulo, "i");
      if (req.query.categoria) filtros.categoria = req.query.categoria;
      const videos = await Video.find(filtros);
      res.json(videos);
    } catch (err) {
      res.status(500).json({ error: "Erro ao buscar vídeos." });
    }
  },

  async atualizar(req, res) {
    try {
      const video = await Video.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.json(video);
    } catch (err) {
      res.status(400).json({ error: "Erro ao atualizar vídeo." });
    }
  },

  async deletar(req, res) {
    try {
      await Video.findByIdAndDelete(req.params.id);
      res.status(204).send();
    } catch (err) {
      res.status(400).json({ error: "Erro ao deletar vídeo." });
    }
  },

  async incrementarVisualizacao(req, res) {
    try {
      const video = await Video.findByIdAndUpdate(
        req.params.id,
        { $inc: { visualizacoes: 1 } },
        { new: true }
      );
      res.json(video);
    } catch (err) {
      res.status(500).json({ error: "Erro ao incrementar visualização." });
    }
  },

  async adicionarLike(req, res) {
    try {
      const video = await Video.findByIdAndUpdate(
        req.params.id,
        { $inc: { likes: 1 } },
        { new: true }
      );
      res.json(video);
    } catch (err) {
      res.status(500).json({ error: "Erro ao adicionar like." });
    }
  },

  async removerLike(req, res) {
    try {
      const video = await Video.findById(req.params.id);
      if (video.likes > 0) {
        video.likes--;
        await video.save();
      }
      res.json(video);
    } catch (err) {
      res.status(500).json({ error: "Erro ao remover like." });
    }
  },
};
