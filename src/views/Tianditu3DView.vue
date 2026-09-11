<script setup lang="ts">
import { onMounted, onUnmounted, ref, shallowRef, watch } from "vue";
import Map from "@arcgis/core/Map.js";
import SceneView from "@arcgis/core/views/SceneView.js";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer.js";
import Graphic from "@arcgis/core/Graphic.js";
import Camera from "@arcgis/core/Camera.js";
import Point from "@arcgis/core/geometry/Point.js";
import "@arcgis/core/assets/esri/themes/light/main.css";
import { createTiandituBaseLayer, createTiandituLabelLayer, getMapBound, type TiandituType } from "../utils/tianditu";

const TIANDITU_KEY = "e6d33e5510e72c75e414aeff0a92ab00";

const sceneDiv = ref<HTMLDivElement>();
const mapTypes = [
  { label: "矢量", value: "vec" as const },
  { label: "影像", value: "img" as const },
  { label: "地形", value: "ter" as const },
];

let view: SceneView | null = null;
let map: Map | null = null;
let baseLayer = createTiandituBaseLayer("img");
let labelLayer = createTiandituLabelLayer("img");
let graphicsLayer: GraphicsLayer | null = null;

const currentType = shallowRef<TiandituType>("img");
const showLabel = ref(true);
const locating = ref(false);
const clickInfo = ref<string | null>(null);

const searchText = ref("");
const searchResults = shallowRef<{ name: string; lonlat: string; address: string }[]>([]);
const showResults = ref(false);
let searchTimer: ReturnType<typeof setTimeout> | null = null;
let hideTimer: ReturnType<typeof setTimeout> | null = null;

function switchMapType(type: TiandituType) {
  if (!map) return;
  currentType.value = type;
  map.remove(baseLayer);
  map.remove(labelLayer);
  baseLayer = createTiandituBaseLayer(type);
  labelLayer = createTiandituLabelLayer(type);
  map.add(baseLayer, 0);
  if (showLabel.value) map.add(labelLayer, 1);
}

function toggleLabel() {
  if (!map) return;
  showLabel.value = !showLabel.value;
  if (showLabel.value) map.add(labelLayer, 1);
  else map.remove(labelLayer);
}

function flyTo(lon: number, lat: number, z: number) {
  view?.goTo(new Camera({
    position: new Point({ longitude: lon, latitude: lat, z }),
    heading: 0,
    tilt: 45,
  }), { duration: 1000 });
}

function locate() {
  if (!view || locating.value) return;
  locating.value = true;
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const { longitude, latitude } = pos.coords;
      flyTo(longitude, latitude, 10000);
      addMarker(longitude, latitude, "当前位置");
      locating.value = false;
    },
    () => { locating.value = false; },
    { enableHighAccuracy: true, timeout: 10000 }
  );
}

function addMarker(lon: number, lat: number, label: string) {
  if (!map) return;
  if (!graphicsLayer) {
    graphicsLayer = new GraphicsLayer();
    map.add(graphicsLayer);
  }
  graphicsLayer.removeAll();
  graphicsLayer.add(new Graphic({
    geometry: { type: "point", longitude: lon, latitude: lat },
    symbol: { type: "simple-marker", color: [0, 122, 255], size: 14, outline: { color: [255, 255, 255], width: 2 } } as any,
  }));
  graphicsLayer.add(new Graphic({
    geometry: { type: "point", longitude: lon, latitude: lat },
    symbol: {
      type: "text", text: label, color: [0, 0, 0],
      font: { size: 12, weight: "bold" }, haloColor: [255, 255, 255], haloSize: 2, yoffset: -20,
    } as any,
  }));
}

function onSearchInput() {
  if (searchTimer) clearTimeout(searchTimer);
  if (!searchText.value.trim()) {
    searchResults.value = [];
    showResults.value = false;
    return;
  }
  searchTimer = setTimeout(fetchSearchResults, 300);
}

watch(searchText, onSearchInput);

async function fetchSearchResults() {
  const keyword = searchText.value.trim();
  if (!keyword) return;

  const mapBound = view && map ? getMapBound(view.extent) : "-180,-90,180,90";
  const postStr = JSON.stringify({ keyWord: keyword, level: 12, mapBound, queryType: 1, start: 0, count: 10 });

  try {
    const res = await fetch(
      `http://api.tianditu.gov.cn/v2/search?postStr=${encodeURIComponent(postStr)}&type=query&tk=${TIANDITU_KEY}`
    );
    const data = await res.json();
    if (Array.isArray(data.pois)) {
      searchResults.value = data.pois.map((p: { name: string; lonlat: string; address?: string }) => ({
        name: p.name,
        lonlat: p.lonlat,
        address: p.address || "",
      }));
      showResults.value = true;
    } else {
      searchResults.value = [];
    }
  } catch {
    searchResults.value = [];
  }
}

