<template>
  <div class="random-wrapper">
    <div class="card">
      <h1>
        {{ storeList.title }}
      </h1>
      <div class="desc">
        此主題有 {{ availableTags.length }} 種標籤可供篩選
      </div>
      <div class="tags">
        <label
          v-for="(tag, idx) in availableTags"
          :key="`key_${idx}`"
        >
          <input
            v-model="selectedTags"
            type="checkbox"
            :value="tag"
          >
          {{ tag }}
        </label>
      </div>

      <hr>

      <div class="desc">
        此條件下共有 {{ filteredStores.length }} 家店可被選擇
      </div>
      {{ filteredStores.map(item => item.title).join(', ') }}
    </div>

    <div
      v-if="result"
      class="card result"
    >
      結果：{{ result }}
    </div>

    <div class="card actions">
      <button
        type="button"
        class="primary"
        @click="getRandomStore()"
      >
        <span class="material-symbols-outlined">
          point_scan
        </span>
        開始
      </button>

      <button
        type="button"
        @click="editStoreList(editIdx)"
      >
        <span class="material-symbols-outlined">
          edit_note
        </span>
        編輯列表
      </button>

      <button
        type="button"
        @click="backToStoreLists()"
      >
        <span class="material-symbols-outlined">
          arrow_back
        </span>
        返回用餐主題
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PageStatus } from '../enums'
import { SiteState } from '../hooks'
import { ref, computed } from 'vue'
import Store from './Store.vue'

const { status, storeLists, editIdx, tempEditStoreList } = SiteState

const storeList = computed(() => {
  return storeLists.value[editIdx.value]
})

const selectedTags = ref([])

const availableTags = computed(() => {
  return [...new Set(storeList.value.list.map(store => store.tags).flat())]
})

const filteredStores = computed(() => {
  return selectedTags.value.length ?
    storeList.value.list.filter(store => store.tags.filter(tag => selectedTags.value.includes(tag)).length) :
    storeList.value.list
})

const result = ref(null)

function getRandomStore () {
  const randomNum = Math.floor(Math.random() * filteredStores.value.length)
  result.value = filteredStores.value[randomNum].title
}

function editStoreList (idx) {
  status.value = PageStatus.EDIT_STORE_LIST
  editIdx.value = idx
  tempEditStoreList.value = JSON.parse(JSON.stringify(storeLists.value[idx]))
}

function backToStoreLists () {
  status.value = PageStatus.STORE_LISTS
}
</script>

<style scoped lang="scss">
.tags {
}

.desc {
  margin-bottom: 1rem;
}
</style>
