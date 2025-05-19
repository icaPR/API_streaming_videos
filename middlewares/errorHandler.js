const fs = require("fs");
const path = require("path");

const logFilePath = path.join(__dirname, "../logs/erros.log");

function errorHandler(err, req, res, next) {
  const status = err.status || 500;
  const mensagem = err.message || "Erro interno no servidor";

  const log = `[${new Date().toISOString()}] ${req.method} ${
    req.originalUrl
  } - ${status} - ${mensagem}\n`;

  if (!fs.existsSync(path.dirname(logFilePath))) {
    fs.mkdirSync(path.dirname(logFilePath), { recursive: true });
  }

  fs.appendFileSync(logFilePath, log, "utf8");

  res.status(status).json({
    erro: mensagem,
  });
}

module.exports = errorHandler;
