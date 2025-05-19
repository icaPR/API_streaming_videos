const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  usuarioId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: [true, "Usuário é obrigatório."],
  },
  titulo: {
    type: String,
    required: [true, "Título é obrigatório."],
  },
  descricao: {
    type: String,
    required: [true, "Descrição é obrigatória."],
  },
  url: {
    type: String,
    required: [true, "URL do vídeo é obrigatória."],
  },
  dataPublicacao: {
    type: Date,
    default: Date.now,
  },
  duracao: {
    type: Number,
    required: [true, "Duração é obrigatória."],
  },
  visualizacoes: {
    type: Number,
    default: 0,
  },
  likes: {
    type: Number,
    default: 0,
  },
  categoria: {
    type: String,
    required: [true, "Categoria é obrigatória."],
  },
});

const Video = mongoose.model("Video", videoSchema);

module.exports = Video;