function hideResults() {
  if (hideTimer) clearTimeout(hideTimer);
  hideTimer = setTimeout(() => { showResults.value = false; }, 150);
}

function selectResult(item: { name: string; lonlat: string }) {
  const [lon, lat] = item.lonlat.split(",").map(Number);
  if (isNaN(lon) || isNaN(lat)) return;
  flyTo(lon, lat, 8000);
  addMarker(lon, lat, item.name);
  showResults.value = false;
  searchText.value = item.name;
}

function onSearchKeydown(e: KeyboardEvent) {
  if (e.key === "Enter" && searchResults.value.length > 0) {
    selectResult(searchResults.value[0]);
  }
}

onMounted(() => {
  if (!sceneDiv.value) return;
  map = new Map();
  map.ground = "world-elevation";
  map.add(baseLayer, 0);
  map.add(labelLayer, 1);

  view = new SceneView({
    container: sceneDiv.value,
    map,
    camera: {
      position: { longitude: 121.4737, latitude: 31.2304, z: 15000 },
      heading: 0,
      tilt: 45,
    },
  });

  view.on("click", (e) => {
    const point = e.mapPoint;
    if (!point) return;
    const lon = point.longitude?.toFixed(4) ?? "N/A";
    const lat = point.latitude?.toFixed(4) ?? "N/A";
    const scale = view?.scale != null ? view.scale.toFixed(0) : "N/A";
    const zoom = view?.zoom != null ? view.zoom.toFixed(0) : "N/A";
    const camera = view?.camera;
    const heading = camera?.heading != null ? camera.heading.toFixed(0) : "N/A";
    const tilt = camera?.tilt != null ? camera.tilt.toFixed(0) : "N/A";
    const camPos = camera?.position;
    const camLon = camPos?.longitude != null ? camPos.longitude.toFixed(4) : "N/A";
    const camLat = camPos?.latitude != null ? camPos.latitude.toFixed(4) : "N/A";
    const camZ = camPos?.z != null ? camPos.z.toFixed(0) : "N/A";
    clickInfo.value = `坐标: ${lon}, ${lat}\nScale: 1:${scale}\nZoom: ${zoom}\nCameraPos: ${camLon}, ${camLat}, ${camZ}\nHeading: ${heading}\nTilt: ${tilt}`;
  });
});

onUnmounted(() => {
  if (searchTimer) clearTimeout(searchTimer);
  if (hideTimer) clearTimeout(hideTimer);
  view?.destroy();
  view = null;
  map = null;
});
</script>

<template>
  <div class="p-6 h-full flex flex-col">
    <h1 class="text-3xl font-bold text-gray-800 mb-4">天地图 3D</h1>
    <p class="text-gray-600 mb-4">ArcGIS SceneView + 天地图底图 + 地形高程</p>

    <div class="flex gap-4 mb-4 flex-wrap items-center">
      <div class="flex gap-2">
        <button v-for="item in mapTypes" :key="item.value"
          class="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          :class="currentType === item.value ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'"
          @click="switchMapType(item.value)">
          {{ item.label }}
        </button>
      </div>

      <button class="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        :class="showLabel ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'"
        @click="toggleLabel">
        注记: {{ showLabel ? '开' : '关' }}
      </button>

      <button class="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        :class="locating ? 'bg-yellow-400 text-white' : 'bg-purple-500 text-white hover:bg-purple-600'"
        :disabled="locating" @click="locate">
        {{ locating ? '定位中...' : '定位' }}
      </button>

      <div class="relative">
        <input v-model="searchText" type="text" placeholder="搜索地址..."
          class="px-4 py-2 rounded-lg text-sm border border-gray-300 w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
          @keydown="onSearchKeydown" @focus="searchResults.length > 0 && (showResults = true)"
          @blur="hideResults" />
        <div v-if="showResults && searchResults.length > 0"
          class="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
          <div v-for="(item, idx) in searchResults" :key="idx"
            class="px-4 py-2 cursor-pointer hover:bg-blue-50 text-sm border-b border-gray-100 last:border-b-0"
            @mousedown.prevent="selectResult(item)">
            <div class="font-medium text-gray-800">{{ item.name }}</div>
            <div class="text-xs text-gray-500 truncate">{{ item.address }}</div>
          </div>
        </div>
      </div>
    </div>

    <div ref="sceneDiv" class="flex-1 rounded-lg border border-gray-300 min-h-[400px]"></div>
    <p class="text-xs text-gray-400 mt-2">数据来源: 天地图 GS(2023)336号</p>
    <pre class="mt-2 text-xs text-gray-500 break-all" v-if="clickInfo">{{ clickInfo }}</pre>
  </div>
</template>
