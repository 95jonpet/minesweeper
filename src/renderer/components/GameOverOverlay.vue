<template>
  <section class="gameover-overlay" v-if="isVisible">
    <p class="gameover-text">GAME OVER</p>
    <p class="gameover-text small">You have met your demise.</p>
    <p class="gameover-text small">
      <button class="gameover-button" @click="restartGame">Restart</button>
    </p>
  </section>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'

  export default {
    name: 'game-over-overlay',
    computed: {
      ...mapGetters([
        'isGameOver'
      ]),
      isVisible () {
        return this.isGameOver
      }
    },
    methods: {
      ...mapActions([
        'restartGame'
      ])
    }
  }
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css?family=Lato');

  .gameover-overlay {
    display: flex;
    flex-direction: column;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(30, 39, 46, 0.9);
    color: #d2dae2;
    font-family: 'Lato', sans-serif;
    justify-content: center;
  }

  .gameover-text {
    padding: 0;
    margin: 0;
    font-size: 4rem;
    text-align: center;
    padding-bottom: 1rem;
  }

  .gameover-text.small {
    font-size: 1.5rem;
  }

  .gameover-button {
    font-family: 'Lato', sans-serif;
    font-size: 1rem;
    padding: 1rem 3rem;
    margin-top: 2rem;
    cursor: pointer;
    border: none;
    background: #3c40c6;
    color: #d2dae2;
    border-radius: 0.25rem;
    transition: all 0.25s ease-in-out;
  }

  .gameover-button:hover {
    background: #575fcf;
  }
</style>
