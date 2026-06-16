(() => {
const refs = {
  backButton: document.getElementById("backButton"),
  totalButton: document.getElementById("totalButton"),
  availableButton: document.getElementById("availableButton"),
  legendAvailable: document.getElementById("legendAvailable"),
  totalText: document.getElementById("totalText"),
  soldText: document.getElementById("soldText"),
  availableText: document.getElementById("availableText"),
  rateText: document.getElementById("rateText"),
  analysisDonut: document.getElementById("analysisDonut"),
  legendAvailableText: document.getElementById("legendAvailableText"),
  legendSoldText: document.getElementById("legendSoldText"),
  buildingSalesList: document.getElementById("buildingSalesList"),
  layoutSalesList: document.getElementById("layoutSalesList"),
  trendChart: document.getElementById("trendChart")
};

const HOME_PROJECTS = {
  "home-greenland": { name: "绿地之窗", district: "天府新区", sector: "大源中央", priceText: "420-850万", areaText: "140-280㎡", layout: ["3房2厅2卫 · 142㎡", "4房2厅3卫 · 188㎡", "4房2厅3卫 · 260㎡"], open: "A栋、B栋" },
  "home-jinjiang": { name: "锦江府", district: "锦江区", sector: "望江公园", priceText: "750-1500万", areaText: "220-450㎡", layout: ["4房2厅3卫 · 220㎡", "5房3厅4卫 · 410㎡", "5房3厅4卫 · 450㎡"], open: "1号楼" },
  "home-tianyue": { name: "天樾云庭", district: "武侯区", sector: "武侯大道", priceText: "330-620万", areaText: "105-168㎡", layout: ["3房2厅2卫 · 105㎡", "4房2厅2卫 · 138㎡", "4房2厅2卫 · 168㎡"], open: "6栋、7栋" },
  "home-luhu": { name: "麓湖澜岸", district: "天府新区", sector: "麓湖生态城", priceText: "520-980万", areaText: "155-260㎡", layout: ["4房2厅2卫 · 155㎡", "4房2厅3卫 · 188㎡", "4房2厅3卫 · 260㎡"], open: "3栋、5栋" },
  "home-guanghe": { name: "光合云屿", district: "龙泉驿区", sector: "东安湖", priceText: "185-360万", areaText: "89-128㎡", layout: ["3房2厅1卫 · 89㎡", "3房2厅2卫 · 108㎡", "3房2厅2卫 · 128㎡"], open: "8栋、9栋" },
  "home-qingyun": { name: "青云上城", district: "青羊区", sector: "光华新城", priceText: "288-540万", areaText: "96-143㎡", layout: ["3房2厅2卫 · 96㎡", "3房2厅2卫 · 118㎡", "4房2厅2卫 · 143㎡"], open: "5栋、6栋" }
};

const PROTOTYPE_PROJECTS = {
  p1: { name: "繁花里", district: "邛崃市", priceText: "8301-11667元/㎡", areaText: "68.64-153.53㎡", layout: ["2室2厅1卫 68㎡", "3室2厅2卫 98㎡", "4室2厅2卫 126㎡"], open: "1-7栋" },
  p2: { name: "世邦昆仑府·朴樾", district: "金堂县", priceText: "6488-10764元/㎡", areaText: "79.9-168.31㎡", layout: ["3室2厅2卫 92㎡", "3室2厅2卫 116㎡", "4室2厅2卫 138㎡"], open: "2-11栋" },
  p3: { name: "凯瑞·望丛天序", district: "郫都区", priceText: "14177-37684元/㎡", areaText: "90.91-248.56㎡", layout: ["3室2厅2卫 101㎡", "4室2厅2卫 143㎡", "5室2厅3卫 188㎡"], open: "3-9栋" },
  p4: { name: "中旅·紫金名邸", district: "双流区", priceText: "21340-27726元/㎡", areaText: "114.61-142.74㎡", layout: ["3室2厅2卫 115㎡", "4室2厅2卫 128㎡", "4室2厅2卫 142㎡"], open: "1-6栋" },
  p5: { name: "龙湖天曜", district: "高新区", priceText: "23200-31800元/㎡", areaText: "95-179㎡", layout: ["3室2厅2卫 105㎡", "4室2厅2卫 139㎡", "4室2厅3卫 178㎡"], open: "1-8栋" },
  p6: { name: "城投锦澜台", district: "成华区", priceText: "18800-25800元/㎡", areaText: "84-143㎡", layout: ["2室2厅1卫 84㎡", "3室2厅2卫 108㎡", "4室2厅2卫 136㎡"], open: "2-10栋" }
};

const state = {
  projectId: "",
  model: null
};

function hashString(text) {
  return Array.from(text).reduce((acc, char) => (acc * 33 + char.charCodeAt(0)) % 100000, 11);
}

function pad2(value) {
  return String(value).padStart(2, "0");
}

function parseAreaRange(areaText) {
  const values = (areaText.match(/\d+(?:\.\d+)?/g) || []).map(Number);
  const min = values[0] || 89;
  const max = values[1] || min + 22;
  return { min, max };
}

function parsePriceNumbers(priceText) {
  return (priceText.match(/\d+(?:\.\d+)?/g) || []).map(Number);
}

function normalizeBuildingName(value) {
  const text = String(value || "").trim();
  if (!text) {
    return "";
  }
  return /(栋|楼)$/.test(text) ? text : `${text}栋`;
}

function getBuildingNames(openBuildingsText) {
  const text = String(openBuildingsText || "1栋、2栋").trim();
  const names = [];
  const addSingles = (part) => {
    part.split(/[、,，/]/).map((item) => normalizeBuildingName(item)).filter(Boolean).forEach((item) => names.push(item));
  };
  const rangePattern = /(\d+)\s*(?:-|~|—|至)\s*(\d+)\s*(?:栋|号楼|楼)?/g;
  let lastIndex = 0;
  let match = rangePattern.exec(text);
  while (match) {
    addSingles(text.slice(lastIndex, match.index));
    const start = Number(match[1]);
    const end = Number(match[2]);
    const step = start <= end ? 1 : -1;
    for (let current = start; current !== end + step; current += step) {
      names.push(`${current}栋`);
    }
    lastIndex = rangePattern.lastIndex;
    match = rangePattern.exec(text);
  }
  addSingles(text.slice(lastIndex));
  return [...new Set(names)].length ? [...new Set(names)] : ["1栋", "2栋"];
}

function getStore() {
  return window.ChengduSectorMapData || null;
}

function getProjectId() {
  return new URLSearchParams(window.location.search).get("projectId") || "home-greenland";
}

function getModel(projectId) {
  const home = HOME_PROJECTS[projectId];
  if (home) {
    return { projectId, name: home.name, districtText: home.district, sectorName: home.sector, priceText: home.priceText, areaText: home.areaText, layouts: home.layout, openBuildingsText: home.open };
  }
  const proto = PROTOTYPE_PROJECTS[projectId];
  if (proto) {
    return { projectId, name: proto.name, districtText: proto.district, sectorName: proto.district, priceText: proto.priceText, areaText: proto.areaText, layouts: proto.layout, openBuildingsText: proto.open };
  }
  const storeRecord = getStore()?.findProjectById?.(projectId);
  if (storeRecord) {
    const area = parseAreaRange(storeRecord.project.area);
    const seed = hashString(projectId);
    return {
      projectId,
      name: storeRecord.project.name,
      districtText: storeRecord.sector.shortName || storeRecord.sector.name,
      sectorName: storeRecord.sector.name,
      priceText: storeRecord.project.price,
      areaText: `${area.min}-${area.max}㎡`,
      layouts: [`${area.min}㎡ 三房`, `${Math.round((area.min + area.max) / 2)}㎡ 改善户型`, `${area.max}㎡ 舒适套型`],
      openBuildingsText: `${1 + (seed % 3)}栋、${2 + (seed % 4)}栋`
    };
  }
  return getModel("home-greenland");
}

function getLayoutMeta(layoutText) {
  const areaMatch = layoutText.match(/(\d+(?:\.\d+)?)\s*㎡/);
  const layoutMatch = layoutText.match(/(\d+)\s*[房室][^\s·]*/);
  const area = areaMatch ? Number(areaMatch[1]) : 100;
  const layout = layoutMatch ? layoutMatch[0].replace("室", "房") : "3房";
  const roomType = layout.match(/\d+房/)?.[0] || layout;
  return { area, layout, roomType };
}

function estimateRoomTotalPrice(model, area, certIndex, roomIndex) {
  const values = parsePriceNumbers(model.priceText);
  const offset = certIndex * 0.04 + roomIndex * 0.018;
  if (model.priceText.includes("万") && !model.priceText.includes("元")) {
    const min = values[0] || 180;
    const max = values[1] || min + 180;
    return Math.round(min + (max - min) * Math.min(0.88, 0.18 + offset));
  }
  const unitMin = values[0] || 16000;
  const unitMax = values[1] || unitMin + 5000;
  const unitPrice = unitMin + (unitMax - unitMin) * Math.min(0.86, 0.16 + offset);
  return Math.round((area * unitPrice) / 10000);
}

function buildPresales(model) {
  const seed = hashString(model.projectId);
  const layouts = model.layouts.map(getLayoutMeta);
  const buildingNames = getBuildingNames(model.openBuildingsText);
  return [0, 1].map((certIndex) => {
    const rooms = [];
    buildingNames.forEach((building, buildingIndex) => {
      ["1单元", "2单元"].forEach((unit, unitIndex) => {
        [18, 17, 16, 15].forEach((floor, floorIndex) => {
          [1, 2].forEach((roomSeq) => {
            const layoutMeta = layouts[(buildingIndex + unitIndex + floorIndex + roomSeq + certIndex) % layouts.length];
            const area = Number((layoutMeta.area + ((seed + floor + roomSeq) % 5) * 0.8).toFixed(1));
            const sold = (seed + certIndex + buildingIndex + unitIndex + floor + roomSeq) % 5 === 0;
            rooms.push({
              building,
              unit,
              floor,
              roomNo: `${floor}${pad2(roomSeq)}`,
              area,
              layout: layoutMeta.layout,
              roomType: layoutMeta.roomType,
              totalPrice: estimateRoomTotalPrice(model, area, certIndex, rooms.length),
              status: sold ? "已售" : "在售"
            });
          });
        });
      });
    });
    return { id: `cert-${certIndex + 1}`, rooms };
  });
}

function getRooms() {
  return state.model.presales.flatMap((presale) => presale.rooms);
}

function getSaleStats(rooms) {
  const total = rooms.length;
  const sold = rooms.filter((room) => room.status === "已售").length;
  const available = total - sold;
  const soldRate = total ? Math.round((sold / total) * 10000) / 100 : 0;
  return { total, sold, available, soldRate };
}

function getGroupedStats(rooms, key) {
  return Object.values(rooms.reduce((groups, room) => {
    const name = room[key];
    groups[name] ||= { name, total: 0, sold: 0, available: 0 };
    groups[name].total += 1;
    groups[name][room.status === "已售" ? "sold" : "available"] += 1;
    return groups;
  }, {}));
}

function goOnePrice(status = "") {
  const params = new URLSearchParams({ projectId: state.projectId });
  if (status) {
    params.set("status", status);
  }
  window.location.href = `./project-one-price.html?${params.toString()}`;
}

function renderStatText(ref, count) {
  ref.innerHTML = `${count}<small>套</small>`;
}

function renderProgressBars(ref, groups) {
  const maxTotal = Math.max(1, ...groups.map((group) => group.total));
  ref.innerHTML = groups.map((group) => {
    const availableWidth = Math.max(2, (group.available / maxTotal) * 100);
    const soldWidth = Math.max(group.sold ? 2 : 0, (group.sold / maxTotal) * 100);
    return `
      <button class="analysis-bar-row" data-status="available" type="button" aria-label="查看${group.name}剩余房源">
        <span class="analysis-bar-label">${group.name}</span>
        <span class="analysis-bar-track">
          <i class="analysis-bar-available" style="width:${availableWidth}%"></i>
          <i class="analysis-bar-sold" style="width:${soldWidth}%"></i>
        </span>
        <strong>共${group.total}套/剩余${group.available}套 &gt;</strong>
      </button>
    `;
  }).join("");
}

function renderTrend(seed) {
  const points = Array.from({ length: 12 }, (_, index) => 1 + ((seed + index * 7 + (index % 4) * 11) % 7));
  const max = Math.max(...points);
  const coords = points.map((value, index) => `${24 + index * 30},${176 - (value / max) * 150}`);
  refs.trendChart.innerHTML = `
    <svg viewBox="0 0 380 210" role="img" aria-label="近12月销售趋势">
      <g class="trend-grid">
        <path d="M24 26H356M24 76H356M24 126H356M24 176H356"></path>
      </g>
      <polyline points="${coords.join(" ")}"></polyline>
      ${coords.map((coord) => `<circle cx="${coord.split(",")[0]}" cy="${coord.split(",")[1]}" r="3.4"></circle>`).join("")}
      <text x="22" y="202">2025/06</text>
      <text x="296" y="202">2026/06</text>
    </svg>
  `;
}

function render() {
  const rooms = getRooms();
  const stats = getSaleStats(rooms);
  document.title = `${state.model.name} - 销售情况分析`;
  renderStatText(refs.totalText, stats.total);
  renderStatText(refs.soldText, stats.sold);
  renderStatText(refs.availableText, stats.available);
  refs.rateText.textContent = `${stats.soldRate}%`;
  refs.legendAvailableText.textContent = `${stats.available}(套)`;
  refs.legendSoldText.textContent = `${stats.sold}(套)`;
  refs.analysisDonut.style.setProperty("--sold-rate", `${stats.soldRate}%`);
  refs.analysisDonut.innerHTML = `<strong>${stats.total}</strong><span>总套数</span>`;
  renderProgressBars(refs.buildingSalesList, getGroupedStats(rooms, "building"));
  renderProgressBars(refs.layoutSalesList, getGroupedStats(rooms, "roomType"));
  renderTrend(hashString(state.projectId));
}

function bindEvents() {
  refs.backButton.addEventListener("click", () => {
    window.location.href = `./project-detail.html?projectId=${encodeURIComponent(state.projectId)}`;
  });
  refs.totalButton.addEventListener("click", () => goOnePrice());
  refs.availableButton.addEventListener("click", () => goOnePrice("available"));
  refs.legendAvailable.addEventListener("click", () => goOnePrice("available"));
  document.addEventListener("click", (event) => {
    const row = event.target.closest(".analysis-bar-row[data-status]");
    if (!row) {
      return;
    }
    goOnePrice(row.dataset.status);
  });
}

function init() {
  state.projectId = getProjectId();
  state.model = getModel(state.projectId);
  state.model.presales = buildPresales(state.model);
  render();
  bindEvents();
}

init();
})();
