<template>
  <section class="gamewin-overlay" v-if="isVisible">
    <p class="gamewin-text">WELL DONE!</p>
    <p class="gamewin-text small">You have cleared the minefield.</p>
    <p class="gamewin-text small">
      <button class="gamewin-button" @click="restartGame">New game</button>
    </p>
  </section>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'

  export default {
    name: 'game-win-overlay',
    computed: {
      ...mapGetters([
        'isGameWin'
      ]),
      isVisible () {
        return this.isGameWin
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

  .gamewin-overlay {
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

  .gamewin-text {
    padding: 0;
    margin: 0;
    font-size: 4rem;
    text-align: center;
    padding-bottom: 1rem;
  }

  .gamewin-text.small {
    font-size: 1.5rem;
  }

  .gamewin-button {
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

  .gamewin-button:hover {
    background: #575fcf;
  }
</style>
