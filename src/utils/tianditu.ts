import WebTileLayer from "@arcgis/core/layers/WebTileLayer.js";

const TIANDITU_KEY = "e6d33e5510e72c75e414aeff0a92ab00";

type TiandituType = "vec" | "img" | "ter";

const TIANDITU_LAYERS: Record<TiandituType, { base: string; label: string; baseName: string; labelName: string }> = {
  vec: { base: "vec_w", label: "cva_w", baseName: "vec", labelName: "cva" },
  img: { base: "img_w", label: "cia_w", baseName: "img", labelName: "cia" },
  ter: { base: "ter_w", label: "cta_w", baseName: "ter", labelName: "cta" },
};

const TIANDITU_NAMES: Record<TiandituType, string> = {
  vec: "矢量底图",
  img: "影像底图",
  ter: "地形底图",
};

function createTiandituBaseLayer(type: TiandituType): WebTileLayer {
  const cfg = TIANDITU_LAYERS[type];
  return new WebTileLayer({
    urlTemplate: `https://t0.tianditu.gov.cn/${cfg.base}/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=${cfg.baseName}&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${TIANDITU_KEY}`,
    copyright: "天地图 GS(2023)336号",
    title: TIANDITU_NAMES[type],
  });
}

function createTiandituLabelLayer(type: TiandituType): WebTileLayer {
  const cfg = TIANDITU_LAYERS[type];
  return new WebTileLayer({
    urlTemplate: `https://t0.tianditu.gov.cn/${cfg.label}/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=${cfg.labelName}&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${TIANDITU_KEY}`,
    copyright: "天地图 GS(2023)336号",
    title: `${TIANDITU_NAMES[type]}注记`,
  });
}

interface PlainExtent {
  xmin: number;
  ymin: number;
  xmax: number;
  ymax: number;
  spatialReference?: { wkid?: number | null };
}

const EARTH_R = 6378137;
function toLon(x: number): number {
  return (x / EARTH_R) * (180 / Math.PI);
}
function toLat(y: number): number {
  const t = (y / EARTH_R) * (180 / Math.PI);
  return (180 / Math.PI) * (2 * Math.atan(Math.exp((t * Math.PI) / 180)) - Math.PI / 2);
}

export function getMapBound(extent: PlainExtent): string {
  const wkid = extent.spatialReference?.wkid;
  if (wkid === 4326 || wkid === 4490 || wkid === undefined) {
    return `${extent.xmin},${extent.ymin},${extent.xmax},${extent.ymax}`;
  }
  return `${toLon(extent.xmin)},${toLat(extent.ymin)},${toLon(extent.xmax)},${toLat(extent.ymax)}`;
}

export { createTiandituBaseLayer, createTiandituLabelLayer, TIANDITU_NAMES };
export type { TiandituType };
