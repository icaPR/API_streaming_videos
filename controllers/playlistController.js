const Playlist = require("../models/playlist");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;

exports.inserir = async (req, res, next) => {
  try {
    const token = req.cookies.access_token;
    const decoded = jwt.verify(token, JWT_SECRET);
    const idUsuario = decoded.id;
    req.body.usuarioId = idUsuario;

    const novaPlaylist = await Playlist.inserir(req.body);
    res.status(201).json(novaPlaylist);
  } catch (err) {
    err.status = 400;
    err.message;
    next(err);
  }
};

exports.buscarPorId = async (req, res, next) => {
  try {
    const playlist = await Playlist.buscarPorId(req.params.id);
    if (!playlist)
      return res.status(404).json({ erro: "Playlist não encontrada" });
    res.json(playlist);
  } catch (err) {
    err.status = 400;
    err.message = "Erro ao buscar playlist por ID.";
    next(err);
  }
};

exports.buscarPorUsuario = async (req, res, next) => {
  try {
    const playlists = await Playlist.buscarPorUsuario(req.params.usuarioId);
    res.json(playlists);
  } catch (err) {
    err.status = 400;
    err.message = "Erro ao buscar playlists do usuário.";
    next(err);
  }
};

exports.buscar = async (req, res, next) => {
  try {
    const filtros = req.query;
    const playlists = await Playlist.buscar(filtros);
    res.json(playlists);
  } catch (err) {
    err.status = 400;
    err.message = "Erro ao buscar playlists.";
    next(err);
  }
};

exports.atualizar = async (req, res, next) => {
  try {
    const token = req.cookies.access_token;
    const decoded = jwt.verify(token, JWT_SECRET);

    const idUsuario = decoded.id;

    const playlist = await Playlist.findById(req.params.id);

    if (!playlist)
      return res.status(404).json({ error: "Playlist não encontrado." });

    if (!playlist.usuarioId.equals(idUsuario)) {
      const err = new Error(
        "Você não tem permissão para atualizar este vídeo."
      );
      err.status = 403;
      return next(err);
    }

    await Playlist.atualizar(req.params.id, req.body);

    res.json(playlist);
  } catch (err) {
    err.status = 400;
    err.message;
    next(err);
  }
};

exports.adicionarVideo = async (req, res, next) => {
  try {
    const token = req.cookies.access_token;
    const decoded = jwt.verify(token, JWT_SECRET);

    const idUsuario = decoded.id;

    const playlist = await Playlist.findById(req.params.id);

    if (!playlist)
      return res.status(404).json({ error: "Playlist não encontrado." });

    if (!playlist.usuarioId.equals(idUsuario)) {
      const err = new Error(
        "Você não tem permissão para atualizar este vídeo."
      );
      err.status = 403;
      return next(err);
    }
    await playlist.adicionarVideo(req.body.videoId);
    res.json(playlist);
  } catch (err) {
    err.status = 400;
    err.message = "Erro ao adicionar vídeo à playlist.";
    next(err);
  }
};

exports.removerVideo = async (req, res, next) => {
  try {
    const token = req.cookies.access_token;
    const decoded = jwt.verify(token, JWT_SECRET);

    const idUsuario = decoded.id;

    const playlist = await Playlist.findById(req.params.id);

    if (!playlist)
      return res.status(404).json({ error: "Playlist não encontrado." });

    if (!playlist.usuarioId.equals(idUsuario)) {
      const err = new Error(
        "Você não tem permissão para atualizar este vídeo."
      );
      err.status = 403;
      return next(err);
    }
    await playlist.removerVideo(req.body.videoId);
    res.json(playlist);
  } catch (err) {
    err.status = 400;
    err.message = "Erro ao remover vídeo da playlist.";
    next(err);
  }
};

exports.deletar = async (req, res, next) => {
  try {
    const token = req.cookies.access_token;
    const decoded = jwt.verify(token, JWT_SECRET);

    const idUsuario = decoded.id;

    const playlist = await Playlist.findById(req.params.id);

    if (!playlist)
      return res.status(404).json({ error: "Playlist não encontrado." });

    if (!playlist.usuarioId.equals(idUsuario)) {
      const err = new Error(
        "Você não tem permissão para atualizar este vídeo."
      );
      err.status = 403;
      return next(err);
    }

    await Playlist.deletar(req.params.id);

    res.json({ mensagem: "Playlist deletada com sucesso" });
  } catch (err) {
    err.status = 400;
    err.message = "Erro ao deletar playlist.";
    next(err);
  }
};
