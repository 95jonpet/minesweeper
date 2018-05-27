<template>
  <section class="container">
    <h1 class="title">Minesweeper</h1>

    <div class="field">
      <label for="size">Size</label>
      <select id="size" v-model="gridSize">
        <option
          v-for="size in sizes"
          :value="size"
        >
          {{ `${size}x${size}` }}
        </option>
      </select>
    </div>

    <div class="field">
      <label for="mines">Mines</label>
      <input type="number" id="mines" v-model="bombCount">
    </div>

    <div class="field">
      <button @click="start">Start</button>
    </div>

    <p class="copyright">&copy; Digitea</p>
  </section>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    name: 'start-game',
    data () {
      return {
        bombCount: 40,
        gridSize: 8,
        sizes: [
          8,
          12,
          16
        ]
      }
    },
    methods: {
      ...mapActions([
        'setGridSize',
        'setBombCount'
      ]),
      start () {
        this.setGridSize(this.gridSize)
        this.setBombCount(this.bombCount)

        this.$router.push('/play')
      }
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Overpass+Mono');
  @import url('https://fonts.googleapis.com/css?family=Lato');

  * {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    user-select: none;
    cursor: default;
  }

  body {
    background: #1e272e;
    padding: 0;
    margin: 0;
  }

  .container {
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    align-items: center;
    justify-content: center;
  }

  .title {
    font-family: 'Lato', sans-serif;
    color: #d2dae2;
    text-align: center;
    font-size: 2rem;
    margin: 0;
    padding: 0;
    padding-bottom: 1rem;
  }

  .copyright {
    font-family: 'Lato', sans-serif;
    color: #d2dae2;
    text-align: center;
    font-size: 1rem;
    margin: 0;
    padding: 0;
    padding-top: 0.75rem;
  }

  .field {
    width: 100%;
    max-width: 300px;
    display: flex;
    flex-direction: column;
    margin-bottom: 2rem;
  }

  .field label {
    padding-bottom: 0.5rem;
    color: #d2dae2;
    font-family: 'Lato';
    font-size: 1.25rem;
  }

  .field input,
  .field select {
    padding: 0.5rem;
    font-family: 'Overpass Mono', 'Lato', sans-serif;
    font-size: 1rem;
    border: 2px solid #485460;
    background: #808e9b;
  }

  .field button {
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

  .field button:hover {
    background: #575fcf;
  }
</style>
