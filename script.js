let todosQuizzes;

let unicoQuizz;

let respostasCorretas = 0;
let perguntasRespondidas = 0;

let conteudoQuizz;
let arrayAlternativas = [];

var cor = '';

let reiniciando;


const  promessaObterQuizz = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes');
promessaObterQuizz.then(obterQuizzes);

function obterQuizzes(respostaObterQuizz) {

    todosQuizzes = respostaObterQuizz;
    imprimirQuizz(todosQuizzes.data);

}


function imprimirQuizz(quizzes){

    for (let i=0; i < quizzes.length; i++) {

        const listaDosQuizzes = document.querySelector(".lista-quizz-recebido");
        listaDosQuizzes.innerHTML += `<li id="${quizzes[i].id}" class="quizz ponteiro" onclick="obterUnicoQuizz(this)" data-identifier="quizz-card"> 
                                            <img src="${quizzes[i].image}">
                                            <div class="degrade">
                                                    <p>${quizzes[i].title}</p>
                                            </div>  
                                        </li>`;

    }
}


function obterUnicoQuizz(quizzSelecionado) {

    const escondeListaQuizz = document.querySelector(".lista-quizz");
    escondeListaQuizz.classList.add('escondido');

    const mostrarPaginaQuizz = document.querySelector(".pagina-quizz");
    mostrarPaginaQuizz.classList.remove('escondido');

    const promessaUnicoQuizz = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${quizzSelecionado.id}`)
    promessaUnicoQuizz.then(mostrarUnicoQuizz);
    
}


function comparador() { 

	return Math.random() - 0.5; 

}


function mostrarUnicoQuizz(respostaUnicoQuizz) {
    conteudoQuizz = respostaUnicoQuizz.data;
    console.log(conteudoQuizz);
    
    let respostas;
    unicoQuizz = document.querySelector(".pagina-quizz");
    unicoQuizz.innerHTML = `
                                <img class="imagem-quizz transicao" src="${conteudoQuizz.image}">
                                    <div class="opacidade"> 
                                        <div class="display-flex transicao">${conteudoQuizz.title}</div>
                                    </div>`;
                                    
    for( i = 0; i < conteudoQuizz.questions.length; i++){

        arrayAlternativas = [];
        
        unicoQuizz.innerHTML += `
                                <div id="9${i}" class="perguntas transicao">
                                    <div id="${i}" class="texto-pergunta display-flex transicao" data-identifier="question">
                                        <p>${conteudoQuizz.questions[i].title}</p>
                                    </div>
                                    <ul class="todas-alternativas${i} lista">
                                    
                                    </ul>`;

        document.getElementById([i]).style.backgroundColor = `${conteudoQuizz.questions[i].color}`;
                                    
        for(j = 0; j < conteudoQuizz.questions[i].answers.length; j++) {

            respostas = document.querySelector(".todas-alternativas" + i);
            let variavelAuxiliar = `
                                        <li id="${i}${j}" class="alternativa ponteiro transicao" onclick="selecionaResposta(this)" data-identifier="answer">
                                            <img src="${conteudoQuizz.questions[i].answers[j].image}" >
                                            <p> ${conteudoQuizz.questions[i].answers[j].text} </p>
                                        </li>
                                `;
            arrayAlternativas.push(`${variavelAuxiliar}`);

        }
        
        arrayAlternativas.sort(comparador);

        for( let k = 0 ; k < arrayAlternativas.length; k++){

            respostas.innerHTML += `${arrayAlternativas[k]}`;
        
        }  
    }
    reiniciando = unicoQuizz.innerHTML;
}


function selecionaResposta ( respostaEscolhida ) {
    
    const elementoRespostas = respostaEscolhida.parentNode;

    for(let i = 0; i <conteudoQuizz.questions.length + 1; i++){

        if ( elementoRespostas.classList.contains('todas-alternativas' + i) ){

            const erradas = document.querySelectorAll(".todas-alternativas" + i +" li.alternativa");
                
            for(let j = 0; j < erradas.length; j++){

                    erradas[j].classList.add('esbranquicado');
                    erradas[j].classList.add('errada');
                    erradas[j].removeAttribute("onclick");

                    if (conteudoQuizz.questions[i].answers[j].isCorrectAnswer === true ){
                        
                        const respostaCerta = document.getElementById(`${i}` + `${j}`);
                        respostaCerta.classList.remove('errada');
                        respostaCerta.classList.add('certa');

                        if( respostaEscolhida === respostaCerta ) {
                            respostasCorretas++;
                        }
                    }
            }

        respostaEscolhida.classList.remove('esbranquicado');
        
        } 
    }
    
    perguntasRespondidas++;
    setTimeout(scrollProximaPergunta, 2000);

}
        

function scrollProximaPergunta(){
        
    if ( perguntasRespondidas === conteudoQuizz.questions.length) {

        resultadoQuizz();

    } else {

        const irParaProxima = document.getElementById(`9${perguntasRespondidas}`);
        irParaProxima.scrollIntoView({behavior: "smooth", block: "center"});

    }
}


function resultadoQuizz() {

        let pontuacao = respostasCorretas/perguntasRespondidas*100 ;
        let textoPontuacao;
        let imagemPontuacao;
        let descricaoPontuacao;

        pontuacao = Math.round(pontuacao);

        for(let i = 0; i < conteudoQuizz.levels.length; i++){

            if ( pontuacao >= conteudoQuizz.levels[i].minValue ) {

                textoPontuacao = conteudoQuizz.levels[i].title; 
                imagemPontuacao = conteudoQuizz.levels[i].image;
                descricaoPontuacao = conteudoQuizz.levels[i].text;
                
            } 
        }
        
        unicoQuizz.innerHTML += `   
                                    <div class="resultado transicao" data-identifier="quizz-result"> 
                                        <div class="acertoFinal display-flex transicao">
                                            <p>${pontuacao}% de acerto: ${textoPontuacao}</p>
                                        </div>
                                        <div class="descricao transicao">
                                            <img = src="${imagemPontuacao}">
                                            <p>${descricaoPontuacao}</p>   
                                        </div>
                                    </div>
                                    
                                    <button id="reinicio" class="ponteiro transicao" onclick="reiniciarQuizz()"> Reiniciar Quizz </button>
                                    <button id="home" class="ponteiro transicao" onclick="voltaHome()"> Voltar para Home </button>
                                    `;

        const telaFinal = document.querySelector(".resultado");
        telaFinal.scrollIntoView({behavior: "smooth", block: "start"});  
        
}


function reiniciarQuizz() {

    unicoQuizz.innerHTML = reiniciando;
    respostasCorretas = 0;
    perguntasRespondidas = 0;
    
    rolarTopo();

}


function voltaHome() {
    
    const escondeListaQuizz = document.querySelector(".lista-quizz");
    escondeListaQuizz.classList.remove('escondido');
    
    const mostrarPaginaQuizz = document.querySelector(".pagina-quizz");
    mostrarPaginaQuizz.classList.add('escondido');
    
    rolarTopo();

    unicoQuizz.innerHTML = "";
    respostasCorretas = 0;
    perguntasRespondidas = 0;
    
}


function rolarTopo() {

    const voltarInicio = document.querySelector(".menu-topo");
    voltarInicio.scrollIntoView({behavior: "smooth"}); 

}