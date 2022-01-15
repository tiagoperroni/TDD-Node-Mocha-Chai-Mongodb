const  mongoose = require('mongoose');

const FilmeModel = mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    genero: {
        type: String,
        required: true
    },
    dataLancamento: {
        type: String,
        required: true
    },
    preco: {
        type: Number,
        required: true
    },
    dataCadastro: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Filme', FilmeModel);