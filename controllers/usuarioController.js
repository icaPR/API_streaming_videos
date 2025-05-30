const Usuario = require("../models/usuario");
const errorHandler = require("../middlewares/errorHandler");
const getRequestBody = require("../utils/getRequestBody");
const { parse } = require("url");

exports.inserir = async (req, res) => {
  try {
    const body = await getRequestBody(req);
    const novoUsuario = await Usuario.inserir(body);
    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify(novoUsuario));
  } catch (err) {
    err.status = 400;
    errorHandler(err, req, res);
  }
};

exports.buscarPorId = async (req, res, id) => {
  try {
    const usuario = await Usuario.buscarPorId(id);
    if (!usuario) {
      res.writeHead(404, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ erro: "Usuário não encontrado" }));
    }
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(usuario));
  } catch (err) {
    err.status = 400;
    err.message = "Erro ao buscar usuário por ID.";
    errorHandler(err, req, res);
  }
};

exports.buscarPorUsername = async (req, res, username) => {
  try {
    const usuario = await Usuario.buscarPorUsername(username);
    if (!usuario) {
      res.writeHead(404, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ erro: "Usuário não encontrado" }));
    }
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(usuario));
  } catch (err) {
    err.status = 400;
    err.message = "Erro ao buscar usuário por username.";
    errorHandler(err, req, res);
  }
};

exports.atualizar = async (req, res, id) => {
  try {
    const body = await getRequestBody(req);
    const usuario = await Usuario.atualizar(id, body);
    if (!usuario) {
      res.writeHead(404, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ erro: "Usuário não encontrado" }));
    }
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(usuario));
  } catch (err) {
    err.status = 400;
    err.message = "Erro ao atualizar usuário.";
    errorHandler(err, req, res);
  }
};

exports.inscrever = async (req, res, id) => {
  try {
    const usuario = await Usuario.findById(id);
    if (!usuario) {
      res.writeHead(404, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ erro: "Usuário não encontrado" }));
    }

    const body = await getRequestBody(req);
    await usuario.inscrever(body.canalId);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(usuario));
  } catch (err) {
    err.status = 400;
    err.message = "Erro ao inscrever usuário no canal.";
    errorHandler(err, req, res);
  }
};

exports.desinscrever = async (req, res, id) => {
  try {
    const usuario = await Usuario.findById(id);
    if (!usuario) {
      res.writeHead(404, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ erro: "Usuário não encontrado" }));
    }

    const body = await getRequestBody(req);
    await usuario.desinscrever(body.canalId);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(usuario));
  } catch (err) {
    err.status = 400;
    err.message = "Erro ao desinscrever usuário do canal.";
    errorHandler(err, req, res);
  }
};

exports.incrementarInscritos = async (req, res, id) => {
  try {
    const usuario = await Usuario.findById(id);
    if (!usuario) {
      res.writeHead(404, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ erro: "Usuário não encontrado" }));
    }

    await usuario.incrementarInscritos();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(usuario));
  } catch (err) {
    err.status = 400;
    err.message = "Erro ao incrementar inscritos.";
    errorHandler(err, req, res);
  }
};

exports.decrementarInscritos = async (req, res, id) => {
  try {
    const usuario = await Usuario.findById(id);
    if (!usuario) {
      res.writeHead(404, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ erro: "Usuário não encontrado" }));
    }

    await usuario.decrementarInscritos();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(usuario));
  } catch (err) {
    err.status = 400;
    err.message = "Erro ao decrementar inscritos.";
    errorHandler(err, req, res);
  }
};
