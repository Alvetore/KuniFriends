/**
 * AI BOT ARCHIVE — Application Logic
 * Modern, responsive, interactive client-side catalog
 */

document.addEventListener('DOMContentLoaded', () => {
  // ========================================================================
  // 1. State Management
  // ========================================================================
  const state = {
    searchQuery: '',
    selectedPlatform: 'all', // 'all' | 'telegram' | 'discord' | 'memorial'
    selectedCore: 'all',     // 'all' | specific core name
  };

  // DOM Elements cache
  const elements = {
    // Stats elements
    statTgCount: document.getElementById('stat-tg-count'),
    statDiscordCount: document.getElementById('stat-discord-count'),
    statMemorialCount: document.getElementById('stat-memorial-count'),
    statCoreCount: document.getElementById('stat-core-count'),
    
    // Header nav counts
    navTgCount: document.getElementById('nav-tg-count'),
    navDiscordCount: document.getElementById('nav-discord-count'),
    navMemorialCount: document.getElementById('nav-memorial-count'),
    
    // Platform tab badges
    tabBadgeAll: document.getElementById('tab-badge-all'),
    tabBadgeTg: document.getElementById('tab-badge-tg'),
    tabBadgeDiscord: document.getElementById('tab-badge-discord'),
    tabBadgeMemorial: document.getElementById('tab-badge-memorial'),

    // Section header counts
    headerTgCount: document.getElementById('header-tg-count'),
    headerDiscordCount: document.getElementById('header-discord-count'),
    countFallen: document.getElementById('count-fallen'),
    countRespect: document.getElementById('count-respect'),
    footerTotalBots: document.getElementById('footer-total-bots-count'),

    // Engine Section Counts
    engineCountNiva: document.getElementById('engine-count-niva'),
    engineCountKuniPlus: document.getElementById('engine-count-kuni-plus'),

    // Containers
    telegramGrid: document.getElementById('telegram-cards-grid'),
    discordGrid: document.getElementById('discord-cards-grid'),
    fallenCardsList: document.getElementById('fallen-cards-list'),
    respectCardsList: document.getElementById('respect-cards-list'),

    // Empty States
    telegramEmpty: document.getElementById('telegram-empty-state'),
    discordEmpty: document.getElementById('discord-empty-state'),
    memorialEmpty: document.getElementById('memorial-empty-state'),

    // Controls
    searchInput: document.getElementById('search-input'),
    searchClearBtn: document.getElementById('search-clear-btn'),
    quickSearchBtn: document.getElementById('quick-search-btn'),
    platformTabs: document.querySelectorAll('.filter-tab'),
    coresFilterList: document.getElementById('cores-filter-list'),
    resetFiltersBtn: document.getElementById('reset-filters-btn'),
    resultsStatusBar: document.getElementById('results-status-bar'),
    resultsCountText: document.getElementById('results-count-text'),
    resultsHintText: document.getElementById('results-hint-text'),

    // Sections for visibility toggling
    telegramSection: document.getElementById('telegram'),
    discordSection: document.getElementById('discord'),
    memorialSection: document.getElementById('memorial'),

    // Mobile nav
    mobileMenuBtn: document.getElementById('mobile-menu-btn'),
    mobileNavDrawer: document.getElementById('mobile-nav'),
    backToTopBtn: document.getElementById('back-to-top-btn'),
    toastContainer: document.getElementById('toast-container'),
  };

  // Color gradients for monograms
  const MONOGRAM_GRADIENTS = [
    'linear-gradient(135deg, #0ea5e9, #2563eb)', // Blue
    'linear-gradient(135deg, #a855f7, #6366f1)', // Purple
    'linear-gradient(135deg, #10b981, #059669)', // Emerald
    'linear-gradient(135deg, #06b6d4, #0284c7)', // Cyan
    'linear-gradient(135deg, #f59e0b, #d97706)', // Amber
    'linear-gradient(135deg, #ec4899, #8b5cf6)', // Magenta-Violet
    'linear-gradient(135deg, #14b8a6, #0d9488)', // Teal
    'linear-gradient(135deg, #6366f1, #3b82f6)', // Indigo
  ];

  // ========================================================================
  // 2. Helper Functions
  // ========================================================================
  
  /**
   * Escape HTML to prevent injection
   */
  function escapeHTML(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  /**
   * Generates a 2-character monogram string from bot name
   */
  function getMonogram(name) {
    if (!name) return 'AI';
    const cleaned = name.trim().replace(/^[@#]/, '');
    const parts = cleaned.split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return cleaned.slice(0, 2).toUpperCase();
  }

  /**
   * Selects a deterministic gradient based on bot name
   */
  function getMonogramGradient(name) {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % MONOGRAM_GRADIENTS.length;
    return MONOGRAM_GRADIENTS[index];
  }

  /**
   * Returns appropriate CSS class for a core tag
   */
  function getCoreClass(core) {
    if (!core) return 'core-tag-default';
    const normalized = core.toLowerCase();
    if (normalized.includes('niva')) return 'core-tag-niva';
    if (normalized.includes('kuni+')) return 'core-tag-kuni-plus';
    if (normalized.includes('kuni')) return 'core-tag-kuni';
    if (normalized.includes('alivetales')) return 'core-tag-alivetales';
    if (normalized.includes('custom') || normalized.includes('nessacore') || normalized.includes('spermacore')) return 'core-tag-custom';
    if (normalized.includes('sekai')) return 'core-tag-sekai';
    return 'core-tag-default';
  }

  /**
   * Show animated floating toast notification
   */
  function showToast(message, icon = '📋') {
    if (!elements.toastContainer) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <span class="toast-icon">${icon}</span>
      <span class="toast-message">${escapeHTML(message)}</span>
    `;
    elements.toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 2800);
  }

  /**
   * Copy text to clipboard with fallback
   */
  async function copyToClipboard(text, successMessage) {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      showToast(successMessage || `Скопировано: ${text}`, '✅');
    } catch (err) {
      showToast(`Не удалось скопировать: ${text}`, '⚠️');
    }
  }

  // ========================================================================
  // 3. Stats Calculation & Core Filter Setup
  // ========================================================================

  function updateStatistics() {
    const tgBots = BOTS_DATA.filter(b => b.platform === 'telegram' && !b.memorial);
    const discordBots = BOTS_DATA.filter(b => b.platform === 'discord' && !b.memorial);
    const memorialBots = BOTS_DATA.filter(b => b.memorial);
    const fallenBots = BOTS_DATA.filter(b => b.memorial && b.memorialCategory === 'fallen');
    const respectBots = BOTS_DATA.filter(b => b.memorial && b.memorialCategory === 'respect');

    // Count unique cores
    const coreSet = new Set();
    BOTS_DATA.forEach(b => {
      if (b.core) {
        // Normalize for grouping
        coreSet.add(b.core.trim());
      }
    });

    // Update numbers in DOM
    if (elements.statTgCount) elements.statTgCount.textContent = tgBots.length;
    if (elements.statDiscordCount) elements.statDiscordCount.textContent = discordBots.length;
    if (elements.statMemorialCount) elements.statMemorialCount.textContent = memorialBots.length;
    if (elements.statCoreCount) elements.statCoreCount.textContent = coreSet.size;

    if (elements.navTgCount) elements.navTgCount.textContent = tgBots.length;
    if (elements.navDiscordCount) elements.navDiscordCount.textContent = discordBots.length;
    if (elements.navMemorialCount) elements.navMemorialCount.textContent = memorialBots.length;

    if (elements.tabBadgeAll) elements.tabBadgeAll.textContent = BOTS_DATA.length;
    if (elements.tabBadgeTg) elements.tabBadgeTg.textContent = tgBots.length;
    if (elements.tabBadgeDiscord) elements.tabBadgeDiscord.textContent = discordBots.length;
    if (elements.tabBadgeMemorial) elements.tabBadgeMemorial.textContent = memorialBots.length;

    if (elements.headerTgCount) elements.headerTgCount.textContent = tgBots.length;
    if (elements.headerDiscordCount) elements.headerDiscordCount.textContent = discordBots.length;
    if (elements.countFallen) elements.countFallen.textContent = fallenBots.length;
    if (elements.countRespect) elements.countRespect.textContent = respectBots.length;
    if (elements.footerTotalBots) elements.footerTotalBots.textContent = BOTS_DATA.length;

    // Update Engine section counters
    const nivaBots = BOTS_DATA.filter(b => b.core && b.core.toLowerCase().includes('niva'));
    const kuniPlusBots = BOTS_DATA.filter(b => b.core && b.core.toLowerCase().includes('kuni+'));

    if (elements.engineCountNiva) {
      elements.engineCountNiva.innerHTML = `Ботов на этом ядре: <strong>${nivaBots.length}</strong> (${nivaBots.map(b => b.memorial ? `${b.name} [архив]` : b.name).join(', ')})`;
    }
    if (elements.engineCountKuniPlus) {
      elements.engineCountKuniPlus.innerHTML = `Ботов на этом ядре: <strong>${kuniPlusBots.length}</strong> (${kuniPlusBots.map(b => b.memorial ? `${b.name} [архив]` : b.name).join(', ')})`;
    }
  }

  function initCoreFilters() {
    if (!elements.coresFilterList) return;

    // Group cores case-insensitively for cleaner UI
    // 'custom' and 'Custom' are grouped under 'Custom'
    const coreMap = new Map();
    BOTS_DATA.forEach(b => {
      if (b.core) {
        const trimmed = b.core.trim();
        const displayKey = (trimmed.toLowerCase() === 'custom') ? 'Custom' : trimmed;
        coreMap.set(displayKey, (coreMap.get(displayKey) || 0) + 1);
      }
    });

    // Desired core pills order
    const priorityCores = ['NIVA', 'kuni+', 'kuni', 'AliveTales', 'Custom', 'Sekai', 'NessaCore (кастомный)', 'SpermaCore', 'Raine (java)'];
    
    // Build list of unique cores preserving priority
    const sortedCores = [];
    priorityCores.forEach(c => {
      if (coreMap.has(c) && !sortedCores.includes(c)) {
        sortedCores.push(c);
      }
    });

    // Add any remaining
    coreMap.forEach((_, key) => {
      if (!sortedCores.includes(key)) {
        sortedCores.push(key);
      }
    });

    // Generate HTML
    let html = `<button class="core-pill active" data-core="all">Все (${BOTS_DATA.length})</button>`;
    sortedCores.forEach(core => {
      const count = coreMap.get(core) || 0;
      html += `<button class="core-pill" data-core="${escapeHTML(core)}">${escapeHTML(core)} (${count})</button>`;
    });

    elements.coresFilterList.innerHTML = html;

    // Attach listeners
    elements.coresFilterList.querySelectorAll('.core-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        elements.coresFilterList.querySelectorAll('.core-pill').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.selectedCore = btn.getAttribute('data-core');
        renderCatalog();
      });
    });
  }

  // ========================================================================
  // 4. Card Template Renderers
  // ========================================================================

  /**
   * Telegram Active / Catalog Bot Card
   */
  function createTelegramCard(bot) {
    const monogram = getMonogram(bot.name);
    const gradient = getMonogramGradient(bot.name);
    const coreClass = getCoreClass(bot.core);

    const isActive = bot.status === 'active';
    const statusDotClass = isActive ? 'status-dot-active' : 'status-dot-unspecified';
    const statusNoteText = bot.statusNote || (isActive ? 'активна' : 'Статус не указан');

    return `
      <article class="bot-card status-${escapeHTML(bot.status)}" id="bot-${escapeHTML(bot.id)}">
        <div>
          <!-- Card Top: Monogram & Title -->
          <div class="card-top">
            <div class="bot-avatar-monogram" style="background: ${gradient};">
              <span>${escapeHTML(monogram)}</span>
            </div>
            <div class="card-title-group">
              <h3 class="bot-name">${escapeHTML(bot.name)}</h3>
              <div class="bot-status-row">
                <span class="status-dot ${statusDotClass}"></span>
                <span class="bot-status-text">${escapeHTML(statusNoteText)}</span>
              </div>
            </div>
          </div>

          <!-- Telegram Username Box with Copy -->
          <div class="card-username-wrap" style="margin-top: 14px;">
            <a href="https://t.me/${encodeURIComponent(bot.username)}" target="_blank" rel="noopener noreferrer" class="bot-username-link" title="Открыть @${escapeHTML(bot.username)} в Telegram">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.19-.08-.05-.19-.02-.27 0-.12.03-1.99 1.27-5.63 3.73-.53.37-1.02.55-1.45.54-.48-.01-1.4-.27-2.09-.49-.84-.27-1.51-.42-1.45-.88.03-.24.38-.49 1.04-.75 4.09-1.78 6.82-2.96 8.2-3.53 3.91-1.63 4.72-1.91 5.25-1.92.12 0 .37.03.54.17.14.12.18.28.2.45-.02.07-.02.19-.04.34z"/>
              </svg>
              <span>@${escapeHTML(bot.username)}</span>
            </a>
            <button class="copy-btn" data-copy="@${escapeHTML(bot.username)}" title="Скопировать @${escapeHTML(bot.username)}" aria-label="Скопировать username бота">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
            </button>
          </div>

          <!-- Metadata: Owner & Core -->
          <div class="card-meta-list" style="margin-top: 14px;">
            <div class="meta-row">
              <span class="meta-label">Владелец:</span>
              <span class="meta-value">
                <a href="https://t.me/${encodeURIComponent(bot.owner)}" target="_blank" rel="noopener noreferrer" class="owner-link" title="Профиль создателя @${escapeHTML(bot.owner)}">
                  @${escapeHTML(bot.owner)}
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </a>
              </span>
            </div>

            <div class="meta-row">
              <span class="meta-label">Ядро:</span>
              <span class="meta-value">
                <span class="core-tag ${coreClass}">${escapeHTML(bot.core || 'custom')}</span>
              </span>
            </div>
          </div>
        </div>

        <!-- Extra Badges: Access, Video, etc. -->
        ${(bot.access || bot.description) ? `
          <div class="card-badges-row">
            ${bot.access ? `<span class="info-badge badge-access">⭐ ${escapeHTML(bot.access)}</span>` : ''}
            ${bot.description ? `<span class="info-badge badge-desc">📹 ${escapeHTML(bot.description)}</span>` : ''}
          </div>
        ` : ''}
      </article>
    `;
  }

  /**
   * Discord Bot Card
   */
  function createDiscordCard(bot) {
    const monogram = getMonogram(bot.name);
    const coreClass = getCoreClass(bot.core);

    return `
      <article class="bot-card discord-card" id="bot-${escapeHTML(bot.id)}">
        <div>
          <div class="card-top">
            <div class="bot-avatar-monogram" style="background: linear-gradient(135deg, #5865F2, #3b82f6);">
              <span>${escapeHTML(monogram)}</span>
            </div>
            <div class="card-title-group">
              <h3 class="bot-name">${escapeHTML(bot.name)}</h3>
              <div class="bot-status-row">
                <span class="status-dot status-dot-active"></span>
                <span class="bot-status-text" style="color: #a5b4fc;">Discord Bot</span>
              </div>
            </div>
          </div>

          <!-- Discord Tag Box with Copy -->
          <div class="card-username-wrap discord-tag-box" style="margin-top: 14px;">
            <div class="discord-tag-text" title="Discord тег">
              <span style="color: #818cf8; margin-right: 4px;">🎮</span>
              <span>${escapeHTML(bot.username)}</span>
            </div>
            <button class="copy-btn" data-copy="${escapeHTML(bot.username)}" title="Скопировать Discord тег" aria-label="Скопировать Discord тег">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
            </button>
          </div>

          <!-- Metadata -->
          <div class="card-meta-list" style="margin-top: 14px;">
            <div class="meta-row">
              <span class="meta-label">Владелец:</span>
              <span class="meta-value">
                <a href="https://t.me/${encodeURIComponent(bot.owner)}" target="_blank" rel="noopener noreferrer" class="owner-link" title="Telegram владельца @${escapeHTML(bot.owner)}">
                  @${escapeHTML(bot.owner)}
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </a>
              </span>
            </div>

            <div class="meta-row">
              <span class="meta-label">Ядро:</span>
              <span class="meta-value">
                <span class="core-tag ${coreClass}">${escapeHTML(bot.core || 'custom')}</span>
              </span>
            </div>
          </div>
        </div>

        ${bot.access ? `
          <div class="card-badges-row">
            <span class="info-badge badge-discord-access">✉️ ${escapeHTML(bot.access)}</span>
          </div>
        ` : ''}
      </article>
    `;
  }

  /**
   * Memorial - Fallen Bot Card
   */
  function createFallenCard(bot) {
    const coreClass = getCoreClass(bot.core);
    const statusNote = bot.statusNote || 'неактивен';

    return `
      <div class="fallen-card" id="bot-${escapeHTML(bot.id)}">
        <div class="fallen-card-header">
          <div class="fallen-name">
            <span class="status-dot status-dot-fallen"></span>
            <span class="fallen-strike">${escapeHTML(bot.name)}</span>
          </div>
          <span class="fallen-status-badge">${escapeHTML(statusNote)}</span>
        </div>

        <div class="fallen-meta-row">
          <a href="https://t.me/${encodeURIComponent(bot.username)}" target="_blank" rel="noopener noreferrer" class="fallen-username-link" title="Открыть @${escapeHTML(bot.username)}">
            @${escapeHTML(bot.username)}
          </a>
          <button class="copy-btn" data-copy="@${escapeHTML(bot.username)}" title="Скопировать @${escapeHTML(bot.username)}" style="padding: 2px;">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h6"></path>
            </svg>
          </button>
        </div>

        <div class="fallen-tags-row">
          <span>Владелец: 
            <a href="https://t.me/${encodeURIComponent(bot.owner)}" target="_blank" rel="noopener noreferrer" class="fallen-owner-link">
              @${escapeHTML(bot.owner)}
            </a>
          </span>
          <span style="margin-left: auto;">
            <span class="core-tag ${coreClass}" style="font-size: 0.65rem; padding: 1px 6px;">${escapeHTML(bot.core || '—')}</span>
          </span>
        </div>
      </div>
    `;
  }

  /**
   * Memorial - Respect & Honor Card
   */
  function createRespectCard(bot) {
    return `
      <div class="respect-card" id="bot-${escapeHTML(bot.id)}">
        <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px;">
          <div class="respect-name">👑 ${escapeHTML(bot.name)}</div>
          <span class="respect-badge">${escapeHTML(bot.statusNote || 'неактивна')}</span>
        </div>

        <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px;">
          <a href="https://t.me/${encodeURIComponent(bot.username)}" target="_blank" rel="noopener noreferrer" class="fallen-username-link" style="color: #fbbf24;">
            @${escapeHTML(bot.username)}
          </a>
          <button class="copy-btn" data-copy="@${escapeHTML(bot.username)}" title="Скопировать @${escapeHTML(bot.username)}" style="color: #fbbf24; padding: 2px;">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h6"></path>
            </svg>
          </button>
        </div>
      </div>
    `;
  }

  // ========================================================================
  // 5. Filtering and Rendering Pipeline
  // ========================================================================

  function filterBots() {
    const query = state.searchQuery.trim().toLowerCase();
    const queryWithoutAt = query.replace(/^[@#]/, '');

    return BOTS_DATA.filter(bot => {
      // 1. Platform filter
      if (state.selectedPlatform === 'telegram') {
        if (bot.platform !== 'telegram' || bot.memorial) return false;
      } else if (state.selectedPlatform === 'discord') {
        if (bot.platform !== 'discord' || bot.memorial) return false;
      } else if (state.selectedPlatform === 'memorial') {
        if (!bot.memorial) return false;
      }

      // 2. Core filter
      if (state.selectedCore !== 'all') {
        if (!bot.core) return false;
        const botCoreLower = bot.core.trim().toLowerCase();
        const selectedCoreLower = state.selectedCore.trim().toLowerCase();
        if (botCoreLower !== selectedCoreLower) {
          return false;
        }
      }

      // 3. Search query filter
      if (query.length > 0) {
        const nameMatch = bot.name && bot.name.toLowerCase().includes(query);
        const usernameMatch = bot.username && (
          bot.username.toLowerCase().includes(query) || 
          bot.username.toLowerCase().includes(queryWithoutAt)
        );
        const ownerMatch = bot.owner && (
          bot.owner.toLowerCase().includes(query) || 
          bot.owner.toLowerCase().includes(queryWithoutAt)
        );
        const coreMatch = bot.core && bot.core.toLowerCase().includes(query);
        const noteMatch = bot.statusNote && bot.statusNote.toLowerCase().includes(query);
        const descMatch = bot.description && bot.description.toLowerCase().includes(query);
        const accessMatch = bot.access && bot.access.toLowerCase().includes(query);

        if (!nameMatch && !usernameMatch && !ownerMatch && !coreMatch && !noteMatch && !descMatch && !accessMatch) {
          return false;
        }
      }

      return true;
    });
  }

  function renderCatalog() {
    const filtered = filterBots();

    // Split into categories
    const tgBots = filtered.filter(b => b.platform === 'telegram' && !b.memorial);
    const discordBots = filtered.filter(b => b.platform === 'discord' && !b.memorial);
    const fallenBots = filtered.filter(b => b.memorial && b.memorialCategory === 'fallen');
    const respectBots = filtered.filter(b => b.memorial && b.memorialCategory === 'respect');

    // 1. Render Telegram
    if (elements.telegramGrid) {
      if (tgBots.length > 0) {
        elements.telegramGrid.innerHTML = tgBots.map(createTelegramCard).join('');
        elements.telegramGrid.hidden = false;
        if (elements.telegramEmpty) elements.telegramEmpty.hidden = true;
      } else {
        elements.telegramGrid.innerHTML = '';
        elements.telegramGrid.hidden = true;
        if (elements.telegramEmpty) elements.telegramEmpty.hidden = false;
      }
    }

    // 2. Render Discord
    if (elements.discordGrid) {
      if (discordBots.length > 0) {
        elements.discordGrid.innerHTML = discordBots.map(createDiscordCard).join('');
        elements.discordGrid.hidden = false;
        if (elements.discordEmpty) elements.discordEmpty.hidden = true;
      } else {
        elements.discordGrid.innerHTML = '';
        elements.discordGrid.hidden = true;
        if (elements.discordEmpty) elements.discordEmpty.hidden = false;
      }
    }

    // 3. Render Memorial (Fallen)
    if (elements.fallenCardsList) {
      elements.fallenCardsList.innerHTML = fallenBots.map(createFallenCard).join('');
    }

    // 4. Render Memorial (Respect)
    if (elements.respectCardsList) {
      elements.respectCardsList.innerHTML = respectBots.map(createRespectCard).join('');
    }

    // Memorial Empty state
    if (elements.memorialEmpty) {
      const hasAnyMemorial = fallenBots.length > 0 || respectBots.length > 0;
      elements.memorialEmpty.hidden = hasAnyMemorial;
    }

    // Update dynamic counts in section headers based on current filtered items
    if (elements.headerTgCount) elements.headerTgCount.textContent = tgBots.length;
    if (elements.headerDiscordCount) elements.headerDiscordCount.textContent = discordBots.length;
    if (elements.countFallen) elements.countFallen.textContent = fallenBots.length;
    if (elements.countRespect) elements.countRespect.textContent = respectBots.length;

    // Layout grid container adjustment
    const layoutGrid = document.querySelector('.catalog-layout-grid');
    if (layoutGrid) {
      layoutGrid.classList.toggle('layout-memorial-only', state.selectedPlatform === 'memorial');
      layoutGrid.classList.toggle('layout-main-only', state.selectedPlatform === 'telegram' || state.selectedPlatform === 'discord');
    }

    // Section Visibility based on selectedPlatform
    if (state.selectedPlatform === 'telegram') {
      if (elements.telegramSection) elements.telegramSection.style.display = 'block';
      if (elements.discordSection) elements.discordSection.style.display = 'none';
      if (elements.memorialSection) elements.memorialSection.style.display = 'none';
    } else if (state.selectedPlatform === 'discord') {
      if (elements.telegramSection) elements.telegramSection.style.display = 'none';
      if (elements.discordSection) elements.discordSection.style.display = 'block';
      if (elements.memorialSection) elements.memorialSection.style.display = 'none';
    } else if (state.selectedPlatform === 'memorial') {
      if (elements.telegramSection) elements.telegramSection.style.display = 'none';
      if (elements.discordSection) elements.discordSection.style.display = 'none';
      if (elements.memorialSection) elements.memorialSection.style.display = 'block';
    } else {
      if (elements.telegramSection) elements.telegramSection.style.display = 'block';
      if (elements.discordSection) elements.discordSection.style.display = 'block';
      if (elements.memorialSection) elements.memorialSection.style.display = 'block';
    }

    // Update Results status bar
    const isFiltered = state.searchQuery.trim().length > 0 || state.selectedPlatform !== 'all' || state.selectedCore !== 'all';
    
    if (elements.resetFiltersBtn) {
      elements.resetFiltersBtn.hidden = !isFiltered;
    }

    if (elements.resultsCountText) {
      if (!isFiltered) {
        elements.resultsCountText.textContent = `Отображаются все боты (${BOTS_DATA.length})`;
      } else {
        elements.resultsCountText.textContent = `Найдено ботов: ${filtered.length} из ${BOTS_DATA.length}`;
      }
    }

    if (elements.resultsHintText) {
      const filtersActive = [];
      if (state.selectedPlatform !== 'all') filtersActive.push(`Платформа: ${state.selectedPlatform}`);
      if (state.selectedCore !== 'all') filtersActive.push(`Ядро: ${state.selectedCore}`);
      if (state.searchQuery.trim()) filtersActive.push(`Поиск: "${state.searchQuery.trim()}"`);
      
      elements.resultsHintText.textContent = filtersActive.length > 0 ? `Фильтры: [ ${filtersActive.join(' | ')} ]` : '';
    }

    // Attach copy button listeners to dynamically rendered cards
    attachCopyListeners();
  }

  function attachCopyListeners() {
    document.querySelectorAll('.copy-btn').forEach(btn => {
      // Avoid duplicate binding
      if (btn._hasCopyHandler) return;
      btn._hasCopyHandler = true;
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const textToCopy = btn.getAttribute('data-copy');
        if (textToCopy) {
          copyToClipboard(textToCopy, `Скопировано: ${textToCopy}`);
        }
      });
    });
  }

  // ========================================================================
  // 6. Event Handlers & User Interactions
  // ========================================================================

  // Search input live handler
  if (elements.searchInput) {
    elements.searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value;
      if (elements.searchClearBtn) {
        elements.searchClearBtn.hidden = state.searchQuery.length === 0;
      }
      renderCatalog();
    });

    // Clear search
    if (elements.searchClearBtn) {
      elements.searchClearBtn.addEventListener('click', () => {
        elements.searchInput.value = '';
        state.searchQuery = '';
        elements.searchClearBtn.hidden = true;
        elements.searchInput.focus();
        renderCatalog();
      });
    }
  }

  // Platform tab buttons
  elements.platformTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      elements.platformTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      state.selectedPlatform = tab.getAttribute('data-platform');
      renderCatalog();
    });
  });

  // Reset filters button
  if (elements.resetFiltersBtn) {
    elements.resetFiltersBtn.addEventListener('click', () => {
      state.searchQuery = '';
      state.selectedPlatform = 'all';
      state.selectedCore = 'all';

      if (elements.searchInput) {
        elements.searchInput.value = '';
      }
      if (elements.searchClearBtn) {
        elements.searchClearBtn.hidden = true;
      }

      elements.platformTabs.forEach(t => {
        const isAll = t.getAttribute('data-platform') === 'all';
        t.classList.toggle('active', isAll);
        t.setAttribute('aria-selected', isAll ? 'true' : 'false');
      });

      if (elements.coresFilterList) {
        elements.coresFilterList.querySelectorAll('.core-pill').forEach(b => {
          b.classList.toggle('active', b.getAttribute('data-core') === 'all');
        });
      }

      renderCatalog();
      showToast('Фильтры сброшены', '🔄');
    });
  }

  // Header quick search button
  if (elements.quickSearchBtn && elements.searchInput) {
    elements.quickSearchBtn.addEventListener('click', () => {
      elements.searchInput.focus();
      elements.searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }

  // Global Keyboard Shortcuts
  document.addEventListener('keydown', (e) => {
    // Focus search on '/' or 'Ctrl+K'
    if ((e.key === '/' || (e.ctrlKey && e.key.toLowerCase() === 'k')) && document.activeElement !== elements.searchInput) {
      e.preventDefault();
      if (elements.searchInput) {
        elements.searchInput.focus();
        elements.searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }

    // Escape clears search
    if (e.key === 'Escape' && document.activeElement === elements.searchInput) {
      if (elements.searchInput.value.length > 0) {
        elements.searchInput.value = '';
        state.searchQuery = '';
        if (elements.searchClearBtn) elements.searchClearBtn.hidden = true;
        renderCatalog();
      } else {
        elements.searchInput.blur();
      }
    }
  });

  // Mobile Menu Drawer Toggle
  if (elements.mobileMenuBtn && elements.mobileNavDrawer) {
    elements.mobileMenuBtn.addEventListener('click', () => {
      const isExpanded = elements.mobileMenuBtn.getAttribute('aria-expanded') === 'true';
      elements.mobileMenuBtn.setAttribute('aria-expanded', String(!isExpanded));
      elements.mobileNavDrawer.hidden = isExpanded;
    });

    // Close mobile drawer on link click
    elements.mobileNavDrawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        elements.mobileMenuBtn.setAttribute('aria-expanded', 'false');
        elements.mobileNavDrawer.hidden = true;
      });
    });
  }

  // Back to Top button
  if (elements.backToTopBtn) {
    elements.backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Active navigation highlight on scroll
  const sections = document.querySelectorAll('section[id], aside[id]');
  const navLinks = document.querySelectorAll('.main-nav .nav-item');

  function updateActiveNav() {
    const scrollY = window.pageYOffset;
    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${sectionId}`);
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });

  // ========================================================================
  // 7. Initialization
  // ========================================================================
  updateStatistics();
  initCoreFilters();
  renderCatalog();
});
