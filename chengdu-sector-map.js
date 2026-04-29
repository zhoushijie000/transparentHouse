const SVG_NS = "http://www.w3.org/2000/svg";
const XLINK_NS = "http://www.w3.org/1999/xlink";
const BASE_VIEWBOX = { x: 0, y: 0, width: 1080, height: 1450 };
const DEFAULT_VIEWBOX = { x: 40, y: 107, width: 1000, height: 1343 };
const MIN_VIEWBOX_WIDTH = 360;
const PROJECT_LAYER_VIEWBOX_WIDTH = 860;
const CLICK_SUPPRESS_MS = 220;
const REAL_MAP_TILE_SIZE = 256;
const REAL_MAP = {
  zoom: 11,
  bounds: {
    west: 103.15,
    east: 104.75,
    north: 31.45,
    south: 29.65
  },
  urlTemplate: "https://tile.openstreetmap.org/{z}/{x}/{y}.png"
};

const TIER_META = {
  core: { color: "#ef5c57", label: "核心板块" },
  quality: { color: "#f4a261", label: "优质板块" },
  normal: { color: "#f1cf59", label: "普通板块" },
  outer: { color: "#6dd39a", label: "外围板块" }
};

const LEGEND = [
  { label: "核心板块", color: TIER_META.core.color },
  { label: "优质板块", color: TIER_META.quality.color },
  { label: "普通板块", color: TIER_META.normal.color },
  { label: "外围板块", color: TIER_META.outer.color }
];

const PROJECT_POOLS = {
  value: [
    { suffix: "云境", area: "79-108㎡", tags: ["刚需", "TOD", "精装"], intro: "总价门槛更友好，适合先上车再升级。" },
    { suffix: "和鸣", area: "89-126㎡", tags: ["首改", "小高层", "景观"], intro: "更偏自住型家庭，面积段控制得更轻。" },
    { suffix: "悦府", area: "96-132㎡", tags: ["首改", "地铁沿线", "公园"], intro: "更适合在意通勤和生活便利的客群。" }
  ],
  mature: [
    { suffix: "天樾", area: "98-136㎡", tags: ["改善", "精装", "地铁沿线"], intro: "成熟板块改善盘，接受度更稳定。" },
    { suffix: "雅颂", area: "108-156㎡", tags: ["改善", "公园", "低密"], intro: "更偏舒适改善，居住氛围更完整。" },
    { suffix: "观澜", area: "118-168㎡", tags: ["改善", "景观", "会所"], intro: "适合希望提升居住体验的换房家庭。" }
  ],
  core: [
    { suffix: "锦宸", area: "128-188㎡", tags: ["核心区", "大平层", "精装"], intro: "更看重板块确定性和资产属性的买家会优先关注。" },
    { suffix: "天玺", area: "143-236㎡", tags: ["高端改善", "会所", "景观"], intro: "总价带更高，产品展示感和圈层属性更强。" },
    { suffix: "云序", area: "118-176㎡", tags: ["改善", "地段", "品质"], intro: "更偏向追求地段与品质兼得的改善需求。" }
  ],
  ecology: [
    { suffix: "湖境", area: "118-188㎡", tags: ["生态", "低密", "改善"], intro: "生态界面和自住舒适度更突出。" },
    { suffix: "映月", area: "128-210㎡", tags: ["景观", "洋房", "高改"], intro: "更适合重视环境与长期居住体验的买家。" },
    { suffix: "观澜", area: "108-168㎡", tags: ["公园", "改善", "精装"], intro: "兼顾景观资源与日常通勤的平衡型产品。" }
  ],
  growth: [
    { suffix: "理想城", area: "89-129㎡", tags: ["首改", "成长板块", "精装"], intro: "更适合看重板块成长性的首改客群。" },
    { suffix: "星樾", area: "96-138㎡", tags: ["改善", "TOD", "景观"], intro: "承接城市外溢需求，整体去化节奏更快。" },
    { suffix: "未来府", area: "105-143㎡", tags: ["改善", "公园", "新盘"], intro: "更偏向成长型板块的改善升级需求。" }
  ]
};

