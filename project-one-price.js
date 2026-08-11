(() => {
const refs = {
  backButton: document.getElementById("backButton"),
  backDetailButton: document.getElementById("backDetailButton"),
  projectName: document.getElementById("projectName"),
  summaryMeta: document.getElementById("summaryMeta"),
  presaleTabs: document.getElementById("presaleTabs"),
  onePriceList: document.getElementById("onePriceList")
};

const state = {
  projectId: "",
  activePresaleId: "",
  statusFilter: "",
  model: null
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

const BUSINESS_PROJECTS = {
  "apartment-tianfu": { category: "apartment", name: "天府国际服务式公寓", district: "高新区", sector: "大源中央", priceText: "45-98万", areaText: "28-58㎡", layout: ["精装公寓 · 28㎡", "舒适公寓 · 42㎡", "一居公寓 · 58㎡"], open: "1栋、2栋" },
  "apartment-global": { category: "apartment", name: "环球中心臻选公寓", district: "高新区", sector: "金融城", priceText: "56-126万", areaText: "35-72㎡", layout: ["精致公寓 · 35㎡", "一居公寓 · 52㎡", "舒适公寓 · 72㎡"], open: "1栋、2栋" },
  "apartment-jinjiang": { category: "apartment", name: "锦江里都会公寓", district: "锦江区", sector: "春熙路", priceText: "48-118万", areaText: "32-65㎡", layout: ["精致公寓 · 32㎡", "一居公寓 · 45㎡", "舒适公寓 · 65㎡"], open: "1栋、2栋" },
  "commercial-tianfu": { category: "commercial", name: "天府国际社区商业", district: "高新区", sector: "大源中央", priceText: "88-175万", areaText: "38-76㎡", layout: ["临街商铺 · 38㎡", "转角商铺 · 56㎡", "餐饮商铺 · 76㎡"], open: "1栋、2栋" },
  "commercial-global": { category: "commercial", name: "环球中心商业中心", district: "高新区", sector: "金融城", priceText: "118-255万", areaText: "45-98㎡", layout: ["临街商铺 · 45㎡", "内街商铺 · 68㎡", "旗舰商铺 · 98㎡"], open: "1栋、2栋" },
  "commercial-jinjiang": { category: "commercial", name: "锦江里·社区底商", district: "锦江区", sector: "春熙路", priceText: "92-186万", areaText: "42-82㎡", layout: ["社区商铺 · 42㎡", "转角商铺 · 60㎡", "临街商铺 · 82㎡"], open: "1栋、2栋" },
  "office-finance-city": { category: "office", name: "金融城智汇中心", district: "高新区", sector: "金融城", priceText: "320-1280万", areaText: "120-520㎡", layout: ["标准办公 · 120㎡", "整层办公 · 280㎡", "总部办公 · 520㎡"], open: "A座、B座" },
  "office-tianfu-software": { category: "office", name: "天府软件园创新中心", district: "高新区", sector: "大源中央", priceText: "260-960万", areaText: "96-380㎡", layout: ["创意办公 · 96㎡", "标准办公 · 180㎡", "整层办公 · 380㎡"], open: "A座、B座" },
  "office-east-station": { category: "office", name: "东客站门户大厦", district: "成华区", sector: "东客站", priceText: "198-760万", areaText: "88-360㎡", layout: ["灵活办公 · 88㎡", "标准办公 · 168㎡", "整层办公 · 360㎡"], open: "A座、B座" }
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
  return /(栋|楼|座)$/.test(text) ? text : `${text}栋`;
}

function getBuildingNames(openBuildingsText) {
  const text = String(openBuildingsText || "1栋、2栋").trim();
  const names = [];
  const addSingles = (part) => {
    part.split(/[、,，/]/)
      .map((item) => normalizeBuildingName(item))
      .filter(Boolean)
      .forEach((item) => names.push(item));
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

function getStatusFilter() {
  return new URLSearchParams(window.location.search).get("status") || "";
}

function getHomeModel(projectId) {
  const project = HOME_PROJECTS[projectId] || HOME_PROJECTS["home-greenland"];
  return {
    projectId,
    name: project.name,
    districtText: project.district,
    sectorName: project.sector,
    priceText: project.priceText,
    areaText: project.areaText,
    layouts: project.layout,
    openBuildingsText: project.open
  };
}

function getPrototypeModel(projectId) {
  const project = PROTOTYPE_PROJECTS[projectId];
  if (!project) {
    return null;
  }
  return {
    projectId,
    name: project.name,
    districtText: project.district,
    sectorName: project.district,
    priceText: project.priceText,
    areaText: project.areaText,
    layouts: project.layout,
    openBuildingsText: project.open
  };
}

function getBusinessModel(projectId) {
  const project = BUSINESS_PROJECTS[projectId];
  if (!project) {
    return null;
  }
  return {
    projectId,
    category: project.category,
    name: project.name,
    districtText: project.district,
    sectorName: project.sector,
    priceText: project.priceText,
    areaText: project.areaText,
    layouts: project.layout,
    openBuildingsText: project.open
  };
}

function getMapModel(projectId) {
  const store = getStore();
  const record = store?.findProjectById?.(projectId);
  if (!record) {
    return null;
  }
  const area = parseAreaRange(record.project.area);
  return {
    projectId,
    name: record.project.name,
    districtText: record.sector.shortName || record.sector.name,
    sectorName: record.sector.name,
    priceText: record.project.price,
    areaText: `${area.min}-${area.max}㎡`,
    layouts: [
      `${area.min}㎡ ${area.min < 100 ? "三房" : "四房"}`,
      `${Math.round((area.min + area.max) / 2)}㎡ 改善户型`,
      `${area.max}㎡ 舒适套型`
    ],
    openBuildingsText: `${1 + (hashString(projectId) % 3)}栋、${2 + (hashString(projectId) % 4)}栋`
  };
}

function getModel(projectId) {
  if (BUSINESS_PROJECTS[projectId]) {
    return getBusinessModel(projectId);
  }
  if (HOME_PROJECTS[projectId]) {
    return getHomeModel(projectId);
  }
  return getPrototypeModel(projectId) || getMapModel(projectId) || getHomeModel(projectId);
}

function getLayoutMeta(layoutText) {
  const areaMatch = layoutText.match(/(\d+(?:\.\d+)?)\s*㎡/);
  const layoutMatch = layoutText.match(/(\d+)\s*[房室][^\s·]*/);
  const area = areaMatch ? Number(areaMatch[1]) : 100;
  const businessLayout = layoutText.split(/[·]/)[0].trim();
  const layout = layoutMatch ? layoutMatch[0].replace("室", "房") : businessLayout || "3房";
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
    const date = `2026-${pad2(3 + certIndex * 3 + (seed % 3))}-${pad2(8 + ((seed + certIndex) % 12))}`;
    const rooms = [];
    const activeBuildings = buildingNames;
    const unitNames = model.category === "commercial" ? ["商铺"] : model.category === "office" ? ["A区", "B区"] : model.category === "apartment" ? ["1单元", "2单元"] : ["1单元", "2单元"];
    const floorNumbers = model.category === "commercial" ? [4, 3, 2, 1] : [18, 17, 16, 15];
    activeBuildings.forEach((building, buildingIndex) => {
      unitNames.forEach((unit, unitIndex) => {
        floorNumbers.forEach((floor, floorIndex) => {
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
    return {
      id: `cert-${certIndex + 1}`,
      no: `蓉预售字第${20260400 + (seed % 300) + certIndex * 37}号`,
      date,
      rooms
    };
  });
}

function getActivePresale() {
  return state.model.presales.find((presale) => presale.id === state.activePresaleId) || state.model.presales[0];
}

function groupRooms(rooms) {
  return rooms.reduce((groups, room) => {
    groups[room.building] ||= {};
    groups[room.building][room.unit] ||= {};
    groups[room.building][room.unit][room.floor] ||= [];
    groups[room.building][room.unit][room.floor].push(room);
    return groups;
  }, {});
}

function renderPresaleTabs() {
  refs.presaleTabs.classList.toggle("is-hidden", state.statusFilter === "available");
  refs.presaleTabs.innerHTML = state.model.presales.map((presale) => `
    <button class="presale-tab ${presale.id === state.activePresaleId ? "is-active" : ""}" data-presale-id="${presale.id}" type="button">
      <strong>${presale.no}</strong>
      <span>取证时间 ${presale.date}</span>
    </button>
  `).join("");
}

function getDisplayLayout(room) {
  const area = Number(room.area || 0);
  const layout = room.layout || "3房2厅2卫";
  if (!/\d+\s*[房室]/.test(layout)) {
    return layout;
  }
  if (/厅|卫/.test(layout)) {
    return layout;
  }
  if (area >= 150) {
    return "2室2厅3卫";
  }
  if (area <= 100) {
    return "2室2厅1卫";
  }
  return "3室2厅2卫";
}

function getUnitPrice(room) {
  const area = Number(room.area || 1);
  return Math.round((Number(room.totalPrice || 0) * 10000) / area);
}

function getRoomListTitle(room) {
  return `${room.building}${room.unit}${room.floor}楼${String(room.roomNo).replace(/^.*?(\d+)$/, "$1")}`;
}

function renderAvailableRoomList() {
  const rooms = state.model.presales
    .flatMap((presale) => presale.rooms)
    .filter((room) => room.status === "在售");
  if (!rooms.length) {
    refs.onePriceList.innerHTML = '<div class="empty-state">暂无可售房源</div>';
    return;
  }
  refs.onePriceList.innerHTML = `
    <div class="available-room-list" aria-label="可售房源列表">
      ${rooms.map((room) => `
        <article class="available-room-item">
          <div class="available-room-main">
            <div class="available-room-title">
              <strong>${getRoomListTitle(room)}</strong>
              <span>多层</span>
            </div>
            <p>${getDisplayLayout(room)}/建面${room.area}㎡</p>
            <p>单价：<b>${getUnitPrice(room)}元/㎡</b></p>
          </div>
          <div class="available-room-side">
            <span>可售</span>
            <strong>${room.totalPrice}万</strong>
          </div>
        </article>
      `).join("")}
    </div>
  `;
}

function renderRooms() {
  if (state.statusFilter === "available") {
    renderAvailableRoomList();
    return;
  }
  const presale = getActivePresale();
  const rooms = presale.rooms;
  const grouped = groupRooms(rooms);
  if (!rooms.length) {
    refs.onePriceList.innerHTML = '<div class="empty-state">当前预售证没有符合条件的房源，请切换预售证查看</div>';
    return;
  }
  const buildingHtml = Object.entries(grouped).map(([building, units]) => {
    const buildingCount = Object.values(units).flatMap((floors) => Object.values(floors).flat()).length;
    const unitEntries = Object.entries(units);
    const unitHtml = unitEntries.map(([unit, floors]) => {
      const floorHtml = Object.entries(floors).sort((left, right) => Number(right[0]) - Number(left[0])).map(([floor, floorRooms]) => `
        <div class="floor-group">
          <span class="floor-title">${floor}层</span>
          <div class="room-grid">
            ${floorRooms.map((room) => `
              <article class="room-card ${room.status === "已售" ? "is-sold" : ""}">
                <div class="room-card__top">
                  <strong>${room.roomNo}号</strong>
                  <span class="room-status">${room.status}</span>
                </div>
                <p class="room-meta">${room.layout} · ${room.area}㎡</p>
                <div class="room-total">${room.totalPrice}万</div>
              </article>
            `).join("")}
          </div>
        </div>
      `).join("");
      return `<div class="unit-group"><h4 class="unit-title">${unit}</h4>${floorHtml}</div>`;
    }).join("");
    return `
      <section class="building-group">
        <div class="building-title"><strong>${building}</strong><span>${buildingCount}套</span></div>
        <div class="building-units ${unitEntries.length === 1 ? "is-single" : ""}">${unitHtml}</div>
      </section>
    `;
  }).join("");
  refs.onePriceList.innerHTML = `<div class="building-scroll" aria-label="楼栋横向列表">${buildingHtml}</div>`;
}

function bindEvents() {
  refs.backButton.addEventListener("click", () => {
    window.location.href = refs.backDetailButton.href;
  });
  const isBusinessProject = Boolean(BUSINESS_PROJECTS[state.projectId]);
  refs.backDetailButton.textContent = isBusinessProject ? "返回项目详情" : "返回楼盘详情";
  refs.backDetailButton.href = `${isBusinessProject ? "./business-project-detail.html" : "./project-detail.html"}?projectId=${encodeURIComponent(state.projectId)}`;
  refs.presaleTabs.addEventListener("click", (event) => {
    const button = event.target.closest("[data-presale-id]");
    if (!button) {
      return;
    }
    state.activePresaleId = button.dataset.presaleId;
    renderPresaleTabs();
    renderRooms();
  });
}

function init() {
  state.projectId = getProjectId();
  state.statusFilter = getStatusFilter();
  document.querySelector(".one-price-page")?.classList.toggle("is-available-list", state.statusFilter === "available");
  const model = getModel(state.projectId);
  model.presales = buildPresales(model);
  state.model = model;
  state.activePresaleId = model.presales[0].id;
  document.title = `${model.name} - 一房一价`;
  if (refs.projectName) {
    refs.projectName.textContent = model.name;
  }
  if (refs.summaryMeta) {
    refs.summaryMeta.innerHTML = `
      <span>${model.districtText}</span>
      <span>${model.sectorName}</span>
      <span>${model.priceText}</span>
      <span>${model.areaText}</span>
    `;
  }
  renderPresaleTabs();
  renderRooms();
  bindEvents();
}

init();
})();
