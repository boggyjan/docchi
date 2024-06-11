<template>
  <div class="store-lists-wrapper">
    <div class="hero">
      <h1>
        到底要吃什麼？
      </h1>
      <div>
        不知道要吃什麼嗎？就交給我來幫你決定吧！
      </div>
    </div>

    <div class="card store-lists">
      <div
        v-for="(storeList, idx) in storeLists"
        class="store-list"
      >
        <div @click="playStoreList(idx)">
          {{ storeList.title }}
          /
          {{ storeList.list.length || 0 }} 個店家
        </div>

        <div>
          <button
            v-if="storeList.list.length"
            type="button"
            class="primary"
            @click="playStoreList(idx)"
          >
            <span class="material-symbols-outlined">
              point_scan
            </span>
            開始玩
          </button>
          <button
            type="button"
            @click="editStoreList(idx)"
          >
            <span class="material-symbols-outlined">
              edit_note
            </span>
            編輯
          </button>
          <button
            type="button"
            class="danger"
            @click="removeStoreList(idx)"
          >
            <span class="material-symbols-outlined">
              delete
            </span>
            刪除
          </button>
        </div>
      </div>
    </div>

    <div class="card actions">
      <button
        type="button"
        class="primary"
        @click="addStoreList()"
      >
        <span class="material-symbols-outlined">
          note_add
        </span>
        新增用餐主題列表
      </button>

      <button
        type="button"
        @click="importData()"
      >
        <span class="material-symbols-outlined">
          publish
        </span>
        匯入
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PageStatus } from '../enums'
import { SiteState } from '../hooks'
import { ref } from 'vue'

const { status, storeLists, editIdx, tempEditStoreList } = SiteState

function addStoreList () {
  storeLists.value.push({
    title: '晚餐餐廳列表',
    list: []
  })
  editStoreList(storeLists.value.length - 1)
}

function playStoreList (idx) {
  status.value = PageStatus.PLAY_STORE_LIST
  editIdx.value = idx
}

function editStoreList (idx) {
  status.value = PageStatus.EDIT_STORE_LIST
  editIdx.value = idx
  tempEditStoreList.value = JSON.parse(JSON.stringify(storeLists.value[idx]))
}

function removeStoreList (idx) {
  if (confirm('你確定要刪除這個列表嗎？')) {
    storeLists.value.splice(idx, 1)
  }
}

function importData () {
  status.value = PageStatus.IMPORT
}
</script>

<style scoped lang="scss">
.store-lists {
  padding-top: 0;
  padding-bottom: 0;
}

.store-list {
  padding: 1rem 0;
  display: grid;
  grid-template-columns: 1fr auto;
  grid-gap: 10px;
  align-items: center;
  border-bottom: 1px solid #fff1;

  &:last-child {
    border-bottom: 0;
  }
}
</style>
