const express = require("express");
const mongoose = require("mongoose");
const videoRoutes = require("./routes/videoRoutes");

const app = express();
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/streaming", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use("/videos", videoRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
