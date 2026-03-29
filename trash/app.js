// ========================================
//   InternBridge – Application JavaScript
// ========================================

// ===== DATA =====
const internships = [
  { id: 1, company: 'Google India', title: 'UX Design Intern', logo: '🏢', location: 'Bangalore', duration: '3-6 Months', stipend: 25000, category: 'Design', type: 'Hybrid', tags: ['Figma', 'User Research', 'Prototyping'], posted: '2 days ago', applicants: 124 },
  { id: 2, company: 'Microsoft', title: 'Software Development Intern', logo: '💙', location: 'Remote', duration: '3-6 Months', stipend: 30000, category: 'Technology', type: 'Remote', tags: ['React', 'Azure', 'TypeScript'], posted: '1 day ago', applicants: 210 },
  { id: 3, company: 'Amazon', title: 'Data Analyst Intern', logo: '🟠', location: 'Hyderabad', duration: '6+ Months', stipend: 28000, category: 'Technology', type: 'On-site', tags: ['SQL', 'Python', 'Tableau'], posted: '3 days ago', applicants: 87 },
  { id: 4, company: 'Adobe', title: 'Creative Intern', logo: '🔴', location: 'Noida', duration: '3-6 Months', stipend: 20000, category: 'Design', type: 'Hybrid', tags: ['Photoshop', 'Illustrator', 'After Effects'], posted: '5 days ago', applicants: 56 },
  { id: 5, company: 'Flipkart', title: 'Product Management Intern', logo: '🛒', location: 'Bangalore', duration: '3-6 Months', stipend: 35000, category: 'Operations', type: 'On-site', tags: ['Agile', 'Analytics', 'Roadmapping'], posted: '1 day ago', applicants: 168 },
  { id: 6, company: 'Swiggy', title: 'Marketing Intern', logo: '🍊', location: 'Mumbai', duration: '1-2 Months', stipend: 12000, category: 'Marketing', type: 'Hybrid', tags: ['Social Media', 'Content', 'SEO'], posted: '4 days ago', applicants: 43 },
  { id: 7, company: 'Razorpay', title: 'Backend Engineer Intern', logo: '💳', location: 'Remote', duration: '3-6 Months', stipend: 40000, category: 'Technology', type: 'Remote', tags: ['Node.js', 'Python', 'PostgreSQL'], posted: 'Today', applicants: 95 },
  { id: 8, company: 'CRED', title: 'Finance & Analytics Intern', logo: '💳', location: 'Bangalore', duration: '3-6 Months', stipend: 22000, category: 'Finance', type: 'On-site', tags: ['Excel', 'Python', 'Financial Modelling'], posted: '6 days ago', applicants: 62 },
  { id: 9, company: 'Zomato', title: 'HR Operations Intern', logo: '❤️', location: 'Delhi', duration: '1-2 Months', stipend: 10000, category: 'HR', type: 'On-site', tags: ['Recruitment', 'HRMS', 'Communication'], posted: '3 days ago', applicants: 29 },
  { id: 10, company: 'Infosys', title: 'Full Stack Developer Intern', logo: '🔷', location: 'Chennai', duration: '6+ Months', stipend: 18000, category: 'Technology', type: 'On-site', tags: ['Java', 'Spring Boot', 'React'], posted: '2 days ago', applicants: 145 },
  { id: 11, company: 'Paytm', title: 'Growth Marketing Intern', logo: '💰', location: 'Remote', duration: '3-6 Months', stipend: 15000, category: 'Marketing', type: 'Remote', tags: ['Performance Marketing', 'Growth Hacking', 'A/B Testing'], posted: 'Today', applicants: 72 },
  { id: 12, company: 'TCS', title: 'Cloud & DevOps Intern', logo: '☁️', location: 'Pune', duration: '6+ Months', stipend: 16000, category: 'Technology', type: 'Hybrid', tags: ['AWS', 'Docker', 'Kubernetes'], posted: '1 week ago', applicants: 191 },
];

let savedJobs = new Set([3, 7]);
let currentFiltered = [...internships];

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  renderFeaturedGrid();
  renderBrowseGrid(internships);
  renderSavedGrid();
  initScrollListener();
});

