<script setup></script>

<template>
    <div id="main" class="style1">
        <div class="container">
            <header class="major">
                <h2>Desafios Mensais</h2>
            </header>
            <div class="row gtr-150">
                <div class="col-8 col-12-medium">

                    <!-- Content -->
                    <section id="content">
                        <a href="#" class="image fit"><img src="../assets/images/atencao.png" alt="Imagem" /></a>
                        <h3>TEMA DO MÊS: Educação científica e as relações étnico-raciais.</h3>
                        <a href="../assets/nelson.pdf" target="_blank">
                            Estudos adicionais
                        </a>
                        <router-link class="desafios" to="/quiz">
                            Jogar Quizz
                        </router-link>
                        <router-link class="desafios" to="/atividades">
                            Praticar exercícios
                        </router-link>
                        <router-link class="desafios" to="/escrever">
                            Escrever Redação
                        </router-link>
                    </section>

                </div>
                <div class="col-4 col-12-medium">
                    <!-- Sidebar -->
                    <section id="sidebar">
                        <section>
                            <h3 class="atençao">ATENÇÃO!</h3>
                            <p class="justified-text">Os desafios mensais são uma oportunidade única de aprimorar
                                suas habilidades
                                quando você já dominou os fundamentos básicos e deseja desafios que estimulem e
                                testem seu cérebro.
                                Esses desafios proporcionam um ambiente estimulante no qual você pode aplicar o
                                conhecimento
                                adquirido, desenvolver sua criatividade e encontrar soluções inovadoras para
                                problemas complexos.</p>
                        </section>
                        <hr />
                    </section>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .container {
        min-height: calc(100vh - 100px);
    }

    #content {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        text-align: center;
    }

    .desafios {
        background-color: rgb(69, 173, 113);
        color: #fff;
        border: none;
        padding: 10px 20px;
        justify-content: center;
        margin: 5px;
        cursor: pointer;
        border-radius: 32px;
        width: 100%;
        max-width: 300px;
        display: flex;
        margin: 0 auto;
        margin-bottom: 8px;
    }

    .desafios:hover {
        background-color: #368b59;
    }

    @media screen and (max-width: 480px) {
        .desafios {
            max-width: none;
        }
    }
</style>