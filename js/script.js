(function () {
  // DOM refs
  const docEl = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const themeLabel = document.getElementById('themeLabel');
  const greeting = document.getElementById('greeting');
  const year = document.getElementById('year');
  const sessionTimer = document.getElementById('sessionTimer');
  const visitCount = document.getElementById('visitCount');

  // Contact form refs
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  const authToggle = document.getElementById('authToggle');
  const authStatus = document.getElementById('authStatus');

  // Greeting name refs
  const nameForm = document.getElementById('nameForm');
  const usernameInput = document.getElementById('username');
  const nameStatus = document.getElementById('nameStatus');

  // Projects refs
  const search = document.getElementById('projectSearch');
  const categoryChips = Array.from(document.querySelectorAll('.filters [data-filter]'));
  const levelChips = Array.from(document.querySelectorAll('.filters [data-level]'));
  const sortSelect = document.getElementById('projectSort');
  const projectCards = Array.from(document.querySelectorAll('.projects-grid .card'));
  const emptyState = document.getElementById('emptyState');
  const projectStats = document.getElementById('projectStats');

  // GitHub widget refs
  const repoForm = document.getElementById('repoForm');
  const githubInput = document.getElementById('githubUser');
  const repoStatus = document.getElementById('repoStatus');
  const repoList = document.getElementById('repoList');

  // Quote widget refs
  const statusEl = document.getElementById('apiStatus');
  const quoteEl = document.getElementById('apiQuote');
  const retryBtn = document.getElementById('apiRetry');

  const state = {
    sessionStart: Date.now(),
    visits: Number(localStorage.getItem('visits') || 0),
    theme: localStorage.getItem('theme') || 'light',
    username: localStorage.getItem('username') || '',
    projectFilter: localStorage.getItem('projectFilter') || 'all',
    projectLevel: localStorage.getItem('projectLevel') || 'all',
    projectSort: localStorage.getItem('projectSort') || 'date-desc',
    auth: localStorage.getItem('auth') || 'guest',
    githubUser: localStorage.getItem('githubUser') || 'octocat',
  };

  // ===== Basics =====
  if (year) year.textContent = new Date().getFullYear();

  // Visits counter (stateful)
  state.visits += 1;
  localStorage.setItem('visits', String(state.visits));
  if (visitCount) {
    visitCount.textContent = `Visit count (this browser): ${state.visits}`;
  }

  // Greeting message by time of day
  const hour = new Date().getHours();
  let msg = 'Hello!';
  if (hour < 12) msg = 'Good morning!';
  else if (hour < 18) msg = 'Good afternoon!';
  else msg = 'Good evening!';
  if (greeting) greeting.textContent = msg;

  // Theme toggle with persistence
  function applyTheme(next) {
    docEl.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    if (themeToggle) themeToggle.setAttribute('aria-pressed', String(next === 'dark'));
    if (themeLabel) themeLabel.textContent = next === 'dark' ? 'Light' : 'Dark';
  }
  applyTheme(state.theme);
  themeToggle?.addEventListener('click', () => {
    const next = docEl.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    state.theme = next;
    applyTheme(next);
  });

  // Session timer
  function renderTimer() {
    if (!sessionTimer) return;
    const diff = Math.floor((Date.now() - state.sessionStart) / 1000);
    const mins = String(Math.floor(diff / 60)).padStart(2, '0');
    const secs = String(diff % 60).padStart(2, '0');
    sessionTimer.textContent = `Time on page: ${mins}:${secs}`;
  }
  renderTimer();
  setInterval(renderTimer, 1000);

  // ===== Personalized Greeting (stored username) =====
  function applyGreetingName() {
    if (!greeting) return;
    const nm = localStorage.getItem('username');
    if (!nm) return;
    const current = greeting.textContent || 'Hello!';
    if (current.includes(nm)) return;
    const base = current.replace(/!$/, '');
    greeting.textContent = `${base}, ${nm}!`;
  }
  if (state.username && usernameInput) usernameInput.value = state.username;
  applyGreetingName();
  nameForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const val = usernameInput?.value.trim() || '';
    if (!val) {
      if (nameStatus) nameStatus.textContent = 'Please enter a name.';
      return;
    }
    localStorage.setItem('username', val);
    state.username = val;
    if (nameStatus) nameStatus.textContent = 'Saved';
    applyGreetingName();
    setTimeout(() => { if (nameStatus) nameStatus.textContent = ''; }, 1500);
  });

  // ===== Live Search + Category + Level Filters + Sorting =====
  function visibleByCategory(card) {
    if (state.projectFilter === 'all') return true;
    return (card.getAttribute('data-category') || '').toLowerCase() === state.projectFilter;
  }
  function visibleByLevel(card) {
    if (state.projectLevel === 'all') return true;
    return (card.getAttribute('data-level') || '').toLowerCase() === state.projectLevel;
  }
  function visibleBySearch(card) {
    const q = (search?.value || '').toLowerCase();
    return card.textContent.toLowerCase().includes(q);
  }
  function sortCards(cards) {
    const sort = state.projectSort;
    const collator = new Intl.Collator('en');
    const compareTitle = (a, b) => collator.compare(a.querySelector('h3')?.textContent || '', b.querySelector('h3')?.textContent || '');
    const getDate = (card) => new Date(card.getAttribute('data-date') || 0).getTime();

    return cards.slice().sort((a, b) => {
      if (sort === 'title') return compareTitle(a, b);
      if (sort === 'date-asc') return getDate(a) - getDate(b);
      return getDate(b) - getDate(a); // default newest first
    });
  }
  function updateStats(visibleCount) {
    if (!projectStats) return;
    const total = projectCards.length;
    const filterLabel = state.projectFilter === 'all' ? 'All types' : state.projectFilter.toUpperCase();
    const levelLabel = state.projectLevel === 'all' ? 'All levels' : state.projectLevel;
    projectStats.textContent = `Showing ${visibleCount}/${total} | Filter: ${filterLabel} | Level: ${levelLabel} | Sort: ${state.projectSort}`;
  }
  function applyFilters() {
    const filtered = projectCards.filter(card => visibleByCategory(card) && visibleByLevel(card) && visibleBySearch(card));
    const sorted = sortCards(filtered);
    projectCards.forEach(card => card.style.display = 'none');
    sorted.forEach(card => card.style.display = '');
    sorted.forEach(card => card.parentElement?.appendChild(card));
    const visibleCount = sorted.length;
    emptyState?.classList.toggle('hidden', visibleCount !== 0);
    updateStats(visibleCount);
  }

  categoryChips.forEach(chip => {
    if (chip.getAttribute('data-filter') === state.projectFilter) chip.classList.add('is-active');
    chip.addEventListener('click', () => {
      categoryChips.forEach(c => c.classList.remove('is-active'));
      chip.classList.add('is-active');
      state.projectFilter = (chip.getAttribute('data-filter') || 'all').toLowerCase();
      localStorage.setItem('projectFilter', state.projectFilter);
      applyFilters();
    });
  });
  levelChips.forEach(chip => {
    if (chip.getAttribute('data-level') === state.projectLevel) chip.classList.add('is-active');
    chip.addEventListener('click', () => {
      levelChips.forEach(c => c.classList.remove('is-active'));
      chip.classList.add('is-active');
      state.projectLevel = (chip.getAttribute('data-level') || 'all').toLowerCase();
      localStorage.setItem('projectLevel', state.projectLevel);
      applyFilters();
    });
  });
  if (sortSelect) sortSelect.value = state.projectSort;
  sortSelect?.addEventListener('change', () => {
    state.projectSort = sortSelect.value;
    localStorage.setItem('projectSort', state.projectSort);
    applyFilters();
  });
  search?.addEventListener('input', applyFilters);
  applyFilters();

  // ===== Expand/Collapse project details =====
  const toggles = Array.from(document.querySelectorAll('.toggle-details'));
  toggles.forEach(btn => {
    btn.addEventListener('click', () => {
      const details = btn.nextElementSibling;
      if (!(details instanceof HTMLElement)) return;
      const isOpen = details.getAttribute('data-open') === 'true';
      details.hidden = isOpen;
      details.setAttribute('data-open', String(!isOpen));
      btn.setAttribute('aria-expanded', String(!isOpen));
      btn.textContent = isOpen ? 'Show details' : 'Hide details';
    });
  });

  // ===== Public API demo: quote with loading/fallback =====
  async function fetchQuote() {
    if (!statusEl || !quoteEl) return;
    statusEl.textContent = 'Loading a quick quote';
    statusEl.classList.add('loading');
    quoteEl.classList.add('hidden');
    quoteEl.textContent = '';
    try {
      const controller = new AbortController();
      const t = setTimeout(() => controller.abort(), 6000);
      const res = await fetch('https://api.quotable.io/random', { signal: controller.signal });
      clearTimeout(t);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      quoteEl.textContent = `"${data.content}" - ${data.author || 'Unknown'}`;
      quoteEl.classList.remove('hidden');
      statusEl.textContent = 'Loaded';
      statusEl.classList.remove('loading');
    } catch (err) {
      statusEl.textContent = "Couldn't load a quote. Check your connection and click Try another.";
      statusEl.classList.remove('loading');
      quoteEl.classList.add('hidden');
    }
  }
  if (retryBtn) retryBtn.addEventListener('click', fetchQuote);
  fetchQuote();

  // ===== GitHub API widget =====
  async function fetchRepos(user) {
    if (!repoStatus || !repoList) return;
    const handle = user.trim();
    if (!handle) {
      repoStatus.textContent = 'Please enter a GitHub username.';
      return;
    }
    repoStatus.textContent = `Loading repositories for ${handle}...`;
    repoStatus.classList.add('loading');
    repoList.innerHTML = '';
    try {
      const controller = new AbortController();
      const t = setTimeout(() => controller.abort(), 6000);
      const res = await fetch(`https://api.github.com/users/${encodeURIComponent(handle)}/repos?per_page=5&sort=updated`, {
        signal: controller.signal,
        headers: { 'Accept': 'application/vnd.github+json' }
      });
      clearTimeout(t);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (!Array.isArray(data) || data.length === 0) {
        repoStatus.textContent = `No public repositories found for ${handle}.`;
        repoStatus.classList.remove('loading');
        return;
      }

      repoStatus.textContent = `Showing ${data.length} recent repositories for ${handle}.`;
      repoStatus.classList.remove('loading');
      data.forEach(repo => {
        const card = document.createElement('article');
        card.className = 'repo-card';
        card.innerHTML = `
          <div class="repo-title">
            <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">${repo.name}</a>
            <span class="muted small">* ${repo.stargazers_count}</span>
          </div>
          <p class="muted small">${repo.description || 'No description provided.'}</p>
          <div class="repo-meta muted small">
            <span>${repo.language || 'n/a'}</span>
            <span>Updated: ${new Date(repo.updated_at).toLocaleDateString()}</span>
          </div>
        `;
        repoList.appendChild(card);
      });
    } catch (err) {
      repoStatus.textContent = `Couldn't load repos for ${handle}. Try again later or change the username.`;
      repoStatus.classList.remove('loading');
    }
  }
  if (githubInput) githubInput.value = state.githubUser;
  repoForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const val = githubInput?.value || 'octocat';
    state.githubUser = val;
    localStorage.setItem('githubUser', val);
    fetchRepos(val);
  });
  fetchRepos(state.githubUser);

  // ===== Contact Form validation with auth gate =====
  function setAuthState(next) {
    state.auth = next;
    localStorage.setItem('auth', next);
    if (authStatus) authStatus.textContent = `Status: ${next === 'signed-in' ? 'Signed in' : 'Guest mode'}`;
    const disabled = next !== 'signed-in';
    contactForm?.querySelectorAll('input, textarea, button[type="submit"]').forEach(el => {
      if (el instanceof HTMLButtonElement && el.type === 'submit') {
        el.disabled = disabled;
      } else {
        el.disabled = disabled;
      }
    });
    if (formStatus) formStatus.textContent = disabled ? 'Sign in to enable the form (simulated).' : '';
    if (authToggle) authToggle.textContent = next === 'signed-in' ? 'Sign Out' : 'Simulate Sign In';
  }
  if (authToggle) authToggle.addEventListener('click', () => {
    setAuthState(state.auth === 'signed-in' ? 'guest' : 'signed-in');
  });
  setAuthState(state.auth);

  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    if (state.auth !== 'signed-in') {
      formStatus.textContent = 'Please sign in first (simulated).';
      formStatus.classList.add('status', 'show', 'error');
      return;
    }
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    ['name','email','message'].forEach(id => {
      document.getElementById(id)?.classList.remove('error');
      document.getElementById('err-' + id).textContent = '';
    });

    const errors = [];
    if (!name.value.trim()) { errors.push('Name is required.'); document.getElementById('err-name').textContent = 'Name is required.'; name.classList.add('error'); }
    if (!email.value.trim()) { errors.push('Email is required.'); document.getElementById('err-email').textContent = 'Email is required.'; email.classList.add('error'); }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) { errors.push('Enter a valid email.'); document.getElementById('err-email').textContent = 'Enter a valid email.'; email.classList.add('error'); }
    if (!message.value.trim()) { errors.push('Message is required.'); document.getElementById('err-message').textContent = 'Message is required.'; message.classList.add('error'); }
    if (message.value.length && message.value.length < 12) { errors.push('Message too short (min 12 chars).'); document.getElementById('err-message').textContent = 'Message too short (min 12 chars).'; message.classList.add('error'); }

    if (errors.length) {
      formStatus.textContent = errors.join(' ');
      formStatus.classList.remove('hidden');
      formStatus.classList.add('status','show','error');
      setTimeout(() => formStatus.classList.remove('error'), 400);
      return;
    }

    formStatus.textContent = 'Thanks! Your message has been prepared (demo only).';
    formStatus.classList.remove('hidden');
    formStatus.classList.add('status','show','success');
    setTimeout(() => formStatus.classList.remove('success'), 1000);
    contactForm.reset();
  });

  // ===== Reveal on scroll =====
  const revealItems = Array.from(document.querySelectorAll('.reveal'));
  if (!('IntersectionObserver' in window) || revealItems.length === 0) {
    revealItems.forEach(el => el.classList.add('in-view'));
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });
    revealItems.forEach(el => io.observe(el));
  }
})();
