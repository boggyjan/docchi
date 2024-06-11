<template>
  <div class="store-list-wrapper">
    <div class="card store-info">
      主題名稱
      <input v-model="tempEditStoreList.title">
    </div>

    <div class="card store-list">
      餐廳列表
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
        type="button"
        class="primary"
        @click="saveStoreList(editIdx)"
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
          point_scan
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
  </div>
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
