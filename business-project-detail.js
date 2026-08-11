(() => {
  const IMAGE_OFFICE = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80";
  const IMAGE_INTERIOR = "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80";
  const IMAGE_WORKSPACE = "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80";
  const IMAGE_BUILDING = "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80";
  const FOLLOWED_PROJECTS_KEY = "transparentHouse:followedProjects";
  const BROWSING_HISTORY_KEY = "transparentHouse:browsingHistory";

  const supportTemplates = {
    commercial: {
      traffic: [
        { icon: "交", title: "天府三街站", desc: "轨道交通与公交接驳便利", x: 25, y: 35 },
        { icon: "路", title: "天府大道", desc: "城市南北向主干道", x: 72, y: 68 }
      ],
      commerce: [
        { icon: "商", title: "环球中心", desc: "大型商业综合体与休闲配套", x: 72, y: 30 },
        { icon: "购", title: "银泰城", desc: "餐饮、购物与生活服务集中", x: 30, y: 72 }
      ],
      park: [
        { icon: "园", title: "桂溪生态公园", desc: "城市生态绿地与休闲步道", x: 68, y: 30 },
        { icon: "湖", title: "锦城湖公园", desc: "滨水景观与户外休闲空间", x: 32, y: 70 }
      ]
    },
    office: {
      traffic: [
        { icon: "交", title: "金融城站", desc: "轨道交通快速接驳", x: 25, y: 35 },
        { icon: "路", title: "交子大道", desc: "城市商务主轴", x: 72, y: 68 }
      ],
      commerce: [
        { icon: "商", title: "交子公园商圈", desc: "商务宴请与休闲配套完善", x: 72, y: 30 },
        { icon: "购", title: "悠方购物中心", desc: "办公人群日常消费配套", x: 30, y: 72 }
      ],
      park: [
        { icon: "园", title: "交子公园", desc: "商务区城市公园与午间休闲空间", x: 68, y: 30 },
        { icon: "绿", title: "桂溪生态公园", desc: "生态绿道与企业活动空间", x: 32, y: 70 }
      ]
    }
  };
  supportTemplates.apartment = supportTemplates.commercial;

  const projects = {
    "commercial-tianfu": {
      id: "commercial-tianfu",
      category: "commercial",
      categoryLabel: "商业",
      name: "天府国际社区商业",
      district: "高新区",
      sector: "大源中央",
      address: "成都高新区天府三街",
      status: "在售",
      price: "88万 - 175万",
      tags: ["集中式商业", "精装修", "近地铁"],
      phone: "4000289988",
      total: 320,
      sold: 194,
      basic: [["项目名称","天府国际社区商业"],["所属区域","高新区"],["所属板块","大源中央"],["产权年限","40年"],["商业建筑面积","38 - 76 m²"],["标准层面积","约1,800 m²"],["户型区间","38 - 76 m²"],["总户数","320户"]],
      sales: [["开盘时间","2025年09月"],["交房时间","2027年06月"],["销售状态","在售"],["营销代理","世联行"]],
      property: [["物业公司","成都天府物业"],["物业费","6.8元/m²/月"]],
      intro: "项目位于高新区成熟商务生活圈，以集中式商业为核心，覆盖餐饮、零售与生活服务，周边轨道交通和商务客群资源丰富。",
      media: [
        { kind: "effect", title: "效果图", src: IMAGE_INTERIOR },
        { kind: "plan", title: "总平图", src: IMAGE_BUILDING },
        { kind: "layout", title: "平面图", src: IMAGE_WORKSPACE },
        { kind: "location", title: "区位图", src: IMAGE_OFFICE },
        { kind: "real", title: "实景图", src: IMAGE_INTERIOR }
      ]
    },
    "commercial-global": {
      id: "commercial-global",
      category: "commercial",
      categoryLabel: "商业",
      name: "环球中心商业中心",
      district: "高新区",
      sector: "金融城",
      address: "成都高新区环球中心",
      status: "在售",
      price: "118万 - 255万",
      tags: ["专业市场", "普通装修", "成熟配套"],
      phone: "4000289988",
      total: 246,
      sold: 142,
      basic: [["项目名称","环球中心商业中心"],["所属区域","高新区"],["所属板块","金融城"],["产权年限","40年"],["商业建筑面积","45 - 98 m²"],["标准层面积","约2,400 m²"],["户型区间","45 - 98 m²"],["总户数","246户"]],
      sales: [["开盘时间","2025年12月"],["交房时间","2027年12月"],["销售状态","在售"],["营销代理","中原地产"]],
      property: [["物业公司","环球中心物业"],["物业费","7.5元/m²/月"]],
      intro: "项目依托环球中心成熟商业客流和金融城商务资源，形成购物、餐饮、休闲与专业市场相结合的复合型商业空间。",
      media: [
        { kind: "effect", title: "效果图", src: IMAGE_BUILDING },
        { kind: "plan", title: "总平图", src: IMAGE_OFFICE },
        { kind: "layout", title: "平面图", src: IMAGE_WORKSPACE },
        { kind: "location", title: "区位图", src: IMAGE_INTERIOR },
        { kind: "real", title: "实景图", src: IMAGE_BUILDING }
      ]
    },
    "commercial-jinjiang": {
      id: "commercial-jinjiang",
      category: "commercial",
      categoryLabel: "商业",
      name: "锦江里·社区底商",
      district: "锦江区",
      sector: "春熙路",
      address: "成都锦江区东大街",
      status: "在售",
      price: "92万 - 186万",
      tags: ["社区底商", "毛坯", "核心商圈"],
      phone: "4000289988",
      total: 168,
      sold: 113,
      basic: [["项目名称","锦江里·社区底商"],["所属区域","锦江区"],["所属板块","春熙路"],["产权年限","40年"],["商业建筑面积","42 - 82 m²"],["标准层面积","约1,200 m²"],["户型区间","42 - 82 m²"],["总户数","168户"]],
      sales: [["开盘时间","2026年03月"],["交房时间","2027年09月"],["销售状态","在售"],["营销代理","锐理数据"]],
      property: [["物业公司","锦江城市物业"],["物业费","5.8元/m²/月"]],
      intro: "项目位于锦江区核心生活圈，社区人口密度和日常消费需求稳定，适合便利零售、轻餐饮及生活服务等社区商业业态。",
      media: [
        { kind: "effect", title: "效果图", src: IMAGE_WORKSPACE },
        { kind: "plan", title: "总平图", src: IMAGE_BUILDING },
        { kind: "layout", title: "平面图", src: IMAGE_INTERIOR },
        { kind: "location", title: "区位图", src: IMAGE_OFFICE },
        { kind: "real", title: "实景图", src: IMAGE_WORKSPACE }
      ]
    },
    "office-finance-city": {
      id: "office-finance-city",
      category: "office",
      categoryLabel: "写字楼",
      name: "金融城智汇中心",
      district: "高新区",
      sector: "金融城",
      address: "成都高新区交子大道",
      status: "在售",
      price: "320万 - 1280万",
      tags: ["精装修", "总部办公"],
      phone: "4000289988",
      total: 180,
      sold: 122,
      basic: [["项目名称","金融城智汇中心"],["所属区域","高新区"],["所属板块","金融城"],["产权年限","40年"],["办公建筑面积","120 - 520 m²"],["层高","4.2m"],["户型区间","120 - 520 m²"],["总户数","180户"]],
      sales: [["开盘时间","2025年10月"],["交房时间","2027年06月"],["销售状态","在售"],["营销代理","世邦魏理仕"]],
      property: [["物业公司","金融城物业"],["物业费","18元/m²/月"],["客梯数","12个"],["货梯数","2个"]],
      intro: "项目位于金融城核心商务区，面向总部企业和专业服务机构，具备轨道交通、商务配套和高标准物业管理等综合优势。",
      media: [
        { kind: "effect", title: "效果图", src: IMAGE_OFFICE },
        { kind: "plan", title: "总平图", src: IMAGE_BUILDING },
        { kind: "layout", title: "平面图", src: IMAGE_WORKSPACE },
        { kind: "location", title: "区位图", src: IMAGE_INTERIOR },
        { kind: "real", title: "实景图", src: IMAGE_OFFICE }
      ]
    },
    "office-tianfu-software": {
      id: "office-tianfu-software",
      category: "office",
      categoryLabel: "写字楼",
      name: "天府软件园创新中心",
      district: "高新区",
      sector: "大源中央",
      address: "成都高新区天府五街",
      status: "在售",
      price: "260万 - 960万",
      tags: ["SOHO", "普通装修", "产业办公"],
      phone: "4000289988",
      total: 236,
      sold: 154,
      basic: [["项目名称","天府软件园创新中心"],["所属区域","高新区"],["所属板块","大源中央"],["产权年限","40年"],["办公建筑面积","96 - 380 m²"],["层高","3.9m"],["户型区间","96 - 380 m²"],["总户数","236户"]],
      sales: [["开盘时间","2026年01月"],["交房时间","2027年12月"],["销售状态","在售"],["营销代理","戴德梁行"]],
      property: [["物业公司","天府软件园物业"],["物业费","15元/m²/月"],["客梯数","10个"],["货梯数","2个"]],
      intro: "项目紧邻天府软件园产业集群，面向科技创新、数字经济及专业服务企业，办公空间支持灵活分割与企业成长需求。",
      media: [
        { kind: "effect", title: "效果图", src: IMAGE_WORKSPACE },
        { kind: "plan", title: "总平图", src: IMAGE_OFFICE },
        { kind: "layout", title: "平面图", src: IMAGE_INTERIOR },
        { kind: "location", title: "区位图", src: IMAGE_BUILDING },
        { kind: "real", title: "实景图", src: IMAGE_WORKSPACE }
      ]
    },
    "office-east-station": {
      id: "office-east-station",
      category: "office",
      categoryLabel: "写字楼",
      name: "东客站门户大厦",
      district: "成华区",
      sector: "东客站",
      address: "成都成华区成都东站",
      status: "现房",
      price: "198万 - 760万",
      tags: ["LOFT", "毛坯", "现房办公"],
      phone: "4000289988",
      total: 156,
      sold: 108,
      basic: [["项目名称","东客站门户大厦"],["所属区域","成华区"],["所属板块","东客站"],["产权年限","40年"],["办公建筑面积","88 - 360 m²"],["层高","4.8m"],["户型区间","88 - 360 m²"],["总户数","156户"]],
      sales: [["开盘时间","2024年08月"],["交房时间","现房"],["销售状态","在售"],["营销代理","合富辉煌"]],
      property: [["物业公司","东站枢纽物业"],["物业费","12元/m²/月"],["客梯数","8个"],["货梯数","2个"]],
      intro: "项目位于成都东站枢纽门户区域，交通通达性突出，适合商旅服务、区域总部和灵活办公等企业使用场景。",
      media: [
        { kind: "effect", title: "效果图", src: IMAGE_OFFICE },
        { kind: "plan", title: "总平图", src: IMAGE_BUILDING },
        { kind: "layout", title: "平面图", src: IMAGE_WORKSPACE },
        { kind: "location", title: "区位图", src: IMAGE_INTERIOR },
        { kind: "real", title: "实景图", src: IMAGE_OFFICE }
      ]
    }
  };

  function createApartmentProject(baseId, data) {
    const base = projects[baseId];
    return {
      ...base,
      ...data,
      category: "apartment",
      categoryLabel: "公寓",
      basic: [
        ["项目名称", data.name],
        ["所属区域", data.district],
        ["所属板块", data.sector],
        ["产权年限", "40年"],
        ["公寓建筑面积", data.area],
        ["装修", data.decoration],
        ["户型区间", data.area],
        ["总户数", `${data.total}户`]
      ]
    };
  }

  Object.assign(projects, {
    "apartment-tianfu": createApartmentProject("commercial-tianfu", {
      id: "apartment-tianfu", name: "天府国际服务式公寓", district: "高新区", sector: "大源中央",
      address: "成都高新区天府三街", price: "45万 - 98万", area: "28 - 58 m²", decoration: "精装修",
      tags: ["精装修"], total: 360, sold: 228,
      intro: "项目位于天府三街成熟生活圈，以精装小户型和便捷通勤为主要特点，适合关注居住便利与空间效率的用户。"
    }),
    "apartment-global": createApartmentProject("commercial-global", {
      id: "apartment-global", name: "环球中心臻选公寓", district: "高新区", sector: "金融城",
      address: "成都高新区环球中心", price: "56万 - 126万", area: "35 - 72 m²", decoration: "普通装修",
      tags: ["酒店式公寓", "普通装修", "成熟商圈"], total: 288, sold: 176,
      intro: "项目依托环球中心商业与交通资源，提供紧凑灵活的公寓空间，满足城市居住、商旅停留等需求。"
    }),
    "apartment-jinjiang": createApartmentProject("commercial-jinjiang", {
      id: "apartment-jinjiang", name: "锦江里都会公寓", district: "锦江区", sector: "春熙路",
      address: "成都锦江区东大街", price: "48万 - 118万", area: "32 - 65 m²", decoration: "精装修",
      tags: ["精致小户", "精装修", "核心商圈"], total: 216, sold: 139,
      intro: "项目位于锦江区核心商圈，以精装小面积公寓为主，周边商业、交通、公园和医疗配套完善。"
    })
  });

  const refs = {
    backButton: document.getElementById("backButton"),
    heroMedia: document.getElementById("heroMedia"),
    heroImage: document.getElementById("heroImage"),
    statusBadge: document.getElementById("statusBadge"),
    albumButton: document.getElementById("albumButton"),
    mediaTabs: [...document.querySelectorAll("[data-media-kind]")],
    detailTabsNav: document.getElementById("detailTabs"),
    detailTabs: [...document.querySelectorAll(".detail-tab[data-detail-tab]")],
    quickEntries: [...document.querySelectorAll(".quick-entry[data-detail-tab]")],
    panels: [...document.querySelectorAll("[data-tab-panel]")],
    districtText: document.getElementById("districtText"),
    projectName: document.getElementById("projectName"),
    followButton: document.getElementById("followButton"),
    summaryDistrict: document.getElementById("summaryDistrict"),
    tagList: document.getElementById("tagList"),
    businessPrice: document.getElementById("businessPrice"),
    basicTitle: document.getElementById("basicTitle"),
    basicInfoRows: document.getElementById("basicInfoRows"),
    addressText: document.getElementById("addressText"),
    expandInfoButton: document.getElementById("expandInfoButton"),
    totalUnitsText: document.getElementById("totalUnitsText"),
    soldUnitsText: document.getElementById("soldUnitsText"),
    availableUnitsText: document.getElementById("availableUnitsText"),
    salesRateText: document.getElementById("salesRateText"),
    clearTimeText: document.getElementById("clearTimeText"),
    salesDonut: document.getElementById("salesDonut"),
    legendAvailableText: document.getElementById("legendAvailableText"),
    legendSoldText: document.getElementById("legendSoldText"),
    businessPriceNote: document.getElementById("businessPriceNote"),
    businessOnePriceList: document.getElementById("businessOnePriceList"),
    supportMap: document.getElementById("supportMap"),
    supportTabs: document.getElementById("supportTabs"),
    supportList: document.getElementById("supportList"),
    projectIntroLong: document.getElementById("projectIntroLong"),
    qrButton: document.getElementById("qrButton"),
    contactButton: document.getElementById("contactButton"),
    qrModal: document.getElementById("qrModal"),
    qrCloseButton: document.getElementById("qrCloseButton"),
    qrImage: document.getElementById("qrImage"),
    copyLinkButton: document.getElementById("copyLinkButton"),
    albumModal: document.getElementById("albumModal"),
    albumCloseButton: document.getElementById("albumCloseButton"),
    albumImage: document.getElementById("albumImage"),
    albumCaption: document.getElementById("albumCaption"),
    albumCounter: document.getElementById("albumCounter"),
    albumPrevButton: document.getElementById("albumPrevButton"),
    albumNextButton: document.getElementById("albumNextButton"),
    albumThumbs: document.getElementById("albumThumbs")
  };

  const params = new URLSearchParams(window.location.search);
  const projectId = params.get("projectId") || "commercial-tianfu";
  const project = projects[projectId];
  const state = {
    mediaKind: "effect",
    albumIndex: 0,
    infoExpanded: false,
    supportType: "traffic",
    followed: false
  };

  function renderRows(container, rows) {
    container.innerHTML = rows.map(([label, value]) => `
      <div class="info-row">
        <span>${label}</span>
        <strong>${value}</strong>
      </div>
    `).join("");
  }

  function getFollowedProjects() {
    try {
      const value = JSON.parse(localStorage.getItem(FOLLOWED_PROJECTS_KEY) || "[]");
      return new Set(Array.isArray(value) ? value : []);
    } catch (_error) {
      return new Set();
    }
  }

  function recordBrowsingHistory(id) {
    try {
      const stored = JSON.parse(localStorage.getItem(BROWSING_HISTORY_KEY) || "[]");
      const history = Array.isArray(stored) ? stored.filter((projectId) => projectId !== id) : [];
      localStorage.setItem(BROWSING_HISTORY_KEY, JSON.stringify([id, ...history].slice(0, 20)));
    } catch (_error) {
      localStorage.setItem(BROWSING_HISTORY_KEY, JSON.stringify([id]));
    }
  }

  function renderFollowState() {
    refs.followButton.classList.toggle("is-active", state.followed);
    refs.followButton.textContent = state.followed ? "已关注" : "关注";
    refs.followButton.setAttribute("aria-pressed", String(state.followed));
  }

  function toggleFollow() {
    state.followed = !state.followed;
    const followed = getFollowedProjects();
    if (state.followed) {
      followed.add(project.id);
    } else {
      followed.delete(project.id);
    }
    localStorage.setItem(FOLLOWED_PROJECTS_KEY, JSON.stringify([...followed]));
    renderFollowState();
  }

  function getMediaByKind(kind) {
    return project.media.find((item) => item.kind === kind) || project.media[0];
  }

  function renderMedia(kind) {
    const media = getMediaByKind(kind);
    state.mediaKind = media.kind;
    refs.heroImage.src = media.src;
    refs.heroImage.alt = `${project.name}${media.title}`;
    refs.mediaTabs.forEach((button) => {
      button.classList.toggle("is-active", button.dataset.mediaKind === media.kind);
    });
  }

  function renderAlbum() {
    const active = project.media[state.albumIndex];
    refs.albumImage.src = active.src;
    refs.albumImage.alt = `${project.name}${active.title}`;
    refs.albumCaption.textContent = active.title;
    refs.albumCounter.textContent = `${state.albumIndex + 1}/${project.media.length}`;
    refs.albumThumbs.innerHTML = project.media.map((item, index) => `
      <button class="album-thumb ${index === state.albumIndex ? "is-active" : ""}" data-album-index="${index}" type="button" aria-label="查看${item.title}">
        <img src="${item.src}" alt="${item.title}">
      </button>
    `).join("");
  }

  function openAlbum(index = project.media.findIndex((item) => item.kind === state.mediaKind)) {
    state.albumIndex = index >= 0 ? index : 0;
    renderAlbum();
    refs.albumModal.hidden = false;
    document.body.style.overflow = "hidden";
  }

  function closeAlbum() {
    refs.albumModal.hidden = true;
    document.body.style.overflow = "";
  }

  function shiftAlbum(step) {
    state.albumIndex = (state.albumIndex + step + project.media.length) % project.media.length;
    renderAlbum();
  }

  function renderSales() {
    const available = Math.max(0, project.total - project.sold);
    const rate = project.total ? Math.round((project.sold / project.total) * 1000) / 10 : 0;
    const deliveryRow = project.sales.find(([label]) => label === "交房时间");
    refs.totalUnitsText.innerHTML = `${project.total}<small>套</small>`;
    refs.soldUnitsText.innerHTML = `${project.sold}<small>套</small>`;
    refs.availableUnitsText.innerHTML = `${available}<small>套</small>`;
    refs.salesRateText.textContent = `${rate}%`;
    refs.clearTimeText.textContent = deliveryRow?.[1] || "待定";
    refs.legendAvailableText.textContent = `${available}（套）`;
    refs.legendSoldText.textContent = `${project.sold}（套）`;
    refs.salesDonut.style.setProperty("--sold-rate", `${rate}%`);
    refs.salesDonut.innerHTML = `<strong>${project.total}</strong><span>总套数</span>`;
  }

  function getAreaRange() {
    const areaRow = project.basic.find(([label]) => label.includes("建筑面积") || label.includes("户型区间"));
    const values = (areaRow?.[1].match(/\d+(?:\.\d+)?/g) || []).map(Number);
    return {
      min: values[0] || (["commercial", "apartment"].includes(project.category) ? 40 : 100),
      max: values[1] || values[0] || (["commercial", "apartment"].includes(project.category) ? 80 : 300)
    };
  }

  function getPriceRange() {
    const values = (project.price.match(/\d+(?:\.\d+)?/g) || []).map(Number);
    return {
      min: values[0] || 100,
      max: values[1] || values[0] || 300
    };
  }

  function renderOnePricePreview() {
    const area = getAreaRange();
    const price = getPriceRange();
    const samples = [
      { label: "总价较低", room: ["commercial", "apartment"].includes(project.category) ? "1栋1层101号" : "A座8层801号", area: area.min, total: price.min },
      { label: "总价较高", room: ["commercial", "apartment"].includes(project.category) ? "2栋2层205号" : "A座18层1802号", area: area.max, total: price.max }
    ];
    refs.businessPriceNote.textContent = `展示${project.categoryLabel}项目代表房源，完整房源可按预售证、楼栋和楼层查看。`;
    refs.businessOnePriceList.innerHTML = `
      <div class="preview-room-list">
        ${samples.map((item) => `
          <article class="preview-room-card">
            <span>${item.label}</span>
            <b>${item.total}万</b>
            <strong>${item.room}</strong>
            <p>${item.area}㎡</p>
          </article>
        `).join("")}
        <button class="view-more-price" data-action="open-price-detail" type="button">查看完整一房一价</button>
      </div>
    `;
  }

  function openOnePrice() {
    window.location.href = `./project-one-price.html?projectId=${encodeURIComponent(project.id)}`;
  }

  const supportMeta = { traffic: "交通", commerce: "商业", park: "公园" };

  function renderSupport() {
    const items = supportTemplates[project.category][state.supportType] || [];
    refs.supportTabs.innerHTML = Object.entries(supportMeta).map(([type, label]) => `
      <button class="support-tab ${type === state.supportType ? "is-active" : ""}" data-support-type="${type}" type="button">${label}</button>
    `).join("");
    refs.supportMap.innerHTML = `
      <div class="project-map-pin">项目</div>
      ${items.map((item) => `<span class="facility-pin" style="left:${item.x}%;top:${item.y}%;">${item.icon} ${item.title}</span>`).join("")}
    `;
    refs.supportList.innerHTML = items.map((item) => `
      <article class="support-card">
        <div class="support-icon">${item.icon}</div>
        <div><h4>${item.title}</h4><p>${item.desc}</p></div>
      </article>
    `).join("");
  }

  function setActiveSection(tab) {
    refs.detailTabs.forEach((button) => {
      button.classList.toggle("is-active", button.dataset.detailTab === tab);
    });
    const panel = refs.panels.find((item) => item.dataset.tabPanel === tab);
    panel?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function updateTabsVisibility() {
    const imageBottom = refs.heroMedia.getBoundingClientRect().bottom;
    refs.detailTabsNav.classList.toggle("is-visible", imageBottom <= 62);
  }

  function openQrModal() {
    const directUrl = window.location.href;
    refs.qrImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(directUrl)}`;
    refs.qrModal.hidden = false;
    document.body.style.overflow = "hidden";
  }

  function closeQrModal() {
    refs.qrModal.hidden = true;
    document.body.style.overflow = "";
  }

  function renderProject() {
    document.title = `${project.name} - 透明房产`;
    refs.statusBadge.textContent = project.status;
    refs.districtText.textContent = `成都 · 在售${project.categoryLabel}`;
    refs.projectName.textContent = project.name;
    refs.summaryDistrict.textContent = project.district;
    refs.tagList.innerHTML = project.tags.map((tag) => `<span>${tag}</span>`).join("");
    refs.businessPrice.textContent = `参考总价 ${project.price}`;
    refs.basicTitle.textContent = `${project.categoryLabel}项目基本信息`;
    refs.addressText.textContent = project.address;
    refs.projectIntroLong.textContent = project.intro;
    refs.contactButton.href = `tel:${project.phone}`;
    const basicRows = [...project.basic, ...project.sales, ...project.property];
    renderRows(refs.basicInfoRows, basicRows);
    refs.expandInfoButton.hidden = basicRows.length <= 7;
    renderSales();
    renderOnePricePreview();
    renderSupport();
    renderMedia("effect");
    state.followed = getFollowedProjects().has(project.id);
    renderFollowState();
  }

  function bindEvents() {
    refs.backButton.addEventListener("click", () => {
      if (history.length > 1) {
        history.back();
      } else {
        window.location.href = `./index.html?tab=${project.category}`;
      }
    });
    refs.followButton.addEventListener("click", toggleFollow);
    refs.heroMedia.addEventListener("click", () => openAlbum());
    refs.albumButton.addEventListener("click", (event) => {
      event.stopPropagation();
      openAlbum();
    });
    refs.mediaTabs.forEach((button) => {
      button.addEventListener("click", (event) => {
        event.stopPropagation();
        renderMedia(button.dataset.mediaKind);
      });
    });
    document.querySelectorAll('[data-action="open-album"]').forEach((button) => {
      button.addEventListener("click", () => openAlbum());
    });
    document.querySelectorAll('[data-action="open-price-detail"]').forEach((button) => {
      button.addEventListener("click", openOnePrice);
    });
    refs.quickEntries.forEach((button) => {
      button.addEventListener("click", () => setActiveSection(button.dataset.detailTab));
    });
    refs.detailTabs.forEach((button) => {
      button.addEventListener("click", () => setActiveSection(button.dataset.detailTab));
    });
    refs.expandInfoButton.addEventListener("click", () => {
      state.infoExpanded = !state.infoExpanded;
      refs.basicInfoRows.classList.toggle("is-expanded", state.infoExpanded);
      refs.expandInfoButton.textContent = state.infoExpanded ? "收起部分信息" : "展开全部信息";
    });
    refs.supportTabs.addEventListener("click", (event) => {
      const button = event.target.closest("[data-support-type]");
      if (!button) return;
      state.supportType = button.dataset.supportType;
      renderSupport();
    });
    refs.qrButton.addEventListener("click", openQrModal);
    refs.qrCloseButton.addEventListener("click", closeQrModal);
    refs.copyLinkButton.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(window.location.href);
        refs.copyLinkButton.textContent = "已复制";
      } catch (_error) {
        refs.copyLinkButton.textContent = "请复制浏览器地址";
      }
    });
    refs.albumCloseButton.addEventListener("click", closeAlbum);
    refs.albumPrevButton.addEventListener("click", () => shiftAlbum(-1));
    refs.albumNextButton.addEventListener("click", () => shiftAlbum(1));
    refs.albumThumbs.addEventListener("click", (event) => {
      const button = event.target.closest("[data-album-index]");
      if (!button) return;
      state.albumIndex = Number(button.dataset.albumIndex);
      renderAlbum();
    });
    document.addEventListener("click", (event) => {
      if (event.target instanceof HTMLElement && event.target.hasAttribute("data-close-qr")) closeQrModal();
      if (event.target instanceof HTMLElement && event.target.hasAttribute("data-close-album")) closeAlbum();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !refs.qrModal.hidden) closeQrModal();
      if (event.key === "Escape" && !refs.albumModal.hidden) closeAlbum();
      if (!refs.albumModal.hidden && event.key === "ArrowLeft") shiftAlbum(-1);
      if (!refs.albumModal.hidden && event.key === "ArrowRight") shiftAlbum(1);
    });
    window.addEventListener("scroll", updateTabsVisibility, { passive: true });
    window.addEventListener("resize", updateTabsVisibility);
  }

  if (!project) {
    document.body.innerHTML = `
      <main style="min-height:100vh;display:grid;place-items:center;padding:24px;background:#f3f7fb;color:#191c1d;font-family:PingFang SC,Microsoft YaHei,sans-serif;">
        <div style="max-width:320px;text-align:center;background:#fff;border-radius:24px;padding:24px;box-shadow:0 14px 36px rgba(22,42,68,.08);">未找到对应的商业或办公项目。</div>
      </main>`;
    return;
  }

  recordBrowsingHistory(project.id);
  renderProject();
  bindEvents();
  updateTabsVisibility();
})();
