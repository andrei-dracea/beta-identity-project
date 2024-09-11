<script setup>
import Store from '@/store'

const filters = {
  gender: [
    'Toate identitățile',
    'Femeie Cis',
    'Bărbat Cis',
    'Femeie Trans',
    'Bărbat Trans',
  ],
  orientation: [
    'Toate identitățile',
    'Femeie Cis',
    'Bărbat Cis',
    'Femeie Trans',
    'Bărbat Trans',
  ],
}
</script>

<template>
  <aside id="filters">
    <div class="wrapper">
      <div class="filter-container">
        <label class="label">
          <span>story mode</span>
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
      <div class="filter-container">
        <label class="label"><span>identitatea de gen</span></label>
        <div v-for="(gender, index) of filters.gender" :key="'gender-' + index">
          <label class="checkbox">
            <RadioButton v-model="Store.filterModel.gender" :value="index" />
            <span>{{ gender }}</span>
          </label>
        </div>
      </div>
      <div class="filter-container">
        <label class="label">
          <span>Orientarea sexuală</span>
        </label>
        <div v-for="(gender, index) of filters.gender" :key="'gender-' + index">
          <label class="checkbox">
            <RadioButton
              v-model="Store.filterModel.orientation"
              :value="index"
            />
            <span>{{ gender }}</span>
          </label>
        </div>
      </div>
    </div>
    <footer class="filter-container has-text-right">
      <Button
        type="button"
        label="Resetează legenda"
        icon="pi pi-times"
        severity="secondary"
        text
      />
    </footer>
  </aside>
</template>

<style lang="scss" scoped>
#filters {
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
