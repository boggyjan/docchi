<template>
  <div class="main-wrapper">
    <StoreLists v-if="status === PageStatus.STORE_LISTS" />
    <ImportData v-else-if="status === PageStatus.IMPORT" />
    <Random v-else-if="status === PageStatus.PLAY_STORE_LIST" />
    <StoreList v-else-if="status === PageStatus.EDIT_STORE_LIST" />
  </div>
</template>

<script setup lang="ts">
import { PageStatus } from './enums'
import { SiteState } from './hooks'
import StoreLists from './components/StoreLists.vue'
import ImportData from './components/ImportData.vue'
import StoreList from './components/StoreList.vue'
import Random from './components/Random.vue'

const { status, storeLists, editIdx, tempEditStoreList } = SiteState
</script>

<style lang="scss">
@import 'vue-multiselect/dist/vue-multiselect.css';
@import 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0';

:root {
  --card-radius: 0.6rem;
  --form-control-radius: 0.2rem;
  --input-bg: #fff2;
  --input-border: #fff2;
  --input-text: #fff;
  --button-bg: #777;
  --button-border: #777;
  --button-text: #eee;
  --button-bg-primary: #41b883;
  --button-border-primary: #30a671;
  --button-text-primary: #fff;
  --button-bg-danger: #ff6666;
  --button-border-danger: #ff5555;
  --button-text-danger: #fff;
}

html {
  min-height: 100vh;
  background: #111;
  background-image: linear-gradient(0deg, #111c, #111f), url('https://picsum.photos/id/223/1000/1000?blur=10');
  background-size: cover;
  background-position: center center;
  color: #f2f2f2;
  font-size: 16px;
  font-family: sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  // @media (max-width: 575px) {
  //   font-size: 13px;
  // }
}

body {
  margin: 1rem;
}

.material-symbols-outlined {
  font-variation-settings:
    'FILL' 0,
    'wght' 400,
    'GRAD' 0,
    'opsz' 24;
  vertical-align: middle;
  font-size: 1em;
}

hr {
  margin: 1.5rem 0;
  height: 1px;
  border: 0;
  background: #fff2;
}

input,
textarea,
select,
button {
  padding: 0.4rem 1rem;
  outline: none;
  background: var(--input-bg);
  border-radius: var(--form-control-radius);
  border: 1px solid var(--input-border);
  box-sizing: border-box;
  color: var(--input-text);
  font-size: 1rem;
  vertical-align: middle;

  &:hover {
    border-color: color-mix(in srgb, var(--input-border) 100%, #fff 10%);
  }

  &:focus {
    border-color: color-mix(in srgb, var(--input-border) 100%, #fff 20%);
  }
}

textarea {
  width: 100%;
  min-height: 10em;
}

button {
  background: var(--button-bg);
  border: 1px solid var(--button-border);
  color: var(--button-text);

  &:hover {
    background: color-mix(in srgb, var(--button-bg) 100%, transparent 10%);
  }

  &:active {
    background: color-mix(in srgb, var(--button-bg) 100%, transparent 20%);
  }

  & + button {
    margin-left: 0.4rem;
  }
}

button.primary {
  --button-bg: var(--button-bg-primary);
  --button-border: var(--button-border-primary);
  --button-text: var(--button-text-primary);
}

button.danger {
  --button-bg: var(--button-bg-danger);
  --button-border: var(--button-border-danger);
  --button-text: var(--button-text-danger);
}

input[type="radio"],
input[type="checkbox"] {
  padding: 0;
}

label {
  display: inline-block;
  margin-right: 0.5rem;
}

.multiselect {
  min-height: auto;

  &__tags {
    padding: 0.4rem 2rem 0.4rem 0.4rem;
    min-height: auto;
    background: var(--input-bg);
    border: 1px solid var(--input-border);
    border-radius: var(--form-control-radius);
  }

  &__input {
    background: initial;
    border-radius: initial;
    color: var(--input-text);

    &::placeholder {
      color: var(--input-text);
    }
  }

  &__select::before {
    border-color: currentColor transparent transparent transparent;
  }

  &__tags-wrap {
    margin-bottom: -10px;
    display: block;
  }

  &__placeholder {
    margin-bottom: 0;
  }

  &__input {
    margin-top: 10px;
  }
}

.main-wrapper {
  max-width: 1000px;
  margin: 0 auto;
}

.hero {
  padding: 4rem 1rem;
  margin: 1rem 0;
  border-radius: var(--card-radius);
  background-image: linear-gradient(0deg, #765c, #654f), url(https://picsum.photos/id/223/1000/1000);
  background-size: cover;
  background-position: center center;

  & > :where(h1, h2, h3, h4, h5, h6):first-child {
    margin-top: 0;
  }
}

.card {
  padding: 1rem;
  margin: 1rem 0;
  border-radius: var(--card-radius);
  background: #ccc3;

  & > :where(h1, h2, h3, h4, h5, h6):first-child {
    margin-top: 0;
  }
}

.actions {
  text-align: center;
}
</style>
