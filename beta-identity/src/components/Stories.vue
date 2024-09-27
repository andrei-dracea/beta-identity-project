<script setup>
import Store from '@/store'
import stories from '@/data/stories'
</script>

<template>
  <div id="stories" v-show="Store.stories">
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
  left: 10px;
  top: 42px;
  bottom: 0;
  font-weight: $weight-medium;

  @include desktop {
    width: 300px;
    top: 0;
    left: auto;
  }

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
