/* 
  FUNKE FURNISHERS - CORE LOGIC
  Handling Navigation, Catalog, and Admin Functionality
*/

// ============================================
// CONFIG & DATA
// ============================================
const WA_NUMBER = '265994040900';
const WA_BASE_MSG = 'Hello Funke Furnishers! I am interested in ';

const CATEGORIES = [
  { name: 'Sofas', filter: 'Sofa', img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80&auto=format&fit=crop', count: 12 },
  { name: 'Beds', filter: 'Bed', img: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80&auto=format&fit=crop', count: 8 },
  { name: 'Dining Tables', filter: 'Table', img: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=600&q=80&auto=format&fit=crop', count: 10 }
];

const PRODUCTS = [
  { id: 1, name: 'Funke 3-Seater Sofa', cat: 'Sofa', price: 'MK 285,000', badge: 'hot', badgeTxt: 'Best Seller',
    img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=700&q=80&auto=format&fit=crop',
    desc: 'Luxurious 3-seater sofa with premium fabric and solid wood frame. Available in multiple colours.',
    feats: ['Solid wood frame', 'Premium foam cushions', '5 colour options', '2-year warranty'] },
  { id: 2, name: 'King Size Bed Frame', cat: 'Bed', price: 'MK 420,000', badge: 'new', badgeTxt: 'New Arrival',
    img: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=700&q=80&auto=format&fit=crop',
    desc: 'Elegant king-size bed with upholstered headboard and solid mahogany legs. Fits standard king mattress.',
    feats: ['King size 180×200cm', 'Upholstered headboard', 'Mahogany legs', 'Easy assembly'] },
  { id: 3, name: '6-Seater Dining Set', cat: 'Table', price: 'MK 580,000', badge: 'pop', badgeTxt: 'Popular',
    img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=700&q=80&auto=format&fit=crop',
    desc: 'Complete dining set with solid wood table and 6 matching chairs. Rich mahogany finish.',
    feats: ['Solid wood', 'Seats 6 people', 'Mahogany finish', 'Chairs included'] },
  { id: 4, name: '4-Door Wardrobe', cat: 'Wardrobe', price: 'MK 495,000', badge: '',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80&auto=format&fit=crop',
    desc: 'Spacious 4-door wardrobe with mirror panel, shelves, and hanging rails.',
    feats: ['Mirror panel door', 'Internal shelves', 'Hanging rails', 'Solid construction'] },
  { id: 5, name: 'L-Shaped Corner Sofa', cat: 'Sofa', price: 'MK 550,000', badge: 'new', badgeTxt: 'New',
    img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=700&q=80&auto=format&fit=crop',
    desc: 'Stunning L-shaped sofa for large living rooms. Deep-set cushions, premium fabric, built for comfort.',
    feats: ['L-shape design', 'Deep-set cushions', 'Premium fabric', 'Solid wood base'] },
  { id: 6, name: 'Queen Bed with Storage', cat: 'Bed', price: 'MK 380,000', badge: '',
    img: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=700&q=80&auto=format&fit=crop',
    desc: 'Queen bed with under-bed storage drawers. Saves space while providing elegant bedroom style.',
    feats: ['Queen size 160×200cm', 'Under-bed drawers', 'Upholstered headboard', '2-year warranty'] },
  { id: 7, name: 'Solid Wood Coffee Table', cat: 'Table', price: 'MK 185,000', badge: 'new', badgeTxt: 'New',
    img: 'https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?w=700&q=80&auto=format&fit=crop',
    desc: 'Elegant solid wood coffee table with glass top insert. Modern design for any living room.',
    feats: ['Solid hardwood', 'Glass top insert', 'Lower shelf', 'Easy to clean'] },
  { id: 8, name: 'Sliding Wardrobe', cat: 'Wardrobe', price: 'MK 620,000', badge: 'new', badgeTxt: 'New',
    img: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=700&q=80&auto=format&fit=crop',
    desc: 'Modern sliding door wardrobe with full-length mirror. Soft-close mechanism and ample storage.',
    feats: ['Sliding doors', 'Full-length mirror', 'Soft-close mechanism', 'Custom sizing available'] },
];

const MARQUEE_TEXTS = ['Premium Quality', 'Free Delivery in Lilongwe', 'Handcrafted in Malawi', 'Custom Furniture Available', '2-Year Warranty', '500+ Happy Clients', 'WhatsApp Orders', '8 Years Experience'];

// ============================================
// PAGE NAVIGATION
// ============================================
window.goto = function(page) {
  document.querySelectorAll('.pg').forEach(p => p.classList.remove('on'));
  const target = document.getElementById('pg-' + page);
  if (target) target.classList.add('on');

  // Update Nav Active State
  document.querySelectorAll('.n-lnk').forEach(l => {
    l.classList.toggle('on', l.dataset.p === page);
  });

  // Close mobile menu if open
  const navLinks = document.getElementById('navLinks');
  if (navLinks) navLinks.classList.remove('open');

  // Handle Nav/Footer visibility for Admin
  const isAdmin = page === 'admin' || page === 'adminlogin';
  document.getElementById('nav').style.display = isAdmin ? 'none' : '';
  const footer = document.getElementById('site-footer');
  if (footer) footer.style.display = isAdmin ? 'none' : '';
  const floatWa = document.querySelector('.float-wa');
  if (floatWa) floatWa.style.display = isAdmin ? 'none' : '';

  window.scrollTo({ top: 0 });
  
  // Trigger animations for the new page
  setTimeout(triggerAnimations, 50);
};

window.toggleMenu = function() {
  const links = document.getElementById('navLinks');
  if (links) links.classList.toggle('open');
};

window.addEventListener('scroll', () => {
  const nav = document.getElementById('nav');
  if (nav) nav.classList.toggle('solid', window.scrollY > 10);
});

// ============================================
// COMPONENTS RENDERING
// ============================================
function initMarquee() {
  const inner = document.getElementById('marqueeInner');
  if (!inner) return;
  let html = '';
  for (let i = 0; i < 3; i++) { // Repeat 3 times for smooth loop
    MARQUEE_TEXTS.forEach(item => {
      html += `<span class="mq-item"><span class="mq-dot"></span>${item}</span>`;
    });
  }
  inner.innerHTML = html;
}

function initCategories() {
  const grid = document.getElementById('catsGrid');
  if (!grid) return;
  grid.innerHTML = CATEGORIES.map(c => `
    <div class="cat-card" onclick="gotoFilter('${c.filter}')">
      <img src="${c.img}" alt="${c.name}" loading="lazy"/>
      <div class="cat-overlay">
        <div class="cat-name">${c.name}</div>
        <div class="cat-count">${c.count} pieces available</div>
      </div>
      <div class="cat-arr">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="white"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/></svg>
      </div>
    </div>
  `).join('');
}

window.gotoFilter = function(filter) {
  window.goto('gallery');
  setTimeout(() => filterGallery(filter, document.querySelector(`.f-btn[data-f="${filter}"]`)), 150);
};

function createProductCard(p) {
  const msg = encodeURIComponent(WA_BASE_MSG + p.name + ' (' + p.price + '). Can I get more info?');
  const waUrl = `https://wa.me/${WA_NUMBER}?text=${msg}`;
  
  return `
    <div class="p-card" onclick="openDetail(${p.id})">
      <div class="p-img">
        <img src="${p.img}" alt="${p.name}" loading="lazy"/>
        ${p.badge ? `<span class="p-badge badge-${p.badge}">${p.badgeTxt}</span>` : ''}
        <a href="${waUrl}" target="_blank" class="p-wa" onclick="event.stopPropagation()">
          <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
        </a>
      </div>
      <div class="p-body">
        <div class="p-cat">${p.cat}</div>
        <div class="p-name">${p.name}</div>
        <p class="p-desc">${p.desc}</p>
        <div class="p-foot">
          <div class="p-price">${p.price}<small>Lilongwe, Malawi</small></div>
          <button class="p-btn" onclick="event.stopPropagation();openDetail(${p.id})">Details</button>
        </div>
      </div>
    </div>
  `;
}

function initProducts() {
  const featGrid = document.getElementById('featGrid');
  if (featGrid) featGrid.innerHTML = PRODUCTS.slice(0, 3).map(createProductCard).join('');
  
  const galGrid = document.getElementById('galGrid');
  if (galGrid) galGrid.innerHTML = PRODUCTS.map(createProductCard).join('');
}

window.filterGallery = function(filter, btn) {
  document.querySelectorAll('.f-btn').forEach(b => b.classList.remove('on'));
  if (btn) btn.classList.add('on');
  const grid = document.getElementById('galGrid');
  if (!grid) return;
  grid.innerHTML = PRODUCTS.filter(p => filter === 'All' || p.cat === filter).map(createProductCard).join('');
};

// ============================================
// PRODUCT DETAIL
// ============================================
window.openDetail = function(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  const msg = encodeURIComponent(WA_BASE_MSG + p.name + ' (' + p.price + ').');
  const featsHtml = (p.feats || []).map(f => `
    <div class="det-feat">
      <svg viewBox="0 0 24 24" width="16" height="16" fill="var(--gold)"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
      <span>${f}</span>
    </div>
  `).join('');
  
  const wrap = document.getElementById('detWrap');
  if (wrap) {
    wrap.innerHTML = `
      <div class="det-top">
        <button class="btn-back" onclick="goto('gallery')">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>
          Back to Gallery
        </button>
      </div>
      <div class="det-grid">
        <div class="det-img-side">
          <img src="${p.img}" alt="${p.name}"/>
        </div>
        <div class="det-info-side">
          <div class="det-cat">${p.cat.toUpperCase()}</div>
          <h1 class="det-name">${p.name}</h1>
          <div class="det-price">${p.price}</div>
          <p class="det-price-sub">Price in Malawian Kwacha (negotiable)</p>
          <p class="det-desc">${p.desc}</p>
          <div class="det-feats-grid">${featsHtml}</div>
          <div class="det-acts">
            <a href="https://wa.me/${WA_NUMBER}?text=${msg}" target="_blank" class="btn-wa-large">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
              Order via WhatsApp
            </a>
            <button class="btn-ghost-large" onclick="goto('contact')">Contact Us</button>
          </div>
        </div>
      </div>
    `;
  }
  window.goto('detail');
};

// ============================================
// FORMS
// ============================================
window.submitCustomOrder = function(e) {
  e.preventDefault();
  const form = e.target;
  const name = form.querySelector('input[type="text"]').value;
  const phone = form.querySelector('input[type="tel"]').value;
  const type = form.querySelector('select').value;
  const desc = form.querySelector('textarea').value;
  const budget = form.querySelectorAll('input[type="text"]')[1].value;

  const msg = `*New Custom Order Request - Funke Furnishers*\n\n` +
              `*Customer:* ${name}\n` +
              `*WhatsApp:* ${phone}\n` +
              `*Furniture Type:* ${type}\n` +
              `*Description:* ${desc}\n` +
              (budget ? `*Estimated Budget:* ${budget}\n` : '') +
              `\n_Sent via funkefurnishers.mw_`;

  // Hide form and show success
  form.style.display = 'none';
  document.getElementById('cusSuccess').style.display = 'flex';

  // Open WhatsApp
  setTimeout(() => {
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
  }, 1500);
};

window.submitContact = function(e) {
  e.preventDefault();
  const form = e.target;
  const name = form.querySelector('input[type="text"]').value;
  
  // Show success message
  form.style.display = 'none';
  const success = document.getElementById('conSuccess');
  if (success) {
    success.style.display = 'flex';
    success.querySelector('p').innerText = `Thank you ${name.split(' ')[0]}! We've received your message and will respond shortly.`;
  }
};

window.previewUpload = function(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    const img = document.getElementById('imgPrev');
    img.src = ev.target.result;
    img.style.display = 'block';
    document.getElementById('uploadPH').style.display = 'none';
  };
  reader.readAsDataURL(file);
};

// ============================================
// ADMIN LOGIC (SIMULATED)
// ============================================
const ADMIN_CREDENTIALS = { user: 'admin', pass: 'funke2024' };

window.adminLogin = function(e) {
  e.preventDefault();
  const u = document.getElementById('admUser').value.trim();
  const p = document.getElementById('admPass').value;
  if (u === ADMIN_CREDENTIALS.user && p === ADMIN_CREDENTIALS.pass) {
    document.getElementById('admErr').style.display = 'none';
    window.goto('admin');
  } else {
    document.getElementById('admErr').style.display = 'block';
  }
};

window.adminLogout = function() {
  window.goto('home');
};

// ============================================
// SCROLL REVEAL & ANIMATIONS
// ============================================
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { 
  threshold: 0.05,
  rootMargin: '0px 0px -10px 0px'
});

function initAnimations() {
  document.querySelectorAll('.fade-up').forEach(el => {
    revealObserver.observe(el);
  });
}

function triggerAnimations() {
  // Check if any visible elements are on the current page and show them immediately if in view
  document.querySelectorAll('.pg.on .fade-up:not(.visible)').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight + 100) {
      el.classList.add('visible');
    }
  });
  
  // Failsafe for short pages where scroll might not trigger the observer
  setTimeout(() => {
    if (document.body.scrollHeight <= window.innerHeight + 150) {
      document.querySelectorAll('.pg.on .fade-up:not(.visible)').forEach(el => el.classList.add('visible'));
    }
  }, 100);
}

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  initMarquee();
  initCategories();
  initProducts();
  initAnimations();
  
  // Set initial state
  window.goto('home');
});