const SECTOR_BLUEPRINTS = [
  { id: "youai", name: "友爱镇", shortName: "友爱镇", tier: "outer", tone: "value", priceBand: [12000, 18000], inventory: 4, focus: "外围自住、总价友好", audience: "刚需 / 首置", labelClass: "", points: "25,420 65,380 110,405 138,445 122,520 96,565 48,540 30,500" },
  { id: "deyuan", name: "德源镇", shortName: "德源镇", tier: "outer", tone: "value", priceBand: [12500, 18500], inventory: 4, focus: "西向承接、通勤平衡", audience: "刚需 / 首改", labelClass: "small", points: "150,430 260,460 275,500 235,580 190,530" },
  { id: "qingbaijiang", name: "青白江", shortName: "青白江", tier: "outer", tone: "growth", priceBand: [12500, 19000], inventory: 5, focus: "北向外延、性价比", audience: "刚需 / 首置", labelClass: "", points: "895,390 1070,470 980,600 845,520" },

  { id: "gaoxin-west", name: "高新西区", shortName: "高新西", tier: "outer", tone: "growth", priceBand: [16500, 24500], inventory: 9, focus: "产业外溢、首改友好", audience: "刚需 / 首改", labelClass: "small", points: "330,560 405,590 455,655 415,735 300,690 245,610" },
  { id: "hongguang", name: "红光", shortName: "红光", tier: "outer", tone: "growth", priceBand: [15000, 22000], inventory: 6, focus: "西向改善外溢", audience: "刚需 / 首改", labelClass: "", points: "455,610 530,630 520,710 455,700 410,660" },
  { id: "tuanjiezhen", name: "团结镇", shortName: "团结镇", tier: "outer", tone: "value", priceBand: [14500, 20500], inventory: 5, focus: "高校带、自住导向", audience: "刚需 / 首改", labelClass: "small", points: "448,540 500,520 528,545 520,592 470,602 442,566" },
  { id: "xipu", name: "犀浦", shortName: "犀浦", tier: "quality", tone: "value", priceBand: [17000, 25000], inventory: 7, focus: "教育资源、通勤平衡", audience: "刚需 / 首改", labelClass: "", points: "430,690 500,680 520,742 462,785 400,755" },
  { id: "anjing", name: "安靖", shortName: "安靖", tier: "normal", tone: "value", priceBand: [16000, 23000], inventory: 6, focus: "北改承接、居住平衡", audience: "刚需 / 首改", labelClass: "", points: "530,640 600,625 630,690 590,760 520,730" },
  { id: "dafeng", name: "大丰", shortName: "大丰", tier: "quality", tone: "mature", priceBand: [18000, 26000], inventory: 7, focus: "北改成熟居住区", audience: "首改 / 改善", labelClass: "", points: "620,625 690,630 720,710 690,810 605,785 598,700" },
  { id: "longqiao", name: "龙桥", shortName: "龙桥", tier: "outer", tone: "value", priceBand: [15000, 22000], inventory: 4, focus: "北向成长、上车友好", audience: "刚需 / 首置", labelClass: "tiny", points: "580,560 635,555 648,610 615,640 575,610" },
  { id: "banzhuyuan", name: "斑竹园", shortName: "斑竹园", tier: "outer", tone: "value", priceBand: [14500, 21000], inventory: 4, focus: "北改衔接、自住稳健", audience: "刚需 / 首置", labelClass: "tiny", points: "670,565 725,575 717,650 676,642" },
  { id: "liaojiawan", name: "廖家湾TOD", shortName: "廖家湾", tier: "normal", tone: "growth", priceBand: [16500, 24000], inventory: 6, focus: "TOD支撑、北向成长", audience: "首改 / 改善", labelClass: "tiny", points: "725,550 808,566 790,635 736,625" },
  { id: "sanhechang", name: "三河场", shortName: "三河场", tier: "outer", tone: "mature", priceBand: [15000, 22000], inventory: 5, focus: "北改成熟生活圈", audience: "刚需 / 首改", labelClass: "tiny", points: "800,620 870,625 862,700 792,700" },
  { id: "xindu-old", name: "新都老城", shortName: "新都老城", tier: "normal", tone: "mature", priceBand: [14500, 21500], inventory: 5, focus: "老城配套、价格稳", audience: "刚需 / 首改", labelClass: "tiny", points: "792,560 846,570 838,620 794,610" },
  { id: "xindu-new", name: "新都新城", shortName: "新都新城", tier: "outer", tone: "growth", priceBand: [14500, 22000], inventory: 6, focus: "新区兑现、成长承接", audience: "刚需 / 首改", labelClass: "tiny", points: "850,560 920,570 908,650 850,638" },
  { id: "mulan", name: "木兰镇", shortName: "木兰镇", tier: "outer", tone: "value", priceBand: [13000, 19500], inventory: 4, focus: "东北向外延、总价低", audience: "刚需 / 首置", labelClass: "", points: "915,620 990,600 1020,680 980,780 905,770 900,700" },
  { id: "beihu", name: "北湖", shortName: "北湖", tier: "outer", tone: "ecology", priceBand: [16500, 23500], inventory: 6, focus: "生态资源、北区改善", audience: "首改 / 改善", labelClass: "small", points: "810,705 890,715 905,805 825,845 770,785" },
  { id: "longtansi", name: "龙潭寺", shortName: "龙潭寺", tier: "normal", tone: "growth", priceBand: [19000, 29000], inventory: 7, focus: "东中环改善、产业承接", audience: "首改 / 改善", labelClass: "", points: "900,780 990,780 995,920 900,930 872,850" },

  { id: "guose", name: "国色天香", shortName: "国色天香", tier: "outer", tone: "mature", priceBand: [16000, 23000], inventory: 5, focus: "温江改善、生活氛围", audience: "刚需 / 首改", labelClass: "small", points: "210,760 300,740 330,820 288,885 215,860" },
  { id: "furong", name: "芙蓉大道", shortName: "芙蓉大道", tier: "outer", tone: "mature", priceBand: [17000, 24500], inventory: 6, focus: "西南改善、路网便利", audience: "首改 / 改善", labelClass: "small", points: "300,745 420,730 452,810 428,880 325,885" },
  { id: "daxuecheng", name: "大学城", shortName: "大学城", tier: "outer", tone: "value", priceBand: [15000, 22000], inventory: 6, focus: "高校客群、自住导向", audience: "刚需 / 首改", labelClass: "", points: "75,875 170,850 190,960 110,1050 55,972" },
  { id: "jinma", name: "金马", shortName: "金马", tier: "outer", tone: "value", priceBand: [14500, 21000], inventory: 5, focus: "外围改善、低密产品", audience: "刚需 / 首改", labelClass: "", points: "155,1005 245,995 272,1090 210,1160 120,1105" },
  { id: "chengfei", name: "成飞", shortName: "成飞", tier: "quality", tone: "growth", priceBand: [20000, 28000], inventory: 6, focus: "主城西、产业改善", audience: "首改 / 改善", labelClass: "", points: "435,730 520,742 540,835 495,900 430,855" },
  { id: "guobin", name: "国宾", shortName: "国宾", tier: "quality", tone: "core", priceBand: [26000, 38000], inventory: 5, focus: "城西改善高地", audience: "改善 / 高改", labelClass: "", points: "555,735 630,730 650,790 600,840 540,810" },
  { id: "wanjiawan", name: "万家湾", shortName: "万家湾", tier: "normal", tone: "mature", priceBand: [22000, 32000], inventory: 6, focus: "主城居住、通勤平衡", audience: "首改 / 改善", labelClass: "", points: "500,810 585,815 615,885 560,955 490,925" },
  { id: "jiujiang", name: "九江", shortName: "九江", tier: "outer", tone: "growth", priceBand: [18000, 27000], inventory: 7, focus: "西南外溢、低密改善", audience: "首改 / 改善", labelClass: "", points: "440,940 515,930 540,1030 480,1095 400,1045" },
  { id: "shuangnan", name: "双楠", shortName: "双楠", tier: "quality", tone: "mature", priceBand: [23000, 34000], inventory: 5, focus: "老牌改善、主城便利", audience: "改善 / 二孩家庭", labelClass: "", points: "570,860 645,850 670,930 615,1000 545,960" },
  { id: "dongkezhan", name: "东客站", shortName: "东客站", tier: "quality", tone: "mature", priceBand: [21000, 31000], inventory: 6, focus: "交通枢纽、东门改善", audience: "首改 / 改善", labelClass: "", points: "760,805 835,800 855,880 800,940 730,900" },
  { id: "shiling", name: "十陵", shortName: "十陵", tier: "normal", tone: "growth", priceBand: [17500, 25500], inventory: 8, focus: "东进承接、价格友好", audience: "刚需 / 首改", labelClass: "", points: "885,900 980,890 988,990 890,1040 835,980" },
  { id: "qinglonghu", name: "青龙湖", shortName: "青龙湖", tier: "outer", tone: "ecology", priceBand: [18000, 26000], inventory: 6, focus: "东进生态、自住友好", audience: "首改 / 改善", labelClass: "", points: "885,1040 970,1030 955,1110 870,1120 840,1065" },
  { id: "xihe", name: "西河", shortName: "西河", tier: "outer", tone: "value", priceBand: [15000, 22000], inventory: 5, focus: "东向上车、通勤承接", audience: "刚需 / 首置", labelClass: "", points: "985,930 1060,910 1072,982 1038,1020 988,1000" },
  { id: "yangguangcheng", name: "阳光城", shortName: "阳光城", tier: "outer", tone: "growth", priceBand: [16000, 23000], inventory: 5, focus: "东向改善、成长兑现", audience: "刚需 / 首改", labelClass: "small", points: "968,1030 1048,1010 1038,1085 968,1118 930,1072" },

  { id: "aviation", name: "航空港", shortName: "航空港", tier: "normal", tone: "value", priceBand: [16000, 22000], inventory: 8, focus: "南向通勤、刚改集中", audience: "刚需 / 首改", labelClass: "", points: "515,955 615,950 648,1060 575,1120 500,1075" },
  { id: "xihanggang", name: "西航港", shortName: "西航港", tier: "outer", tone: "value", priceBand: [15500, 22500], inventory: 7, focus: "双流承接、总价友好", audience: "刚需 / 首改", labelClass: "", points: "485,1060 605,1050 650,1180 560,1260 470,1190" },
  { id: "dongsheng", name: "东升", shortName: "东升", tier: "normal", tone: "mature", priceBand: [17000, 24500], inventory: 6, focus: "双流主城、生活成熟", audience: "首改 / 改善", labelClass: "", points: "410,1080 505,1058 490,1148 420,1180 370,1134" },
  { id: "huafu", name: "华府", shortName: "华府", tier: "normal", tone: "mature", priceBand: [22000, 31000], inventory: 6, focus: "南拓成熟居住带", audience: "首改 / 改善", labelClass: "", points: "585,1180 670,1176 695,1265 618,1312 545,1268" },
  { id: "dayuan", name: "大源", shortName: "大源", tier: "core", tone: "mature", priceBand: [30000, 45000], inventory: 6, focus: "成熟居住氛围、改善稳定", audience: "改善 / 二孩家庭", labelClass: "", points: "625,1075 712,1070 730,1150 662,1188 607,1132" },
  { id: "financial-city", name: "金融城", shortName: "金融城", tier: "core", tone: "core", priceBand: [46000, 65000], inventory: 4, focus: "城市级核心商务", audience: "高端改善 / 资产配置", labelClass: "", points: "640,980 722,982 744,1060 672,1098 620,1045" },
  { id: "sanshengxiang", name: "三圣乡", shortName: "三圣乡", tier: "quality", tone: "mature", priceBand: [28000, 40000], inventory: 5, focus: "东门改善、低密景观", audience: "改善 / 高改", labelClass: "", points: "760,950 840,940 860,1030 790,1085 730,1035" },
  { id: "damian", name: "大面", shortName: "大面", tier: "quality", tone: "growth", priceBand: [22000, 32000], inventory: 6, focus: "东南改善、城市外延", audience: "首改 / 改善", labelClass: "", points: "820,1070 900,1060 910,1145 850,1190 790,1140" },
  { id: "zhonghe", name: "中和", shortName: "中和", tier: "quality", tone: "growth", priceBand: [24000, 35000], inventory: 7, focus: "高新南承接、改善稳定", audience: "首改 / 改善", labelClass: "", points: "728,1030 806,1020 828,1106 760,1147 710,1090" },
  { id: "xinchuan", name: "新川", shortName: "新川", tier: "quality", tone: "growth", priceBand: [26000, 38000], inventory: 7, focus: "科技产业、高新外溢", audience: "首改 / 改善", labelClass: "", points: "760,1120 825,1110 838,1182 782,1226 735,1185" },
  { id: "huayang", name: "华阳", shortName: "华阳", tier: "quality", tone: "mature", priceBand: [24000, 34000], inventory: 6, focus: "南门成熟生活圈", audience: "首改 / 改善", labelClass: "", points: "680,1152 760,1142 782,1228 715,1268 665,1225" },
  { id: "luhu", name: "麓湖", shortName: "麓湖", tier: "core", tone: "ecology", priceBand: [38000, 68000], inventory: 5, focus: "生态湖居、高端改善", audience: "高端改善 / 资产升级", labelClass: "", points: "700,1280 790,1268 812,1350 730,1400 648,1360" },
  { id: "yajule", name: "雅居乐", shortName: "雅居乐", tier: "outer", tone: "ecology", priceBand: [21000, 32000], inventory: 5, focus: "南拓居住、自住导向", audience: "首改 / 改善", labelClass: "", points: "802,1202 898,1192 918,1268 826,1294" },
  { id: "biocity", name: "天府生物城", shortName: "生物城", tier: "outer", tone: "growth", priceBand: [20000, 30000], inventory: 7, focus: "产业支撑、成长预期", audience: "首改 / 改善", labelClass: "small", points: "510,1298 640,1278 690,1368 620,1440 505,1412 465,1360" },
  { id: "xinglonghu", name: "兴隆湖", shortName: "兴隆湖", tier: "normal", tone: "ecology", priceBand: [23000, 34000], inventory: 6, focus: "生态兑现、科技中轴", audience: "首改 / 改善", labelClass: "", points: "782,1335 876,1332 895,1405 805,1445 742,1404" },
  { id: "puxing", name: "普兴", shortName: "普兴", tier: "outer", tone: "value", priceBand: [13000, 19000], inventory: 4, focus: "南向外延、总价低", audience: "刚需 / 首置", labelClass: "", points: "260,1315 355,1290 390,1395 332,1450 230,1410" },
  { id: "wujin", name: "五津", shortName: "五津", tier: "outer", tone: "value", priceBand: [12500, 18500], inventory: 4, focus: "新津承接、低总价", audience: "刚需 / 首置", labelClass: "", points: "135,1245 205,1238 212,1308 142,1318" }
];

