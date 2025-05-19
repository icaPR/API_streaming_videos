const Playlist = require("../models/playlist");

exports.inserir = async (req, res, next) => {
  try {
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
    const playlist = await Playlist.atualizar(req.params.id, req.body);
    if (!playlist)
      return res.status(404).json({ erro: "Playlist não encontrada" });
    res.json(playlist);
  } catch (err) {
    err.status = 400;
    err.message;
    next(err);
  }
};

exports.adicionarVideo = async (req, res, next) => {
  try {
    const playlist = await Playlist.findById(req.params.id);
    if (!playlist)
      return res.status(404).json({ erro: "Playlist não encontrada" });

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
    const playlist = await Playlist.findById(req.params.id);
    if (!playlist)
      return res.status(404).json({ erro: "Playlist não encontrada" });

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
    const playlist = await Playlist.deletar(req.params.id);
    if (!playlist)
      return res.status(404).json({ erro: "Playlist não encontrada" });

    res.json({ mensagem: "Playlist deletada com sucesso" });
  } catch (err) {
    err.status = 400;
    err.message = "Erro ao deletar playlist.";
    next(err);
  }
};
