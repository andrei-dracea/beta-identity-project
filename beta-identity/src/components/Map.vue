<script setup>
import { onMounted, ref } from 'vue'
import { CRS, LatLngBounds } from 'leaflet'
import { LMap, LImageOverlay } from '@vue-leaflet/vue-leaflet'
import 'leaflet/dist/leaflet.css'
import Store from '@/store'

import mapImageURL from '@/assets/harta_bg.svg'

import overlayURL0 from '@/assets/samples/101.svg'
import overlayURL1 from '@/assets/samples/102.svg'
import overlayURL2 from '@/assets/samples/103.svg'
import overlayURL3 from '@/assets/samples/104.svg'
import overlayURL4 from '@/assets/samples/105.svg'

const mapInstance = ref(null)
const bounds = [
  [0, 0],
  [1008, 670],
]

const options = {
  crs: CRS.Simple,
  minZoom: 1,
  maxZoom: 3,
  zoomDelta: 0.75,
  zoomSnap: 0.75,
  maxBounds: [
    [0, 0],
    [1008, 970],
  ],

  attributionControl: false,
}

const onMapReady = (instance) => {
  instance.fitBounds(bounds)
  instance.setView([500, 420])
  mapInstance.value = instance
}
</script>

<template>
  <l-map ref="map" v-bind="{ options }" @ready="onMapReady">
    <l-image-overlay :url="mapImageURL" v-bind="{ bounds }" />

    <template v-if="Store.filterModel.safe">
      <l-image-overlay
        :url="overlayURL0"
        v-bind="{ bounds, className: 'image-overlay' }"
      />
      <l-image-overlay
        :url="overlayURL1"
        v-bind="{ bounds, className: 'image-overlay' }"
      />
      <l-image-overlay
        :url="overlayURL2"
        v-bind="{ bounds, className: 'image-overlay' }"
      />
      <l-image-overlay
        :url="overlayURL3"
        v-bind="{ bounds, className: 'image-overlay' }"
      />
      <l-image-overlay
        :url="overlayURL4"
        v-bind="{ bounds, className: 'image-overlay' }"
      />
    </template>
  </l-map>
</template>

<style lang="scss" scoped>
.leaflet-container {
  flex: 1;
  background: $white;

  :deep(.image-overlay) {
    mix-blend-mode: multiply;
  }
}
</style>
