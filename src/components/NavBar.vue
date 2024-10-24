<script setup>
</script>

<template>
  <div id="page-wrapper">
    <header id="header">
      <h1 id="logo"><router-link to="/">RedPlus</router-link></h1>
      <nav id="nav">
        <ul>
          <li><router-link to="/">Início</router-link></li>
          <li id="hoverable">
            <a href="#">Treinamento</a>
            <ul id="target">
              <li><router-link to="/estudos">Estudos</router-link></li>
              <li><router-link to="/desafios">Desafios</router-link></li>
              <li><router-link to="/temas">Temas</router-link></li>
              <li><router-link to="/redacao">Redações</router-link></li>
            </ul>
          </li>
          <li><router-link to="/areadoaluno" class="button secundary">Área do Aluno</router-link></li>
          <li><router-link to="/escrever" class="button primary">Escrever</router-link></li>
        </ul>
      </nav>
    </header>
  </div>
</template>

<style scoped>
  #target {
    display: none !important;
    flex-direction: column;
    background-color: rgba(39, 40, 51, 0.965);
    padding: 0 16px;
    position: absolute;
    top: 50px;
    border-radius: 8px;
  }

  #target * {
    padding: 0
  }

  #hoverable:hover #target {
    display: flex !important;
  }

  #hoverable:focus #target {
    display: flex !important;
  }

</style>
