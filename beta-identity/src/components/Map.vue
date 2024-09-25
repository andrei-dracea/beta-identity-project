<script setup>
import { onMounted, ref } from 'vue'
import { CRS, map, imageOverlay } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import Store from '@/store'

// import { LMap, LImageOverlay } from '@vue-leaflet/vue-leaflet'

import mapBackground from '@/assets/harta_bg.svg'
const imagePaths = Object.keys(import.meta.glob('@/assets/map_svg/*'))

const bounds = [
  [0, 0],
  [1080, 720],
]

const options = {
  crs: CRS.Simple,
  minZoom: 1,
  maxZoom: 3,
  zoomDelta: 0.5,
  zoomSnap: 0.5,
  maxBounds: [
    [0, 0],
    [1080, 720],
  ],
  // zoomControl: false,

  attributionControl: false,
}

const combineImages = (map, images) => {
  var size = map.getSize()
  const canvas = document.createElement('canvas')

  var width = size.x
  var height = size.y

  canvas.width = width
  canvas.height = height

  const ctx = canvas.getContext('2d')
  ctx.globalCompositeOperation = 'multiply'
  ctx.globalAlpha = 1

  for (var i = 0; i < images.length; i++) {
    if (i == 1) ctx.globalAlpha = 0.7
    ctx.drawImage(images[i], 0, 0, width, height)
  }

  return canvas.toDataURL()
}

function loadImages(imageUrls) {
  const images = []

  const imagePromises = imageUrls.map((url) => {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.style.opacity = 0.2
      images.push(img)

      img.src = url
      img.onload = () => resolve(img)
      img.onerror = () => reject(new Error(`Failed to load image: ${url}`))
    })
  })

  return Promise.all(imagePromises).then(() => images)
}

onMounted(async () => {
  const images = await loadImages(imagePaths)

  const mapInstance = map('map', options)
  mapInstance.fitBounds(bounds)

  const mapGraph = combineImages(mapInstance, images)
  // canvasLayer.addTo(mapInstance)

  imageOverlay(mapBackground, bounds).addTo(mapInstance)
  imageOverlay(mapGraph, bounds).addTo(mapInstance)
})
</script>

<template>
  <div id="map"></div>

  <!-- <l-map ref="map" v-bind="{ options }" @ready="onMapReady">
    <l-image-overlay :url="mapImageURL" v-bind="{ bounds }" />

    <template v-if="Store.filterModel.safe">
      <l-image-overlay
        v-for="url in glob"
        :url="url"
        v-bind="{ bounds, className: 'image-overlay' }"
      />
    </template>
  </l-map> -->
</template>

<style lang="scss" scoped>
.leaflet-container {
  // isolation: isolate;
  // transform: translate(0, 0);
  flex: 1;
  background: $white;

  :deep(.image-overlay) {
    // mix-blend-mode: screen;
  }

  :deep(.leaflet-top.leaflet-left) {
    top: auto;
    bottom: 10px;
    left: 280px;
  }
}
</style>
