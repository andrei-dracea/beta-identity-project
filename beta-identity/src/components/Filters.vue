<script setup>
import Store from '@/store'
import filters from '@/data/filters'

const reset = () => {
  Object.assign(Store.filterModel, {
    safe: true,
    unsafe: true,
    gender: 0,
    age: 0,
    orientation: 0,
  })
}
</script>

<template>
  <aside id="filters" v-show="Store.filters">
    <div
      class="filter-container is-flex is-align-items-center is-hidden-desktop"
    >
      <p
        class="has-text-weight-bold is-uppercase mr-auto"
        v-text="$t('filters.title')"
      />

      <Button
        type="button"
        icon="pi pi-times"
        severity="secondary"
        size="large"
        text
        @click="Store.filters = false"
      />
    </div>

    <div class="wrapper">
      <div class="filter-container is-hidden-touch">
        <label class="label">
          <span v-text="$t('filters.stories')" />
          <ToggleSwitch class="is-primary" v-model="Store.stories" />
        </label>
      </div>
      <div class="filter-container">
        <label class="label">
          <span v-text="$t('filters.safe')" />
          <ToggleSwitch class="is-green" v-model="Store.filterModel.safe" />
        </label>
      </div>
      <div class="filter-container">
        <label class="label">
          <span v-text="$t('filters.unsafe')" />
          <ToggleSwitch class="is-red" v-model="Store.filterModel.unsafe" />
        </label>
      </div>
      <div
        class="filter-container"
        v-for="(entry, index) in filters[$i18n.locale]"
      >
        <label class="label"
          ><span>{{ entry.label }}</span></label
        >
        <div v-for="(filter, index_filter) of entry.values">
          <label class="checkbox">
            <RadioButton
              v-model="Store.filterModel[entry.key]"
              :value="index_filter"
            />
            <span>{{ filter }}</span>
          </label>
        </div>
      </div>
    </div>

    <footer class="filter-container has-text-right">
      <Button
        type="button"
        :label="$t('filters.reset')"
        icon="pi pi-times"
        severity="secondary"
        text
        @click="reset"
      />
    </footer>
  </aside>
</template>

<style lang="scss" scoped>
#filters {
  @extend %overlay;
  z-index: 999;
  background: $white;
  border-right: 1px solid $border;
  flex: none;
  display: flex;
  flex-direction: column;

  @include desktop {
    width: 280px;
    right: auto;
  }

  .wrapper {
    overflow: auto;
    flex: 1;
  }

  .filter-container {
    padding: 16px 20px;

    &:not(:last-child) {
      border-bottom: 1px solid $border;
    }

    &:last-child:not(:first-child) {
      border-top: 1px solid $border;
    }

    .checkbox {
      display: flex;
      align-items: center;
      margin-top: 15px;

      span {
        margin-left: 10px;
      }
    }
  }
}
</style>
