<template>
  <div class="store">
    <input
      v-model="props.store.title"
      placeholder="請輸入店家名稱"
      required
    >

    <vSelect
      v-model="props.store.tags"
      taggable
      multiple
      :options="tagOptions"
    />

    <button
      type="button"
      class="danger"
      @click="$emit('removeStore')"
    >
      刪除
    </button>
  </div>
</template>

<script setup lang="ts">
import { SiteState } from '../hooks'
import { ref, watch } from 'vue'
import vSelect from 'vue-select'

const { storeLists, tagOptions } = SiteState

const props = defineProps({
  store: {
    type: Object,
    default: null
  }
})

function addTag (event) {
  tagOptions.value.push(event)
  props.store.tags.push(event)
}
</script>

<style scoped lang="scss">
.store {
  margin: 10px 0;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 1fr 1fr auto;

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
  }
}
</style>
