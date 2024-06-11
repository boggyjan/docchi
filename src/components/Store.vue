<template>
  <div class="store">
    <input v-model="props.store.title">

    <Multiselect
      v-model="props.store.tags"
      tag-placeholder="新增這個標籤"
      placeholder="選擇一個標籤"
      :options="tagOptions"
      :multiple="true"
      :taggable="true"
      @tag="addTag"
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
import Multiselect from 'vue-multiselect'

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
}
</style>
