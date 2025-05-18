const Usuario = require("../models/usuario");

exports.inserir = async (req, res) => {
  try {
    const novoUsuario = await Usuario.inserir(req.body);
    res.status(201).json(novoUsuario);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
};

exports.buscarPorId = async (req, res) => {
  try {
    const usuario = await Usuario.buscarPorId(req.params.id);
    if (!usuario)
      return res.status(404).json({ erro: "Usuário não encontrado" });
    res.json(usuario);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
};

exports.buscarPorUsername = async (req, res) => {
  try {
    const usuario = await Usuario.buscarPorUsername(req.params.username);
    if (!usuario)
      return res.status(404).json({ erro: "Usuário não encontrado" });
    res.json(usuario);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
};

exports.atualizar = async (req, res) => {
  try {
    const usuario = await Usuario.atualizar(req.params.id, req.body);
    res.json(usuario);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
};

exports.inscrever = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    await usuario.inscrever(req.body.canalId);
    res.json(usuario);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
};

exports.desinscrever = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    await usuario.desinscrever(req.body.canalId);
    res.json(usuario);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
};

exports.incrementarInscritos = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    await usuario.incrementarInscritos();
    res.json(usuario);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
};

exports.decrementarInscritos = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    await usuario.decrementarInscritos();
    res.json(usuario);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
};
