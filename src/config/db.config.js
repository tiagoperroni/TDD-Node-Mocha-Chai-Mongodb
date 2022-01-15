const mongoose = require("mongoose");
require("dotenv").config({ path: ".env" });

const conectarDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log({ Success: "Conexão com Mongo bem sucedida!" });
  } catch (error) {
    console.log({ Erro: error.message });
    process.exit(1);
  }
};

module.exports = conectarDB;
