const SVG_NS = "http://www.w3.org/2000/svg";

const refs = {
  stage: document.getElementById("svgStage"),
  detailSvgObject: document.getElementById("detailSvgObject"),
  backHotspot: document.getElementById("backHotspot"),
  followHotspot: document.getElementById("followHotspot"),
  expandHotspot: document.getElementById("expandHotspot"),
  qrButton: document.getElementById("qrButton"),
  contactButton: document.getElementById("contactButton"),
  infoSheet: document.getElementById("infoSheet"),
  infoSheetRows: document.getElementById("infoSheetRows"),
  infoSheetClose: document.getElementById("infoSheetClose"),
  qrModal: document.getElementById("qrModal"),
  qrImage: document.getElementById("qrImage"),
  qrModalDesc: document.getElementById("qrModalDesc"),
  qrLinkText: document.getElementById("qrLinkText"),
  qrHint: document.getElementById("qrHint"),
  qrCloseButton: document.getElementById("qrCloseButton"),
  copyLinkButton: document.getElementById("copyLinkButton")
};

const state = {
  followed: false,
  projectId: "",
  model: null,
  svgRoot: null,
  svgTexts: [],
  initialized: false
};

const PROTOTYPE_PROJECTS = {
  p1: {
    id: "p1",
    name: "繁花里",
    district: "邛崃市",
    priceMin: 8301,
    priceMax: 11667,
    areaMin: 68.64,
    areaMax: 153.53,
    tags: ["清水", "住宅", "容积率1.5"],
    signed30: 286,
    stock: 286,
    total: 445,
    record: "8301~11667元/㎡",
    open: "1-7栋",
    layout: ["2室2厅1卫 68㎡", "3室2厅2卫 98㎡", "4室2厅2卫 126㎡"],
    intro: "项目位于邛崃主城片区，兼顾刚需与改善，生活配套成熟。",
    deco: "clear"
  },
  p2: {
    id: "p2",
    name: "世邦昆仑府·朴樾",
    district: "金堂县",
    priceMin: 6488,
    priceMax: 10764,
    areaMin: 79.9,
    areaMax: 168.31,
    tags: ["清水", "低密", "容积率2.25"],
    signed30: 161,
    stock: 161,
    total: 312,
    record: "6488~10764元/㎡",
    open: "2-11栋",
    layout: ["3室2厅2卫 92㎡", "3室2厅2卫 116㎡", "4室2厅2卫 138㎡"],
    intro: "项目强调景观与舒适度，多面积段可选。",
    deco: "clear"
  },
  p3: {
    id: "p3",
    name: "凯瑞·望丛天序",
    district: "郫都区",
    priceMin: 14177,
    priceMax: 37684,
    areaMin: 90.91,
    areaMax: 248.56,
    tags: ["清水", "精装", "容积率2.0"],
    signed30: 109,
    stock: 109,
    total: 260,
    record: "14177~37684元/㎡",
    open: "3-9栋",
    layout: ["3室2厅2卫 101㎡", "4室2厅2卫 143㎡", "5室2厅3卫 188㎡"],
    intro: "改善型定位，近产业区和教育配套。",
    deco: "refined"
  },
  p4: {
    id: "p4",
    name: "中旅·紫金名邸",
    district: "双流区",
    priceMin: 21340,
    priceMax: 27726,
    areaMin: 114.61,
    areaMax: 142.74,
    tags: ["清水", "住宅", "容积率1.5"],
    signed30: 120,
    stock: 120,
    total: 220,
    record: "21340~27726元/㎡",
    open: "1-6栋",
    layout: ["3室2厅2卫 115㎡", "4室2厅2卫 128㎡", "4室2厅2卫 142㎡"],
    intro: "双流主城板块，低密居住社区。",
    deco: "clear"
  },
  p5: {
    id: "p5",
    name: "龙湖天曜",
    district: "高新区",
    priceMin: 23200,
    priceMax: 31800,
    areaMin: 95,
    areaMax: 179,
    tags: ["精装", "地铁沿线", "容积率2.2"],
    signed30: 428,
    stock: 96,
    total: 398,
    record: "23200~31800元/㎡",
    open: "1-8栋",
    layout: ["3室2厅2卫 105㎡", "4室2厅2卫 139㎡", "4室2厅3卫 178㎡"],
    intro: "高新区核心居住片区，改善产品为主。",
    deco: "refined"
  },
  p6: {
    id: "p6",
    name: "城投锦澜台",
    district: "成华区",
    priceMin: 18800,
    priceMax: 25800,
    areaMin: 84,
    areaMax: 143,
    tags: ["清水", "准现房", "容积率1.8"],
    signed30: 176,
    stock: 143,
    total: 360,
    record: "18800~25800元/㎡",
    open: "2-10栋",
    layout: ["2室2厅1卫 84㎡", "3室2厅2卫 108㎡", "4室2厅2卫 136㎡"],
    intro: "生活与商业配套成熟，覆盖首置和改善客群。",
    deco: "clear"
  }
};

