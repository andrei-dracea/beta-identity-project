<script setup>
import Store from '@/store'
import stories from '@/data/stories'
</script>

<template>
  <div id="stories" v-show="Store.filterModel.stories">
    <div class="wrapper">
      <div class="box has-text-weight-semibold">
        {{ $t('stories_prompt') }}
      </div>
      <div class="box" v-for="(entry, index) in stories[$i18n.locale]">
        <p>{{ entry.story }}</p>
        <p class="mt-5" v-if="entry.author">{{ entry.author }}</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#stories {
  z-index: 999;
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 300px;
  font-weight: $weight-medium;

  .wrapper {
    height: 100%;
    overflow: auto;
    padding: 0 10px 40px 0;
  }

  .box {
    border-radius: 20px;
    padding: 30px 30px 50px;
    background: $primary;
    margin-top: 10px;
  }
}
</style>
