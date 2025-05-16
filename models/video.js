const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  usuarioId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Usuario",
  },
  titulo: { type: String, required: true },
  descricao: { type: String },
  url: { type: String, required: true },
  dataPublicacao: { type: Date, default: Date.now },
  duracao: { type: Number }, //seg
  visualizacoes: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  categoria: { type: String },
});

const Video = mongoose.model("Video", videoSchema);

module.exports = Video;