const refs = {
  phoneApp: document.querySelector(".phone-app"),
  mapVisual: document.querySelector(".map-visual"),
  legendRail: document.getElementById("legendRail"),
  sectorMap: document.getElementById("sectorMap"),
  projectMapCard: document.getElementById("projectMapCard"),
  navCloseButton: document.getElementById("navCloseButton"),
  zoomInButton: document.getElementById("zoomInButton"),
  zoomOutButton: document.getElementById("zoomOutButton"),
  resetViewButton: document.getElementById("resetViewButton"),
  bottomSheet: document.getElementById("bottomSheet"),
  sheetToggle: document.getElementById("sheetToggle"),
  sheetTitle: document.getElementById("sheetTitle"),
  sheetSubtitle: document.getElementById("sheetSubtitle"),
  sheetMetrics: document.getElementById("sheetMetrics"),
  projectCount: document.getElementById("projectCount"),
  projectList: document.getElementById("projectList")
};

const state = {
  activeSectorId: "financial-city",
  activeProjectId: null,
  sheetCollapsed: true,
  initialFocusMode: "overview",
  viewBox: { ...BASE_VIEWBOX },
  suppressClickUntil: 0
};

const sectorElements = new Map();
let projectMarkersLayer = null;
const gestureState = {
  mousePan: null,
  touchMode: null,
  touchStartDistance: 0,
  touchStartMidpoint: null,
  touchStartViewBox: null,
  panStartPoint: null
};

