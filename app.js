const http = require("http");
const mongoose = require("mongoose");
const videoRoutes = require("./routes/videoRoutes");
const usuarioRoutes = require("./routes/usuarioRoutes");
const playlistRoutes = require("./routes/playlistRoutes");
const errorHandler = require("./middlewares/errorHandler");

mongoose.connect("mongodb://localhost:27017/streaming", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const server = http.createServer(async (req, res) => {
  try {
    if (req.url.startsWith("/videos")) {
      await videoRoutes(req, res);
    } else if (req.url.startsWith("/usuarios")) {
      await usuarioRoutes(req, res);
    } else if (req.url.startsWith("/playlists")) {
      await playlistRoutes(req, res);
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Rota não encontrada" }));
    }
  } catch (err) {
    errorHandler(err, req, res);
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
