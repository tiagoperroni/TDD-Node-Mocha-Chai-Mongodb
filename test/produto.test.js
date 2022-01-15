const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server.js");

const expect = chai.expect;

chai.use(chaiHttp);

describe("/Teste do server express", () => {
  it("Teste de rota da versão da api", (done) => {
    chai
      .request(server)
      .get("/api/status")
      .end((err, res) => {
        expect(res.body.status).to.be.equal("UP");
        expect(res.status).to.be.equal(200);
        done();
      });
  });
});

describe("/Teste dos end-points da Api", () => {
  it("Deverá retornar mensagem de lista vazia", (done) => {
    chai
      .request(server)
      .get("/api/filmes")
      .end((err, res) => {
        expect(res.status).to.be.equal(404);
        expect(res.body).to.be.a("object");
        expect(res.body.msg).to.be.equal("Nenhum filme foi encontrado.");
        done();
      });
  });

  it("Deverá retornar uma lista de filmes", (done) => {
    let filme = {
      nome: "Um Morto Muito Louco",
      genero: "Comédia",
      dataLancamento: "17/05/1987",
      preco: 19.87,
    };

    let filme2 = {
      nome: "Meus Vizinhos São Um Terror",
      genero: "Comédia",
      dataLancamento: "17/05/1986",
      preco: 24.99,
    };

    chai
      .request(server)
      .post("/api/filmes")
      .send(filme)
      .end((err, res) => {
        chai
          .request(server)
          .post("/api/filmes")
          .send(filme2)
          .end((err, res) => {
            chai
              .request(server)
              .get("/api/filmes")
              .end((err, res) => {
                expect(res.body[0].nome).to.be.equal("Um Morto Muito Louco");
                expect(res.body.length).to.be.equal(2);
                expect(res.body).to.be.a("array");
                expect(res.body[1].dataLancamento).to.be.equal("17/05/1986");
                expect(res.status).to.be.equal(200);
                done();
              });
          });
      });
  });

  it("Deverá falhar ao buscar um filme por id", (done) => {
    chai
      .request(server)
      .get("/api/filmes/61ddbfbe72041c4bf01234de")
      .end((err, res) => {
        expect(res.status).to.be.equal(404);
        expect(res.body.msg).to.be.equal("Produto não encontrado com o id informado.");
        done();
      });
  });

  it("Deverá retornar um filme por id", (done) => {
    let filme = {
      nome: "Um Morto Muito Louco",
      genero: "Comédia",
      dataLancamento: "17/05/1987",
      preco: 19.87,
    };

    chai
      .request(server)
      .post("/api/filmes")
      .send(filme)
      .end((err, res) => {
        chai
          .request(server)
          .get(`/api/filmes/${res.body._id}`)
          .end((err, res) => {
            expect(res.status).to.be.equal(200);
            expect(res.body.nome).to.be.equal("Um Morto Muito Louco");
            expect(res.body.dataLancamento).to.be.equal("17/05/1987");
            expect(res.body).to.be.a("object");
            done();
          });
      });
  });

  it("Deverá falhar ao cadastrar filme", (done) => {
    let filme = {
      nome: "Um Morto Muito Louco",
      dataLancamento: "17/05/1987",
    };

    chai
      .request(server)
      .post("/api/filmes")
      .send(filme)
      .end((err, res) => {
        expect(res.status).to.be.equal(400);
        expect(res.body.msg).to.be.equal("Preencha todos os campos.");
        expect(res.body).to.be.a("object");
        done();
      });
  });

  it("Deverá cadastrar um filme", (done) => {
    let filme = {
      nome: "Um Morto Muito Louco",
      genero: "Comédia",
      dataLancamento: "17/05/1987",
      preco: 19.87,
    };

    chai
      .request(server)
      .post("/api/filmes")
      .send(filme)
      .end((err, res) => {
        expect(res.status).to.be.equal(201);
        expect(res.body.nome).to.be.equal("Um Morto Muito Louco");
        expect(res.body).to.be.a("object");
        done();
      });
  });

  it("Deverá falhar ao atualizar um filme", (done) => {
    chai
      .request(server)
      .put(`/api/filmes/61ddbfbe72041c4bf01234de`)
      .send(null)
      .end((err, res) => {
        expect(res.status).to.be.equal(404);
        expect(res.body.msg).to.be.equal("Filme não encontrado.");
        expect(res.body).to.be.a("object");
        done();
      });
  });

  it("Deverá atualizar um filme", (done) => {
    let filme = {
      nome: "Um Morto Muito Louco",
      genero: "Comédia",
      dataLancamento: "17/05/1987",
      preco: 19.87,
    };

    let filme2 = {
      nome: "Meus Vizinhos São Um Terror",
      genero: "Comédia",
      dataLancamento: "17/05/1986",
      preco: 24.99,
    };

    chai
      .request(server)
      .post("/api/filmes")
      .send(filme)
      .end((err, res) => {
        expect(res.status).to.be.equal(201);
        expect(res.body.nome).to.be.equal("Um Morto Muito Louco");
        expect(res.body).to.be.a("object");

        chai
          .request(server)
          .put(`/api/filmes/${res.body._id}`)
          .send(filme2)
          .end((err, res) => {
            expect(res.status).to.be.equal(202);
            expect(res.body.nome).to.be.equal("Meus Vizinhos São Um Terror");
            expect(res.body.dataLancamento).to.be.equal("17/05/1986");
            expect(res.body).to.be.a("object");
            done();
          });
      });
  });

  it("Deverá falhar ao deletar um filme", (done) => {
    chai
      .request(server)
      .delete(`/api/filmes/61ddbfbe72041c4bf01234de`)
      .end((err, res) => {
        expect(res.body.msg).to.be.equal("Filme não encontrado.");
        expect(res.status).to.be.equal(404);
        expect(res.body).to.be.a("object");
        done();
      });
  });

  it("Deverá deletar um filme", (done) => {
    let filme = {
      nome: "Um Morto Muito Louco",
      genero: "Comédia",
      dataLancamento: "17/05/1987",
      preco: 19.87,
    };

    chai
      .request(server)
      .post("/api/filmes")
      .send(filme)
      .end((err, res) => {
        chai
          .request(server)
          .delete(`/api/filmes/${res.body._id}`)
          .end((err, res) => {
            expect(res.body.msg).to.be.equal("Filme deletado com sucesso.");
            expect(res.status).to.be.equal(202);
            expect(res.body).to.be.a("object");
            done();
          });
      });
  });

  it("Deverá deletar todos filmes", (done) => {
    chai
      .request(server)
      .delete("/api/filmes/deletar/todos")
      .end((err, res) => {
        expect(res.status).to.be.equal(202);
        expect(res.body.msg).to.be.equal("Filmes deletados com sucesso.");
        expect(res.body).to.be.a("object");
        done();
      });
  });
});
