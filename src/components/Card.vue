<template>
  <div class="card">
    <div class="close-button" @click="removeCardFromList">
      x
    </div>
    <div class="body">
      {{ body }}
    </div>
    <div class="arrows">
      <div :class="['arrow', 'left', movableToLeft ? '' : 'disabled']" @click="moveCardToLeft">
        ←
      </div>
      <div :class="['arrow', 'right', movableToRight ? '' : 'disabled']" @click="moveCardToRight">
        →
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import * as types from '../store/mutation-types.js';

const Card = {
  props: ['body', 'index'],
  computed: {
    movableToLeft() {
      return this.$parent.index > 0;
    },
    movableToRight() {
      return this.listsCount > this.$parent.index + 1;
    },
    ...mapGetters([
      'listsCount'
    ])
  },
  methods: {
    removeCardFromList() {
      this.$store.commit(types.REMOVE_CARD_FROM_LIST, {
        from: this.$parent.index,
        cardIndex: this.index
      });
    },
    moveCardToRight() {
      if(this.movableToRight) {
        this.moveCardToList({
          from: this.$parent.index,
          to: this.$parent.index + 1,
          cardIndex: this.index
        });
      }
    },
    moveCardToLeft() {
      if(this.movableToLeft) {
        this.moveCardToList({
          from: this.$parent.index,
          to: this.$parent.index - 1,
          cardIndex: this.index
        });
      }
    },
    ...mapMutations({
      moveCardToList: types.MOVE_CARD_TO_LIST
    })
  }
}

export default Card;
</script>

<style lang="scss" scoped>
.card {
  margin-bottom: 15px;
  position: relative;
  display: flex;
  align-items: center;
  padding: 30px 15px 40px;
  background-color: #fff;
  border-radius: 8px;
  width: calc(100% - 30px);

  .close-button {
    position: absolute;
    top: 6px;
    right: 15px;
    font-size: 22px;
    cursor: pointer;
  }

  .close-button:hover {
    opacity: 0.8;
  }

  .body {
    font-size: 18px;
    width: 100%;
    word-wrap: break-word;
  }

  .arrows {
    display: flex;
    justify-content: space-between;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;

    .arrow {
      margin: 10px;
      font-size: 18px;
      color: #FF003F;
      cursor: pointer;
    }

    .arrow:hover {
      opacity: 0.8;
    }

    .arrow.disabled {
      color: #999;
      pointer-events: none;
    }
  }
}

.card:last-child {
  margin-bottom: 0;
}
</style>
