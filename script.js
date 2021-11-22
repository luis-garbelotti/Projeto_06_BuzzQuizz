let todosQuizzes ;

let respostasCorretas = 0;
let perguntasRespondidas = 0;

let conteudoQuizz;
let arrayAlternativas = [];

var cor = '';


const  promessaObterQuizz = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes');
promessaObterQuizz.then(obterQuizzes);

function obterQuizzes(respostaObterQuizz) {
    todosQuizzes = respostaObterQuizz;
    imprimirQuizz(todosQuizzes.data);
    return respostaObterQuizz;
}


function imprimirQuizz(quizzes){

    for (let i=0; i < quizzes.length; i++) {

        const listaDosQuizzes = document.querySelector(".lista-quizz-recebido");
        listaDosQuizzes.innerHTML += `<li id="${quizzes[i].id}" class="quizz ponteiro" onclick="obterUnicoQuizz(this)"> 
                                            
                                            <img src="${quizzes[i].image}">
                                            <div class="degrade">
                                                    <div>${quizzes[i].title}</div>
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
    let respostas;
    const unicoQuizz = document.querySelector(".pagina-quizz");
    unicoQuizz.innerHTML = `
                                <img class="imagem-quizz" src="${conteudoQuizz.image}">
                                    <div class="opacidade"> 
                                        <div class="display-flex">${conteudoQuizz.title}</div>
                                    </div>`;
                                    
    for( i = 0; i < conteudoQuizz.questions.length; i++){

        arrayAlternativas = [];
        
        unicoQuizz.innerHTML +=                       `
                                <div id="9${i}" class="perguntas">
                                    <div id="${i }" class="texto-pergunta display-flex">${conteudoQuizz.questions[i].title}</div>
                                    <ul class="todas-alternativas${i} lista">
                                    
                                    </ul>`;

        corAleatoria();

        document.getElementById([i]).style.backgroundColor = cor;
                                    
        for(j = 0; j < conteudoQuizz.questions[i].answers.length; j++) {

            respostas = document.querySelector(".todas-alternativas" + i);
            let variavelAuxiliar = `
                                        <li id="${i}${j}" class="alternativa ponteiro " onclick="selecionaResposta(this)">
                                            <img src="${conteudoQuizz.questions[i].answers[j].image}" >
                                            <p> ${conteudoQuizz.questions[i].answers[j].text} </p>
                                            <p class=""> ${conteudoQuizz.questions[i].answers[j].isCorrectAnswer} </p>
                                        </li>
                                `;
            arrayAlternativas.push(`${variavelAuxiliar}`);

        }
        
        arrayAlternativas.sort(comparador);

        for( let k = 0 ; k < arrayAlternativas.length; k++){

            respostas.innerHTML += `${arrayAlternativas[k]}`;
        
        }  
    }
}


function corAleatoria() {

    var letras = '0123456789ABCDEF';
    cor = '#';

    for (var i = 0; i < 6; i++) {
        cor += letras[Math.floor(Math.random() * 16)];
    }
    return cor;

}


function selecionaResposta ( respostaEscolhida ) {

    const elementoRespostas = respostaEscolhida.parentNode;

    for(let i = 0; i <conteudoQuizz.questions.length; i++){

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

        finalizarQuizz();

    } else {

        const irParaProxima = document.getElementById(`9${perguntasRespondidas}`);
        irParaProxima.scrollIntoView({behavior: "smooth"});

    }
}


function finalizarQuizz() {

    
}

