const express = require("express");
const app = express();

// Dizendo para o express usar o EJS como view engine
app.set('view engine', 'ejs');
// Dizendo para o express que vou trabalhar com arquivos staticos e que eles estão na pasta public
app.use(express.static('public'));

//ROTAS
app.get("/:name/:lang", (requisicao, resposta) => {
    let name = requisicao.params.name;
    let lang = requisicao.params.lang;
    
    let msg = true;
    let produtos = [
        {nome: "JavaScript",preco: 300},
        {nome: "MySQL",preco: 150},
        {nome: "Node.js",preco: 500}
    ];
    resposta.render("index", {
        name: name,
        lang: lang,
        msg: msg,
        produtos: produtos
    })
});
app.get("/ask", (requisicao, resposta) => {
    resposta.render("ask")
})

//SERVIDOR
app.listen(3030, (error) =>{
    if(error){
        console.log(error)
    }else{
        console.log("app rodando!")
    }
});