const SECTORS = SECTOR_BLUEPRINTS.map((sector, index) => {
  const points = parsePoints(sector.points);
  const center = getPolygonCentroid(points);
  const color = TIER_META[sector.tier].color;
  return {
    ...sector,
    points,
    center,
    color,
    priceRange: formatPriceRange(sector.priceBand),
    supply: `${sector.inventory}盘在售`,
    note: `${sector.name}属于${TIER_META[sector.tier].label}，以${sector.focus}为主，更适合${sector.audience}关注。当前这版边界按你给的参考图做了手工重绘，适合先做专题页和板块选房展示。`,
    projects: createProjects(sector, index)
  };
});

function findProjectById(projectId) {
  for (const sector of SECTORS) {
    const project = sector.projects.find((item) => item.id === projectId);
    if (project) {
      return { sector, project };
    }
  }
  return null;
}

function openProjectDetail(projectId) {
  const match = findProjectById(projectId);
  if (!match) {
    return;
  }
  window.location.href = buildProjectDetailUrl(projectId);
}

window.ChengduSectorMapData = {
  sectors: SECTORS,
  tierMeta: TIER_META,
  findProjectById,
  buildProjectDetailUrl
};

function parsePoints(text) {
  return text.trim().split(/\s+/).map((pair) => {
    const [x, y] = pair.split(",").map(Number);
    return { x, y };
  });
}

function pointsToString(points) {
  return points.map((point) => `${point.x},${point.y}`).join(" ");
}

function getPolygonCentroid(points) {
  let area = 0;
  let x = 0;
  let y = 0;

  for (let i = 0; i < points.length; i += 1) {
    const current = points[i];
    const next = points[(i + 1) % points.length];
    const cross = current.x * next.y - next.x * current.y;
    area += cross;
    x += (current.x + next.x) * cross;
    y += (current.y + next.y) * cross;
  }

  area *= 0.5;
  if (!area) {
    const avg = points.reduce((acc, point) => {
      acc.x += point.x;
      acc.y += point.y;
      return acc;
    }, { x: 0, y: 0 });
    return { x: avg.x / points.length, y: avg.y / points.length };
  }

  return {
    x: x / (6 * area),
    y: y / (6 * area)
  };
}

function formatWan(value) {
  const result = (value / 10000).toFixed(1);
  return result.endsWith(".0") ? result.slice(0, -2) : result;
}

function formatPriceRange([min, max]) {
  return `${formatWan(min)}万-${formatWan(max)}万/㎡`;
}

function formatUnitPrice(value) {
  return `${Math.round(value / 100) * 100}元/㎡`;
}

function buildProjectId(sectorId, projectIndex) {
  return `${sectorId}-${projectIndex + 1}`;
}

function buildProjectDetailUrl(projectId) {
  return `./project-detail.html?projectId=${encodeURIComponent(projectId)}`;
}

function createProjects(sector, index) {
  const pool = PROJECT_POOLS[sector.tone] || PROJECT_POOLS.mature;
  const count = sector.inventory >= 7 || sector.priceBand[1] >= 38000 ? 3 : 2;
  const centerPrice = Math.round((sector.priceBand[0] + sector.priceBand[1]) / 2);

  return Array.from({ length: count }, (_, projectIndex) => {
    const template = pool[(index + projectIndex) % pool.length];
    const delta = projectIndex === 0 ? -1200 : projectIndex === 1 ? 600 : 1800;
    const clampedPrice = Math.min(sector.priceBand[1], Math.max(sector.priceBand[0], centerPrice + delta));
    const projectId = buildProjectId(sector.id, projectIndex);

    return {
      id: projectId,
      sectorId: sector.id,
      sectorName: sector.name,
      name: `${sector.shortName}${template.suffix}`,
      shortLabel: `${sector.shortName}${template.suffix}`.slice(0, 4),
      detailUrl: buildProjectDetailUrl(projectId),
      price: formatUnitPrice(clampedPrice),
      area: template.area,
      tags: template.tags,
      intro: `${sector.name}板块示例楼盘。${template.intro}`
    };
  });
}

function getActiveSector() {
  return SECTORS.find((sector) => sector.id === state.activeSectorId) || SECTORS[0];
}

function getActiveProject() {
  const sector = getActiveSector();
  return sector.projects.find((project) => project.id === state.activeProjectId) || sector.projects[0] || null;
}

function renderLegend() {
  refs.legendRail.innerHTML = LEGEND.map((item) => `
    <span class="legend-item">
      <i style="background:${item.color}"></i>${item.label}
    </span>
  `).join("");
}

function createSvgElement(tagName, attributes = {}) {
  const element = document.createElementNS(SVG_NS, tagName);
  Object.entries(attributes).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      element.setAttribute(key, String(value));
    }
  });
  return element;
}

function lonToTilePixelX(lon, zoom) {
  return ((lon + 180) / 360) * (2 ** zoom) * REAL_MAP_TILE_SIZE;
}

function latToTilePixelY(lat, zoom) {
  const sinLat = Math.sin((lat * Math.PI) / 180);
  return (
    0.5 - Math.log((1 + sinLat) / (1 - sinLat)) / (4 * Math.PI)
  ) * (2 ** zoom) * REAL_MAP_TILE_SIZE;
}

function getRealMapPixelBounds() {
  const { bounds, zoom } = REAL_MAP;
  return {
    minX: lonToTilePixelX(bounds.west, zoom),
    maxX: lonToTilePixelX(bounds.east, zoom),
    minY: latToTilePixelY(bounds.north, zoom),
    maxY: latToTilePixelY(bounds.south, zoom)
  };
}

function realMapPixelToSvg(pixelX, pixelY, pixelBounds) {
  return {
    x: ((pixelX - pixelBounds.minX) / (pixelBounds.maxX - pixelBounds.minX)) * BASE_VIEWBOX.width,
    y: ((pixelY - pixelBounds.minY) / (pixelBounds.maxY - pixelBounds.minY)) * BASE_VIEWBOX.height
  };
}

function getRealMapTileUrl(x, y) {
  return REAL_MAP.urlTemplate
    .replace("{z}", REAL_MAP.zoom)
    .replace("{x}", x)
    .replace("{y}", y);
}

