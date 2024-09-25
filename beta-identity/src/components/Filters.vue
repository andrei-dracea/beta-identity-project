<script setup>
import Store from '@/store'
import filters from '@/data/filters'
</script>

<template>
  <aside id="filters">
    <div class="wrapper">
      <div class="filter-container">
        <label class="label">
          <span v-text="$t('filters.stories')" />
          <ToggleSwitch
            class="is-primary"
            v-model="Store.filterModel.stories"
          />
        </label>
      </div>
      <div class="filter-container">
        <label class="label">
          <span>percepție de siguranță</span>
          <ToggleSwitch class="is-green" v-model="Store.filterModel.safe" />
        </label>
      </div>
      <div class="filter-container">
        <label class="label">
          <span>percepție de nesiguranță</span>
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
      />
    </footer>
  </aside>
</template>

<style lang="scss" scoped>
#filters {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 999;
  background: $white;
  border-right: 1px solid $border;
  width: 280px;
  flex: none;
  display: flex;
  flex-direction: column;

  .wrapper {
    overflow: auto;
    flex: 1;
  }

  .filter-container {
    padding: 16px 20px;

    .checkbox {
      display: flex;
      align-items: center;
      margin-top: 15px;

      span {
        margin-left: 10px;
      }
    }

    &:not(:first-child) {
      border-top: 1px solid $border;
    }
  }
}
</style>
