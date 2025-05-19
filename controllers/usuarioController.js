const Usuario = require("../models/usuario");

exports.inserir = async (req, res, next) => {
  try {
    const novoUsuario = await Usuario.inserir(req.body);
    res.status(201).json(novoUsuario);
  } catch (err) {
    err.status = 400;
    err.message;
    next(err);
  }
};

exports.buscarPorId = async (req, res, next) => {
  try {
    const usuario = await Usuario.buscarPorId(req.params.id);
    if (!usuario)
      return res.status(404).json({ erro: "Usuário não encontrado" });
    res.json(usuario);
  } catch (err) {
    err.status = 400;
    err.message = "Erro ao buscar usuário por ID.";
    next(err);
  }
};

exports.buscarPorUsername = async (req, res, next) => {
  try {
    const usuario = await Usuario.buscarPorUsername(req.params.username);
    if (!usuario)
      return res.status(404).json({ erro: "Usuário não encontrado" });
    res.json(usuario);
  } catch (err) {
    err.status = 400;
    err.message = "Erro ao buscar usuário por username.";
    next(err);
  }
};

exports.atualizar = async (req, res, next) => {
  try {
    const usuario = await Usuario.atualizar(req.params.id, req.body);
    if (!usuario)
      return res.status(404).json({ erro: "Usuário não encontrado" });
    res.json(usuario);
  } catch (err) {
    err.status = 400;
    err.message = "Erro ao atualizar usuário.";
    next(err);
  }
};

exports.inscrever = async (req, res, next) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario)
      return res.status(404).json({ erro: "Usuário não encontrado" });

    await usuario.inscrever(req.body.canalId);
    res.json(usuario);
  } catch (err) {
    err.status = 400;
    err.message = "Erro ao inscrever usuário no canal.";
    next(err);
  }
};

exports.desinscrever = async (req, res, next) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario)
      return res.status(404).json({ erro: "Usuário não encontrado" });

    await usuario.desinscrever(req.body.canalId);
    res.json(usuario);
  } catch (err) {
    err.status = 400;
    err.message = "Erro ao desinscrever usuário do canal.";
    next(err);
  }
};

exports.incrementarInscritos = async (req, res, next) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario)
      return res.status(404).json({ erro: "Usuário não encontrado" });

    await usuario.incrementarInscritos();
    res.json(usuario);
  } catch (err) {
    err.status = 400;
    err.message = "Erro ao incrementar inscritos.";
    next(err);
  }
};

exports.decrementarInscritos = async (req, res, next) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario)
      return res.status(404).json({ erro: "Usuário não encontrado" });

    await usuario.decrementarInscritos();
    res.json(usuario);
  } catch (err) {
    err.status = 400;
    err.message = "Erro ao decrementar inscritos.";
    next(err);
  }
};
