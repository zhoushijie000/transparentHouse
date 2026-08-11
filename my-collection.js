(() => {
  const FOLLOWED_PROJECTS_KEY = "transparentHouse:followedProjects";
  const BROWSING_HISTORY_KEY = "transparentHouse:browsingHistory";
  const mode = document.body.dataset.collectionMode === "history" ? "history" : "follow";
  const storageKey = mode === "follow" ? FOLLOWED_PROJECTS_KEY : BROWSING_HISTORY_KEY;
  const categoryLabels = { residential: "住宅", apartment: "公寓", office: "写字楼", commercial: "商业" };
  const categories = Object.keys(categoryLabels);
  const projects = {
    "home-greenland": { category:"residential", name:"绿地之窗", location:"天府新区 · 大源中央", price:"420万 - 850万", area:"140 - 280㎡", tags:["精装修","改善"], image:"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80" },
    "home-jinjiang": { category:"residential", name:"锦江府", location:"锦江区 · 望江公园", price:"750万 - 1500万", area:"220 - 450㎡", tags:["精装修","景观"], image:"https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80" },
    "home-tianyue": { category:"residential", name:"天樾云庭", location:"武侯区 · 武侯大道", price:"330万 - 620万", area:"105 - 168㎡", tags:["清水房","低密"], image:"https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1000&q=80" },
    "home-luhu": { category:"residential", name:"麓湖澜岸", location:"天府新区 · 麓湖生态城", price:"520万 - 980万", area:"155 - 260㎡", tags:["湖景","改善"], image:"https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1000&q=80" },
    "home-guanghe": { category:"residential", name:"光合云屿", location:"龙泉驿区 · 东安湖", price:"185万 - 360万", area:"89 - 128㎡", tags:["近地铁","刚改"], image:"https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1000&q=80" },
    "home-qingyun": { category:"residential", name:"青云上城", location:"青羊区 · 光华新城", price:"288万 - 540万", area:"96 - 143㎡", tags:["双地铁","精装修"], image:"https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?auto=format&fit=crop&w=1000&q=80" },
    "apartment-tianfu": { category:"apartment", name:"天府国际服务式公寓", location:"高新区 · 天府三街", price:"45万 - 98万", area:"28 - 58㎡", tags:["精装修"], image:"https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=80" },
    "apartment-global": { category:"apartment", name:"环球中心臻选公寓", location:"高新区 · 环球中心", price:"56万 - 126万", area:"35 - 72㎡", tags:["酒店式公寓","普通装修"], image:"https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1000&q=80" },
    "apartment-jinjiang": { category:"apartment", name:"锦江里都会公寓", location:"锦江区 · 东大街", price:"48万 - 118万", area:"32 - 65㎡", tags:["精致小户","精装修"], image:"https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1000&q=80" },
    "commercial-tianfu": { category:"commercial", name:"天府国际社区商业", location:"高新区 · 天府三街", price:"88万 - 175万", area:"38 - 76㎡", tags:["集中式商业","精装修"], image:"https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1000&q=80" },
    "commercial-global": { category:"commercial", name:"环球中心商业中心", location:"高新区 · 环球中心", price:"118万 - 255万", area:"45 - 98㎡", tags:["专业市场","普通装修"], image:"https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1000&q=80" },
    "commercial-jinjiang": { category:"commercial", name:"锦江里·社区底商", location:"锦江区 · 东大街", price:"92万 - 186万", area:"42 - 82㎡", tags:["社区底商","毛坯"], image:"https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1000&q=80" },
    "office-finance-city": { category:"office", name:"金融城智汇中心", location:"高新区 · 交子大道", price:"320万 - 1280万", area:"120 - 520㎡", tags:["精装修"], image:"https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80" },
    "office-tianfu-software": { category:"office", name:"天府软件园创新中心", location:"高新区 · 天府五街", price:"260万 - 960万", area:"96 - 380㎡", tags:["SOHO","产业办公"], image:"https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1000&q=80" },
    "office-east-station": { category:"office", name:"东客站门户大厦", location:"成华区 · 成都东站", price:"198万 - 760万", area:"88 - 360㎡", tags:["LOFT","现房办公"], image:"https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80" }
  };
  const refs = {
    list: document.getElementById("collectionList"),
    summary: document.getElementById("collectionSummary"),
    clearButton: document.getElementById("clearCollectionButton"),
    categoryTabs: document.getElementById("categoryTabs")
  };

  function readIds() {
    try {
      const value = JSON.parse(localStorage.getItem(storageKey) || "[]");
      return Array.isArray(value) ? value.filter((id) => projects[id]) : [];
    } catch (_error) {
      return [];
    }
  }

  function saveIds(ids) {
    localStorage.setItem(storageKey, JSON.stringify(ids));
  }

  function getDetailUrl(id, project) {
    const page = project.category === "residential" ? "project-detail.html" : "business-project-detail.html";
    return `./${page}?projectId=${encodeURIComponent(id)}`;
  }

  const requestedCategory = new URLSearchParams(window.location.search).get("category");
  const firstStoredCategory = readIds().map((id) => projects[id].category).find((category) => categories.includes(category));
  let activeCategory = categories.includes(requestedCategory) ? requestedCategory : firstStoredCategory || "residential";

  function renderCategoryTabs(allIds) {
    refs.categoryTabs.innerHTML = categories.map((category) => {
      const count = allIds.filter((id) => projects[id].category === category).length;
      const active = category === activeCategory;
      return `<button class="category-tab ${active ? "is-active" : ""}" data-category="${category}" role="tab" aria-selected="${active}" type="button">${categoryLabels[category]}${count ? ` · ${count}` : ""}</button>`;
    }).join("");
  }

  function render() {
    const allIds = readIds();
    const ids = allIds.filter((id) => projects[id].category === activeCategory);
    const categoryLabel = categoryLabels[activeCategory];
    refs.summary.textContent = mode === "follow" ? `已关注 ${ids.length} 个${categoryLabel}项目` : `最近浏览 ${ids.length} 个${categoryLabel}项目`;
    refs.clearButton.hidden = mode !== "history" || allIds.length === 0;
    renderCategoryTabs(allIds);
    if (!ids.length) {
      refs.list.innerHTML = `<div class="collection-empty">${mode === "follow" ? `暂未关注${categoryLabel}项目，可在楼盘列表或详情页添加关注` : `暂无${categoryLabel}浏览足迹，进入项目详情后会自动记录`}</div>`;
      return;
    }
    refs.list.innerHTML = ids.map((id) => {
      const project = projects[id];
      const region = project.location.split("·")[0].trim();
      const priceText = project.price.split(" - ").map((value) => `¥${value}`).join("-");
      return `
        <article class="estate-card">
          <a class="estate-card__link" href="${getDetailUrl(id, project)}" aria-label="查看${project.name}详情">
            <div class="estate-card__media">
              <img class="estate-card__image" src="${project.image}" alt="${project.name}">
            </div>
            <div class="estate-card__body">
              <h2>${project.name}</h2>
              <p class="estate-card__location">${project.location}</p>
              <p class="estate-card__summary">${project.area} · ${region}</p>
              <div class="estate-card__tags">${project.tags.slice(0, 2).map((tag) => `<span>${tag}</span>`).join("")}</div>
              <strong class="estate-card__price">${priceText}</strong>
            </div>
          </a>
          <button class="estate-card__action" data-remove-project="${id}" type="button">${mode === "follow" ? "取消关注" : "删除"}</button>
        </article>`;
    }).join("");
  }

  refs.list.addEventListener("click", (event) => {
    const button = event.target.closest("[data-remove-project]");
    if (!button) return;
    saveIds(readIds().filter((id) => id !== button.dataset.removeProject));
    render();
  });

  refs.categoryTabs.addEventListener("click", (event) => {
    const button = event.target.closest("[data-category]");
    if (!button || !categories.includes(button.dataset.category)) return;
    activeCategory = button.dataset.category;
    const url = new URL(window.location.href);
    url.searchParams.set("category", activeCategory);
    window.history.replaceState({}, "", url);
    render();
  });

  refs.clearButton.addEventListener("click", () => {
    localStorage.removeItem(storageKey);
    render();
  });
  window.addEventListener("storage", render);
  render();
})();