function renderRealMapLayer() {
  const pixelBounds = getRealMapPixelBounds();
  const startTileX = Math.floor(pixelBounds.minX / REAL_MAP_TILE_SIZE);
  const endTileX = Math.floor(pixelBounds.maxX / REAL_MAP_TILE_SIZE);
  const startTileY = Math.floor(pixelBounds.minY / REAL_MAP_TILE_SIZE);
  const endTileY = Math.floor(pixelBounds.maxY / REAL_MAP_TILE_SIZE);

  const layer = createSvgElement("g", {
    id: "realMapLayer",
    class: "real-map-layer",
    "aria-hidden": "true"
  });

  layer.appendChild(createSvgElement("rect", {
    class: "real-map-underlay",
    x: BASE_VIEWBOX.x,
    y: BASE_VIEWBOX.y,
    width: BASE_VIEWBOX.width,
    height: BASE_VIEWBOX.height
  }));

  for (let tileX = startTileX; tileX <= endTileX; tileX += 1) {
    for (let tileY = startTileY; tileY <= endTileY; tileY += 1) {
      const topLeft = realMapPixelToSvg(
        tileX * REAL_MAP_TILE_SIZE,
        tileY * REAL_MAP_TILE_SIZE,
        pixelBounds
      );
      const bottomRight = realMapPixelToSvg(
        (tileX + 1) * REAL_MAP_TILE_SIZE,
        (tileY + 1) * REAL_MAP_TILE_SIZE,
        pixelBounds
      );
      const tileUrl = getRealMapTileUrl(tileX, tileY);
      const tileImage = createSvgElement("image", {
        class: "real-map-tile",
        href: tileUrl,
        x: topLeft.x,
        y: topLeft.y,
        width: bottomRight.x - topLeft.x,
        height: bottomRight.y - topLeft.y,
        preserveAspectRatio: "none"
      });
      tileImage.setAttributeNS(XLINK_NS, "href", tileUrl);
      layer.appendChild(tileImage);
    }
  }

  layer.appendChild(createSvgElement("rect", {
    class: "real-map-veil",
    x: BASE_VIEWBOX.x,
    y: BASE_VIEWBOX.y,
    width: BASE_VIEWBOX.width,
    height: BASE_VIEWBOX.height
  }));

  refs.sectorMap.appendChild(layer);
}

function renderMap() {
  refs.sectorMap.innerHTML = "";
  sectorElements.clear();
  projectMarkersLayer = null;
  refs.sectorMap.setAttribute("viewBox", `${BASE_VIEWBOX.x} ${BASE_VIEWBOX.y} ${BASE_VIEWBOX.width} ${BASE_VIEWBOX.height}`);
  renderRealMapLayer();

  SECTORS.forEach((sector) => {
    const group = createSvgElement("g", {
      class: "sector-group" + (sector.id === state.activeSectorId ? " is-active" : ""),
      "data-sector-id": sector.id
    });

    const polygon = createSvgElement("polygon", {
      class: "sector-region",
      points: pointsToString(sector.points),
      fill: sector.color
    });

    const text = createSvgElement("text", {
      class: `sector-label ${sector.labelClass || ""}`.trim(),
      x: sector.center.x,
      y: sector.center.y + 6
    });
    text.textContent = sector.shortName;

    group.appendChild(polygon);
    group.appendChild(text);
    refs.sectorMap.appendChild(group);
    sectorElements.set(sector.id, group);
  });

  projectMarkersLayer = createSvgElement("g", { id: "projectMarkersLayer" });
  refs.sectorMap.appendChild(projectMarkersLayer);

  refs.sectorMap.addEventListener("click", onMapClick);
}

function onMapClick(event) {
  if (Date.now() < state.suppressClickUntil) {
    return;
  }
  const marker = event.target.closest("[data-project-id]");
  if (marker) {
    openProjectMapCard(marker.getAttribute("data-project-id"));
    return;
  }
  const group = event.target.closest("[data-sector-id]");
  if (!group) {
    closeProjectMapCard();
    return;
  }
  closeProjectMapCard();
  setActiveSector(group.getAttribute("data-sector-id"), { expandSheet: true, focusMap: true });
}

function renderSheet() {
  const sector = getActiveSector();
  if (!sector.projects.some((project) => project.id === state.activeProjectId)) {
    state.activeProjectId = sector.projects[0]?.id || null;
  }
  refs.sheetTitle.textContent = sector.name;
  refs.sheetSubtitle.textContent = sector.priceRange;

  refs.sheetMetrics.innerHTML = [
    { label: "板块层级", value: TIER_META[sector.tier].label },
    { label: "价格带", value: sector.priceRange },
    { label: "在售情况", value: sector.supply }
  ].map((item) => `
    <div class="metric-card">
      <span>${item.label}</span>
      <strong>${item.value}</strong>
    </div>
  `).join("");

  refs.projectCount.textContent = `${sector.projects.length} 个楼盘`;
  refs.projectList.innerHTML = sector.projects.map((project) => `
    <article class="project-card ${project.id === state.activeProjectId ? "is-active" : ""}" data-project-id="${project.id}" tabindex="0" role="link" aria-label="查看 ${project.name} 详情">
      <div class="project-card__top">
        <div>
          <h4>${project.name}</h4>
          <div class="project-card__meta">
            <span>${sector.name}</span>
            <span>${project.area}</span>
          </div>
        </div>
        <div class="project-price">
          ${project.price}
          <small>参考均价</small>
        </div>
      </div>
      <div class="project-card__footer">
        <a class="project-card__link" href="${project.detailUrl}" data-action="detail" data-project-id="${project.id}">查看详情</a>
      </div>
    </article>
  `).join("");
}

function updateMapSelection() {
  sectorElements.forEach((group, sectorId) => {
    group.classList.toggle("is-active", sectorId === state.activeSectorId);
  });

  const activeGroup = sectorElements.get(state.activeSectorId);
  if (activeGroup) {
    refs.sectorMap.appendChild(activeGroup);
  }
  if (projectMarkersLayer) {
    refs.sectorMap.appendChild(projectMarkersLayer);
  }

  renderProjectMarkers();
}

function getSectorBounds(points) {
  return points.reduce((bounds, point) => ({
    minX: Math.min(bounds.minX, point.x),
    minY: Math.min(bounds.minY, point.y),
    maxX: Math.max(bounds.maxX, point.x),
    maxY: Math.max(bounds.maxY, point.y)
  }), {
    minX: Number.POSITIVE_INFINITY,
    minY: Number.POSITIVE_INFINITY,
    maxX: Number.NEGATIVE_INFINITY,
    maxY: Number.NEGATIVE_INFINITY
  });
}

function pointInPolygon(point, polygon) {
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i, i += 1) {
    const xi = polygon[i].x;
    const yi = polygon[i].y;
    const xj = polygon[j].x;
    const yj = polygon[j].y;

    const intersect = ((yi > point.y) !== (yj > point.y))
      && (point.x < ((xj - xi) * (point.y - yi)) / (yj - yi || 1e-9) + xi);
    if (intersect) {
      inside = !inside;
    }
  }
  return inside;
}