// ===== CARD RENDER =====
function createCard(intern, context = 'browse') {
  const isSaved = savedJobs.has(intern.id);
  return `
    <div class="intern-card" onclick="openApply('${intern.title} at ${intern.company}')">
      <div class="ic-header">
        <div class="ic-logo">${intern.logo}</div>
        <div class="ic-actions">
          <button class="ic-save ${isSaved ? 'saved' : ''}" title="Save" onclick="toggleSave(event, ${intern.id}, this)">
            ${isSaved ? '❤️' : '🤍'}
          </button>
        </div>
      </div>
      <div class="ic-company">${intern.company}</div>
      <div class="ic-title">${intern.title}</div>
      <div class="ic-tags">
        <span class="ic-tag">📍 ${intern.location}</span>
        <span class="ic-tag">⏱ ${intern.duration}</span>
        <span class="ic-tag">💼 ${intern.type}</span>
      </div>
      <div class="ic-tags">
        ${intern.tags.map(t => `<span class="ic-tag">${t}</span>`).join('')}
      </div>
      <div class="ic-footer">
        <div class="ic-stipend">₹${intern.stipend.toLocaleString()} <small>/month</small></div>
        <div style="text-align:right">
          <div style="font-size:.78rem;color:#6b6882;">${intern.applicants} applied</div>
          <div style="font-size:.75rem;color:#a9a7bf;">${intern.posted}</div>
        </div>
      </div>
    </div>
  `;
}

function renderFeaturedGrid() {
  const grid = document.getElementById('featuredGrid');
  if (!grid) return;
  const featured = internships.slice(0, 6);
  grid.innerHTML = featured.map(i => createCard(i, 'home')).join('');
}

function renderBrowseGrid(list) {
  const grid = document.getElementById('browseGrid');
  if (!grid) return;
  if (list.length === 0) {
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:4rem;color:#6b6882;">
      <div style="font-size:3rem;margin-bottom:1rem;">🔍</div>
      <h3>No internships found</h3>
      <p>Try adjusting your filters</p>
    </div>`;
  } else {
    grid.innerHTML = list.map(i => createCard(i)).join('');
  }
  const countEl = document.getElementById('resultCount');
  if (countEl) countEl.textContent = `Showing ${list.length} internship${list.length !== 1 ? 's' : ''}`;
}

function renderSavedGrid() {
  const grid = document.getElementById('savedGrid');
  if (!grid) return;
  const saved = internships.filter(i => savedJobs.has(i.id));
  if (saved.length === 0) {
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:4rem;color:#6b6882;">
      <div style="font-size:3rem;margin-bottom:1rem;">❤️</div>
      <h3>No saved internships yet</h3>
      <p>Browse and save internships you like</p>
    </div>`;
  } else {
    grid.innerHTML = saved.map(i => createCard(i)).join('');
  }
}

// ===== TOGGLE SAVE =====
function toggleSave(event, id, btn) {
  event.stopPropagation();
  if (savedJobs.has(id)) {
    savedJobs.delete(id);
    btn.innerHTML = '🤍';
    btn.classList.remove('saved');
    showToast('Removed from saved');
  } else {
    savedJobs.add(id);
    btn.innerHTML = '❤️';
    btn.classList.add('saved');
    showToast('Saved to your list ❤️');
  }
  renderSavedGrid();
}

// ===== FILTERS =====
function applyFilters() {
  const search = (document.getElementById('filterSearch')?.value || '').toLowerCase();
  const location = document.getElementById('filterLocation')?.value || '';
  const duration = document.getElementById('filterDuration')?.value || '';
  const stipendMax = parseInt(document.getElementById('stipendRange')?.value || 50000);
  const sortBy = document.getElementById('sortBy')?.value || 'Newest First';

  const checkedCats = Array.from(document.querySelectorAll('.checkbox-group input:checked')).map(cb => cb.value);
  const activePill = document.querySelector('#workType .pill.active');
  const workType = activePill?.textContent.trim() || 'All';

  let filtered = internships.filter(i => {
    const matchSearch = !search || i.title.toLowerCase().includes(search) || i.company.toLowerCase().includes(search) || i.tags.some(t => t.toLowerCase().includes(search));
    const matchLocation = !location || i.location === location;
    const matchDuration = !duration || i.duration === duration;
    const matchStipend = stipendMax >= 50000 || i.stipend <= stipendMax;
    const matchCat = checkedCats.length === 0 || checkedCats.includes(i.category);
    const matchWork = workType === 'All' || i.type === workType;
    return matchSearch && matchLocation && matchDuration && matchStipend && matchCat && matchWork;
  });

  if (sortBy === 'Highest Stipend') filtered.sort((a, b) => b.stipend - a.stipend);
  else if (sortBy === 'Most Popular') filtered.sort((a, b) => b.applicants - a.applicants);

  currentFiltered = filtered;
  renderBrowseGrid(filtered);
}

function updateStipend(val) {
  const el = document.getElementById('stipendVal');
  if (el) el.textContent = parseInt(val) >= 50000 ? 'Any' : `₹${parseInt(val).toLocaleString()}`;
  applyFilters();
}

function clearFilters() {
  document.getElementById('filterSearch').value = '';
  document.getElementById('filterLocation').value = '';
  document.getElementById('filterDuration').value = '';
  document.getElementById('stipendRange').value = 50000;
  document.getElementById('stipendVal').textContent = 'Any';
  document.getElementById('sortBy').value = 'Newest First';
  document.querySelectorAll('.checkbox-group input').forEach(cb => cb.checked = false);
  document.querySelectorAll('#workType .pill').forEach((p, i) => { p.classList.toggle('active', i === 0); });
  applyFilters();
}

