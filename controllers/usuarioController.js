const Usuario = require("../models/usuario");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;

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

exports.acessar = async (req, res, next) => {
  const { email, senha } = req.body;
  try {
    const usuarioLogado = await Usuario.acessar(email, senha);
    const payload = {
      id: usuarioLogado._id,
      username: usuarioLogado.username,
      email: usuarioLogado.email,
    };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

    res.cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "prod",
      sameSite: "Lax",
      maxAge: 60 * 60 * 1000, //  (1 hora)
    });
    res.status(200).json({
      message: "Login bem-sucedido!",
      usuario: {
        id: usuarioLogado._id,
        nome: usuarioLogado.nome,
        username: usuarioLogado.username,
        email: usuarioLogado.email,
        bio: usuarioLogado.bio,
        fotoPerfilUrl: usuarioLogado.fotoPerfilUrl,
      },
      token,
    });
  } catch (err) {
    if (
      err.message === "Usuário não encontrado." ||
      err.message === "Credenciais inválidas."
    ) {
      err.status = 401;
    } else {
      err.status = 500;
    }
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
