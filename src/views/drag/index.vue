<template>
  <div class="drag">
    <draggable
      v-model="dragList"
      class="container"
      item-key="id"
      animation="300"
      chosen-class="chosen"
      force-fallback="true"
    >
      <template #item="{ element }">
        <div :class="'item' + ' ' + 'item-' + element.num">
          {{ element.num }}
        </div>
      </template>
    </draggable>
  </div>
</template>

<script setup>
import draggable from 'vuedraggable'
import { ref } from 'vue'

const dragList = ref([
  { id: 1, num: 1 },
  { id: 2, num: 2 },
  { id: 3, num: 3 },
  { id: 4, num: 4 },
  { id: 5, num: 5 },
  { id: 6, num: 6 },
  { id: 7, num: 7 },
  { id: 8, num: 8 },
  { id: 9, num: 9 }
])
</script>

<style lang="scss" scoped>
.drag {
  .container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    height: 100%;
    .item {
      width: 33.3%;
      height: 200px;
      line-height: 200px;
      box-sizing: border-box;
      font-size: 25px;
      color: #ffffff;
      cursor: move;
      border: 1px solid #e5e4e9;
      text-align: center;
    }
  }
  .item-1 {
    background-color: #87bba2;
  }
  .item-2 {
    background-color: #ff9b54;
  }
  .item-3 {
    background-color: #73628a;
  }
  .item-4 {
    background-color: #76c893;
  }
  .item-5 {
    background-color: #619b8a;
  }
  .item-6 {
    background-color: #55828b;
  }
  .item-7 {
    background-color: #427aa1;
  }
  .item-8 {
    background-color: #38a3a5;
  }
  .item-9 {
    background-color: #fcca46;
  }
  .chosen {
    border: 2px solid #89cffd !important;
  }
}
</style>
