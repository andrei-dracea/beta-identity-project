<script setup>
import { computed, onMounted } from 'vue'
import Filters from './components/Filters.vue'
import Map from './components/Map.vue'
import Stories from './components/Stories.vue'
import Store from './store'

import { useMediaQuery } from '@vueuse/core'
import { useI18n } from 'vue-i18n'

const i18n = useI18n()
Store.isMobile = useMediaQuery('(max-width: 768px)')

const locales = i18n.availableLocales.sort((a) => (a == 'ro' ? -1 : 0))

onMounted(() => {
  if (Store.isMobile) {
    Store.stories = false
    Store.filters = false
  }
})

const hasFilters = computed(() => {
  return (
    Store.filterModel.age ||
    Store.filterModel.gender ||
    Store.filterModel.orientation ||
    !Store.filterModel.safe ||
    !Store.filterModel.unsafe
  )
})
</script>

<template>
  <nav class="navbar">
    <img src="@/assets/logo-app.svg" alt="logo app" class="is-hidden-mobile" />

    <a href="https://identity.education/">
      <img src="@/assets/logo.svg" class="nav-logo" alt="logo app" />
    </a>

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

      <a :href="$t('about_link')" class="ml-7">
        <span>{{ $t('about') }}</span>
        <span class="pi pi-arrow-up-right is-size-2 ml-1"></span>
      </a>
    </p>
  </nav>

  <main>
    <div class="button-group is-hidden-desktop">
      <Button
        class="is-mobile"
        :severity="!Store.stories ? 'primary' : 'secondary'"
        :label="$t('map')"
        @click="Store.stories = false"
      />
      <Button
        class="is-mobile"
        :severity="Store.stories ? 'primary' : 'secondary'"
        :label="$t('filters.stories')"
        @click="Store.stories = true"
      />
    </div>

    <div class="filter-toggle is-hidden-desktop" v-show="!Store.stories">
      <Button
        class="is-mobile"
        severity="secondary"
        :label="$t('filters.title')"
        iconPos="right"
        :icon="hasFilters ? 'pi pi-circle-fill' : null"
        rounded
        @click="Store.filters = true"
      />
    </div>

    <Filters v-if="Store.filters" />
    <Map />
    <Stories />
  </main>
</template>

<style lang="scss" scoped>
nav.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 20px;
  border-bottom: 1px solid $border;

  @include tablet {
    padding: 5px 40px;
  }

  .nav-logo {
    display: block;
    width: 100px;

    @include tablet {
      width: 140px;
    }
  }
}

.button-group {
  z-index: 1;
  position: absolute;
  display: flex;
  width: 100%;
  border-bottom: 1px solid $border;

  .p-button {
    flex: 1;
    border-radius: 0;
  }
}

.filter-toggle {
  position: absolute;
  top: 62px;
  z-index: 1;
  width: 100%;
  text-align: center;

  .p-button {
    border: 1px solid $border;
    width: 200px;

    :deep(.pi) {
      font-size: 0.5rem;
      color: $primary;
    }
  }
}

main {
  display: flex;
  position: relative;
}
</style>
