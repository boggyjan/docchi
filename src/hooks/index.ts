import { PageStatus } from '../enums'
import { ref, computed, watch } from 'vue'
import { useStorage } from '@vueuse/core'

const status = ref(PageStatus.STORE_LISTS)
watch(status, () => {
  window.scrollTo(0, 0)
})

const storeLists = useStorage('store-list', [], localStorage)
const editIdx = ref(0)
const tempEditStoreList = ref()
const tagOptions = computed(() => {
  return [...new Set(storeLists.value.map(storeList => storeList.list.map(store => store.tags).flat()).flat())]
})

const SiteState = {
  status,
  storeLists,
  editIdx,
  tempEditStoreList,
  tagOptions
}

// https://tool.puckwang.com/tools/eatSomething/
// Format:
// [{"name":"咖哩王","remarks":"咖哩,長安"},{"name":"林東芳","remarks":"牛肉麵,八德"}]

export { SiteState }