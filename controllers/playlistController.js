const Playlist = require("../models/playlist");
const errorHandler = require("../middlewares/errorHandler");
const getRequestBody = require("../utils/getRequestBody");
const { parse } = require("url");

exports.inserir = async (req, res) => {
  try {
    const body = await getRequestBody(req);
    const novaPlaylist = await Playlist.inserir(body);
    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify(novaPlaylist));
  } catch (err) {
    err.status = 400;
    errorHandler(err, req, res);
  }
};

exports.buscarPorId = async (req, res, id) => {
  try {
    const playlist = await Playlist.buscarPorId(id);
    if (!playlist) {
      res.writeHead(404, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ erro: "Playlist não encontrada" }));
    }
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(playlist));
  } catch (err) {
    err.status = 400;
    err.message = "Erro ao buscar playlist por ID.";
    errorHandler(err, req, res);
  }
};

exports.buscarPorUsuario = async (req, res, usuarioId) => {
  try {
    const playlists = await Playlist.buscarPorUsuario(usuarioId);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(playlists));
  } catch (err) {
    err.status = 400;
    err.message = "Erro ao buscar playlists do usuário.";
    errorHandler(err, req, res);
  }
};

exports.buscar = async (req, res) => {
  try {
    const { query } = parse(req.url, true);
    const playlists = await Playlist.buscar(query);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(playlists));
  } catch (err) {
    err.status = 400;
    err.message = "Erro ao buscar playlists.";
    errorHandler(err, req, res);
  }
};

exports.atualizar = async (req, res, id) => {
  try {
    const body = await getRequestBody(req);
    const playlist = await Playlist.atualizar(id, body);
    if (!playlist) {
      res.writeHead(404, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ erro: "Playlist não encontrada" }));
    }
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(playlist));
  } catch (err) {
    err.status = 400;
    errorHandler(err, req, res);
  }
};

exports.adicionarVideo = async (req, res, id) => {
  try {
    const playlist = await Playlist.findById(id);
    if (!playlist) {
      res.writeHead(404, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ erro: "Playlist não encontrada" }));
    }

    const body = await getRequestBody(req);
    await playlist.adicionarVideo(body.videoId);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(playlist));
  } catch (err) {
    err.status = 400;
    err.message = "Erro ao adicionar vídeo à playlist.";
    errorHandler(err, req, res);
  }
};

exports.removerVideo = async (req, res, id) => {
  try {
    const playlist = await Playlist.findById(id);
    if (!playlist) {
      res.writeHead(404, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ erro: "Playlist não encontrada" }));
    }

    const body = await getRequestBody(req);
    await playlist.removerVideo(body.videoId);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(playlist));
  } catch (err) {
    err.status = 400;
    err.message = "Erro ao remover vídeo da playlist.";
    errorHandler(err, req, res);
  }
};

exports.deletar = async (req, res, id) => {
  try {
    const playlist = await Playlist.deletar(id);
    if (!playlist) {
      res.writeHead(404, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ erro: "Playlist não encontrada" }));
    }

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ mensagem: "Playlist deletada com sucesso" }));
  } catch (err) {
    err.status = 400;
    err.message = "Erro ao deletar playlist.";
    errorHandler(err, req, res);
  }
};