function getProjectMarkerPositions(sector) {
  const bounds = getSectorBounds(sector.points);
  const width = bounds.maxX - bounds.minX;
  const height = bounds.maxY - bounds.minY;
  const centroid = sector.center;
  const candidateOffsets = [
    { x: 0, y: 0 },
    { x: width * 0.18, y: -height * 0.14 },
    { x: -width * 0.2, y: height * 0.16 },
    { x: width * 0.16, y: height * 0.16 },
    { x: -width * 0.16, y: -height * 0.18 }
  ];

  return sector.projects.map((project, index) => {
    const candidates = candidateOffsets.map((offset, offsetIndex) => {
      const base = candidateOffsets[(index + offsetIndex) % candidateOffsets.length];
      return {
        x: centroid.x + base.x,
        y: centroid.y + base.y
      };
    });

    const hit = candidates.find((candidate) => pointInPolygon(candidate, sector.points));
    return {
      ...project,
      position: hit || { x: centroid.x, y: centroid.y }
    };
  });
}

function renderProjectMarkers() {
  if (!projectMarkersLayer) {
    return;
  }

  projectMarkersLayer.innerHTML = "";
  projectMarkersLayer.classList.toggle("is-hidden", !shouldShowProjectLayer());
  if (!shouldShowProjectLayer()) {
    closeProjectMapCard();
    return;
  }

  const markers = SECTORS.flatMap((sector) => getProjectMarkerPositions(sector).map((project) => ({
    ...project,
    sector
  })));

  markers.forEach((project, index) => {
    const isActiveSector = project.sector.id === state.activeSectorId;
    const group = createSvgElement("g", {
      class: [
        "project-marker",
        project.id === state.activeProjectId ? "is-active" : "",
        isActiveSector ? "" : "is-muted"
      ].filter(Boolean).join(" "),
      transform: `translate(${project.position.x}, ${project.position.y})`,
      "data-project-id": project.id,
      "data-sector-id": project.sector.id,
      role: "button",
      tabindex: 0,
      "aria-label": `打开 ${project.name} 项目卡片`
    });

    const pinRing = createSvgElement("circle", {
      class: "project-pin-ring",
      cx: 0,
      cy: 0,
      r: 18
    });

    const pin = createSvgElement("circle", {
      class: "project-pin",
      cx: 0,
      cy: 0,
      r: 12
    });

    const pinCore = createSvgElement("circle", {
      class: "project-pin-core",
      cx: 0,
      cy: 0,
      r: 4.5
    });

    const markerLabel = project.name;
    const markerLabelLength = Array.from(markerLabel).length;
    const chipWidth = Math.max(58, markerLabelLength * 12 + 18);
    const chip = createSvgElement("rect", {
      class: "project-chip",
      x: -(chipWidth / 2),
      y: -34,
      rx: 8,
      ry: 8,
      width: chipWidth,
      height: 22
    });

    const text = createSvgElement("text", {
      class: "project-chip-text",
      x: 0,
      y: -19
    });
    text.textContent = markerLabel || `项目${index + 1}`;

    group.appendChild(pinRing);
    group.appendChild(chip);
    group.appendChild(pin);
    group.appendChild(pinCore);
    group.appendChild(text);
    projectMarkersLayer.appendChild(group);
  });
}

function shouldShowProjectLayer() {
  return state.viewBox.width <= PROJECT_LAYER_VIEWBOX_WIDTH;
}

function getProjectMarkerRecord(projectId) {
  const match = findProjectById(projectId);
  if (!match) {
    return null;
  }
  const marker = getProjectMarkerPositions(match.sector).find((item) => item.id === projectId);
  if (!marker) {
    return null;
  }
  return {
    sector: match.sector,
    project: match.project,
    position: marker.position
  };
}

function getVisualPointFromSvg(point) {
  const { rect, scale, offsetX, offsetY } = getRenderMetrics();
  const visualRect = refs.mapVisual.getBoundingClientRect();
  return {
    x: rect.left - visualRect.left + offsetX + (point.x - state.viewBox.x) * scale,
    y: rect.top - visualRect.top + offsetY + (point.y - state.viewBox.y) * scale
  };
}

function positionProjectMapCard() {
  if (!refs.projectMapCard || refs.projectMapCard.hidden || !state.activeProjectId) {
    return;
  }
  const record = getProjectMarkerRecord(state.activeProjectId);
  if (!record) {
    return;
  }

  const point = getVisualPointFromSvg(record.position);
  const visualRect = refs.mapVisual.getBoundingClientRect();
  const cardRect = refs.projectMapCard.getBoundingClientRect();
  const safeGap = 12;
  const left = clamp(point.x, cardRect.width / 2 + safeGap, visualRect.width - cardRect.width / 2 - safeGap);
  let top = point.y - cardRect.height - 24;

  if (top < safeGap) {
    top = point.y + 26;
  }

  top = clamp(top, safeGap, Math.max(safeGap, visualRect.height - cardRect.height - 104));
  refs.projectMapCard.style.left = `${left}px`;
  refs.projectMapCard.style.top = `${top}px`;
}

function renderProjectMapCard(record) {
  const { sector, project } = record;
  refs.projectMapCard.innerHTML = `
    <button class="project-map-card__close" type="button" data-close-project-map-card aria-label="关闭项目卡片">×</button>
    <p class="project-map-card__kicker">${sector.name}</p>
    <h4>${project.name}</h4>
    <div class="project-map-card__meta">
      <span>${project.area}</span>
      ${project.tags.slice(0, 2).map((tag) => `<span>${tag}</span>`).join("")}
    </div>
    <div class="project-map-card__price">
      <span>参考均价</span>
      <strong>${project.price}</strong>
    </div>
    <div class="project-map-card__actions">
      <a href="${project.detailUrl}" data-action="detail" data-project-id="${project.id}">查看详情</a>
    </div>
  `;
  refs.projectMapCard.hidden = false;
  window.requestAnimationFrame(positionProjectMapCard);
}

function closeProjectMapCard() {
  if (!refs.projectMapCard) {
    return;
  }
  refs.projectMapCard.hidden = true;
  refs.projectMapCard.innerHTML = "";
}

function openProjectMapCard(projectId, options = {}) {
  const record = getProjectMarkerRecord(projectId);
  if (!record) {
    return;
  }
  state.activeSectorId = record.sector.id;
  state.activeProjectId = record.project.id;
  renderSheet();
  updateMapSelection();
  setSheetCollapsed(true);
  if (options.focusMap) {
    focusProjectView(record.sector, record.project.id);
  }
  renderProjectMapCard(record);
}

