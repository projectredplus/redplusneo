<template>
    <div class="container">
        <a href="/desafios">
            Voltar
        </a>

        <h2>Quiz da Redação</h2>
        <main>
            <div class="content">
                <span class="spnQtd"></span>
                <span class="question"></span>
                <div class="answers"></div>
            </div>
            <div class="finish">
                <span></span>
                <button>Reiniciar</button>
            </div>
        </main>
    </div>
</template>

<style setup>
    .container {
        height: calc(100vh - 380px);
    }

    .finish {
        display: flex;
        justify-content: center;
        margin-top: 12px;
        display: none;
    }

    .finish button {
        color: white;
        background-color: #30313f;
        border: 0;
        border-radius: 4px;
        padding: 8px;
        margin-left: 12px;
    }

    .finish button:hover {
        background-color: #393b4b;
    }

    .answer {
        width: 100%;
        background-color: #30313f;
        color: white;
        border: 0;
        border-radius: 4px;
        padding: 8px;
    }

    .answer:hover {
        background-color: #393b4b;
    }

    .answers {
        display: flex;
        flex-direction: column;
        margin-top: 16px;
        gap: 2px;
    }

    .content {
        color: white;
        background-color: #272833;
        border-radius: 12px;
        padding: 16px;
        max-width: 600px;
        margin: 0 auto;
    }
</style>

<script setup>
    import { onMounted } from 'vue';

    const questions = [
        {
            question: "Por que é recomendado não utilizar o termo 'denegrir' em uma redação sobre direitos étnico-raciais?",
            answers: [
                { option: "Porque o termo é ofensivo e reforça estereótipos negativos em relação às pessoas negras.", correct: true },
                { option: "Porque o termo é antiquado e não é mais utilizado na linguagem atual.", correct: false },
                { option: "Porque o termo é considerado politicamente incorreto e pode ser interpretado como racista.", correct: false },
            ],
        },
        {
            question: "Qual é o objetivo principal de um texto dissertativo-argumentativo? ",
            answers: [
                { option: "Entreter o leitor.", correct: false },
                { option: " Informar sobre um tema específico.", correct: false },
                { option: "Convencer o leitor por meio de argumentos.", correct: true },
            ],
        },
        {
            question: "O que significa o termo 'interseccionalidade'?",
            answers: [
                { option: "A união de diferentes grupos étnicos em uma sociedade.", correct: false },
                { option: "A interação entre diferentes formas de opressão, como raça, gênero e classe social.", correct: true },
                { option: " A segregação racial em espaços públicos.", correct: false },
            ],
        },
        {
            question: "O que é uma tese em um texto dissertativo-argumentativo?",
            answers: [
                { option: "Uma pergunta para reflexão.", correct: false },
                { option: "Um argumento principal que será defendido.", correct: true },
                { option: "Um exemplo utilizado para ilustrar uma ideia.", correct: false },
            ],
        },
        {
            question: "O que é coesão textual?",
            answers: [
                { option: "A forma como as palavras são pronunciadas.", correct: false },
                { option: "A maneira como as frases estão estruturadas.", correct: false },
                { option: " A conexão lógica entre as partes de um texto.", correct: true },
            ],
        },
        {
            question: "O que são conectivos e qual é a sua importância em um texto?",
            answers: [
                { option: "São palavras que expressam emoções e sentimentos.", correct: false },
                { option: "São palavras que indicam a continuidade de um assunto.", correct: false },
                { option: "São palavras que estabelecem relações entre as ideias.", correct: true },
            ],
        },
        {
            question: "O que são cotas raciais?",
            answers: [
                { option: "Políticas que visam garantir a inclusão de grupos étnico-raciais em espaços onde historicamente foram excluídos.", correct: true },
                { option: "Práticas que reforçam a segregação racial em instituições de ensino e trabalho.", correct: false },
                { option: "Regras que proíbem a participação de grupos étnico-raciais em atividades sociais.", correct: false },
            ],
        },
        {
            question: "O que é paráfrase?",
            answers: [
                { option: "A reescrita de um trecho utilizando outras palavras, mantendo o sentido.", correct: true },
                { option: "A repetição exata das palavras de um texto original.", correct: false },
                { option: "Uma citação direta de uma fonte confiável.", correct: false },
            ],
        },
        {
            question: "Qual é o termo correto para se referir a uma palavra que tem o mesmo significado de outra?",
            answers: [
                { option: " Antônimo.", correct: false },
                { option: "Sinônimo.", correct: true },
                { option: "Homônimo.", correct: false },
            ],
        },
        {
            question: "Qual das seguintes frases contém um gerúndio?",
            answers: [
                { option: "Eu fui ao mercado comprar pão.", correct: false },
                { option: "Ela estava cantando uma bela música.", correct: true },
                { option: "Nós corremos todos os dias pela manhã.", correct: false },
            ],
        },
        {
            question: "Como se separam as sílabas da palavra 'acessível' corretamente?",
            answers: [
                { option: "a-ces-sí-vel.", correct: false },
                { option: "a-ces-sí-vel.", correct: true },
                { option: "a-ce-ssí-vel.", correct: false },
            ],
        },
        {
            question: "Qual é o conceito que se refere à valorização da diversidade étnica e cultural em uma sociedade?",
            answers: [
                { option: "Etnocentrismo.", correct: false },
                { option: "Inclusão.", correct: true },
                { option: "Assimilação.", correct: false },
            ],
        },

    ];

    onMounted(() => {
        const question = document.querySelector(".question");
        const answers = document.querySelector(".answers");
        const spnQtd = document.querySelector(".spnQtd");
        const textFinish = document.querySelector(".finish span");
        const content = document.querySelector(".content");
        const contentFinish = document.querySelector(".finish");
        const btnRestart = document.querySelector(".finish button");

        let currentIndex = 0;
        let questionsCorrect = 0;

        btnRestart.onclick = () => {
            content.style.display = "block";
            contentFinish.style.display = "none";

            currentIndex = 0;
            questionsCorrect = 0;
            loadQuestion();
        };

        function nextQuestion(e) {
            if (e.target.getAttribute("data-correct") === "true") {
                questionsCorrect++;
            }

            if (currentIndex < questions.length - 1) {
                currentIndex++;
                loadQuestion();
            } else {
                finish();
            }
        }

        function finish() {
            textFinish.innerHTML = `você acertou ${questionsCorrect} de ${questions.length}`;
            content.style.display = "none";
            contentFinish.style.display = "flex";
        }

        function loadQuestion() {
            spnQtd.innerHTML = `${currentIndex + 1}/${questions.length} `;
            const item = questions[currentIndex];
            answers.innerHTML = "";
            question.innerHTML = item.question;

            item.answers.forEach((answer) => {
                const div = document.createElement("div");

                div.innerHTML = `
    <button class="answer" data-correct="${answer.correct}">
      ${answer.option}
    </button>
    `;

                answers.appendChild(div);
            });

            document.querySelectorAll(".answer").forEach((item) => {
                item.addEventListener("click", nextQuestion);
            });
        }

        loadQuestion();
    })
</script>