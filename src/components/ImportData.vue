<template>
  <div class="import-data-wrapper">
    <div class="card">
      <h1>
        從 eatSomething 匯入
      </h1>
      <ol>
        <li>
          打開 https://tool.puckwang.com/tools/eatSomething/
        </li>
        <li>
          打開瀏覽器「開發人員工具」
        </li>
        <li>
          切換到 Application 標籤
        </li>
        <li>
          在左邊 Storage 段落選擇 Local storage，選擇 https://tool.puckwang.com
        </li>
        <li>
          點兩下右方 FOODS 右方的 JSON 格式字串，例如：[{"name":"咖哩王","remarks":""},{"name":"林東芳","remarks":""}]
        </li>
        <li>
          以快速鍵 ctrl+v 複製字串
        </li>
        <li>
          貼到下方文字框中，按下匯入
        </li>
      </ol>
    </div>

    <form @submit.prevent="importData">
      <div class="card">
        <textarea
          v-model="dataForImport"
          placeholder="請填入eatSomething的JSON格式資料"
          required
        ></textarea>
      </div>

      <div class="card actions">
        <button class="primary">
          <span class="material-symbols-outlined">
            publish
          </span>
          匯入
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
  </div>
</template>

<script setup lang="ts">
import { PageStatus } from '../enums'
import { SiteState } from '../hooks'
import { ref } from 'vue'

const { status, storeLists, editIdx, tempEditStoreList } = SiteState

const dataForImport = ref(null)

function editStoreList (idx) {
  status.value = PageStatus.EDIT_STORE_LIST
  editIdx.value = idx
  tempEditStoreList.value = JSON.parse(JSON.stringify(storeLists.value[idx]))
}

function importData () {
  try {
    const data = JSON.parse(dataForImport.value)
    const list = data.map((item) => {
      return {
        title: item.name,
        tags: item.remarks ? item.remarks.split(',') : []
      }
    })

    storeLists.value.push({
      title: '匯入的餐廳列表',
      list
    })
    editStoreList(storeLists.value.length - 1)
  } catch (err) {
    console.log(err)
    alert('格式錯誤導致匯入錯誤')
    return
  }
}

function backToStoreLists () {
  status.value = PageStatus.STORE_LISTS
}
</script>

<style scoped lang="scss">
</style>
