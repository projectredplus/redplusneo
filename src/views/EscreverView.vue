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
                    <textarea id="notes" placeholder="Digite sua redação aqui"></textarea>
                    <button id="correctionBtn" class="btn" style="display: none;">Corrigir na Glau</button>
                </div>
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
.card2 {
    max-width: 750px !important;
    padding: 16px 0;
    width: 100%;
}

.btn:hover {
    background-color: #4caf50;
}
</style>

<script setup>
    import { onMounted } from 'vue';

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

        function goToGlawCorrection() {
            var text = document.getElementById("notes").value;
            var glawUrl = "https://app.glau.com.vc/aluno/praticar/nova-redacao" + encodeURIComponent(text);
            window.open(glawUrl, "_blank");
        }

        document.getElementById("startBtn").addEventListener("click", startTimer);
        document.getElementById("pauseBtn").addEventListener("click", pauseTimer);
        document.getElementById("resetBtn").addEventListener("click", resetTimer);
        document.getElementById("correctionBtn").addEventListener("click", goToGlawCorrection);
    })
</script>