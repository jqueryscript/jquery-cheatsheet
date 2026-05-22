(function () {
  const state = {
    data: null,
    query: "",
    section: "all"
  };

  const els = {
    search: document.querySelector("[data-search]"),
    clear: document.querySelector("[data-clear]"),
    filters: document.querySelector("[data-filters]"),
    sections: document.querySelector("[data-sections]"),
    nav: document.querySelector("[data-section-nav]"),
    count: document.querySelector("[data-result-count]"),
    themeToggle: document.querySelector("[data-theme-toggle]")
  };

  const storedTheme = localStorage.getItem("jquery4-theme");
  if (storedTheme) {
    document.documentElement.dataset.theme = storedTheme;
  }
  updateThemeToggle();

  els.themeToggle.addEventListener("click", function () {
    const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    localStorage.setItem("jquery4-theme", nextTheme);
    updateThemeToggle();
  });

  els.search.addEventListener("input", function (event) {
    state.query = event.target.value.trim().toLowerCase();
    render();
  });

  els.clear.addEventListener("click", function () {
    state.query = "";
    els.search.value = "";
    els.search.focus();
    render();
  });

  els.filters.addEventListener("click", function (event) {
    const button = event.target.closest("[data-section]");
    if (!button || !els.filters.contains(button)) {
      return;
    }

    if (state.section === button.dataset.section) {
      return;
    }

    state.section = button.dataset.section;
    renderFilters();
    render();
  });

  loadData();

  async function loadData() {
    try {
      const response = await fetch("data/jquery-4-cheatsheet.json", { cache: "no-store" });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      state.data = await response.json();
      renderFilters();
      renderNav();
      render();
    } catch (error) {
      renderError(error);
    }
  }

  function renderFilters() {
    const buttons = [
      { id: "all", title: "All" },
      ...state.data.sections.map(function (section) {
        return { id: section.id, title: section.title };
      })
    ];

    els.filters.innerHTML = buttons.map(function (button) {
      return `<button class="filter-button" type="button" data-section="${escapeHtml(button.id)}" aria-pressed="${button.id === state.section}">${escapeHtml(button.title)}</button>`;
    }).join("");
  }

  function renderNav() {
    els.nav.innerHTML = state.data.sections.map(function (section) {
      return `<a href="#${escapeHtml(section.id)}">${escapeHtml(section.title)}</a>`;
    }).join("");
  }

  function render() {
    const sections = getFilteredSections();
    const itemCount = sections.reduce(function (total, section) {
      return total + section.items.length;
    }, 0);

    els.count.textContent = `${itemCount} ${itemCount === 1 ? "entry" : "entries"} shown`;

    if (itemCount === 0) {
      els.sections.innerHTML = [
        "<div class=\"empty-state\">",
        "<h2>No matching examples</h2>",
        "<p>Try a shorter search, or clear the filter to browse the full cheat sheet.</p>",
        "</div>"
      ].join("");
      return;
    }

    els.sections.innerHTML = sections.map(renderSection).join("");
    bindCopyButtons();
  }

  function getFilteredSections() {
    return state.data.sections
      .filter(function (section) {
        return state.section === "all" || section.id === state.section;
      })
      .map(function (section) {
        const items = section.items.filter(function (item) {
          if (!state.query) {
            return true;
          }
          return [
            section.title,
            item.title,
            item.syntax,
            item.example,
            item.notes,
            item.replacement,
            item.jquery4Status
          ].join(" ").toLowerCase().includes(state.query);
        });
        return { ...section, items };
      })
      .filter(function (section) {
        return section.items.length > 0;
      });
  }

  function renderSection(section) {
    return [
      `<section class="cheat-section" id="${escapeHtml(section.id)}">`,
      "<div class=\"section-heading\">",
      `<h2>${escapeHtml(section.title)}</h2>`,
      `<p>${escapeHtml(section.description)}</p>`,
      "</div>",
      "<div class=\"item-grid\">",
      section.items.map(renderItem).join(""),
      "</div>",
      "</section>"
    ].join("");
  }

  function renderItem(item) {
    const replacement = item.replacement
      ? `<p class="replacement"><strong>Replacement:</strong> ${escapeHtml(item.replacement)}</p>`
      : "";

    return [
      "<article class=\"cheat-card\">",
      "<div class=\"card-head\">",
      `<h3>${escapeHtml(item.title)}</h3>`,
      `<span class="status ${escapeHtml(item.jquery4Status)}">${escapeHtml(item.jquery4Status)}</span>`,
      "</div>",
      `<p class="syntax">${escapeHtml(item.syntax)}</p>`,
      "<div class=\"code-wrap\">",
      `<button class="copy-button" type="button" data-copy="${escapeHtml(item.id)}">Copy</button>`,
      `<pre><code id="${escapeHtml(item.id)}">${escapeHtml(item.example)}</code></pre>`,
      "</div>",
      `<p class="notes">${escapeHtml(item.notes)}</p>`,
      replacement,
      `<a class="official-link" href="${escapeHtml(item.officialUrl)}" target="_blank" rel="noopener">Official reference</a>`,
      "</article>"
    ].join("");
  }

  function updateThemeToggle() {
    const isDark = document.documentElement.dataset.theme === "dark";
    els.themeToggle.textContent = isDark ? "Light Mode" : "Dark Mode";
    els.themeToggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
  }

  function bindCopyButtons() {
    document.querySelectorAll("[data-copy]").forEach(function (button) {
      button.addEventListener("click", async function () {
        const code = document.getElementById(button.dataset.copy);
        if (!code) {
          return;
        }

        try {
          await navigator.clipboard.writeText(code.textContent);
          const oldText = button.textContent;
          button.textContent = "Copied";
          window.setTimeout(function () {
            button.textContent = oldText;
          }, 1200);
        } catch (error) {
          button.textContent = "Select";
        }
      });
    });
  }

  function renderError(error) {
    els.sections.innerHTML = [
      "<div class=\"error-state\">",
      "<h2>Could not load cheat sheet data</h2>",
      `<p>${escapeHtml(error.message)}. Serve this folder over HTTP when testing locally.</p>`,
      "</div>"
    ].join("");
    els.count.textContent = "Data failed to load";
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
})();
