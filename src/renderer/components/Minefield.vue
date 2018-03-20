<template>
  <section class="container">
    <p class="helptext">{{ text }}</p>

    <div class="minefield" :data-size="size">
      <div class="minefield-column" v-for="column in grid">
        <mine
          v-for="mine in column"
          :mine.sync="mine"
          :key="mine.id"
          @click="revealMine(mine)"
          @flag="flagMine(mine)"
        />
      </div>
    </div>

    <game-over-overlay />
    <game-win-overlay />
  </section>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import GameOverOverlay from './GameOverOverlay'
  import GameWinOverlay from './GameWinOverlay'
  import Mine from './Mine'

  export default {
    name: 'minefield',
    components: {
      GameOverOverlay,
      GameWinOverlay,
      Mine
    },
    computed: {
      ...mapGetters([
        'bombCount',
        'flagCount',
        'grid',
        'gridSize'
      ]),
      size () {
        if (this.gridSize > 12) {
          return 'huge'
        } else if (this.gridSize > 8) {
          return 'large'
        }

        return 'normal'
      },
      text () {
        if (this.flagCount > this.bombCount) {
          return `${(this.flagCount - this.bombCount)} flags too many`
        }

        return `${(this.bombCount - this.flagCount)} mines remaining`
      }
    },
    methods: {
      ...mapActions([
        'flagMine',
        'gameOver',
        'resetGrid',
        'revealMine'
      ])
    },
    mounted () {
      this.resetGrid()
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

  .helptext {
    font-family: 'Lato', sans-serif;
    color: #d2dae2;
    text-align: center;
    font-size: 2rem;
    margin: 0;
    padding: 0;
    padding-bottom: 1rem;
  }

  .minefield {
    display: flex;
    flex-direction: row;
    font-family: 'Overpass Mono', monospace;
    align-items: center;
    justify-content: center;
    color: #d2dae2;
  }

  .minefield-column {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .mine {
    font-size: 2rem;
    width: 4rem;
    height: 4rem;
    margin: 0.25rem;
    background: #485460;
    line-height: 4rem;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    transition: background 0.25s ease-in-out;
    box-shadow: 0.0.25rem 0.25rem rgba(12, 15, 18, 0.34);
  }

  .minefield[data-size="large"] .mine {
    width: 2rem;
    height: 2rem;
    line-height: 2rem;
    font-size: 1rem;
    margin: 0.125rem;
  }

  .minefield[data-size="huge"] .mine {
    width: 1.5rem;
    height: 1.5rem;
    line-height: 1.5rem;
    font-size: 1rem;
    margin: 0.0625rem;
  }

  .mine:hover {
    background: #808e9b;
  }

  .mine.found {
    background: rgba(72, 84, 96, 0.5);
  }

  .mine.detonated {
    background: #ff3f34;
    color: #1e272e;
  }

  .mine.flagged {
    background: #ffd32a;
    color: #1e272e;
  }
</style>
