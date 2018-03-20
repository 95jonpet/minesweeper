<template>
  <div
    :class="classes"
    @click.left="click"
    @click.right="flag"
  >
    <span
      class="mine-indicator"
      :data-content="text"
    >
      {{ text }}
    </span>
    <font-awesome-icon
      v-if="icon !== null"
      :icon="icon"
    />
  </div>
</template>

<script>
  import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
  import faBomb from '@fortawesome/fontawesome-free-solid/faBomb'
  import faFlag from '@fortawesome/fontawesome-free-solid/faFlag'

  export default {
    name: 'mine',
    props: {
      mine: Object
    },
    components: { FontAwesomeIcon },
    computed: {
      classes () {
        let classes = [ 'mine' ]

        if (this.mine.isRevealed) {
          classes.push('found')

          if (this.mine.type === 'MINE') {
            classes.push('detonated')
          }
        } else {
          if (this.mine.isFlagged) {
            classes.push('flagged')
          }
        }

        return classes
      },
      icon () {
        if (this.mine.isRevealed && this.mine.type === 'MINE') {
          return faBomb
        } else if (this.mine.isFlagged) {
          return faFlag
        }

        return null
      },
      text () {
        if (!this.mine.isRevealed) {
          return ''
        }

        if (this.mine.type === 'MINE') {
          return ''
        } else if (this.mine.isFlagged) {
          return ''
        } else if (this.mine.nearby === 0) {
          return ''
        }

        return this.mine.nearby
      }
    },
    methods: {
      click () {
        if (this.mine.isFlagged) {
          return
        }

        this.$emit('click', this.mine)
      },
      flag () {
        this.$emit('flag', this.mine)
      }
    }
  }
</script>

<style scoped>
  .mine-indicator {
    color: #d2dae2; /* white */
  }

  .mine-indicator[data-content="1"] {
    color: #3c40c6; /* blue */
  }

  .mine-indicator[data-content="2"] {
    color: #05c46b; /* green */
  }

  .mine-indicator[data-content="3"] {
    color: #ff3f34; /* red */
  }

  .mine-indicator[data-content="4"] {
    color: #9e407d; /* purple */
  }

  .mine-indicator[data-content="5"] {
    color: #000000; /* black */
  }

  .mine-indicator[data-content="6"] {
    color: #b64746; /* maroon */
  }

  .mine-indicator[data-content="7"] {
    color: #d2dae2; /* gray */
  }

  .mine-indicator[data-content="8"] {
    color: #34e7e4; /* turquoise */
  }
</style>
