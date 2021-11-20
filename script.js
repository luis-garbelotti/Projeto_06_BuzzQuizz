let todosQuizzes ;

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

let conteudoQuizz;

function mostrarUnicoQuizz(respostaUnicoQuizz) {
    
    conteudoQuizz = respostaUnicoQuizz.data;
    
    const unicoQuizz = document.querySelector(".pagina-quizz");
    unicoQuizz.innerHTML = `
                                <img class="imagem-quizz" src="${conteudoQuizz.image}">
                                    <div class="opacidade"> 
                                        <div class="display-flex">${conteudoQuizz.title}</div>
                                    </div>`
                                    
    for(i=0;i<conteudoQuizz.questions.length;i++){
        unicoQuizz.innerHTML +=                       `
                                <div  class="perguntas">
                                    <div id="0${i }" class="texto-pergunta display-flex">${conteudoQuizz.questions[i].title}</div>
                                    <ul class="todas-alternativas${i}">
                                    </ul>`;

        corAleatoria();

        document.getElementById(0+[i]).style.backgroundColor = color;
                                    
        for(j=0;j<conteudoQuizz.questions[i].answers.length;j++) {
            const respostas = document.querySelector(".todas-alternativas" + i);

            respostas.innerHTML +=    `
                                        <li id="${j}" class="alternativa ponteiro" onclick="selecionaResposta(this)">
                                            <img src="${conteudoQuizz.questions[i].answers[j].image}" >
                                             <p> ${conteudoQuizz.questions[i].answers[j].text} </p>
                                        </li>
                                `;
        }
            
    }
}


var color = '';
function corAleatoria() {

    var letters = '0123456789ABCDEF';
    color = '#';

    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    
    return color;

}


function selecionaResposta ( respostaEscolhida ) {
 
    console.log(respostaEscolhida);
 
}
        

