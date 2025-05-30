const { parse } = require("url");
const videoController = require("../controllers/videoController");

module.exports = async (req, res) => {
  const { pathname } = parse(req.url, true);
  const idMatch = pathname.match(/^\/videos\/([^\/]+)/);

  if (req.method === "POST" && pathname === "/videos") {
    return videoController.inserir(req, res);
  } else if (req.method === "GET" && pathname === "/videos") {
    return videoController.buscar(req, res);
  } else if (req.method === "GET" && idMatch) {
    return videoController.buscarPorId(req, res, idMatch[1]);
  } else if (req.method === "PUT" && idMatch) {
    return videoController.atualizar(req, res, idMatch[1]);
  } else if (req.method === "DELETE" && idMatch) {
    return videoController.deletar(req, res, idMatch[1]);
  } else if (req.method === "POST" && pathname.endsWith("/view")) {
    return videoController.incrementarVisualizacao(req, res, idMatch[1]);
  } else if (req.method === "POST" && pathname.endsWith("/like")) {
    return videoController.adicionarLike(req, res, idMatch[1]);
  } else if (req.method === "POST" && pathname.endsWith("/unlike")) {
    return videoController.removerLike(req, res, idMatch[1]);
  }

  res.writeHead(404);
  res.end("Rota de vídeo não encontrada.");
};
