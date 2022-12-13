const e = require('express');
const { Router } = require('express');
const equipe = Router();
const { pool } = require('../database/conexao');

equipe.get('/', (req, res) => {
    const visualizarEquipe = async () => {
        const query = `select e.idequipe, j.nome , t.nome as tecnico, t.funcao, c.nome as cidade from equipe e
        inner join jogador j on j.equipe_idequipe  = e.idequipe 
        inner join tecnico t ON t.equipe_idequipe = e.idequipe 
        inner join cidade c on c.time_id = e.idequipe`;
        await pool.query(query).then((result) => {
            if (result.rows.length > 0) {
                res.json(result.rows);
            } else {
                res.json('Não há equipe cadastrada no momento!');
            }
        }).catch((err) => {
            throw new Error(err);
        });
    }
    return visualizarEquipe();
});

equipe.get('/visualizar/:idEquipe', (req, res) => {
    const { idEquipe } = req.params;
    const visualizarEquipe = async () => {
        const query = `SELECT  * FROM equipe WHERE idequipe = ${idEquipe}`;
        await pool.query(query).then((result) => {
            if (result.rows.length > 0) {
                res.json(result.rows);
            } else {
                res.json('Não equipe cadastrado com este número!');
            }
        }).catch((err) => {
            throw new Error(err);
        });
    }
    return visualizarEquipe();
});

