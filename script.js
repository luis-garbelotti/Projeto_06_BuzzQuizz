

const  promessaObterQuizz = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes');
promessaObterQuizz.then(obterQuizzes);

function obterQuizzes(respostaObterQuizz) {
    imprimirQuizz(respostaObterQuizz.data);
}

function imprimirQuizz(quizzes){
    for (let i=0; i < quizzes.length; i++) {
        const listaDosQuizzes = document.querySelector(".lista-quizz-recebido");
        listaDosQuizzes.innerHTML += `<li class="quizz" onclick="abrirQuizz"> 
                                            
                                            <img src="${quizzes[i].image}">
                                            <div class="degrade">
                                                    <div>${quizzes[i].title}</div>
                                            </div>
                                            
                                        </li>`;
    }
}