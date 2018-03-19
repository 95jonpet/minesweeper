<template>
  <div
    :class="classes"
    @click.left="click"
    @click.right="flag"
  >
    {{ text }}
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
