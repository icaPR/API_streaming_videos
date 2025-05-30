const { parse } = require("url");
const playlistController = require("../controllers/playlistController");

module.exports = async (req, res) => {
  const { pathname } = parse(req.url, true);
  const idMatch = pathname.match(/^\/playlists\/([^\/]+)/);
  const usuarioMatch = pathname.match(/^\/playlists\/usuario\/([^\/]+)/);

  if (req.method === "POST" && pathname === "/playlists") {
    return playlistController.inserir(req, res);
  } else if (req.method === "GET" && idMatch) {
    return playlistController.buscarPorId(req, res, idMatch[1]);
  } else if (req.method === "GET" && usuarioMatch) {
    return playlistController.buscarPorUsuario(req, res, usuarioMatch[1]);
  } else if (req.method === "GET" && pathname === "/playlists") {
    return playlistController.buscar(req, res);
  } else if (req.method === "PUT" && idMatch) {
    return playlistController.atualizar(req, res, idMatch[1]);
  } else if (pathname.endsWith("/adicionar-video")) {
    return playlistController.adicionarVideo(req, res, idMatch[1]);
  } else if (pathname.endsWith("/remover-video")) {
    return playlistController.removerVideo(req, res, idMatch[1]);
  } else if (req.method === "DELETE" && idMatch) {
    return playlistController.deletar(req, res, idMatch[1]);
  }

  res.writeHead(404);
  res.end("Rota de playlist não encontrada.");
};
