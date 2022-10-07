const express = require("express"); //importando o express
const app = express(); // ativando o express
const bodyParser = require("body-parser"); //importando o body-parser para trabalhar como envios de formulários
const connection = require('./databases/database'); // importando data-bases para conexão com o back-end
const Pergunta = require('./databases/Pergunta'); // importando modulo de perguntas(tabela)
const Resposta = require('./databases/Resposta'); // importando modulo de respostas (tabela)

//DATA-BASES CONNECTION
connection.authenticate().then(() => {
    console.log("Conexão feita com sucesso!")
}).catch((error) => {
    console.log(error)
})

// Dizendo para o express usar o EJS como view engine
app.set('view engine', 'ejs');
// Dizendo para o express que vou trabalhar com arquivos staticos e que eles estão na pasta public
app.use(express.static('public'));

// Conectar body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


//ROTAS
app.get("/", (req, res) => {
    res.render('index')
});
app.get("/ask", (req, res) => {
    res.render("ask")
})
app.get("/question", (req, res) => {
    //findAll() é igual ao comando mysql "selec * from perguntas'
    Pergunta.findAll({ raw: true, order: [['id', 'DESC']] }).then(perguntas => {
        res.render('question', {
            perguntas: perguntas,
        })
    })
})


app.get("/question/:id", (req, res) => {
    let id = req.params.id;
    Pergunta.findOne({
        where: {id: id}
    }).then(pergunta => {
        if (pergunta != undefined){
            Resposta.findAll({
                where: {perguntaId: pergunta.id},
                order: [['id', 'DESC']]
            }).then(resposta => {
                res.render('respond', {
                    pergunta: pergunta,
                    resposta: resposta
                })
            })
            
        }else {
            res.redirect("/")
        }
    })
})


app.post("/formulario-enviado", (req, res) => {
    let titulo = req.body.titulo;
    let descricao = req.body.describe;
    // Inserindo dados na tabela (model de perguntas). create() é igual ao comando mysql "insert into....""
    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect('/question'); //Se tiver inserido corretamente os dados redirecionar para tal rota
    })    
})
app.post("/formularioResposta", (req, res) => {
    let corpo = req.body.corpo;
    let perguntaId = req.body.pergunta

    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() => {
        res.redirect("/question/"+perguntaId)
    })
})

//SERVIDOR
app.listen(3030, (error) =>{
    if(error){
        console.log(error)
    }else{
        console.log("app rodando!")
    }
});