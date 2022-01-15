const FilmeModel = require("../model/filme.model.js");

class FilmeController {
  getAll = async (req, res) => {
    const response = await FilmeModel.find();
    return response.length < 1 ? res.status(404).json({ msg: "Nenhum filme foi encontrado." }) : res.status(200).json(response);
  };

  getById = async (req, res) => {
    const response = await FilmeModel.findById(req.params.id);
    return !response ? res.status(404).json({ msg: "Produto não encontrado com o id informado." }) : res.status(200).json(response);
  };

  cadastrarFilme = async (req, res) => {
    const filme = new FilmeModel(req.body);
    if (filme.nome === undefined || filme.genero === undefined || filme.preco === undefined || filme.dataLancamento === undefined) {
      return res.status(400).json({ msg: "Preencha todos os campos." });
    }
    return res.status(201).json(await filme.save());
  };

  atualizarFilme = async (req, res) => {
    const filmeCadastrado = await FilmeModel.findById(req.params.id);
    if (!filmeCadastrado) return res.status(404).json({ msg: "Filme não encontrado." });
    const filme = req.body;
    if (filme.nome === undefined || filme.genero === undefined || filme.preco === undefined || filme.dataLancamento === undefined) {
      return res.status(400).json({ msg: "Preencha todos os campos." });
    }
    return res.status(202).json(await FilmeModel.findByIdAndUpdate(req.params.id, filme, { new: true }));
  };

  deletarFilme = async (req, res) => {
    const id = req.params.id;
    const response = await FilmeModel.findById(id);
    if (!response) {
      return res.status(404).json({ msg: "Filme não encontrado." });
    }
    await FilmeModel.deleteOne({ id });
    return res.status(202).json({ msg: "Filme deletado com sucesso." });
  };

  deletarTodosFilmes = async (req, res) => {
    try {
      await FilmeModel.deleteMany().all();
      return res.status(202).json({ msg: "Filmes deletados com sucesso." });
    } catch (error) {
      console.log(error.message);
    }
  };
}

module.exports = new FilmeController();
