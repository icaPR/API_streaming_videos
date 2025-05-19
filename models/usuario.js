const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const usuarioSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, "Nome é obrigatório."],
  },
  username: {
    type: String,
    required: [true, "Username é obrigatório."],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email é obrigatório."],
    unique: true,
    match: [/.+\@.+\..+/, "Formato de e-mail inválido."],
  },
  senha: {
    type: String,
    required: [true, "Senha é obrigatória."],
  },
  bio: {
    type: String,
  },
  fotoPerfilUrl: {
    type: String,
  },
  dataCriacao: {
    type: Date,
    default: Date.now,
  },
  inscritos: {
    type: Number,
    default: 0,
  },
  assinaturas: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
    },
  ],
});

usuarioSchema.pre("save", async function (next) {
  if (!this.isModified("senha")) return next();
  this.senha = await bcrypt.hash(this.senha, 10);
  next();
});

usuarioSchema.statics.inserir = async function (dados) {
  return this.create(dados);
};

usuarioSchema.statics.buscarPorId = function (id) {
  return this.findById(id);
};

usuarioSchema.statics.buscarPorUsername = function (username) {
  return this.findOne({ username });
};

usuarioSchema.statics.atualizar = function (id, dados) {
  return this.findByIdAndUpdate(id, dados, { new: true });
};

usuarioSchema.methods.incrementarInscritos = function () {
  this.inscritos += 1;
  return this.save();
};

usuarioSchema.methods.decrementarInscritos = function () {
  if (this.inscritos > 0) this.inscritos -= 1;
  return this.save();
};

usuarioSchema.methods.inscrever = function (canalId) {
  if (!this.assinaturas.includes(canalId)) {
    this.assinaturas.push(canalId);
  }
  return this.save();
};

usuarioSchema.methods.desinscrever = function (canalId) {
  this.assinaturas = this.assinaturas.filter(
    (id) => id.toString() !== canalId.toString()
  );
  return this.save();
};

module.exports = mongoose.model("Usuario", usuarioSchema);