function togglePill(el, groupId) {
  document.querySelectorAll(`#${groupId} .pill`).forEach(p => p.classList.remove('active'));
  el.classList.add('active');
  applyFilters();
}

// ===== PAGE ROUTING =====
function showPage(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const target = document.getElementById(`page-${page}`);
  if (target) { target.classList.add('active'); window.scrollTo(0, 0); }
  closeAllMenus();
}

function scrollToSection(id) {
  setTimeout(() => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 100);
}

// ===== MODALS =====
function showModal(name) {
  document.getElementById(`modal-${name}`)?.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal(name) {
  document.getElementById(`modal-${name}`)?.classList.remove('active');
  document.body.style.overflow = '';
}

function closeModalOutside(event) {
  if (event.target.classList.contains('modal-overlay')) {
    event.target.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function switchRole(btn, formId) {
  btn.parentElement.querySelectorAll('.mtab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  const parent = btn.closest('.modal');
  parent.querySelectorAll('.role-form').forEach(f => f.classList.remove('active'));
  parent.querySelector(`#${formId}`)?.classList.add('active');
}

function switchRegRole(btn, formId) {
  btn.parentElement.querySelectorAll('.mtab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  const parent = btn.closest('.modal');
  parent.querySelectorAll('.role-form').forEach(f => f.classList.remove('active'));
  parent.querySelector(`#${formId}`)?.classList.add('active');
}

function loginAs(role) {
  if (role === 'student') {
    document.querySelectorAll('.modal-overlay').forEach(m => { m.classList.remove('active'); });
    document.body.style.overflow = '';
    showPage('dashboard');
    showToast('Welcome back, Arjun! 👋');
  } else if (role === 'industry') {
    document.querySelectorAll('.modal-overlay').forEach(m => { m.classList.remove('active'); });
    document.body.style.overflow = '';
    showPage('industry');
    showToast('Welcome, TechCorp Solutions! 🏢');
  } else if (role === 'admin') {
    document.querySelectorAll('.modal-overlay').forEach(m => { m.classList.remove('active'); });
    document.body.style.overflow = '';
    showToast('Admin panel (coming soon!)');
  }
}

// ===== APPLY =====
function openApply(jobTitle) {
  const el = document.getElementById('applyJobTitle');
  if (el) el.textContent = jobTitle;
  showModal('apply');
}

function submitApplication() {
  closeModal('apply');
  showToast('Application submitted successfully! 🚀');
  setTimeout(() => showPage('dashboard'), 500);
}

// ===== DASHBOARD TABS =====
function showDashTab(tabId, link) {
  document.querySelectorAll('#page-dashboard .dash-tab').forEach(t => t.classList.remove('active'));
  document.getElementById(`tab-${tabId}`)?.classList.add('active');
  document.querySelectorAll('#page-dashboard .dash-link').forEach(l => l.classList.remove('active'));
  link.classList.add('active');
}

function showIndustryTab(tabId, link) {
  document.querySelectorAll('#page-industry .dash-tab').forEach(t => t.classList.remove('active'));
  document.getElementById(`tab-${tabId}`)?.classList.add('active');
  document.querySelectorAll('#page-industry .dash-link').forEach(l => l.classList.remove('active'));
  link.classList.add('active');
}

// ===== MESSAGES =====
function sendMessage() {
  const input = document.getElementById('msgInput');
  if (!input || !input.value.trim()) return;
  const body = document.querySelector('.msg-body');
  const bubble = document.createElement('div');
  bubble.className = 'msg-bubble sent';
  bubble.textContent = input.value.trim();
  body.appendChild(bubble);
  body.scrollTop = body.scrollHeight;
  input.value = '';
}

// ===== TOAST =====
function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

// ===== NAVBAR =====
function initScrollListener() {
  window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 10);
  });
}

function toggleMenu() {
  const links = document.getElementById('navLinks');
  if (links) links.classList.toggle('open');
}

function closeAllMenus() {
  const links = document.getElementById('navLinks');
  if (links) links.classList.remove('open');
}

// Click outside closes menus
document.addEventListener('click', (e) => {
  if (!e.target.closest('.navbar')) closeAllMenus();
});

// Filter tabs click toggle
document.querySelectorAll('.ftab').forEach(tab => {
  tab.addEventListener('click', function() {
    document.querySelectorAll('.ftab').forEach(t => t.classList.remove('active'));
    this.classList.add('active');
  });
});

// Message thread click
document.querySelectorAll('.msg-thread').forEach(thread => {
  thread.addEventListener('click', function() {
    document.querySelectorAll('.msg-thread').forEach(t => t.classList.remove('active'));
    this.classList.add('active');
  });
});

// Keyboard: Enter to send message
document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && document.activeElement?.id === 'msgInput') sendMessage();
});