function getStore() {
  return window.ChengduSectorMapData || null;
}

function getDefaultProjectId() {
  const store = getStore();
  if (!store || !Array.isArray(store.sectors)) {
    return "";
  }
  for (const sector of store.sectors) {
    if (sector.projects && sector.projects.length) {
      return sector.projects[0].id;
    }
  }
  return "";
}

function getQueryProjectId() {
  const params = new URLSearchParams(window.location.search);
  return params.get("projectId") || "";
}

function getBackUrl() {
  const params = new URLSearchParams(window.location.search);
  const raw = params.get("from");
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
    const referrerUrl = new URL(document.referrer);
    return referrerUrl.origin === window.location.origin;
  } catch (_error) {
    return false;
  }
}

function hashString(text) {
  return Array.from(text).reduce((acc, char) => (acc * 33 + char.charCodeAt(0)) % 100000, 11);
}

function parseAreaRange(areaText) {
  const values = (areaText.match(/\d+/g) || []).map(Number);
  const min = values[0] || 89;
  const max = values[1] || min + 22;
  return { min, max };
}

function parsePriceNumber(priceText) {
  const values = (priceText.match(/\d+/g) || []).map(Number);
  return values[0] || 22000;
}

function pad2(value) {
  return String(value).padStart(2, "0");
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

function findProjectRecord(projectId) {
  if (PROTOTYPE_PROJECTS[projectId]) {
    return { prototypeProject: PROTOTYPE_PROJECTS[projectId] };
  }
  const store = getStore();
  if (!store || typeof store.findProjectById !== "function") {
    return null;
  }
  return store.findProjectById(projectId);
}

function buildPrototypeDetailModel(project) {
  const seed = hashString(project.id);
  const openMonth = 4 + (seed % 7);
  const deliveryMonth = 5 + (seed % 6);
  const decoration = project.deco === "refined" ? "精装" : "清水";
  const ladder = project.priceMax >= 23000 ? "2T2、2T3" : "2T3、2T4";
  const areaRangeText = `${Math.round(project.areaMin)}-${Math.round(project.areaMax)}㎡`;
  const parkingSpaces = Math.round(project.total * 1.08);
  const openBuildingsText = project.open.replace(/-/g, "、");
  const phone = buildPhone(seed);

  return {
    projectId: project.id,
    name: project.name,
    sectorName: project.district,
    districtText: project.district,
    status: "在售",
    tag1: project.tags[0] || "住宅",
    tag2: project.tags[1] || "热销楼盘",
    tag3: project.tags[2] || "板块热盘",
    promoText: "",
    priceText: project.record,
    openTimeText: `2026年${pad2(openMonth)}月`,
    openCountText: `${2 + (seed % 3)}`,
    openBuildingsText,
    deliveryText: `2028年${pad2(deliveryMonth)}月`,
    totalHomesText: `${project.total}`,
    parkingText: `${parkingSpaces}`,
    decorationText: decoration,
    ladderText: ladder,
    addressText: `${project.district} | ${project.name}营销中心`,
    phone,
    infoRows: [
      ["项目名称", project.name],
      ["所属区域", project.district],
      ["参考单价", project.record],
      ["主力面积", areaRangeText],
      ["开盘楼栋", project.open],
      ["总户数", `${project.total}户`],
      ["在售套数", `${project.stock}套`],
      ["近30天网签", `${project.signed30}套`],
      ["车位数", `${parkingSpaces}`],
      ["装修标准", decoration],
      ["梯户比", ladder],
      ["主力户型", project.layout.join(" / ")],
      ["项目亮点", project.tags.join(" · ")],
      ["咨询电话", phone]
    ],
    qrTitle: `${project.name} 项目二维码`,
    qrDesc: `扫码可直接打开 ${project.name} 详情`
  };
}

function buildDetailModel(record) {
  const { sector, project } = record;
  const seed = hashString(project.id);
  const area = parseAreaRange(project.area);
  const priceValue = parsePriceNumber(project.price);
  const openYear = 2026;
  const openMonth = 4 + (seed % 7);
  const deliveryYear = 2028;
  const deliveryMonth = 5 + (seed % 6);
  const towerCount = 2 + (seed % 3);
  const totalHomes = 98 + (seed % 8) * 16;
  const parkingSpaces = Math.round(totalHomes * (1.08 + (seed % 3) * 0.12));
  const ladder = sector.tier === "core" ? "2T2、2T3" : sector.tier === "quality" ? "2T3、2T4" : "2T4、2T5";
  const plotRatio = (1.8 + (seed % 7) * 0.2).toFixed(1);
  const decoration = project.tags.includes("精装") ? "精装" : project.tags.includes("清水") ? "清水" : sector.tier === "core" ? "精装" : "清水";
  const buildingType = project.tags.includes("小高层") ? "小高层" : project.tags.includes("洋房") ? "洋房" : sector.tier === "outer" ? "小高层" : "高层";
  const phone = buildPhone(seed);
  const shortAddress = `${sector.name} | ${project.name}营销中心`;

  return {
    projectId: project.id,
    name: project.name,
    sectorName: sector.name,
    districtText: sector.shortName || sector.name,
    status: project.status,
    tag1: `容积率${plotRatio}`,
    tag2: buildingType,
    tag3: decoration,
    promoText: `可享${sector.name}置业顾问一对一服务`,
    priceText: project.price,
    openTimeText: `${openYear}年${pad2(openMonth)}月`,
    openCountText: `${towerCount}`,
    openBuildingsText: `${1 + (seed % 3)}栋、${2 + (seed % 4)}栋`,
    deliveryText: `${deliveryYear}年${pad2(deliveryMonth)}月`,
    totalHomesText: `${totalHomes}`,
    parkingText: `${parkingSpaces}`,
    decorationText: decoration,
    ladderText: ladder,
    addressText: shortAddress,
    phone,
    infoRows: [
      ["项目名称", project.name],
      ["所属板块", sector.name],
      ["参考单价", project.price],
      ["主力面积", `${area.min}-${area.max}㎡`],
      ["开盘时间", `${openYear}年${pad2(openMonth)}月`],
      ["预计交房", `${deliveryYear}年${pad2(deliveryMonth)}月`],
      ["总户数", `${totalHomes}户`],
      ["车位数", `${parkingSpaces}`],
      ["装修标准", decoration],
      ["梯户比", ladder],
      ["容积率", plotRatio],
      ["主力客群", sector.audience],
      ["板块特点", sector.focus],
      ["咨询电话", phone]
    ],
    qrTitle: `${project.name} 项目二维码`,
    qrDesc: `扫码可直接打开 ${project.name} 详情`
  };
}

function findSvgText(transformPrefix) {
  if (!state.svgTexts.length) {
    return null;
  }
  return state.svgTexts.find((element) => {
    const transform = element.getAttribute("transform") || "";
    return transform.startsWith(`translate(${transformPrefix}`);
  }) || null;
}

function setSvgText(transformPrefix, value, options = {}) {
  const textElement = findSvgText(transformPrefix);
  if (!textElement) {
    return;
  }

  const template = textElement.querySelector("tspan");
  const tspan = document.createElementNS(SVG_NS, "tspan");

  if (template) {
    Array.from(template.attributes).forEach((attribute) => {
      tspan.setAttribute(attribute.name, attribute.value);
    });
  } else {
    tspan.setAttribute("x", "0");
    tspan.setAttribute("y", "14");
  }

  if (options.fill) {
    tspan.setAttribute("fill", options.fill);
  }

  tspan.textContent = value;
  textElement.innerHTML = "";
  textElement.appendChild(tspan);
}

function hideSvgElement(element) {
  if (!element) {
    return;
  }
  element.setAttribute("display", "none");
  if (element.style) {
    element.style.display = "none";
  }
}

function findSvgPathByPrefix(prefix) {
  if (!state.svgRoot) {
    return null;
  }
  return Array.from(state.svgRoot.querySelectorAll("path")).find((element) => {
    const data = element.getAttribute("d") || "";
    return data.startsWith(prefix);
  }) || null;
}

function hidePromoAndNativeCta() {
  if (!state.svgRoot) {
    return;
  }

  const elements = [
    findSvgText("28, 471"),
    findSvgText("289, 471"),
    state.svgRoot.querySelector('rect[x="279"][y="467"][width="68"][height="25"]'),
    findSvgPathByPrefix("M334.5 467L291.5 467"),
    state.svgRoot.querySelector('rect[x="0"][y="1383"][width="375"][height="34"]'),
    state.svgRoot.querySelector('rect[x="120.5"][y="1404"][width="134"][height="5"]'),
    findSvgPathByPrefix("M0 1315L375 1315L375 1383L0 1383L0 1315Z"),
    findSvgPathByPrefix("M20 1333L20 1365C20 1369.42"),
    findSvgText("159, 1338"),
    findSvgPathByPrefix("M143.97 1352.86C143.897")
  ];

  elements.forEach(hideSvgElement);
}

function renderSvgTexts(model) {
  setSvgText("16, 363", model.name);
  setSvgText("21, 436", model.status);
  setSvgText("55, 436", model.tag1);
  setSvgText("114, 436", model.tag2);
  setSvgText("158, 436", model.tag3);
  setSvgText("39, 403", model.districtText);
  setSvgText("122, 687", model.openTimeText);
  setSvgText("122, 727", model.openCountText);
  setSvgText("122, 763", model.openBuildingsText);
  setSvgText("122, 801", model.decorationText);
  setSvgText("122, 839", model.deliveryText);
  setSvgText("90, 947", model.priceText, { fill: "#FF2828" });
  setSvgText("90, 985", `${model.openCountText}栋`);
  setSvgText("90, 1023", model.openBuildingsText);
  setSvgText("90, 1063", model.totalHomesText);
  setSvgText("90, 1101", model.parkingText);
  setSvgText("90, 1137", model.decorationText);
  setSvgText("90, 1175", model.ladderText);
  setSvgText("51, 1223", model.addressText);
  setSvgText("311, 398", state.followed ? "已关注" : "关注楼盘");
}

function renderInfoSheet(model) {
  refs.infoSheetRows.innerHTML = model.infoRows.map(([label, value]) => `
    <div class="sheet-row">
      <span>${label}</span>
      <strong>${value}</strong>
    </div>
  `).join("");
}

function openInfoSheet() {
  refs.infoSheet.hidden = false;
  document.body.style.overflow = "hidden";
}

function closeInfoSheet() {
  refs.infoSheet.hidden = true;
  if (refs.qrModal.hidden) {
    document.body.style.overflow = "";
  }
}

function openQrModal() {
  const directUrl = buildDirectDetailUrl(state.projectId);
  refs.qrModal.hidden = false;
  refs.qrImage.src = buildQrImageUrl(directUrl);
  refs.qrImage.alt = `${state.model.name} 项目二维码`;
  refs.qrModalDesc.textContent = state.model.qrDesc;
  refs.qrLinkText.textContent = directUrl;
  refs.qrHint.textContent = isLocalHost()
    ? "当前是本地地址，手机扫码需要把页面部署到可访问域名或局域网地址后使用。"
    : "当前二维码为该项目详情直达链接，可直接用于分享。";
  document.body.style.overflow = "hidden";
}

function closeQrModal() {
  refs.qrModal.hidden = true;
  if (refs.infoSheet.hidden) {
    document.body.style.overflow = "";
  }
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

function setFollowed(followed) {
  state.followed = followed;
  renderSvgTexts(state.model);
}

function renderPage(model) {
  state.model = model;
  document.title = `${model.name} - 楼盘详情`;
  refs.contactButton.href = `tel:${model.phone.replace(/\D/g, "")}`;
  renderSvgTexts(model);
  hidePromoAndNativeCta();
  renderInfoSheet(model);
}

function bindEvents() {
  refs.backHotspot.addEventListener("click", () => {
    const backUrl = getBackUrl();
    if (hasSameOriginReferrer() && window.history.length > 1) {
      window.history.back();
      return;
    }
    if (backUrl) {
      window.location.href = backUrl;
      return;
    }
    window.location.href = "./chengdu-sector-map.html";
  });

  refs.followHotspot.addEventListener("click", () => {
    setFollowed(!state.followed);
  });

  refs.expandHotspot.addEventListener("click", openInfoSheet);
  refs.qrButton.addEventListener("click", openQrModal);
  refs.infoSheetClose.addEventListener("click", closeInfoSheet);
  refs.qrCloseButton.addEventListener("click", closeQrModal);
  refs.copyLinkButton.addEventListener("click", copyDetailLink);

  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }
    if (target.hasAttribute("data-close-sheet")) {
      closeInfoSheet();
    }
    if (target.hasAttribute("data-close-qr")) {
      closeQrModal();
    }
  });
}

function renderError(message) {
  document.body.innerHTML = `<main style="min-height:100vh;display:grid;place-items:center;padding:24px;background:#f3f5f6;color:#303133;font-family:PingFang SC,Microsoft YaHei,sans-serif;">${message}</main>`;
}

function initPage() {
  const projectId = getQueryProjectId() || getDefaultProjectId();
  const record = findProjectRecord(projectId);
  if (!record) {
    renderError("未找到对应的楼盘详情。");
    return;
  }

  state.projectId = projectId;
  const model = record.prototypeProject
    ? buildPrototypeDetailModel(record.prototypeProject)
    : buildDetailModel(record);
  renderPage(model);
  bindEvents();
}

function initSvg() {
  if (state.initialized) {
    return;
  }
  const svgDocument = refs.detailSvgObject.contentDocument;
  if (!svgDocument) {
    renderError("详情页设计稿加载失败，请刷新重试。");
    return;
  }
  state.svgRoot = svgDocument.documentElement;
  state.svgTexts = Array.from(state.svgRoot.querySelectorAll("text"));
  state.initialized = true;
  initPage();
}

refs.detailSvgObject.addEventListener("load", initSvg);

if (refs.detailSvgObject.contentDocument) {
  initSvg();
}
