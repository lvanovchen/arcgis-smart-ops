<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import Map from '@arcgis/core/Map.js'
import MapView from '@arcgis/core/views/MapView.js'
import '@arcgis/core/assets/esri/themes/light/main.css'

const mapDiv = ref<HTMLDivElement>()
let view: MapView | null = null

onMounted(() => {
  if (!mapDiv.value) return

  const map = new Map({
    basemap: 'topo-vector',
  })

  view = new MapView({
    container: mapDiv.value,
    map,
    center: [121.4737, 31.2304],
    zoom: 12,
  })
})

onUnmounted(() => {
  view?.destroy()
})
</script>

<template>
  <div class="p-6 h-full flex flex-col">
    <h1 class="text-3xl font-bold text-gray-800 mb-4">地图</h1>
    <p class="text-gray-600 mb-4">ArcGIS Core API 地图展示</p>
    <div ref="mapDiv" class="flex-1 rounded-lg border border-gray-300 min-h-[400px]"></div>
  </div>
</template>
