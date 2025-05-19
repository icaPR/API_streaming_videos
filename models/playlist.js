const mongoose = require("mongoose");

const playlistSchema = new mongoose.Schema({
  usuarioId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: [true, "Usuário criador da playlist é obrigatório."],
  },
  titulo: {
    type: String,
    required: [true, "Título é obrigatório."],
  },
  descricao: {
    type: String,
  },
  dataCriacao: {
    type: Date,
    default: Date.now,
  },
  dataAtualizacao: {
    type: Date,
    default: Date.now,
  },
  privacidade: {
    type: String,
    enum: {
      values: ["publica", "privada", "nao_listada"],
      message: "Privacidade deve ser: publica, privada ou nao_listada.",
    },
    default: "privada",
    required: [true, "Privacidade é obrigatória."],
  },
  videos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Video",
    },
  ],
});

playlistSchema.pre("save", function (next) {
  this.dataAtualizacao = new Date();
  next();
});

playlistSchema.statics.inserir = function (dados) {
  return this.create(dados);
};

playlistSchema.statics.buscarPorId = function (id) {
  return this.findById(id).populate("videos");
};

playlistSchema.statics.buscarPorUsuario = function (usuarioId) {
  return this.find({ usuarioId });
};

playlistSchema.statics.buscar = function (filtros) {
  return this.find(filtros).populate("videos");
};

playlistSchema.statics.atualizar = function (id, dados) {
  dados.dataAtualizacao = new Date();
  return this.findByIdAndUpdate(id, dados, { new: true });
};

playlistSchema.statics.deletar = function (id) {
  return this.findByIdAndDelete(id);
};

playlistSchema.methods.adicionarVideo = function (videoId) {
  this.videos.push(videoId);
  return this.save();
};

playlistSchema.methods.removerVideo = function (videoId) {
  this.videos = this.videos.filter(
    (id) => id.toString() !== videoId.toString()
  );
  return this.save();
};

module.exports = mongoose.model("Playlist", playlistSchema);
