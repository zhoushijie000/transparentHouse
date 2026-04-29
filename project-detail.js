(() => {
const refs = {
  backButton: document.getElementById("backButton"),
  followButton: document.getElementById("followButton"),
  qrButton: document.getElementById("qrButton"),
  qrModal: document.getElementById("qrModal"),
  qrImage: document.getElementById("qrImage"),
  qrModalTitle: document.getElementById("qrModalTitle"),
  qrModalDesc: document.getElementById("qrModalDesc"),
  qrHint: document.getElementById("qrHint"),
  qrCloseButton: document.getElementById("qrCloseButton"),
  copyLinkButton: document.getElementById("copyLinkButton"),
  contactButton: document.getElementById("contactButton"),
  phonePill: document.getElementById("phonePill"),
  heroImage: document.getElementById("heroImage"),
  heroMedia: document.getElementById("heroMedia"),
  albumButton: document.getElementById("albumButton"),
  albumModal: document.getElementById("albumModal"),
  albumImage: document.getElementById("albumImage"),
  albumModalTitle: document.getElementById("albumModalTitle"),
  albumCaption: document.getElementById("albumCaption"),
  albumCounter: document.getElementById("albumCounter"),
  albumThumbs: document.getElementById("albumThumbs"),
  albumCloseButton: document.getElementById("albumCloseButton"),
  albumPrevButton: document.getElementById("albumPrevButton"),
  albumNextButton: document.getElementById("albumNextButton"),
  detailTabsNav: document.getElementById("detailTabs"),
  mediaTabs: [...document.querySelectorAll("[data-media-kind]")],
  detailTabs: [...document.querySelectorAll("[data-detail-tab]")],
  tabPanels: [...document.querySelectorAll("[data-tab-panel]")],
  statusBadge: document.getElementById("statusBadge"),
  districtText: document.getElementById("districtText"),
  summaryDistrict: document.getElementById("summaryDistrict"),
  projectName: document.getElementById("projectName"),
  tagList: document.getElementById("tagList"),
  introText: document.getElementById("introText"),
  priceLabel: document.getElementById("priceLabel"),
  priceText: document.getElementById("priceText"),
  infoRows: document.getElementById("infoRows"),
  addressText: document.getElementById("addressText"),
  layoutTypeFilters: document.getElementById("layoutTypeFilters"),
  layoutPlanList: document.getElementById("layoutPlanList"),
  salesTotalText: document.getElementById("salesTotalText"),
  salesSoldText: document.getElementById("salesSoldText"),
  salesAvailableText: document.getElementById("salesAvailableText"),
  salesRateText: document.getElementById("salesRateText"),
  clearTimeText: document.getElementById("clearTimeText"),
  salesDonut: document.getElementById("salesDonut"),
  legendAvailableText: document.getElementById("legendAvailableText"),
  legendSoldText: document.getElementById("legendSoldText"),
  newsTimeline: document.getElementById("newsTimeline"),
  projectIntroLong: document.getElementById("projectIntroLong"),
  supportMap: document.getElementById("supportMap"),
  supportTabs: document.getElementById("supportTabs"),
  supportList: document.getElementById("supportList"),
  onePriceSummary: document.getElementById("onePriceSummary"),
  onePriceList: document.getElementById("onePriceList")
};

const state = {
  followed: false,
  projectId: "",
  mediaKind: "effect",
  activeDetailTab: "basic",
  activeLayoutType: "all",
  activeSupportType: "education",
  activeAlbumIndex: 0,
  model: null
};

const EFFECT_IMAGES = [
  "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80"
];

const HOME_PROJECTS = {
  "home-greenland": {
    id: "home-greenland",
    name: "绿地之窗",
    district: "天府新区",
    sector: "大源中央",
    priceText: "420-850万",
    priceLabel: "参考总价",
    areaText: "140-280㎡",
    tags: ["容积率4.0", "精装修"],
    layout: ["3房2厅2卫 · 142㎡", "4房2厅3卫 · 188㎡", "4房2厅3卫 · 260㎡"],
    open: "A栋、B栋",
    stock: 12,
    intro: "项目位于天府新区，兼顾大面宽改善与城市通勤，适合关注南门核心配套的家庭。",
    decoration: "精装",
    ladder: "2梯4户"
  },
  "home-jinjiang": {
    id: "home-jinjiang",
    name: "锦江府",
    district: "锦江区",
    sector: "望江公园",
    priceText: "750-1500万",
    priceLabel: "参考总价",
    areaText: "220-450㎡",
    tags: ["容积率2.2", "精装修"],
    layout: ["4房2厅3卫 · 220㎡", "5房3厅4卫 · 410㎡", "5房3厅4卫 · 450㎡"],
    open: "1号楼",
    stock: 4,
    intro: "主打锦江生活界面和大平层尺度，适合重视城市核心资源与江景视野的改善客群。",
    decoration: "精装",
    ladder: "2梯2户"
  },
  "home-tianyue": {
    id: "home-tianyue",
    name: "天樾云庭",
    district: "武侯区",
    sector: "武侯大道",
    priceText: "330-620万",
    priceLabel: "参考总价",
    areaText: "105-168㎡",
    tags: ["容积率1.8", "清水房"],
    layout: ["3房2厅2卫 · 105㎡", "4房2厅2卫 · 138㎡", "4房2厅2卫 · 168㎡"],
    open: "6栋、7栋",
    stock: 18,
    intro: "低密住区结合轨道交通和公园资源，适合首改与改善家庭关注。",
    decoration: "清水",
    ladder: "2梯2户"
  },
  "home-luhu": {
    id: "home-luhu",
    name: "麓湖澜岸",
    district: "天府新区",
    sector: "麓湖生态城",
    priceText: "520-980万",
    priceLabel: "参考总价",
    areaText: "155-260㎡",
    tags: ["容积率1.5", "精装修"],
    layout: ["4房2厅2卫 · 155㎡", "4房2厅3卫 · 188㎡", "4房2厅3卫 · 260㎡"],
    open: "3栋、5栋",
    stock: 9,
    intro: "以湖区景观和低密社区体验为核心，适合重视居住舒适度的改善家庭。",
    decoration: "精装",
    ladder: "2梯3户"
  },
  "home-guanghe": {
    id: "home-guanghe",
    name: "光合云屿",
    district: "龙泉驿区",
    sector: "东安湖",
    priceText: "185-360万",
    priceLabel: "参考总价",
    areaText: "89-128㎡",
    tags: ["容积率2.5", "清水房"],
    layout: ["3房2厅1卫 · 89㎡", "3房2厅2卫 · 108㎡", "3房2厅2卫 · 128㎡"],
    open: "8栋、9栋",
    stock: 26,
    intro: "总价门槛更友好，兼顾湖区资源和日常通勤，适合年轻家庭上车。",
    decoration: "清水",
    ladder: "2梯6户"
  },
  "home-qingyun": {
    id: "home-qingyun",
    name: "青云上城",
    district: "青羊区",
    sector: "光华新城",
    priceText: "288-540万",
    priceLabel: "参考总价",
    areaText: "96-143㎡",
    tags: ["容积率2.8", "精装修"],
    layout: ["3房2厅2卫 · 96㎡", "3房2厅2卫 · 118㎡", "4房2厅2卫 · 143㎡"],
    open: "5栋、6栋",
    stock: 21,
    intro: "成熟居住板块叠加双地铁通勤，适合关注主城生活便利度的家庭。",
    decoration: "精装",
    ladder: "2梯4户"
  }
};

const PROTOTYPE_PROJECTS = {
  p1: { id: "p1", name: "繁花里", district: "邛崃市", priceMin: 8301, priceMax: 11667, areaMin: 68.64, areaMax: 153.53, tags: ["清水", "住宅", "容积率1.5"], signed30: 286, stock: 286, total: 445, record: "8301~11667元/㎡", open: "1-7栋", layout: ["2室2厅1卫 68㎡", "3室2厅2卫 98㎡", "4室2厅2卫 126㎡"], intro: "项目位于邛崃主城片区，兼顾刚需与改善，生活配套成熟。", deco: "clear" },
  p2: { id: "p2", name: "世邦昆仑府·朴樾", district: "金堂县", priceMin: 6488, priceMax: 10764, areaMin: 79.9, areaMax: 168.31, tags: ["清水", "低密", "容积率2.25"], signed30: 161, stock: 161, total: 312, record: "6488~10764元/㎡", open: "2-11栋", layout: ["3室2厅2卫 92㎡", "3室2厅2卫 116㎡", "4室2厅2卫 138㎡"], intro: "项目强调景观与舒适度，多面积段可选。", deco: "clear" },
  p3: { id: "p3", name: "凯瑞·望丛天序", district: "郫都区", priceMin: 14177, priceMax: 37684, areaMin: 90.91, areaMax: 248.56, tags: ["清水", "精装", "容积率2.0"], signed30: 109, stock: 109, total: 260, record: "14177~37684元/㎡", open: "3-9栋", layout: ["3室2厅2卫 101㎡", "4室2厅2卫 143㎡", "5室2厅3卫 188㎡"], intro: "改善型定位，近产业区和教育配套。", deco: "refined" },
  p4: { id: "p4", name: "中旅·紫金名邸", district: "双流区", priceMin: 21340, priceMax: 27726, areaMin: 114.61, areaMax: 142.74, tags: ["清水", "住宅", "容积率1.5"], signed30: 120, stock: 120, total: 220, record: "21340~27726元/㎡", open: "1-6栋", layout: ["3室2厅2卫 115㎡", "4室2厅2卫 128㎡", "4室2厅2卫 142㎡"], intro: "双流主城板块，低密居住社区。", deco: "clear" },
  p5: { id: "p5", name: "龙湖天曜", district: "高新区", priceMin: 23200, priceMax: 31800, areaMin: 95, areaMax: 179, tags: ["精装", "地铁沿线", "容积率2.2"], signed30: 428, stock: 96, total: 398, record: "23200~31800元/㎡", open: "1-8栋", layout: ["3室2厅2卫 105㎡", "4室2厅2卫 139㎡", "4室2厅3卫 178㎡"], intro: "高新区核心居住片区，改善产品为主。", deco: "refined" },
  p6: { id: "p6", name: "城投锦澜台", district: "成华区", priceMin: 18800, priceMax: 25800, areaMin: 84, areaMax: 143, tags: ["清水", "准现房", "容积率1.8"], signed30: 176, stock: 143, total: 360, record: "18800~25800元/㎡", open: "2-10栋", layout: ["2室2厅1卫 84㎡", "3室2厅2卫 108㎡", "4室2厅2卫 136㎡"], intro: "生活与商业配套成熟，覆盖首置和改善客群。", deco: "clear" }
};
function getStore() {
  return window.ChengduSectorMapData || null;
}

function getQueryProjectId() {
  return new URLSearchParams(window.location.search).get("projectId") || "";
}

function getBackUrl() {
  const raw = new URLSearchParams(window.location.search).get("from");
  if (!raw) {
    return "";
  }
  try {
    const url = new URL(raw, window.location.href);
    return url.origin === window.location.origin ? url.toString() : "";
  } catch (_error) {
    return "";
  }
}

function hasSameOriginReferrer() {
  if (!document.referrer) {
    return false;
  }
  try {
    return new URL(document.referrer).origin === window.location.origin;
  } catch (_error) {
    return false;
  }
}

function hashString(text) {
  return Array.from(text).reduce((acc, char) => (acc * 33 + char.charCodeAt(0)) % 100000, 11);
}

function pad2(value) {
  return String(value).padStart(2, "0");
}

function num(value) {
  return Number(value).toLocaleString("zh-CN");
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

function buildPhone(seed) {
  const suffix = String(1000 + (seed % 8000)).padStart(4, "0");
  return `400-811-${suffix}`;
}

function buildDirectDetailUrl(projectId) {
  const url = new URL(window.location.href);
  url.searchParams.set("projectId", projectId);
  url.hash = "";
  return url.toString();
}

function buildQrImageUrl(targetUrl) {
  return `https://api.qrserver.com/v1/create-qr-code/?size=280x280&margin=0&data=${encodeURIComponent(targetUrl)}`;
}

function isLocalHost() {
  return window.location.hostname === "127.0.0.1" || window.location.hostname === "localhost";
}

function getDefaultProjectId() {
  const homeProjectId = Object.keys(HOME_PROJECTS)[0];
  const store = getStore();
  if (!store || !Array.isArray(store.sectors)) {
    return homeProjectId;
  }
  for (const sector of store.sectors) {
    if (sector.projects && sector.projects.length) {
      return sector.projects[0].id;
    }
  }
  return homeProjectId;
}

function findProjectRecord(projectId) {
  if (HOME_PROJECTS[projectId]) {
    return { type: "home", project: HOME_PROJECTS[projectId] };
  }
  if (PROTOTYPE_PROJECTS[projectId]) {
    return { type: "prototype", project: PROTOTYPE_PROJECTS[projectId] };
  }
  const store = getStore();
  if (!store || typeof store.findProjectById !== "function") {
    return null;
  }
  const record = store.findProjectById(projectId);
  return record ? { type: "map", ...record } : null;
}

function normalizeOpenBuildings(open) {
  return open.replace(/-/g, "、");
}

function baseModelExtras(id, openMonthOffset = 0) {
  const seed = hashString(id);
  const openMonth = 4 + ((seed + openMonthOffset) % 7);
  const deliveryMonth = 5 + (seed % 6);
  return {
    seed,
    phone: buildPhone(seed),
    openTimeText: `2026年${pad2(openMonth)}月`,
    deliveryText: `2028年${pad2(deliveryMonth)}月`
  };
}
function buildHomeDetailModel(project) {
  const extra = baseModelExtras(project.id);
  const totalHomes = project.stock * 8 + 128 + (extra.seed % 36);
  const parkingSpaces = Math.round(totalHomes * 1.08);
  return {
    projectId: project.id,
    name: project.name,
    districtText: project.district,
    sectorName: project.sector,
    status: "在售",
    tags: project.tags,
    introText: project.intro,
    priceLabel: project.priceLabel,
    priceText: project.priceText,
    signed30Text: "以网签为准",
    stockText: `${project.stock}套`,
    areaText: project.areaText,
    openBuildingsText: project.open,
    openTimeText: extra.openTimeText,
    deliveryText: extra.deliveryText,
    totalHomesText: `${totalHomes}`,
    parkingText: `${parkingSpaces}`,
    decorationText: project.decoration,
    ladderText: project.ladder,
    addressText: `${project.district} · ${project.sector} · ${project.name}营销中心`,
    phone: extra.phone,
    layouts: project.layout,
    infoRows: [
      ["项目名称", project.name],
      ["所属区域", project.district],
      ["所属板块", project.sector],
      [project.priceLabel, project.priceText],
      ["主力面积", project.areaText],
      ["在售套数", `${project.stock}套`],
      ["开盘时间", extra.openTimeText],
      ["开盘楼栋", project.open],
      ["预计交房", extra.deliveryText],
      ["总户数", `${totalHomes}户`],
      ["车位数", `${parkingSpaces}`],
      ["装修标准", project.decoration],
      ["梯户比", project.ladder],
      ["主力户型", project.layout.join(" / ")],
      ["项目亮点", project.tags.join(" · ")],
      ["咨询电话", extra.phone]
    ],
    qrTitle: `${project.name} 项目二维码`,
    qrDesc: `扫码可直接打开 ${project.name} 详情`
  };
}

function buildPrototypeDetailModel(project) {
  const extra = baseModelExtras(project.id, 1);
  const decoration = project.deco === "refined" ? "精装" : "清水";
  const ladder = project.priceMax >= 23000 ? "2T2、2T3" : "2T3、2T4";
  const areaText = `${Math.round(project.areaMin)}-${Math.round(project.areaMax)}㎡`;
  const parkingSpaces = Math.round(project.total * 1.08);
  const openBuildingsText = normalizeOpenBuildings(project.open);
  return {
    projectId: project.id,
    name: project.name,
    districtText: project.district,
    sectorName: project.district,
    status: "在售",
    tags: project.tags,
    introText: project.intro,
    priceLabel: "参考单价",
    priceText: project.record,
    signed30Text: `${project.signed30}套`,
    stockText: `${project.stock}套`,
    areaText,
    openBuildingsText,
    openTimeText: extra.openTimeText,
    deliveryText: extra.deliveryText,
    totalHomesText: `${project.total}`,
    parkingText: `${parkingSpaces}`,
    decorationText: decoration,
    ladderText: ladder,
    addressText: `${project.district} · ${project.name}营销中心`,
    phone: extra.phone,
    layouts: project.layout,
    infoRows: [
      ["项目名称", project.name],
      ["所属区域", project.district],
      ["参考单价", project.record],
      ["主力面积", areaText],
      ["开盘时间", extra.openTimeText],
      ["开盘楼栋", project.open],
      ["预计交房", extra.deliveryText],
      ["总户数", `${project.total}户`],
      ["在售套数", `${project.stock}套`],
      ["近30天网签", `${project.signed30}套`],
      ["车位数", `${parkingSpaces}`],
      ["装修标准", decoration],
      ["梯户比", ladder],
      ["主力户型", project.layout.join(" / ")],
      ["项目亮点", project.tags.join(" · ")],
      ["咨询电话", extra.phone]
    ],
    qrTitle: `${project.name} 项目二维码`,
    qrDesc: `扫码可直接打开 ${project.name} 详情`
  };
}

function buildMapDetailModel(record) {
  const { sector, project } = record;
  const extra = baseModelExtras(project.id, 2);
  const area = parseAreaRange(project.area);
  const priceValue = parsePriceNumbers(project.price)[0] || 22000;
  const totalHomes = 98 + (extra.seed % 8) * 16;
  const parkingSpaces = Math.round(totalHomes * (1.08 + (extra.seed % 3) * 0.12));
  const ladder = sector.tier === "core" ? "2T2、2T3" : sector.tier === "quality" ? "2T3、2T4" : "2T4、2T5";
  const plotRatio = (1.8 + (extra.seed % 7) * 0.2).toFixed(1);
  const decoration = project.tags.includes("精装") ? "精装" : project.tags.includes("清水") ? "清水" : sector.tier === "core" ? "精装" : "清水";
  const buildingType = project.tags.includes("小高层") ? "小高层" : project.tags.includes("洋房") ? "洋房" : sector.tier === "outer" ? "小高层" : "高层";
  const openBuildingsText = `${1 + (extra.seed % 3)}栋、${2 + (extra.seed % 4)}栋`;
  return {
    projectId: project.id,
    name: project.name,
    districtText: sector.shortName || sector.name,
    sectorName: sector.name,
    status: project.status,
    tags: [`容积率${plotRatio}`, buildingType, decoration, ...project.tags.slice(0, 2)],
    introText: project.intro,
    priceLabel: "参考单价",
    priceText: project.price,
    signed30Text: "以网签为准",
    stockText: project.status,
    areaText: `${area.min}-${area.max}㎡`,
    openBuildingsText,
    openTimeText: extra.openTimeText,
    deliveryText: extra.deliveryText,
    totalHomesText: `${totalHomes}`,
    parkingText: `${parkingSpaces}`,
    decorationText: decoration,
    ladderText: ladder,
    addressText: `${sector.name} · ${project.name}营销中心`,
    phone: extra.phone,
    layouts: [
      `${area.min}㎡ ${area.min < 100 ? "三房" : "四房"}`,
      `${Math.round((area.min + area.max) / 2)}㎡ 改善户型`,
      `${area.max}㎡ 舒适套型`
    ],
    infoRows: [
      ["项目名称", project.name],
      ["所属板块", sector.name],
      ["参考单价", project.price],
      ["主力面积", `${area.min}-${area.max}㎡`],
      ["开盘时间", extra.openTimeText],
      ["开盘楼栋", openBuildingsText],
      ["预计交房", extra.deliveryText],
      ["总户数", `${totalHomes}户`],
      ["车位数", `${parkingSpaces}`],
      ["装修标准", decoration],
      ["梯户比", ladder],
      ["容积率", plotRatio],
      ["主力客群", sector.audience],
      ["板块特点", sector.focus],
      ["咨询电话", extra.phone],
      ["参考总价", `约${num(Math.round((area.min * priceValue) / 10000))}万起`]
    ],
    qrTitle: `${project.name} 项目二维码`,
    qrDesc: `扫码可直接打开 ${project.name} 详情`
  };
}

function buildModel(record) {
  if (record.type === "home") {
    return buildHomeDetailModel(record.project);
  }
  if (record.type === "prototype") {
    return buildPrototypeDetailModel(record.project);
  }
  return buildMapDetailModel(record);
}
function getLayoutMeta(layoutText) {
  const areaMatch = layoutText.match(/(\d+(?:\.\d+)?)\s*㎡/);
  const layoutMatch = layoutText.match(/(\d+)\s*[房室][^\s·]*/);
  const chineseLayoutMatch = layoutText.match(/([一二三四五六七八九])房/);
  const chineseRoomNumbers = {
    一: 1,
    二: 2,
    三: 3,
    四: 4,
    五: 5,
    六: 6,
    七: 7,
    八: 8,
    九: 9
  };
  const area = areaMatch ? Number(areaMatch[1]) : 100;
  const roomType = layoutMatch
    ? `${layoutMatch[1]}房`
    : chineseLayoutMatch
      ? `${chineseRoomNumbers[chineseLayoutMatch[1]]}房`
      : "3房";
  const layout = layoutMatch ? layoutMatch[0].replace("室", "房") : roomType;
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
  const buildingNames = (model.openBuildingsText || "1栋、2栋").split(/[、,，]/).map((item) => item.trim()).filter(Boolean);
  const certDates = [
    `2026-${pad2(3 + (seed % 3))}-${pad2(8 + (seed % 12))}`,
    `2026-${pad2(6 + (seed % 3))}-${pad2(10 + (seed % 10))}`
  ];

  return certDates.map((date, certIndex) => {
    const buildings = buildingNames.slice(certIndex, certIndex + 2);
    const activeBuildings = buildings.length ? buildings : buildingNames.slice(0, 1);
    const rooms = [];

    activeBuildings.forEach((building, buildingIndex) => {
      ["1单元", "2单元"].forEach((unit, unitIndex) => {
        [18, 17, 16].forEach((floor, floorIndex) => {
          [1, 2].forEach((roomSeq) => {
            const layoutMeta = layouts[(buildingIndex + unitIndex + floorIndex + roomSeq + certIndex) % layouts.length];
            const area = Number((layoutMeta.area + ((seed + floor + roomSeq) % 5) * 0.8).toFixed(1));
            const totalPrice = estimateRoomTotalPrice(model, area, certIndex, rooms.length);
            const sold = (seed + certIndex + buildingIndex + unitIndex + floor + roomSeq) % 5 === 0;
            rooms.push({
              id: `${certIndex}-${building}-${unit}-${floor}-${roomSeq}`,
              building,
              unit,
              floor,
              roomNo: `${floor}${pad2(roomSeq)}`,
              area,
              layout: layoutMeta.layout,
              roomType: layoutMeta.roomType,
              totalPrice,
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

function buildPlanImage(model) {
  const seed = hashString(model.projectId);
  const colors = ["#d7e3ff", "#cfe8dc", "#ffe2c7", "#e8eef6"];
  const main = colors[seed % colors.length];
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="900" height="620" viewBox="0 0 900 620">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop stop-color="#eef5fb"/><stop offset="1" stop-color="#ffffff"/>
      </linearGradient>
      <filter id="s" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="10" stdDeviation="16" flood-color="#16304f" flood-opacity=".14"/></filter>
    </defs>
    <rect width="900" height="620" fill="url(#bg)"/>
    <path d="M70 470 C230 360 320 510 480 400 S700 310 830 430" fill="none" stroke="#b9d0ef" stroke-width="30" stroke-linecap="round"/>
    <path d="M64 158 C238 68 414 64 612 116 C721 145 790 195 832 262 L768 520 L118 522 Z" fill="${main}" stroke="#9cb9dd" stroke-width="4"/>
    <g filter="url(#s)">
      <rect x="174" y="172" width="94" height="142" rx="16" fill="#ffffff"/>
      <rect x="324" y="138" width="112" height="178" rx="18" fill="#ffffff"/>
      <rect x="504" y="182" width="96" height="146" rx="16" fill="#ffffff"/>
      <rect x="640" y="256" width="88" height="122" rx="15" fill="#ffffff"/>
    </g>
    <g fill="#00325b" font-family="Arial, sans-serif" font-weight="700">
      <text x="198" y="252" font-size="34">1#</text>
      <text x="362" y="236" font-size="34">2#</text>
      <text x="532" y="264" font-size="34">3#</text>
      <text x="664" y="326" font-size="32">4#</text>
    </g>
    <circle cx="430" cy="420" r="54" fill="#67cc35" opacity=".72"/>
    <circle cx="518" cy="418" r="34" fill="#67cc35" opacity=".58"/>
    <text x="54" y="74" fill="#00325b" font-family="Arial, sans-serif" font-size="34" font-weight="800">${model.name} 总平图</text>
    <text x="54" y="112" fill="#4e6073" font-family="Arial, sans-serif" font-size="22">${model.sectorName} · 楼栋分布示意</text>
  </svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function buildLocationImage(model) {
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="900" height="620" viewBox="0 0 900 620">
    <rect width="900" height="620" fill="#edf3fa"/>
    <g stroke-linecap="round" fill="none">
      <path d="M-20 238 C160 186 260 242 394 196 S620 92 936 120" stroke="#20c77a" stroke-width="18"/>
      <path d="M-30 300 C190 258 310 310 490 270 S690 230 930 278" stroke="#20c77a" stroke-width="12"/>
      <path d="M96 -20 C156 128 152 262 214 380 S330 520 394 650" stroke="#ff6868" stroke-width="9"/>
      <path d="M660 -30 C622 140 640 268 586 418 S490 536 478 650" stroke="#ff6868" stroke-width="9"/>
      <path d="M-20 420 L920 210" stroke="#c8d2de" stroke-width="7"/>
      <path d="M120 620 L812 -20" stroke="#c8d2de" stroke-width="7"/>
    </g>
    <g fill="#a7b4c4" font-family="Arial, Microsoft YaHei, sans-serif" font-size="30" font-weight="700">
      <text x="120" y="154">青羊区</text>
      <text x="650" y="174">桃源社区</text>
      <text x="600" y="360">成华区</text>
      <text x="176" y="424">城市主干道</text>
    </g>
    <g>
      <rect x="286" y="210" width="328" height="72" rx="36" fill="#3b73f2"/>
      <text x="450" y="257" text-anchor="middle" fill="#fff" font-family="Arial, Microsoft YaHei, sans-serif" font-size="34" font-weight="800">${model.name}</text>
      <path d="M450 284 C492 284 526 318 526 360 C526 416 450 478 450 478 C450 478 374 416 374 360 C374 318 408 284 450 284Z" fill="#ff3434"/>
      <circle cx="450" cy="356" r="20" fill="#fff"/>
    </g>
  </svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function buildSupportItems(model) {
  return {
    education: [
      { icon: "学", title: `${model.sectorName}第一小学`, desc: "约850m，日常接送半径友好", x: 18, y: 24 },
      { icon: "幼", title: "社区幼儿园", desc: "约520m，覆盖低龄家庭需求", x: 66, y: 28 },
      { icon: "中", title: "片区中学", desc: "约1.6km，教育配套持续完善", x: 22, y: 66 }
    ],
    traffic: [
      { icon: "轨", title: "轨道交通站点", desc: "约900m，可衔接主城通勤", x: 16, y: 30 },
      { icon: "路", title: "城市主干道", desc: "约300m，快速接驳环线", x: 70, y: 38 },
      { icon: "停", title: "公共停车场", desc: "约650m，访客停车更便利", x: 28, y: 72 }
    ],
    park: [
      { icon: "园", title: "城市公园", desc: "约700m，满足日常散步休闲", x: 20, y: 28 },
      { icon: "水", title: "滨水绿道", desc: "约1.1km，慢跑骑行友好", x: 68, y: 30 },
      { icon: "景", title: "社区景观轴", desc: "约260m，提升归家体验", x: 30, y: 70 }
    ],
    commerce: [
      { icon: "商", title: "生活超市", desc: "约420m，覆盖日常采买", x: 18, y: 26 },
      { icon: "购", title: "集中商业", desc: "约1.4km，餐饮购物集中", x: 70, y: 32 },
      { icon: "街", title: "社区底商", desc: "约180m，早餐药房便利", x: 34, y: 72 }
    ],
    medical: [
      { icon: "医", title: "社区卫生服务中心", desc: "约780m，基础医疗便利", x: 20, y: 30 },
      { icon: "院", title: "综合医院", desc: "约2.8km，覆盖综合诊疗", x: 70, y: 34 },
      { icon: "药", title: "连锁药房", desc: "约260m，日常购药方便", x: 30, y: 72 }
    ]
  };
}

function buildAlbumImages(model) {
  const start = hashString(model.projectId) % EFFECT_IMAGES.length;
  const effectLabels = ["效果图", "景观图", "社区实景图"];
  const effects = effectLabels.map((title, index) => ({
    title,
    type: "effect",
    src: EFFECT_IMAGES[(start + index) % EFFECT_IMAGES.length]
  }));
  return [
    ...effects,
    {
      title: "总平图",
      type: "plan",
      src: model.heroImages.plan
    },
    {
      title: "户型图",
      type: "layout",
      src: model.heroImages.layout
    },
    {
      title: "区位图",
      type: "location",
      src: model.heroImages.location
    },
    {
      title: "实景图",
      type: "real",
      src: model.heroImages.real
    }
  ];
}

function escapeSvgText(text) {
  return String(text).replace(/[&<>]/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;"
  }[char]));
}

function getLayoutFeature(roomType, area) {
  const roomCount = Number(roomType.match(/\d+/)?.[0]) || 3;
  if (roomCount >= 5) {
    return "多代同堂";
  }
  if (roomCount >= 4 && area >= 160) {
    return "大面宽改善";
  }
  if (roomCount >= 4) {
    return "改善四房";
  }
  if (area <= 100) {
    return "紧凑实用";
  }
  return "舒适三房";
}

function buildLayoutPlanImage(model, meta, index) {
  const roomCount = Number(meta.roomType.match(/\d+/)?.[0]) || 3;
  const colors = ["#d7e3ff", "#cfe8dc", "#ffe2c7", "#edf1f7"];
  const accent = colors[(hashString(model.projectId) + index) % colors.length];
  const optionalRoomLabel = roomCount >= 4 ? "卧室" : "书房";
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="640" height="420" viewBox="0 0 640 420">
      <rect width="640" height="420" rx="28" fill="#f6f9ff"/>
      <rect x="26" y="26" width="588" height="368" rx="22" fill="${accent}" stroke="#b7c8dd" stroke-width="4"/>
      <g fill="#ffffff" stroke="#9db4cc" stroke-width="3">
        <rect x="58" y="58" width="158" height="116" rx="14"/>
        <rect x="58" y="198" width="110" height="82" rx="12"/>
        <rect x="58" y="302" width="110" height="70" rx="12"/>
        <rect x="238" y="118" width="174" height="148" rx="16"/>
        <rect x="238" y="292" width="174" height="80" rx="14"/>
        <rect x="438" y="58" width="142" height="98" rx="12"/>
        <rect x="438" y="176" width="142" height="92" rx="12"/>
      </g>
      <rect x="438" y="292" width="142" height="80" rx="12" fill="#fff" stroke="#9db4cc" stroke-width="3"/>
      <g fill="#00325b" font-family="Arial, Microsoft YaHei, sans-serif" font-weight="800" font-size="24" text-anchor="middle">
        <text x="137" y="123">主卧</text>
        <text x="113" y="247">厨房</text>
        <text x="113" y="347">卫浴</text>
        <text x="325" y="199">客餐厅</text>
        <text x="325" y="340">观景阳台</text>
        <text x="509" y="117">卧室</text>
        <text x="509" y="231">卧室</text>
        <text x="509" y="338">${optionalRoomLabel}</text>
      </g>
      <g fill="#4e6073" font-family="Arial, Microsoft YaHei, sans-serif" font-size="22" font-weight="800">
        <text x="54" y="404">${escapeSvgText(model.name)}</text>
        <text x="458" y="404">${escapeSvgText(meta.roomType)} / ${meta.area}㎡</text>
      </g>
    </svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function buildLayoutPlans(model) {
  return model.layouts.map((layoutText, index) => {
    const meta = getLayoutMeta(layoutText);
    const typeCode = String.fromCharCode(65 + index);
    return {
      id: `layout-${index}`,
      title: `${meta.roomType} · 建面约${meta.area}㎡`,
      displayTitle: `${meta.layout} ${typeCode}户型`,
      layout: meta.layout,
      roomType: meta.roomType,
      area: meta.area,
      totalPrice: estimateRoomTotalPrice(model, meta.area, 0, index),
      feature: getLayoutFeature(meta.roomType, meta.area),
      image: buildLayoutPlanImage(model, meta, index)
    };
  });
}

function enrichModel(model) {
  const start = hashString(model.projectId) % EFFECT_IMAGES.length;
  model.heroImages = {
    effect: EFFECT_IMAGES[start],
    plan: buildPlanImage(model),
    location: buildLocationImage(model),
    real: EFFECT_IMAGES[(start + 2) % EFFECT_IMAGES.length]
  };
  model.layoutPlans = buildLayoutPlans(model);
  model.heroImages.layout = model.layoutPlans[0]?.image || model.heroImages.plan;
  model.albumImages = buildAlbumImages(model);
  model.presales = buildPresales(model);
  model.supportItems = buildSupportItems(model);
  return model;
}
function setText(ref, text) {
  ref.textContent = text || "--";
}

function renderMedia(kind = state.mediaKind) {
  state.mediaKind = kind;
  const image = state.model.heroImages[kind] || state.model.heroImages.effect;
  const mediaLabel = {
    effect: "效果图",
    plan: "总平图",
    layout: "户型图",
    location: "区位图",
    real: "实景图"
  }[kind] || "效果图";
  refs.heroImage.src = image;
  refs.heroImage.alt = `${state.model.name}${mediaLabel}`;
  refs.heroImage.classList.toggle("is-contain", ["plan", "layout", "location"].includes(kind));
  refs.mediaTabs.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.mediaKind === kind);
  });
}

function getCurrentAlbumIndex() {
  const index = state.model.albumImages.findIndex((item) => item.type === state.mediaKind);
  return index >= 0 ? index : 0;
}

function renderAlbum() {
  const images = state.model.albumImages;
  const item = images[state.activeAlbumIndex] || images[0];
  refs.albumImage.src = item.src;
  refs.albumImage.alt = `${state.model.name}${item.title}`;
  refs.albumImage.classList.toggle("is-contain", ["plan", "layout", "location"].includes(item.type));
  refs.albumModalTitle.textContent = `${state.model.name}楼盘相册`;
  refs.albumCaption.textContent = item.title;
  refs.albumCounter.textContent = `${state.activeAlbumIndex + 1}/${images.length}`;
  refs.albumThumbs.innerHTML = images.map((image, index) => `
    <button class="album-thumb ${index === state.activeAlbumIndex ? "is-active" : ""}" data-album-index="${index}" type="button" aria-label="查看${image.title}">
      <img src="${image.src}" alt="${image.title}">
    </button>
  `).join("");
}

function setActiveAlbumIndex(index) {
  const images = state.model.albumImages;
  state.activeAlbumIndex = (index + images.length) % images.length;
  renderAlbum();
}

function openAlbumModal(index = getCurrentAlbumIndex()) {
  state.activeAlbumIndex = index;
  renderAlbum();
  refs.albumModal.hidden = false;
  document.body.style.overflow = "hidden";
}

function closeAlbumModal() {
  refs.albumModal.hidden = true;
  document.body.style.overflow = "";
}

function renderTags(tags) {
  refs.tagList.innerHTML = tags.map((tag) => `<span>${tag}</span>`).join("");
}

function renderInfoRows(rows) {
  refs.infoRows.innerHTML = rows.map(([label, value]) => `
    <div class="info-row">
      <span>${label}</span>
      <strong>${value}</strong>
    </div>
  `).join("");
}

function renderSalesInfo() {
  const generatedRooms = state.model.presales.flatMap((presale) => presale.rooms);
  const total = Number(String(state.model.totalHomesText || "").replace(/\D/g, "")) || generatedRooms.length;
  const stock = Number(String(state.model.stockText || "").replace(/\D/g, "")) || Math.max(1, Math.round(total * 0.42));
  const available = Math.min(total, stock);
  const sold = Math.max(0, total - available);
  const soldRate = total ? Math.round((sold / total) * 1000) / 10 : 0;
  refs.salesTotalText.innerHTML = `${total}<small>套</small>`;
  refs.salesSoldText.innerHTML = `${sold}<small>套</small>`;
  refs.salesAvailableText.innerHTML = `${available}<small>套</small>`;
  refs.salesRateText.textContent = `${soldRate}%`;
  refs.legendAvailableText.textContent = `${available}（套）`;
  refs.legendSoldText.textContent = `${sold}（套）`;
  refs.clearTimeText.textContent = state.model.deliveryText || "2025年12月";
  refs.salesDonut.style.setProperty("--sold-rate", `${soldRate}%`);
  refs.salesDonut.innerHTML = `<strong>${total}</strong><span>总套数</span>`;
}

function renderNewsTimeline() {
  const presale = state.model.presales[0];
  refs.newsTimeline.innerHTML = [
    { date: state.model.openTimeText || "2024-10-24", title: "楼盘开盘" },
    { date: presale?.date || "2024-10-24", title: `取得商品房预售许可证${presale?.no || ""}` }
  ].map((item) => `
    <article class="news-item">
      <time>${item.date}</time>
      <strong>${item.title}</strong>
    </article>
  `).join("");
}

function renderLayoutPlans() {
  const plans = state.model.layoutPlans || [];
  const types = [...new Set(plans.map((plan) => plan.roomType))];
  const activeType = types.includes(state.activeLayoutType) ? state.activeLayoutType : "all";
  state.activeLayoutType = activeType;
  refs.layoutTypeFilters.innerHTML = [
    { value: "all", label: "全部", count: plans.length },
    ...types.map((type) => ({
      value: type,
      label: type,
      count: plans.filter((plan) => plan.roomType === type).length
    }))
  ].map((item) => `
    <button class="layout-type-filter ${item.value === activeType ? "is-active" : ""}" data-layout-type="${item.value}" type="button">
      <span>${item.label}</span>
      <b>${item.count}</b>
    </button>
  `).join("");

  const visiblePlans = activeType === "all" ? plans : plans.filter((plan) => plan.roomType === activeType);
  refs.layoutPlanList.innerHTML = visiblePlans.map((plan) => `
    <article class="layout-plan-card">
      <img class="layout-plan-image" src="${plan.image}" alt="${state.model.name}${plan.displayTitle}户型图">
      <div class="layout-plan-body">
        <h4>${plan.displayTitle}</h4>
      </div>
    </article>
  `).join("");
}

function setLayoutType(type) {
  state.activeLayoutType = type || "all";
  renderLayoutPlans();
}

const SUPPORT_META = {
  education: "教育",
  traffic: "交通",
  park: "公园",
  commerce: "商业",
  medical: "医疗"
};

function renderSupport(itemsByType = state.model.supportItems) {
  const items = itemsByType[state.activeSupportType] || [];
  refs.supportTabs.innerHTML = Object.entries(SUPPORT_META).map(([type, label]) => `
    <button class="support-tab ${type === state.activeSupportType ? "is-active" : ""}" data-support-type="${type}" type="button">${label}</button>
  `).join("");
  refs.supportMap.innerHTML = `
    <div class="project-map-pin">项目</div>
    ${items.map((item) => `
      <span class="facility-pin" style="left:${item.x}%;top:${item.y}%;">${item.icon} ${item.title}</span>
    `).join("")}
  `;
  refs.supportList.innerHTML = items.map((item) => `
    <article class="support-card">
      <div class="support-icon">${item.icon}</div>
      <div>
        <h4>${item.title}</h4>
        <p>${item.desc}</p>
      </div>
    </article>
  `).join("");
}

function getLowestAndHighestRooms() {
  const allRooms = state.model.presales.flatMap((presale) => presale.rooms.map((room) => ({
    ...room,
    certNo: presale.no,
    certDate: presale.date
  })));
  const sorted = [...allRooms].sort((left, right) => left.totalPrice - right.totalPrice);
  if (sorted.length <= 1) {
    return sorted;
  }
  return [sorted[0], sorted[sorted.length - 1]];
}

function renderOnePricePreview() {
  const previewRooms = getLowestAndHighestRooms();
  refs.onePriceSummary.textContent = "详情页仅展示价格最低和最高两套代表房源，更多房源可进入完整一房一价查看。";
  refs.onePriceList.innerHTML = `
    <div class="preview-room-list">
      ${previewRooms.map((room, index) => `
        <article class="preview-room-card">
          <div>
            <span>${index === 0 ? "价格最低" : "价格最高"}</span>
            <strong>${room.building} ${room.unit} ${room.floor}层 ${room.roomNo}号</strong>
            <p>${room.layout} · ${room.area}㎡ · ${room.status}</p>
          </div>
          <b>${room.totalPrice}万</b>
        </article>
      `).join("")}
      <button class="view-more-price" data-action="open-price-detail" type="button">查看完整一房一价</button>
    </div>
  `;
}

function renderOnePrice() {
  renderOnePricePreview();
}

function setActiveDetailTab(tab) {
  state.activeDetailTab = tab;
  refs.detailTabs.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.detailTab === tab);
  });
  const panel = refs.tabPanels.find((item) => item.dataset.tabPanel === tab);
  panel?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function syncActiveDetailTab() {
  const currentPanel = refs.tabPanels.reduce((active, panel) => {
    const top = panel.getBoundingClientRect().top;
    if (top <= 130) {
      return panel;
    }
    return active;
  }, refs.tabPanels[0]);
  if (!currentPanel || currentPanel.dataset.tabPanel === state.activeDetailTab) {
    return;
  }
  state.activeDetailTab = currentPanel.dataset.tabPanel;
  refs.detailTabs.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.detailTab === state.activeDetailTab);
  });
}

function updateDetailTabsVisibility() {
  const imageBottom = refs.heroMedia.getBoundingClientRect().bottom;
  refs.detailTabsNav.classList.toggle("is-visible", imageBottom <= 62);
  syncActiveDetailTab();
}

function renderFollowState() {
  const text = state.followed ? "已关注" : "关注";
  refs.followButton.textContent = text;
  refs.followButton.classList.toggle("is-active", state.followed);
}

function setFollowed(nextValue) {
  state.followed = nextValue;
  renderFollowState();
}

function renderPage(model) {
  state.model = enrichModel(model);
  document.title = `${state.model.name} - 透明房产`;
  setText(refs.statusBadge, state.model.status);
  setText(refs.districtText, `成都 · ${state.model.districtText}`);
  setText(refs.summaryDistrict, state.model.districtText);
  setText(refs.projectName, state.model.name);
  setText(refs.introText, state.model.introText);
  setText(refs.addressText, state.model.addressText);
  setText(refs.projectIntroLong, `${state.model.introText} 项目注重社区尺度、生活配套与通勤效率，周边教育、商业、公园及医疗资源逐步完善，适合关注区域发展和居住舒适度的家庭持续了解。`);
  setText(refs.priceLabel, state.model.priceLabel);
  setText(refs.priceText, state.model.priceText);
  const phoneHref = `tel:${state.model.phone.replace(/\D/g, "")}`;
  refs.contactButton.href = phoneHref;
  refs.phonePill.href = phoneHref;
  document.querySelectorAll(".section-more").forEach((link) => {
    link.href = `./project-one-price.html?projectId=${encodeURIComponent(state.projectId)}`;
  });
  renderMedia("effect");
  renderTags(state.model.tags);
  renderInfoRows(state.model.infoRows);
  renderSalesInfo();
  renderNewsTimeline();
  renderLayoutPlans();
  renderSupport(state.model.supportItems);
  renderOnePrice();
  renderFollowState();
}
function openQrModal() {
  const directUrl = buildDirectDetailUrl(state.projectId);
  refs.qrModal.hidden = false;
  refs.qrImage.src = buildQrImageUrl(directUrl);
  refs.qrImage.alt = `${state.model.name} 项目二维码`;
  refs.qrModalTitle.textContent = state.model.qrTitle;
  refs.qrModalDesc.textContent = state.model.qrDesc;
  refs.qrHint.textContent = isLocalHost()
    ? "当前是本地地址，手机扫码需要把页面部署到可访问域名或局域网地址后使用。"
    : "当前二维码为该项目详情直达链接，可直接用于分享。";
  document.body.style.overflow = "hidden";
}

function closeQrModal() {
  refs.qrModal.hidden = true;
  document.body.style.overflow = "";
}

async function copyDetailLink() {
  const directUrl = buildDirectDetailUrl(state.projectId);
  try {
    await navigator.clipboard.writeText(directUrl);
    refs.copyLinkButton.textContent = "已复制详情链接";
    window.setTimeout(() => {
      refs.copyLinkButton.textContent = "复制详情链接";
    }, 1600);
  } catch (_error) {
    refs.copyLinkButton.textContent = "复制失败，请手动复制";
  }
}

function goBack() {
  const backUrl = getBackUrl();
  if (hasSameOriginReferrer() && window.history.length > 1) {
    window.history.back();
    return;
  }
  if (backUrl) {
    window.location.href = backUrl;
    return;
  }
  window.location.href = "./index.html";
}

function bindEvents() {
  refs.backButton.addEventListener("click", goBack);
  refs.followButton.addEventListener("click", () => setFollowed(!state.followed));
  refs.qrButton.addEventListener("click", openQrModal);
  refs.qrCloseButton.addEventListener("click", closeQrModal);
  refs.copyLinkButton.addEventListener("click", copyDetailLink);
  refs.albumButton.addEventListener("click", (event) => {
    event.stopPropagation();
    openAlbumModal();
  });
  refs.heroMedia.addEventListener("click", (event) => {
    const target = event.target;
    if (target instanceof Element && target.closest("button")) {
      return;
    }
    openAlbumModal();
  });
  refs.heroMedia.addEventListener("keydown", (event) => {
    if (event.target !== refs.heroMedia || !["Enter", " "].includes(event.key)) {
      return;
    }
    event.preventDefault();
    openAlbumModal();
  });
  refs.albumCloseButton.addEventListener("click", closeAlbumModal);
  refs.albumPrevButton.addEventListener("click", () => setActiveAlbumIndex(state.activeAlbumIndex - 1));
  refs.albumNextButton.addEventListener("click", () => setActiveAlbumIndex(state.activeAlbumIndex + 1));
  refs.albumThumbs.addEventListener("click", (event) => {
    const button = event.target.closest("[data-album-index]");
    if (!button) {
      return;
    }
    setActiveAlbumIndex(Number(button.dataset.albumIndex));
  });
  refs.mediaTabs.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      renderMedia(button.dataset.mediaKind);
    });
  });
  refs.detailTabs.forEach((button) => {
    button.addEventListener("click", () => setActiveDetailTab(button.dataset.detailTab));
  });
  refs.layoutTypeFilters.addEventListener("click", (event) => {
    const button = event.target.closest("[data-layout-type]");
    if (!button) {
      return;
    }
    setLayoutType(button.dataset.layoutType);
  });
  document.querySelectorAll('[data-action="open-album"]').forEach((button) => {
    button.addEventListener("click", () => openAlbumModal());
  });
  document.querySelectorAll('[data-action="open-price-detail"]').forEach((button) => {
    button.addEventListener("click", () => {
      window.location.href = `./project-one-price.html?projectId=${encodeURIComponent(state.projectId)}`;
    });
  });
  document.querySelectorAll(".section-link-button[data-layout-type]").forEach((button) => {
    button.addEventListener("click", () => setLayoutType(button.dataset.layoutType));
  });
  refs.onePriceList.addEventListener("click", (event) => {
    const trigger = event.target.closest('[data-action="open-price-detail"]');
    if (!trigger) {
      return;
    }
    window.location.href = `./project-one-price.html?projectId=${encodeURIComponent(state.projectId)}`;
  });
  refs.supportTabs.addEventListener("click", (event) => {
    const button = event.target.closest("[data-support-type]");
    if (!button) {
      return;
    }
    state.activeSupportType = button.dataset.supportType;
    renderSupport();
  });
  document.addEventListener("click", (event) => {
    const target = event.target;
    if (target instanceof HTMLElement && target.hasAttribute("data-close-qr")) {
      closeQrModal();
    }
    if (target instanceof HTMLElement && target.hasAttribute("data-close-album")) {
      closeAlbumModal();
    }
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !refs.qrModal.hidden) {
      closeQrModal();
    }
    if (event.key === "Escape" && !refs.albumModal.hidden) {
      closeAlbumModal();
    }
    if (refs.albumModal.hidden || !["ArrowLeft", "ArrowRight"].includes(event.key)) {
      return;
    }
    setActiveAlbumIndex(state.activeAlbumIndex + (event.key === "ArrowRight" ? 1 : -1));
  });
  window.addEventListener("scroll", updateDetailTabsVisibility, { passive: true });
  window.addEventListener("resize", updateDetailTabsVisibility);
}

function renderError(message) {
  document.body.innerHTML = `
    <main style="min-height:100vh;display:grid;place-items:center;padding:24px;background:#f3f7fb;color:#191c1d;font-family:PingFang SC,Microsoft YaHei,sans-serif;">
      <div style="max-width:320px;text-align:center;background:#fff;border-radius:24px;padding:24px;box-shadow:0 14px 36px rgba(22,42,68,.08);">
        ${message}
      </div>
    </main>
  `;
}

function initPage() {
  const projectId = getQueryProjectId() || getDefaultProjectId();
  const record = findProjectRecord(projectId);
  if (!record) {
    renderError("未找到对应的楼盘详情。");
    return;
  }
  state.projectId = projectId;
  renderPage(buildModel(record));
  bindEvents();
  updateDetailTabsVisibility();
}

initPage();
})();