function cloneViewBox(viewBox) {
  return {
    x: viewBox.x,
    y: viewBox.y,
    width: viewBox.width,
    height: viewBox.height
  };
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function normalizeViewBox(viewBox) {
  const ratio = BASE_VIEWBOX.height / BASE_VIEWBOX.width;
  const width = clamp(viewBox.width, MIN_VIEWBOX_WIDTH, BASE_VIEWBOX.width);
  const height = width * ratio;
  const maxX = BASE_VIEWBOX.x + BASE_VIEWBOX.width - width;
  const maxY = BASE_VIEWBOX.y + BASE_VIEWBOX.height - height;

  return {
    x: clamp(viewBox.x, BASE_VIEWBOX.x, maxX),
    y: clamp(viewBox.y, BASE_VIEWBOX.y, maxY),
    width,
    height
  };
}

function applyViewBox(nextViewBox) {
  state.viewBox = normalizeViewBox(nextViewBox);
  refs.sectorMap.setAttribute(
    "viewBox",
    `${state.viewBox.x} ${state.viewBox.y} ${state.viewBox.width} ${state.viewBox.height}`
  );
  renderProjectMarkers();
  positionProjectMapCard();
}

function getRenderMetrics(referenceViewBox = state.viewBox) {
  const rect = refs.sectorMap.getBoundingClientRect();
  const scale = Math.min(rect.width / referenceViewBox.width, rect.height / referenceViewBox.height);
  const contentWidth = referenceViewBox.width * scale;
  const contentHeight = referenceViewBox.height * scale;
  const offsetX = (rect.width - contentWidth) / 2;
  const offsetY = 0;
  return { rect, scale, offsetX, offsetY };
}

function clientToSvg(clientX, clientY, referenceViewBox = state.viewBox) {
  const { rect, scale, offsetX, offsetY } = getRenderMetrics(referenceViewBox);
  return {
    x: referenceViewBox.x + (clientX - rect.left - offsetX) / scale,
    y: referenceViewBox.y + (clientY - rect.top - offsetY) / scale
  };
}

function zoomAt(factor, clientX, clientY, referenceViewBox = state.viewBox) {
  const anchor = clientToSvg(clientX, clientY, referenceViewBox);
  const nextWidth = referenceViewBox.width * factor;
  const nextHeight = referenceViewBox.height * factor;
  const widthRatio = nextWidth / referenceViewBox.width;
  const heightRatio = nextHeight / referenceViewBox.height;

  applyViewBox({
    x: anchor.x - (anchor.x - referenceViewBox.x) * widthRatio,
    y: anchor.y - (anchor.y - referenceViewBox.y) * heightRatio,
    width: nextWidth,
    height: nextHeight
  });
}

function resetViewBox() {
  applyViewBox({ ...DEFAULT_VIEWBOX });
}

function focusSectorView(sector) {
  const bounds = getSectorBounds(sector.points);
  const paddingX = 90;
  const paddingY = 120;
  const ratio = BASE_VIEWBOX.height / BASE_VIEWBOX.width;
  const targetWidth = Math.max(
    MIN_VIEWBOX_WIDTH,
    bounds.maxX - bounds.minX + paddingX * 2,
    (bounds.maxY - bounds.minY + paddingY * 2) / ratio
  );
  const targetHeight = targetWidth * ratio;
  const centerX = (bounds.minX + bounds.maxX) / 2;
  const centerY = (bounds.minY + bounds.maxY) / 2;

  applyViewBox({
    x: centerX - targetWidth / 2,
    y: centerY - targetHeight / 2,
    width: targetWidth,
    height: targetHeight
  });
}

function focusProjectView(sector, projectId) {
  const marker = getProjectMarkerPositions(sector).find((item) => item.id === projectId);
  if (!marker) {
    focusSectorView(sector);
    return;
  }

  const ratio = BASE_VIEWBOX.height / BASE_VIEWBOX.width;
  const targetWidth = Math.max(MIN_VIEWBOX_WIDTH, 420);
  const targetHeight = targetWidth * ratio;

  applyViewBox({
    x: marker.position.x - targetWidth / 2,
    y: marker.position.y - targetHeight / 2,
    width: targetWidth,
    height: targetHeight
  });
}

function getTouchDistance(touchA, touchB) {
  const dx = touchA.clientX - touchB.clientX;
  const dy = touchA.clientY - touchB.clientY;
  return Math.hypot(dx, dy);
}

function getTouchMidpoint(touchA, touchB) {
  return {
    x: (touchA.clientX + touchB.clientX) / 2,
    y: (touchA.clientY + touchB.clientY) / 2
  };
}

function beginMousePan(event) {
  if (event.button !== 0) {
    return;
  }
  gestureState.mousePan = {
    startX: event.clientX,
    startY: event.clientY,
    startViewBox: cloneViewBox(state.viewBox),
    moved: false
  };
  refs.sectorMap.classList.add("is-dragging");
}

function updateMousePan(event) {
  if (!gestureState.mousePan) {
    return;
  }

  event.preventDefault();
  const metrics = getRenderMetrics(gestureState.mousePan.startViewBox);
  const dx = event.clientX - gestureState.mousePan.startX;
  const dy = event.clientY - gestureState.mousePan.startY;

  if (Math.abs(dx) > 4 || Math.abs(dy) > 4) {
    gestureState.mousePan.moved = true;
  }

  applyViewBox({
    x: gestureState.mousePan.startViewBox.x - dx / metrics.scale,
    y: gestureState.mousePan.startViewBox.y - dy / metrics.scale,
    width: gestureState.mousePan.startViewBox.width,
    height: gestureState.mousePan.startViewBox.height
  });
}

function endMousePan() {
  if (gestureState.mousePan && gestureState.mousePan.moved) {
    state.suppressClickUntil = Date.now() + CLICK_SUPPRESS_MS;
  }
  gestureState.mousePan = null;
  refs.sectorMap.classList.remove("is-dragging");
}

function onWheelZoom(event) {
  event.preventDefault();
  const factor = event.deltaY > 0 ? 1.12 : 0.88;
  zoomAt(factor, event.clientX, event.clientY);
}

function onTouchStart(event) {
  if (event.touches.length === 1) {
    const touch = event.touches[0];
    gestureState.touchMode = "pan";
    gestureState.panStartPoint = { x: touch.clientX, y: touch.clientY, moved: false };
    gestureState.touchStartViewBox = cloneViewBox(state.viewBox);
  } else if (event.touches.length === 2) {
    const [first, second] = event.touches;
    gestureState.touchMode = "pinch";
    gestureState.touchStartDistance = getTouchDistance(first, second);
    gestureState.touchStartMidpoint = getTouchMidpoint(first, second);
    gestureState.touchStartViewBox = cloneViewBox(state.viewBox);
  }
}

function onTouchMove(event) {
  if (!event.touches.length) {
    return;
  }

  if (gestureState.touchMode === "pan" && event.touches.length === 1 && gestureState.panStartPoint) {
    const touch = event.touches[0];
    const metrics = getRenderMetrics(gestureState.touchStartViewBox);
    const dx = touch.clientX - gestureState.panStartPoint.x;
    const dy = touch.clientY - gestureState.panStartPoint.y;

    if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
      gestureState.panStartPoint.moved = true;
    }

    event.preventDefault();
    applyViewBox({
      x: gestureState.touchStartViewBox.x - dx / metrics.scale,
      y: gestureState.touchStartViewBox.y - dy / metrics.scale,
      width: gestureState.touchStartViewBox.width,
      height: gestureState.touchStartViewBox.height
    });
  } else if (event.touches.length === 2 && gestureState.touchStartViewBox) {
    const [first, second] = event.touches;
    const currentDistance = getTouchDistance(first, second);
    const midpoint = getTouchMidpoint(first, second);
    const scaleFactor = gestureState.touchStartDistance / currentDistance;

    event.preventDefault();
    zoomAt(
      scaleFactor,
      midpoint.x,
      midpoint.y,
      gestureState.touchStartViewBox
    );
    state.suppressClickUntil = Date.now() + CLICK_SUPPRESS_MS;
  }
}

