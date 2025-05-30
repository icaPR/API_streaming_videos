const Video = require("../models/video");
const errorHandler = require("../middlewares/errorHandler");
const getRequestBody = require("../utils/getRequestBody");
const { parse } = require("url");

module.exports = {
  async inserir(req, res) {
    try {
      const body = await getRequestBody(req);
      const novoVideo = await Video.create(body);
      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify(novoVideo));
    } catch (err) {
      err.status = 400;
      errorHandler(err, req, res);
    }
  },

  async buscarPorId(req, res, id) {
    try {
      const video = await Video.findById(id);
      if (!video) {
        res.writeHead(404, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ error: "Vídeo não encontrado." }));
      }
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(video));
    } catch (err) {
      err.status = 500;
      err.message = "Erro ao buscar vídeo.";
      errorHandler(err, req, res);
    }
  },

  async buscar(req, res) {
    try {
      const { query } = parse(req.url, true);
      const filtros = {};
      if (query.titulo) filtros.titulo = new RegExp(query.titulo, "i");
      if (query.categoria) filtros.categoria = query.categoria;

      const videos = await Video.find(filtros);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(videos));
    } catch (err) {
      err.status = 500;
      err.message = "Erro ao buscar vídeos.";
      errorHandler(err, req, res);
    }
  },

  async atualizar(req, res, id) {
    try {
      const body = await getRequestBody(req);
      const video = await Video.findByIdAndUpdate(id, body, { new: true });
      if (!video) {
        res.writeHead(404, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ error: "Vídeo não encontrado." }));
      }
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(video));
    } catch (err) {
      err.status = 400;
      err.message = "Erro ao atualizar vídeo.";
      errorHandler(err, req, res);
    }
  },

  async deletar(req, res, id) {
    try {
      const video = await Video.findByIdAndDelete(id);
      if (!video) {
        res.writeHead(404, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ error: "Vídeo não encontrado." }));
      }
      res.writeHead(204);
      res.end();
    } catch (err) {
      err.status = 400;
      err.message = "Erro ao deletar vídeo.";
      errorHandler(err, req, res);
    }
  },

  async incrementarVisualizacao(req, res, id) {
    try {
      const video = await Video.findByIdAndUpdate(
        id,
        { $inc: { visualizacoes: 1 } },
        { new: true }
      );
      if (!video) {
        res.writeHead(404, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ error: "Vídeo não encontrado." }));
      }
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(video));
    } catch (err) {
      err.status = 500;
      err.message = "Erro ao incrementar visualização.";
      errorHandler(err, req, res);
    }
  },

  async adicionarLike(req, res, id) {
    try {
      const video = await Video.findByIdAndUpdate(
        id,
        { $inc: { likes: 1 } },
        { new: true }
      );
      if (!video) {
        res.writeHead(404, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ error: "Vídeo não encontrado." }));
      }
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(video));
    } catch (err) {
      err.status = 500;
      err.message = "Erro ao adicionar like.";
      errorHandler(err, req, res);
    }
  },

  async removerLike(req, res, id) {
    try {
      const video = await Video.findById(id);
      if (!video) {
        res.writeHead(404, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ error: "Vídeo não encontrado." }));
      }

      if (video.likes > 0) {
        video.likes--;
        await video.save();
      }

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(video));
    } catch (err) {
      err.status = 500;
      err.message = "Erro ao remover like.";
      errorHandler(err, req, res);
    }
  },
};
