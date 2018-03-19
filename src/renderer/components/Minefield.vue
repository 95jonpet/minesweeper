<template>
  <section class="container">
    <p class="helptext">{{ bombCount - flagCount }} remaining</p>

    <div class="minefield">
      <div class="minefield-column" v-for="column in field">
        <mine
          v-for="mine in column"
          :mine.sync="mine"
          :key="mine.id"
          @click="clickMine(mine)"
          @flag="flagMine(mine)"
        />
      </div>
    </div>

    <game-over-overlay />
  </section>
</template>

<script>
  import _ from 'lodash'
  import { mapActions } from 'vuex'
  import GameOverOverlay from './GameOverOverlay'
  import Mine from './Mine'

  export default {
    name: 'minefield',
    components: {
      GameOverOverlay,
      Mine
    },
    data () {
      const size = 8
      const bombCount = 10
      const field = new Array(size)

      let points = new Array(size * size)

      for (let i = 0; i < size; i++) {
        field[i] = new Array(size)

        for (let j = 0; j < size; j++) {
          field[i][j] = {
            id: i * size + j,
            isMine: false,
            isFound: false,
            isFlagged: false,
            nearby: 0,
            x: i,
            y: j
          }

          points[i * size + j] = {
            x: i,
            y: j
          }
        }
      }

      _.forEach(_.take(_.shuffle(points), bombCount), point => {
        field[point.x][point.y].isMine = true
      })

      this.updateNearby()

      return {
        bombCount,
        flagCount: 0,
        field,
        size
      }
    },
    methods: {
      ...mapActions([
        'gameOver'
      ]),
      clickMine (mine) {
        if (mine.isFound) {
          return
        }

        mine.isFound = true
        this.updateNearby()

        if (mine.isMine) {
          this.gameOver()
        }

        if (mine.nearby === 0) {
          for (let i = mine.x - 1; i <= mine.x + 1; i++) {
            for (let j = mine.y - 1; j <= mine.y + 1; j++) {
              this.floodFill(i, j)
            }
          }
        }
      },
      flagMine (mine) {
        if (mine.isFound) {
          return
        }

        this.flagCount += mine.isFlagged ? -1 : 1

        mine.isFlagged = !mine.isFlagged
      },
      floodFill (x, y) {
        if (x < 0 || x >= this.size || y < 0 || y >= this.size) {
          return
        }

        this.clickMine(this.field[x][y])
      },
      countNearby (x, y) {
        let count = 0

        for (let xx = Math.max(x - 1, 0); xx <= Math.min(x + 1, this.size - 1); xx++) {
          for (let yy = Math.max(y - 1, 0); yy <= Math.min(y + 1, this.size - 1); yy++) {
            if (xx === x && yy === y) {
              continue
            }

            count += (this.field[xx][yy] && this.field[xx][yy].isMine) ? 1 : 0
          }
        }

        return count
      },
      updateNearby () {
        for (let x = 0; x < this.size; x++) {
          for (let y = 0; y < this.size; y++) {
            this.field[x][y].nearby = this.countNearby(x, y)
          }
        }
      }
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Overpass+Mono');
  @import url('https://fonts.googleapis.com/css?family=Lato');

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
    font: 'Overpass Mono', monospace;
    align-items: center;
    justify-content: center;
    color: #d2dae2;
  }

  .minefield-column {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    /* height: 100vh; */
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