function onTouchEnd() {
  if (gestureState.touchMode === "pan" && gestureState.panStartPoint && gestureState.panStartPoint.moved) {
    state.suppressClickUntil = Date.now() + CLICK_SUPPRESS_MS;
  }

  if (gestureState.touchMode === "pinch") {
    state.suppressClickUntil = Date.now() + CLICK_SUPPRESS_MS;
  }

  gestureState.touchMode = null;
  gestureState.touchStartDistance = 0;
  gestureState.touchStartMidpoint = null;
  gestureState.touchStartViewBox = null;
  gestureState.panStartPoint = null;
}

function setSheetCollapsed(collapsed) {
  state.sheetCollapsed = collapsed;
  refs.bottomSheet.classList.toggle("is-collapsed", collapsed);
  refs.bottomSheet.hidden = collapsed;
  refs.bottomSheet.setAttribute("aria-hidden", String(collapsed));
  refs.phoneApp.classList.toggle("sheet-collapsed", collapsed);
  refs.sheetToggle.textContent = collapsed ? "展开" : "收起";
  refs.sheetToggle.setAttribute("aria-expanded", String(!collapsed));
}

function setActiveSector(sectorId, options = {}) {
  const { expandSheet = true, focusMap = true } = options;
  if (!SECTORS.some((sector) => sector.id === sectorId)) {
    return;
  }

  state.activeSectorId = sectorId;
  const sector = getActiveSector();
  if (!sector.projects.some((project) => project.id === state.activeProjectId)) {
    state.activeProjectId = sector.projects[0]?.id || null;
  }
  renderSheet();
  updateMapSelection();

  if (expandSheet) {
    setSheetCollapsed(false);
  }

  if (focusMap) {
    focusSectorView(sector);
  }
}

function applyInitialSelection() {
  const params = new URLSearchParams(window.location.search);
  const sectorId = params.get("sector");
  const projectId = params.get("project");
  state.initialFocusMode = "overview";

  if (projectId) {
    const match = findProjectById(projectId);
    if (match) {
      state.activeSectorId = match.sector.id;
      state.activeProjectId = match.project.id;
      state.initialFocusMode = "project";
      return;
    }
  }

  if (sectorId && SECTORS.some((sector) => sector.id === sectorId)) {
    state.activeSectorId = sectorId;
    state.initialFocusMode = "sector";
  }

  state.activeProjectId = getActiveProject()?.id || null;
}

function bindEvents() {
  refs.navCloseButton?.addEventListener("click", () => {
    window.close();
    if (window.history.length > 1) {
      window.setTimeout(() => {
        window.history.back();
      }, 80);
    }
  });

  refs.zoomInButton.addEventListener("click", () => {
    const rect = refs.sectorMap.getBoundingClientRect();
    zoomAt(0.84, rect.left + rect.width / 2, rect.top + rect.height / 2);
  });

  refs.zoomOutButton.addEventListener("click", () => {
    const rect = refs.sectorMap.getBoundingClientRect();
    zoomAt(1.18, rect.left + rect.width / 2, rect.top + rect.height / 2);
  });

  refs.resetViewButton.addEventListener("click", resetViewBox);

  refs.sectorMap.addEventListener("wheel", onWheelZoom, { passive: false });
  refs.sectorMap.addEventListener("mousedown", beginMousePan);
  window.addEventListener("mousemove", updateMousePan);
  window.addEventListener("mouseup", endMousePan);
  refs.sectorMap.addEventListener("touchstart", onTouchStart, { passive: true });
  refs.sectorMap.addEventListener("touchmove", onTouchMove, { passive: false });
  refs.sectorMap.addEventListener("touchend", onTouchEnd, { passive: true });
  refs.sectorMap.addEventListener("touchcancel", onTouchEnd, { passive: true });

  refs.sheetToggle.addEventListener("click", () => {
    setSheetCollapsed(!state.sheetCollapsed);
  });

  refs.projectList.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-project-id]");
    if (!trigger) {
      return;
    }
    event.preventDefault();
    openProjectDetail(trigger.getAttribute("data-project-id"));
  });

  refs.projectList.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }
    if (event.target.closest(".project-card__link")) {
      return;
    }
    const card = event.target.closest(".project-card");
    if (!card) {
      return;
    }
    event.preventDefault();
    openProjectDetail(card.getAttribute("data-project-id"));
  });

  refs.projectMapCard.addEventListener("click", (event) => {
    const closeTrigger = event.target.closest("[data-close-project-map-card]");
    if (closeTrigger) {
      closeProjectMapCard();
      return;
    }
  });

  refs.sectorMap.addEventListener("keydown", (event) => {
    if (!["Enter", " "].includes(event.key)) {
      return;
    }
    const marker = event.target.closest("[data-project-id]");
    if (!marker) {
      return;
    }
    event.preventDefault();
    openProjectMapCard(marker.getAttribute("data-project-id"));
  });

  window.addEventListener("resize", positionProjectMapCard);
}

function init() {
  applyInitialSelection();
  renderLegend();
  renderMap();
  resetViewBox();
  renderSheet();
  updateMapSelection();
  setSheetCollapsed(state.sheetCollapsed);
  if (state.initialFocusMode === "project" && state.activeProjectId) {
    focusProjectView(getActiveSector(), state.activeProjectId);
  } else if (state.initialFocusMode === "sector") {
    focusSectorView(getActiveSector());
  }
  bindEvents();
}

if (refs.sectorMap) {
  init();
}
