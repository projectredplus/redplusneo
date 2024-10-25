<template>
    <div id="page-wrapper">
        <div class="justified-text">
            <h1>Escrever</h1>
            <p>Escrea sua redação e ultilize o cronômetro para o controle do tempo!</p>
        </div>
        <div class="corpo">
            <div class="card2">
                <div class="container">
                    <h1 id="timer">00:00:00</h1>
                    <button id="startBtn" class="btn">Iniciar</button>
                    <button id="pauseBtn" class="btn" disabled>Pausar</button>
                    <button id="resetBtn" class="btn" disabled>Reiniciar</button>
                    <textarea id="notes" placeholder="Digite sua redação aqui" v-model="redacao"></textarea>
                    <button @click="correctEssay" id="correctionBtn" class="btn" style="display: none;">Corrigir com
                        IA</button>
                </div>
            </div>
            <p class="loader" v-if="loading">{{ loading }}</p>
            <div class="panel" v-if="panel">
                <h1 class="nota">{{ panel.nota }}</h1>
                <h2 class="nota-sub">{{ panel.nota >= 700 ? 'Parabéns!' : 'Quase lá!' }}</h2>
                <p class="positives" v-for="item in panel.positivos" :key="item">{{ item }}</p>
                <p class="negatives" v-for="item in panel.negativos" :key="item">{{ item }}</p>
            </div>
            <div class="justified-text">
                <h1>Estrutura</h1>
                <p>Para melhor desempenho escrea sua redação de acordo com a estrutura.</p>
            </div>
            <div class="image-container">
                <img src="../assets/images/estrutura.png" alt="Descrição da Imagem">
                <br>
                <button id="downloadBtn" class="download-btn">Baixar Imagem</button>
            </div>
        </div>
    </div>
</template>

<style>
    .loader {
        text-align: center;
    }

    .card2 {
        max-width: 750px !important;
        padding: 16px 0;
        width: 100%;
        margin: 20px auto;
    }

    .btn:hover {
        background-color: #4caf50;
    }

    .panel {
        text-align: center;
        margin: 0;
    }

    .nota {
        font-size: 28px;
        font-weight: 800;
        margin: 0;
    }

    .nota-sub {
        font-size: 20px;
        font-weight: 400;
    }

    .positives {
        background-color: rgba(35, 255, 35, 0.342);
        margin: 2px;
        padding: 8px
    }

    .negatives {
        background-color: rgba(255, 55, 55, 0.308);
        margin: 2px;
        padding: 8px;
    }
</style>

<script setup>
    import { onMounted, ref } from 'vue';
    const redacao = ref()
    const panel = ref()
    const loading = ref()

    async function correctEssay() {
        if (!redacao.value) {
            alert("Digite algum texto texto!")
            return
        }

        if (redacao.value.length < 300) {
            alert("Digite pelo menos 7 linhas de texto!")
            return
        }
        loading.value = 'Carregando...'
        const client = await fetch('https://api.llama-api.com/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${import.meta.env.VITE_IA_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                messages: [
                    { "role": "user", "content": 'Corrija a redação do ENEM: \n' + redacao.value },
                ],
                functions: [{
                    name: "func",
                    description: `Corrige a redação`,
                    parameters: {
                        type: "object",
                        properties: {
                            nota: {
                                type: "number",
                                description: `Forneça uma nota de 0 a 1000, seguindo o modelo do INEP`,
                            },
                            positivos: {
                                type: "Array",
                                description: "Lista de strings dos feedbacks positivos da redação, seguindo o modelo INEP",
                            },
                            negativos: {
                                type: "Array",
                                description: "Lista de strings dos feedbacks negativos da redação, seguindo o modelo INEP",
                            }
                        }
                    },
                    required: ["nota", "positivos", "negativos"],
                }],
                function_call: "func"
            })
        })
        const res = await client.json()
        if (client.status === 200) {
            panel.value = res?.choices[0].message?.function_call?.arguments
            loading.value = ''
        } else {
            loading.value = 'Lamentamos, serviço de IA indisponível. Tente novamente     mais tarde!'
        }
    }

    onMounted(() => {

        // Função para acionar o download da imagem
        document.getElementById("downloadBtn").addEventListener("click", function () {
            var link = document.createElement('a');
            link.href = "images/estrutura.png"; // Caminho para a imagem
            link.download = "estrutura.png"; // Nome do arquivo a ser baixado
            link.click(); // Acionar o clique do link
        });

        var timerInterval;
        var seconds = 0, minutes = 0, hours = 0;
        var isTimerRunning = false;

        function startTimer() {
            if (!isTimerRunning) {
                timerInterval = setInterval(updateTimer, 1000);
                document.getElementById("startBtn").disabled = true;
                document.getElementById("pauseBtn").disabled = false;
                document.getElementById("resetBtn").disabled = false;
                isTimerRunning = true;
            }
        }

        function pauseTimer() {
            clearInterval(timerInterval);
            document.getElementById("startBtn").disabled = false;
            document.getElementById("pauseBtn").disabled = true;
            document.getElementById("notes").style.display = "block";
            document.getElementById("correctionBtn").style.display = "inline-block";
            isTimerRunning = false;
        }

        function resetTimer() {
            clearInterval(timerInterval);
            seconds = 0;
            minutes = 0;
            hours = 0;
            document.getElementById("timer").textContent = "00:00:00";
            document.getElementById("startBtn").disabled = false;
            document.getElementById("pauseBtn").disabled = true;
            document.getElementById("resetBtn").disabled = true;
            document.getElementById("notes").style.display = "none";
            document.getElementById("correctionBtn").style.display = "none";
            isTimerRunning = false;
        }

        function updateTimer() {
            seconds++;
            if (seconds >= 60) {
                seconds = 0;
                minutes++;
                if (minutes >= 60) {
                    minutes = 0;
                    hours++;
                }
            }

            var timeString =
                (hours ? (hours > 9 ? hours : "0" + hours) : "00") +
                ":" +
                (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") +
                ":" +
                (seconds > 9 ? seconds : "0" + seconds);

            document.getElementById("timer").textContent = timeString;
        }

        document.getElementById("startBtn").addEventListener("click", startTimer);
        document.getElementById("pauseBtn").addEventListener("click", pauseTimer);
        document.getElementById("resetBtn").addEventListener("click", resetTimer);
    })
</script>