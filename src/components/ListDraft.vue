<template>
  <form :class="classList" @submit.prevent="addList">
    <input type="text" class="text-input" contenteditable="true" v-model="title" ref="textInput" placeholder="Add new list" @focusin="startEditing" @focusout="finishEditing">
    <button type="submit" class="add-button" v-if="isEditing || isAddable">
      Add
    </button>
  </form>
</template>

<script>
import * as types from '../store/mutation-types';

const ListDraft = {
  data() {
    return {
      isEditing: false,
      title: ''
    }
  },
  computed: {
    classList() {
      const classList = ['list-draft'];

      if(this.isEditing) {
        classList.push('active');
      }

      if(this.titleExists) {
        classList.push('addable');
      }

      return classList;
    },
    titleExists() {
      return this.title.length > 0;
    },
    isAddable() {
      return this.titleExists
    }
  },
  methods: {
    startEditing() {
      this.isEditing = true;
    },
    finishEditing() {
      this.isEditing = false;
    },
    addList() {
      this.$store.commit(types.ADD_LIST, {
        to: this.$parent.index,
        title: this.title
      });
      this.title = '';
    }
  }
}

export default ListDraft;
</script>

<style lang="scss" scoped>
.list-draft {
  margin: 0 10px auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-width: 320px;
  width: 320px;

  .text-input {
    padding: 20px 15px;
    width: calc(100% - 30px);
    background-color: #ccc;
    border-radius: 8px;
    cursor: pointer;
    border: none;
    font-family: "Noto Sans Japanese", "Noto Sans", sans-serif;
    font-weight: 700;
    font-size: 24px;
    color: #242424;
    cursor: pointer;
    overflow: overlay;
  }

  .text-input:focus {
    outline: 0;
    cursor: initial;
  }

  .add-button {
    margin-top: 15px;
    padding: 15px 18px;
    background-color: #999;
    border: none;
    border-radius: 8px;
    font-family: "Noto Sans Japanese", "Noto Sans", sans-serif;
    font-weight: 700;
    font-size: 18px;
    color: #fff;
  }

  .add-button:hover {
    opacity: 0.8;
  }
}

.list-draft.active, .card-draft.addable {
  .text-input {
    background-color: #fff;
  }
}

.list-draft.active {
  .add-button {
    pointer-events: none;
  }
}

.list-draft.addable {
  .add-button {
    background-color: #ffa955;
    pointer-events: auto;
    cursor: pointer;
  }

  .add-button:active {
    background-color: #d76a00;
  }
}
</style>
