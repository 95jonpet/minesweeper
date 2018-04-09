import _ from 'lodash'

const state = {
  bombCount: 10,
  flagCount: 0,
  grid: [],
  gridSize: 16
}

const getters = {
  bombCount: state => state.bombCount,
  flagCount: state => state.flagCount,
  grid: state => state.grid,
  gridSize: state => state.gridSize
}

const mutations = {
  FLOOD_FILL (state, mine) {
    this.commit('SET_REVEALED_STATUS', mine)

    if (mine.nearby === 0 && !mine.isFlagged) {
      for (let i = Math.max(mine.x - 1, 0); i <= Math.min(mine.x + 1, state.gridSize - 1); i++) {
        for (let j = Math.max(mine.y - 1, 0); j <= Math.min(mine.y + 1, state.gridSize - 1); j++) {
          if (state.grid[i][j].isRevealed || state.grid[i][j].type !== 'EMPTY') {
            continue
          }

          if (state.grid[i][j].isFlagged) {
            state.grid[i][j].isFlagged = false
            state.flagCount--
          }

          this.commit('FLOOD_FILL', state.grid[i][j])
        }
      }
    }
  },
  RESET_GRID (state) {
    let grid = new Array(state.gridSize)
    let points = new Array(state.gridSize * state.gridSize)

    for (let x = 0; x < grid.length; x++) {
      grid[x] = new Array(state.gridSize)

      for (let y = 0; y < grid[x].length; y++) {
        grid[x][y] = {
          x,
          y,
          nearby: 0,
          isRevealed: false,
          isFlagged: false,
          type: 'EMPTY'
        }

        points[x * state.gridSize + y] = { x, y }
      }
    }

    _.forEach(_.take(_.shuffle(points), state.bombCount), point => {
      grid[point.x][point.y].type = 'MINE'
    })

    for (let x = 0; x < state.gridSize; x++) {
      for (let y = 0; y < state.gridSize; y++) {
        let count = 0

        for (let xx = Math.max(x - 1, 0); xx <= Math.min(x + 1, state.gridSize - 1); xx++) {
          for (let yy = Math.max(y - 1, 0); yy <= Math.min(y + 1, state.gridSize - 1); yy++) {
            if (xx === x && yy === y) {
              continue
            }

            count += (grid[xx][yy] && grid[xx][yy].type === 'MINE') ? 1 : 0
          }
        }

        grid[x][y].nearby = count
      }
    }

    state.grid = grid
    state.flagCount = 0
  },
  SET_REVEALED_STATUS (state, mine) {
    mine.isRevealed = true
  },
  TOGGLE_FLAG (state, mine) {
    if (mine.isRevealed) {
      return
    }

    state.flagCount += mine.isFlagged ? -1 : 1
    mine.isFlagged = !mine.isFlagged
  },
  UPDATE_GAME_STATE_IF_WON (state) {
    let isWin = true
    for (let x = 0; x < state.gridSize && isWin; x++) {
      for (let y = 0; y < state.gridSize && isWin; y++) {
        if (!state.grid[x][y].isRevealed && state.grid[x][y].type !== 'MINE') {
          isWin = false
        }
      }
    }

    if (isWin) {
      this.commit('SET_GAME_WIN_STATE')
    }
  }
}

const actions = {
  flagMine ({ commit }, mine) {
    commit('TOGGLE_FLAG', mine)
    commit('UPDATE_GAME_STATE_IF_WON')
  },
  resetGrid ({ commit }) {
    commit('RESET_GRID')
  },
  revealMine ({ commit }, mine) {
    if (mine.isRevealed) {
      return
    }

    commit('SET_REVEALED_STATUS', mine)
    commit('FLOOD_FILL', mine)

    if (mine.type === 'MINE') {
      commit('SET_GAME_OVER_STATE')
    }

    commit('UPDATE_GAME_STATE_IF_WON')
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
