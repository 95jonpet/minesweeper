import _ from 'lodash'

const generateField = function (size, bombCount) {
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

  return field
}

const state = {
  bombCount: 10,
  field: generateField(8, 10),
  gameState: 'PLAYING',
  size: 8
}

const getters = {
  bombCount: state => state.bombCount,
  field: state => state.field,
  isGameOver: state => state.gameState === 'GAME_OVER'
}

const mutations = {
  RESTART_GAME (state) {
    state.gameState = 'PLAYING'
    state.bombCount = 10
    state.field = generateField(8, 10)
  },
  SET_GAME_OVER_STATE (state) {
    state.gameState = 'GAME_OVER'
  }
}

const actions = {
  gameOver ({ commit }) {
    commit('SET_GAME_OVER_STATE')
  },
  restartGame ({ commit }) {
    commit('RESTART_GAME')
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
