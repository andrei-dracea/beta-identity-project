<script setup>
import { onMounted, watch } from 'vue'
import { CRS, map, imageOverlay } from 'leaflet'

import mapData from '@/data/map_data.json'
import Store from '@/store'

import 'leaflet/dist/leaflet.css'
import mapBackground from '@/assets/harta_bg.svg'

const imagePaths = Object.keys(import.meta.glob('@/assets/map_svg/*'))

var heatmap = null
var images = {}

const bounds = [
  [0, 0],
  [720, 1080],
]

const mapOptions = {
  crs: CRS.Simple,
  minZoom: 0,
  maxZoom: 2,
  zoomDelta: 0.25,
  zoomSnap: 0.25,
  maxBounds: bounds,
  attributionControl: false,
}

var mapInstance = null

const preloadImages = async (paths) => {
  const images = {}

  const imagePromises = paths.map((url) => {
    return new Promise((resolve, reject) => {
      const img = new Image()
      const filename = url.split('/').pop()

      images[filename] = img

      img.src = url
      img.onload = () => resolve(img)
      img.onerror = () => reject(new Error(`Failed to load image: ${url}`))
    })
  })

  await Promise.all(imagePromises)
  return images
}

const combineImages = (images) => {
  const canvas = document.createElement('canvas')

  const width = bounds[1][1] * 2
  const height = bounds[1][0] * 2

  canvas.width = width
  canvas.height = height

  const ctx = canvas.getContext('2d')
  ctx.globalCompositeOperation = 'lighten'
  ctx.globalAlpha = 0.8

  images.forEach((image) => {
    ctx.drawImage(image, 0, 0, width, height)
  })

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      resolve(URL.createObjectURL(blob))
    })
  })
}

const draw = async (images) => {
  Store.loading = true

  try {
    const overlay = await combineImages(images)
    if (heatmap) heatmap.remove()

    heatmap = imageOverlay(overlay, bounds, {
      className: 'is-contained',
    }).addTo(mapInstance)
  } finally {
    Store.loading = false
  }
}

onMounted(async () => {
  Store.loading = true
  images = await preloadImages(imagePaths)

  mapInstance = map('map', mapOptions).fitBounds(bounds)
  imageOverlay(mapBackground, bounds).addTo(mapInstance)

  draw(Object.values(images))
})

watch(
  () => Store.filterModel,
  (value) => {
    const filteredImages = []

    mapData.forEach((e) => {
      if (value.gender && value.gender != e.gender) return
      if (value.orientation && value.orientation != e.orientation) return
      if (value.age && value.age != e.age) return

      if (value.safe && e.svg_safe && images[e.svg_safe + '.svg'])
        filteredImages.push(images[e.svg_safe + '.svg'])
      if (value.unsafe && e.svg_unsafe && images[e.svg_unsafe + '.svg'])
        filteredImages.push(images[e.svg_unsafe + '.svg'])
    })

    draw(filteredImages)
  },
  { deep: true }
)
</script>

<template>
  <div id="map" v-show="!Store.isMobile || !Store.stories"></div>
  <div class="is-loading" v-if="Store.loading"></div>
</template>

<style lang="scss" scoped>
.is-loading {
  @extend %overlay;
  position: absolute;
  z-index: 99;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(2px);
  display: flex;
  align-items: center;
  justify-content: center;

  &:after {
    height: 3rem;
    width: 3rem;
    border-width: 2px;
    border-left-color: $black;
    border-bottom-color: $black;
    @extend %loader;
  }
}

.leaflet-container {
  transform: translateZ(0);
  flex: 1;
  background: $white;

  :deep(.is-contained) {
    filter: saturate(110%) contrast(110%);
    object-fit: contain;
    mix-blend-mode: multiply;
  }

  :deep(.leaflet-top.leaflet-left) {
    top: auto;
    bottom: 10px;

    @include desktop {
      left: 280px;
    }
  }

  :deep(.leaflet-control-zoom) {
    display: flex;
    flex-direction: row-reverse;
    gap: 8px;
    border: 0;

    .leaflet-control-zoom-in,
    .leaflet-control-zoom-out {
      border: 0;
      height: 40px;
      width: 40px;
      border-radius: $radius-large;
      background: $grey;
      font-weight: $weight-normal;
      font-size: 28px;
      line-height: 36px;
      text-indent: 0;
    }
  }
}
</style>
