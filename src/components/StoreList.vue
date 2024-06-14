<template>
  <form
    class="store-list-wrapper"
    @submit.prevent="saveStoreList(editIdx)"
  >
    <div class="hero">
      <h1>
        編輯用餐主題列表
      </h1>
      <div>
        您可以在此新增編輯用餐主題與新增移除相關的餐廳
      </div>
    </div>

    <div class="card">
      主題名稱：
      <input v-model="tempEditStoreList.title">

      <hr>

      餐廳列表：
      <Store
        v-for="(store, idx) in tempEditStoreList.list"
        :key="`store_${idx}`"
        :store="store"
        @removeStore="removeStore(idx)"
      />

      <button
        type="button"
        class="primary"
        @click="addStore()"
      >
        <span class="material-symbols-outlined">
          add_business
        </span>
        新增餐廳
      </button>
    </div>

    <div class="card actions">
      <button
        type="submit"
        class="primary"
      >
        <span class="material-symbols-outlined">
          save
        </span>
        儲存列表
      </button>

      <button
        v-if="storeLists[editIdx].list.length"
        type="button"
        @click="playStoreList()"
      >
        <span class="material-symbols-outlined">
          restaurant
        </span>
        開始玩
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
  </form>
</template>

<script setup lang="ts">
import { PageStatus } from '../enums'
import { SiteState } from '../hooks'
import Store from './Store.vue'

const { status, storeLists, editIdx, tempEditStoreList } = SiteState

function addStore () {
  tempEditStoreList.value.list.push({
    title: '餐廳名稱',
    tags: []
  })
}

function removeStore (idx) {
  console.log(idx)
  tempEditStoreList.value.list.splice(idx, 1)
}

function saveStoreList (idx) {
  storeLists.value[idx] = tempEditStoreList.value
  // status.value = PageStatus.STORE_LISTS
  alert('列表已儲存')
}

function playStoreList () {
  status.value = PageStatus.PLAY_STORE_LIST
}

function backToStoreLists () {
  status.value = PageStatus.STORE_LISTS
}
</script>

<style scoped lang="scss">
</style>