equipe.post('/cadastrar', (req, res) => {
    const { idEquipe, jogadorCasa, jogadorVisitante, tecnicoCasa, tenicoVIsitante, cidade } = req.body;
    const visualizarEquipe = async () => {
        const query = `SELECT  * FROM equipe WHERE idequipe = ${idEquipe}`;
        await pool.query(query).then((result) => {
            if (result.rows.length > 0) {
                res.json('Equipe informada já esta cadastrada!');
            } else {
                const cadastrarEquipe = async () => {
                    const query = `INSERT INTO equipe (idequipe) VALUES (${idEquipe});`;
                    await pool.query(query).then((result) => {
                        if (result.rows) {

                            if (jogadorCasa) {
                                const nomeJogador = async () => {
                                    const query = `SELECT  * FROM jogador WHERE nome = '${jogadorCasa}'`;
                                    await pool.query(query).then((result) => {
                                        if (result.rows.length > 0) {
                                            const atualizarJogador = async () => {
                                                const query = `UPDATE jogador SET equipe_idequipe = ${idEquipe} WHERE nome = '${jogadorCasa}';`;
                                                await pool.query(query).then((result) => {
                                                    if (result.rows) {

                                                        if (jogadorVisitante) {
                                                            const nomeJogador = async () => {
                                                                const query = `SELECT  * FROM jogador WHERE nome = '${jogadorVisitante}'`;
                                                                await pool.query(query).then((result) => {
                                                                    if (result.rows.length > 0) {
                                                                        const atualizarJogador = async () => {
                                                                            const query = `UPDATE jogador SET equipe_idequipe = ${idEquipe} WHERE nome = '${jogadorVisitante}';`;
                                                                            await pool.query(query).then((result) => {
                                                                                if (result.rows) {

                                                                                    if (tecnicoCasa) {
                                                                                        const nomeTecnico = async () => {
                                                                                            const query = `SELECT  * FROM tecnico WHERE nome = '${tecnicoCasa}'`;
                                                                                            await pool.query(query).then((result) => {
                                                                                                if (result.rows.length > 0) {

                                                                                                    const atualizarTecnico = async () => {
                                                                                                        const query = `UPDATE tecnico SET equipe_idequipe = ${idEquipe} WHERE nome = '${tecnicoCasa}';`;
                                                                                                        await pool.query(query).then((result) => {
                                                                                                            if (result.rows) {

                                                                                                                if (tenicoVIsitante) {
                                                                                                                    const nomeTecnico = async () => {
                                                                                                                        const query = `SELECT  * FROM tecnico WHERE nome = '${tenicoVIsitante}'`;
                                                                                                                        await pool.query(query).then((result) => {
                                                                                                                            if (result.rows.length > 0) {

                                                                                                                                const atualizarTecnico = async () => {
                                                                                                                                    const query = `UPDATE tecnico SET equipe_idequipe = ${idEquipe} WHERE nome = '${tenicoVIsitante}';`;
                                                                                                                                    await pool.query(query).then((result) => {
                                                                                                                                        if (result.rows) {

                                                                                                                                            if (cidade) {
                                                                                                                                                const nomeCidade = async () => {
                                                                                                                                                    const query = `SELECT  * FROM cidade WHERE nome = '${cidade}'`;
                                                                                                                                                    await pool.query(query).then((result) => {
                                                                                                                                                        if (result.rows.length > 0) {

                                                                                                                                                            const atualizarCidade = async () => {
                                                                                                                                                                const query = `UPDATE cidade SET time_id = ${idEquipe} WHERE nome = '${cidade}';`;
                                                                                                                                                                await pool.query(query).then((result) => {
                                                                                                                                                                    if (result.rows) {
                                                                                                                                                                        res.json('Sucesso ao cadastrar Equipe ' + idEquipe + '!');
                                                                                                                                                                    }
                                                                                                                                                                }).catch((err) => {
                                                                                                                                                                    throw new Error(err);
                                                                                                                                                                });
                                                                                                                                                            }
                                                                                                                                                            return atualizarCidade();

                                                                                                                                                        } else {
                                                                                                                                                            excluirEquipe(idEquipe)
                                                                                                                                                            res.json('Cidade informada ' + nome + ' não encontrada!');
                                                                                                                                                        }
                                                                                                                                                    }).catch((err) => {
                                                                                                                                                        throw new Error(err);
                                                                                                                                                    });
                                                                                                                                                }
                                                                                                                                                return nomeCidade();
                                                                                                                                            }


                                                                                                                                        }
                                                                                                                                    }).catch((err) => {
                                                                                                                                        throw new Error(err);
                                                                                                                                    });
                                                                                                                                }
                                                                                                                                return atualizarTecnico();

                                                                                                                            } else {
                                                                                                                                excluirEquipe(idEquipe)
                                                                                                                                res.json('Técnico  Visitante informado ' + tenicoVIsitante + ' não encontrado!');
                                                                                                                            }
                                                                                                                        }).catch((err) => {
                                                                                                                            throw new Error(err);
                                                                                                                        });
                                                                                                                    }
                                                                                                                    return nomeTecnico();
                                                                                                                }

                                                                                                            }
                                                                                                        }).catch((err) => {
                                                                                                            throw new Error(err);
                                                                                                        });
                                                                                                    }
                                                                                                    return atualizarTecnico();

                                                                                                } else {
                                                                                                    excluirEquipe(idEquipe)
                                                                                                    res.json('Técnico Casa informado ' + tecnicoCasa + ' não encontrado!');
                                                                                                }
                                                                                            }).catch((err) => {
                                                                                                throw new Error(err);
                                                                                            });
                                                                                        }
                                                                                        return nomeTecnico();
                                                                                    }

                                                                                }
                                                                            }).catch((err) => {
                                                                                throw new Error(err);
                                                                            });
                                                                        }
                                                                        return atualizarJogador();
                                                                    } else {
                                                                        excluirEquipe(idEquipe)
                                                                        res.json('Jogador VIsitante informado ' + jogadorVisitante + ' não encontrado!');

                                                                    }
                                                                }).catch((err) => {
                                                                    throw new Error(err);
                                                                });
                                                            }
                                                            return nomeJogador();
                                                        }

                                                    }
                                                }).catch((err) => {
                                                    throw new Error(err);
                                                });
                                            }
                                            return atualizarJogador();
                                        } else {
                                            excluirEquipe(idEquipe)
                                            res.json('Jogador Casa informado ' + jogadorCasa + ' não encontrado!');

                                        }
                                    }).catch((err) => {
                                        throw new Error(err);
                                    });
                                }
                                return nomeJogador();
                            }

                        }
                    }).catch((err) => {
                        throw new Error(err);
                    });
                }
                return cadastrarEquipe();
            }
        }).catch((err) => {
            throw new Error(err);
        });
    }
    return visualizarEquipe();
});

async function excluirEquipe(idEquipe) {
    const excluirJogador = async () => { //verificar
        const query = `DELETE FROM equipe WHERE idequipe = ${idEquipe};`;
        await pool.query(query).then((result) => {
            if (result.rows) {
              console.log(`Sucesso ao excluir a Equipe!`);
            }
        }).catch((err) => {
            throw new Error(err);
        });
    }
    return excluirJogador();
}

module.exports = equipe;