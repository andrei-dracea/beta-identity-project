<script setup>
import Filters from './components/Filters.vue'
import Map from './components/Map.vue'
import Stories from './components/Stories.vue'

import { useI18n } from 'vue-i18n'

const i18n = useI18n()

const locales = i18n.availableLocales.sort((a) => (a == 'ro' ? -1 : 0))
</script>

<template>
  <nav class="navbar">
    <img src="@/assets/logo-app.svg" alt="logo app" />
    <img src="@/assets/logo.svg" alt="logo app" />

    <p class="is-size-2 has-text-weight-bold is-uppercase">
      <a
        v-for="locale in locales"
        :key="`locale-${locale}`"
        @click.prevent="$i18n.locale = locale"
        class="ml-3"
        :class="{ 'has-text-grey-dark': $i18n.locale != locale }"
      >
        {{ locale }}
      </a>

      <a href="/" class="ml-7">
        <span>{{ $t('about') }}</span>
        <span class="pi pi-arrow-up-right is-size-2 ml-1"></span>
      </a>
    </p>
  </nav>

  <main>
    <Filters />
    <Map />
    <Stories />
  </main>
</template>

<style lang="scss" scoped>
nav.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 40px;
  border-bottom: 1px solid $border;
}

main {
  display: flex;
  position: relative;
}
</style>
