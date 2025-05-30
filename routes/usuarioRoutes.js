const { parse } = require("url");
const usuarioController = require("../controllers/usuarioController");

module.exports = async (req, res) => {
  const { pathname } = parse(req.url, true);
  const idMatch = pathname.match(/^\/usuarios\/([^\/]+)/);
  const usernameMatch = pathname.match(/^\/usuarios\/username\/([^\/]+)/);

  if (req.method === "POST" && pathname === "/usuarios") {
    return usuarioController.inserir(req, res);
  } else if (req.method === "GET" && idMatch) {
    return usuarioController.buscarPorId(req, res, idMatch[1]);
  } else if (req.method === "GET" && usernameMatch) {
    return usuarioController.buscarPorUsername(req, res, usernameMatch[1]);
  } else if (req.method === "PUT" && idMatch) {
    return usuarioController.atualizar(req, res, idMatch[1]);
  } else if (pathname.endsWith("/inscrever")) {
    return usuarioController.inscrever(req, res, idMatch[1]);
  } else if (pathname.endsWith("/desinscrever")) {
    return usuarioController.desinscrever(req, res, idMatch[1]);
  } else if (pathname.endsWith("/incrementar-inscritos")) {
    return usuarioController.incrementarInscritos(req, res, idMatch[1]);
  } else if (pathname.endsWith("/decrementar-inscritos")) {
    return usuarioController.decrementarInscritos(req, res, idMatch[1]);
  }

  res.writeHead(404);
  res.end("Rota de usuário não encontrada.");
};
