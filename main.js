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

  if (page === 'admin') {
    initAdminPanel();
  }

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
  grid.innerHTML = CATEGORIES.map(c => {
    const count = PRODUCTS.filter(p => p.cat === c.filter).length;
    return `
      <div class="cat-card" onclick="gotoFilter('${c.filter}')">
        <img src="${c.img}" alt="${c.name}" loading="lazy"/>
        <div class="cat-overlay">
          <div class="cat-name">${c.name}</div>
          <div class="cat-count">${count} pieces available</div>
        </div>
        <div class="cat-arr">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="white"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/></svg>
        </div>
      </div>
    `;
  }).join('');
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

  // Retrieve inspiration image from upload area preview if uploaded
  const imgPrev = document.getElementById('imgPrev');
  const imgData = (imgPrev && imgPrev.style.display !== 'none') ? imgPrev.src : '';

  // Add the new request to our dynamic in-memory registry
  const nextReqId = CUSTOM_REQUESTS.length ? Math.max(...CUSTOM_REQUESTS.map(x => x.id)) + 1 : 1;
  const newReq = {
    id: nextReqId,
    name: name,
    phone: phone,
    time: 'Just now',
    type: type,
    desc: desc,
    budget: budget || 'Not specified',
    status: 'new',
    img: imgData
  };
  CUSTOM_REQUESTS.unshift(newReq);

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
  const name = form.querySelector('input[type="text"]').value.trim();
  const phone = form.querySelector('input[type="tel"]').value.trim();
  const productInput = form.querySelectorAll('input[type="text"]')[1];
  const product = productInput ? productInput.value.trim() : '';
  const message = form.querySelector('textarea').value.trim();

  // Store in CONTACT_MESSAGES for admin
  const nextMsgId = CONTACT_MESSAGES.length ? Math.max(...CONTACT_MESSAGES.map(x => x.id)) + 1 : 1;
  CONTACT_MESSAGES.unshift({
    id: nextMsgId,
    name,
    phone,
    product: product || 'General Enquiry',
    message,
    time: 'Just now',
    read: false
  });
  updateMsgBadge();

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
// ADMIN LOGIC (FULLY FUNCTIONAL)
// ============================================
const ADMIN_CREDENTIALS = { user: 'admin', pass: 'funke2024' };

// In-memory contact messages store
const CONTACT_MESSAGES = [
  {
    id: 1,
    name: 'Mphatso Chirwa',
    phone: '+265 888 102 030',
    product: 'King Size Bed Frame',
    message: 'Hello, I would like to enquire about the king size bed frame. Is the price negotiable? I am also interested in a matching wardrobe. Please contact me at your earliest convenience.',
    time: '3 hours ago',
    read: false
  },
  {
    id: 2,
    name: 'Takondwa Lungu',
    phone: '+265 999 201 344',
    product: 'General Enquiry',
    message: 'Do you deliver to Blantyre? I am looking for a full living room set — sofa, coffee table, and TV stand. Can I get a package deal or discount?',
    time: 'Yesterday',
    read: false
  },
  {
    id: 3,
    name: 'Yohane Mvula',
    phone: '+265 881 990 221',
    product: '6-Seater Dining Set',
    message: 'I visited your showroom last week and loved the dining set. Is it available in a 4-seater version? My dining room is small and I think a 4-seater would fit better.',
    time: '2 days ago',
    read: true
  }
];

const CUSTOM_REQUESTS = [
  {
    id: 1,
    name: 'Thoko Mwale',
    phone: '+265 999 123 456',
    time: '2 hours ago',
    type: 'Sofa / Sofa Set',
    desc: 'I want a 3-seater L-shaped sofa in dark grey velvet fabric with gold legs. Similar to a Pinterest image I saw. The sofa should have deep cushions and be about 2.5m on the long side.',
    budget: 'MK 300,000 – MK 400,000',
    status: 'new',
    img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&q=80'
  },
  {
    id: 2,
    name: 'Chisomo Banda',
    phone: '+265 888 456 789',
    time: 'Yesterday',
    type: 'Bed Frame',
    desc: 'King-size bed frame with a tall padded headboard in cream fabric. I want a modern look with wooden legs in a dark walnut finish. No storage drawers needed.',
    budget: 'MK 250,000 – MK 320,000',
    status: 'review',
    img: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=300&q=80'
  },
  {
    id: 3,
    name: 'Kondwani Phiri',
    phone: '+265 992 334 455',
    time: '2 days ago',
    type: 'Dining Table & Chairs',
    desc: 'Solid mahogany dining table with 6 matching upholstered chairs. Table should be rectangular, 1.8m x 1m, with simple clean lines. Upholstery in beige linen.',
    budget: 'MK 500,000 – MK 600,000',
    status: 'contacted',
    img: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=300&q=80'
  },
  {
    id: 4,
    name: 'Alinafe Tembo',
    phone: '+265 881 223 344',
    time: '3 days ago',
    type: 'Wardrobe',
    desc: 'Custom 3-door wardrobe with sliding doors. One door should be a full-length mirror. Interior needs hanging space, 4 drawers and several shelves.',
    budget: 'MK 400,000 – MK 500,000',
    status: 'new',
    img: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=300&q=80'
  },
  {
    id: 5,
    name: 'Yamikani Chanza',
    phone: '+265 999 556 677',
    time: '4 days ago',
    type: 'TV Stand / Entertainment Unit',
    desc: 'Floating TV stand in light oak veneer. It should have 3 drawers below and open shelving for media players. Width 1.8m.',
    budget: 'MK 150,000 – MK 200,000',
    status: 'review',
    img: ''
  },
  {
    id: 6,
    name: 'Gloria Msowoya',
    phone: '+265 888 990 011',
    time: '5 days ago',
    type: 'Sofa / Sofa Set',
    desc: '2-seater loveseat in light pink velvet fabric for a bedroom corner. Golden hairpin legs and matching accent pillows.',
    budget: 'MK 180,000 – MK 220,000',
    status: 'new',
    img: ''
  }
];

let currentReqFilter = 'all';

window.toggleAdminPassword = function(btn) {
  const input = btn.closest('.pw-wrap').querySelector('input');
  const eyeOpen = btn.querySelector('.eye-icon');
  const eyeOff  = btn.querySelector('.eye-off-icon');
  const isHidden = input.type === 'password';
  input.type = isHidden ? 'text' : 'password';
  eyeOpen.style.display = isHidden ? 'none' : '';
  eyeOff.style.display  = isHidden ? '' : 'none';
  btn.setAttribute('aria-label', isHidden ? 'Hide password' : 'Show password');
};

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

window.initAdminPanel = function() {
  window.switchAdminTab('dashboard');
  updateMsgBadge();
};

window.toggleAdminSidebar = function() {
  const sidebar = document.getElementById('adm-sidebar');
  const overlay = document.getElementById('adm-sidebar-overlay');
  if (!sidebar) return;
  const isOpen = sidebar.classList.contains('mobile-open');
  sidebar.classList.toggle('mobile-open', !isOpen);
  if (overlay) overlay.classList.toggle('visible', !isOpen);
  // Prevent body scroll when sidebar open on mobile
  document.body.style.overflow = !isOpen ? 'hidden' : '';
};

window.switchAdminTab = function(tabName) {
  // Toggle nav classes
  document.querySelectorAll('.adm-sidebar .adm-nav-item').forEach(item => {
    item.classList.remove('on');
  });
  const navItem = document.getElementById('adm-nav-' + tabName);
  if (navItem) navItem.classList.add('on');

  // Toggle tab contents
  document.querySelectorAll('.adm-tab-content').forEach(content => {
    content.classList.remove('on');
  });
  const targetContent = document.getElementById('adm-tab-' + tabName);
  if (targetContent) targetContent.classList.add('on');

  // Auto-close sidebar on mobile after selection
  if (window.innerWidth <= 900) {
    const sidebar = document.getElementById('adm-sidebar');
    const overlay = document.getElementById('adm-sidebar-overlay');
    if (sidebar && sidebar.classList.contains('mobile-open')) {
      sidebar.classList.remove('mobile-open');
      if (overlay) overlay.classList.remove('visible');
      document.body.style.overflow = '';
    }
  }

  // Load content
  if (tabName === 'dashboard') {
    window.renderAdminDashboard();
  } else if (tabName === 'products') {
    window.renderAdminProducts();
  } else if (tabName === 'requests') {
    window.renderAdminRequests(currentReqFilter);
  } else if (tabName === 'messages') {
    window.renderAdminMessages();
    // Mark all as read when tab is opened
    CONTACT_MESSAGES.forEach(m => { m.read = true; });
    updateMsgBadge();
  } else if (tabName === 'reports') {
    window.renderAdminReports();
  }
};

window.renderAdminDashboard = function() {
  const contactedCount = CUSTOM_REQUESTS.filter(r => r.status === 'contacted').length;
  const activeCount = CUSTOM_REQUESTS.filter(r => r.status === 'new' || r.status === 'review').length;
  const unreadMsgs = CONTACT_MESSAGES.filter(m => !m.read).length;
  
  // Update stats
  document.getElementById('stat-total-orders').innerText = (1284 + contactedCount).toLocaleString();
  document.getElementById('stat-active-quotes').innerText = activeCount;
  document.getElementById('stat-revenue').innerText = ((8200000 + contactedCount * 350000) / 1000000).toFixed(1) + 'M';
  const msgEl = document.getElementById('stat-messages');
  if (msgEl) msgEl.innerText = CONTACT_MESSAGES.length + (unreadMsgs > 0 ? ` (${unreadMsgs} new)` : '');

  // Render recent requests
  const recent = CUSTOM_REQUESTS.slice(0, 5);
  const tbody = document.getElementById('recent-requests-table-body');
  if (tbody) {
    tbody.innerHTML = recent.map(r => {
      let badgeColor = '#fff3e0';
      let badgeTextColor = '#ef6c00';
      let badgeLabel = 'PENDING';
      
      if (r.status === 'review') {
        badgeColor = '#e3f2fd';
        badgeTextColor = '#1565c0';
        badgeLabel = 'UNDER REVIEW';
      } else if (r.status === 'contacted') {
        badgeColor = '#e8f5e9';
        badgeTextColor = '#2e7d32';
        badgeLabel = 'CONTACTED';
      }

      return `
        <tr style="border-bottom:1px solid #f5f5f5;">
            <td style="padding:16px 0;"><strong>${r.name}</strong><br/><small style="color:var(--muted);">${r.phone}</small></td>
            <td>${r.type}</td>
            <td>${r.time}</td>
            <td><span style="background:${badgeColor}; color:${badgeTextColor}; padding:4px 10px; border-radius:50px; font-size:0.75rem; font-weight:700;">${badgeLabel}</span></td>
            <td style="text-align:right;">
              <button class="p-btn" onclick="currentReqFilter='${r.status}'; window.switchAdminTab('requests')">View</button>
            </td>
        </tr>
      `;
    }).join('');
  }
};

window.renderAdminProducts = function() {
  const searchVal = (document.getElementById('prod-search')?.value || '').toLowerCase().trim();
  const tbody = document.getElementById('admin-products-table-body');
  if (!tbody) return;

  const filtered = PRODUCTS.filter(p => 
    p.name.toLowerCase().includes(searchVal) || 
    p.cat.toLowerCase().includes(searchVal)
  );

  tbody.innerHTML = filtered.map(p => {
    let badgeHtml = '—';
    if (p.badge) {
      badgeHtml = `<span class="badge-admin-tag ${p.badge}">${p.badgeTxt || p.badge}</span>`;
    }

    return `
      <tr style="border-bottom:1px solid #f5f5f5;">
        <td style="padding:16px 0;">
          <div class="prod-table-cell-flex">
            <img src="${p.img}" class="prod-table-img" alt="${p.name}" />
            <div class="prod-table-cell-info">
              <span class="prod-table-cell-name">${p.name}</span>
              <span class="prod-table-cell-desc">${p.desc}</span>
            </div>
          </div>
        </td>
        <td><span class="badge-category ${p.cat}">${p.cat}</span></td>
        <td style="font-weight:600; color:var(--ink);">${p.price}</td>
        <td>${badgeHtml}</td>
        <td style="text-align:right;">
          <div style="display:inline-flex; gap:8px;">
            <button class="p-btn" style="padding:8px; display:inline-flex; align-items:center;" onclick="openEditProductModal(${p.id})">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
            </button>
            <button class="p-btn" style="padding:8px; display:inline-flex; align-items:center; background:#ffebee; color:#c62828; border-color:#ffcdd2;" onclick="deleteProduct(${p.id})">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
};

window.filterAdminRequests = function(filterType, btn) {
  document.querySelectorAll('#req-filter-tabs .f-btn').forEach(b => b.classList.remove('on'));
  if (btn) btn.classList.add('on');
  
  currentReqFilter = filterType;
  window.renderAdminRequests(filterType);
};

window.renderAdminRequests = function(filterType) {
  const container = document.getElementById('admin-requests-list');
  if (!container) return;

  const filtered = CUSTOM_REQUESTS.filter(r => filterType === 'all' || r.status === filterType);
  
  container.innerHTML = filtered.length === 0 
    ? `<div style="text-align:center; padding:48px 0; color:var(--muted);">No requests found in this category.</div>`
    : filtered.map(r => {
        const initials = r.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
        
        let actionBtnHtml = '';
        if (r.status === 'new') {
          actionBtnHtml = `
            <button class="btn-contacted-action" onclick="changeRequestStatus(${r.id}, 'review')">Mark as Under Review</button>
            <button class="btn-contacted-action" style="background:var(--gold); color:#fff; border-color:var(--gold);" onclick="changeRequestStatus(${r.id}, 'contacted')">Mark as Contacted</button>
          `;
        } else if (r.status === 'review') {
          actionBtnHtml = `
            <button class="btn-contacted-action" style="background:var(--gold); color:#fff; border-color:var(--gold);" onclick="changeRequestStatus(${r.id}, 'contacted')">Mark as Contacted</button>
          `;
        } else if (r.status === 'contacted') {
          actionBtnHtml = `
            <button class="btn-contacted-action" onclick="changeRequestStatus(${r.id}, 'new')">Reopen Request</button>
          `;
        }

        const msgText = encodeURIComponent(`Hello ${r.name}, this is Funke Furnishers replying to your custom order request for a ${r.type}. We would love to discuss this with you!`);
        const waLink = `https://wa.me/${r.phone.replace(/[\s\+\(\)\-]/g, '')}?text=${msgText}`;

        return `
          <div class="req-card">
            <div class="req-header">
              <div class="req-user-info">
                <div class="req-avatar">${initials}</div>
                <div class="req-user-details">
                  <div class="req-user-name">${r.name}</div>
                  <div class="req-user-meta">
                    <a href="tel:${r.phone}" class="req-user-phone">${r.phone}</a>
                    <span style="color:rgba(0,0,0,0.15)">|</span>
                    <span class="req-user-time">${r.time}</span>
                  </div>
                </div>
              </div>
              <span class="req-status ${r.status}">${r.status === 'review' ? 'under review' : r.status}</span>
            </div>
            
            <div style="display:flex; justify-content:space-between; gap:32px; align-items:flex-start;">
              <blockquote class="req-body">"${r.desc}"</blockquote>
              ${r.img ? `<img src="${r.img}" class="req-image-thumb" onclick="window.open('${r.img}', '_blank')" title="Click to view full image"/>` : ''}
            </div>

            <div class="req-pills">
              <span class="req-pill type">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
                ${r.type}
              </span>
              <span class="req-pill budget">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>
                ${r.budget}
              </span>
            </div>

            <div class="req-footer">
              <div class="req-actions">
                <a href="${waLink}" target="_blank" class="btn-wa-reply">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                  Reply on WhatsApp
                </a>
              </div>
              <div style="display:flex; gap:12px;">
                ${actionBtnHtml}
              </div>
            </div>
          </div>
        `;
      }).join('');

  // Update counts in filter headers
  document.getElementById('req-filter-all').innerText = `All (${CUSTOM_REQUESTS.length})`;
  document.getElementById('req-filter-new').innerText = `New (${CUSTOM_REQUESTS.filter(r => r.status === 'new').length})`;
  document.getElementById('req-filter-review').innerText = `Under Review (${CUSTOM_REQUESTS.filter(r => r.status === 'review').length})`;
  document.getElementById('req-filter-contacted').innerText = `Contacted (${CUSTOM_REQUESTS.filter(r => r.status === 'contacted').length})`;
};

window.changeRequestStatus = function(id, newStatus) {
  const req = CUSTOM_REQUESTS.find(r => r.id === id);
  if (req) {
    req.status = newStatus;
    window.renderAdminRequests(currentReqFilter);
    window.renderAdminDashboard();
  }
};

// ============================================
// MESSAGES TAB LOGIC
// ============================================
function updateMsgBadge() {
  const unread = CONTACT_MESSAGES.filter(m => !m.read).length;
  const badge = document.getElementById('adm-msg-badge');
  if (badge) {
    badge.textContent = unread;
    badge.style.display = unread > 0 ? 'inline-block' : 'none';
  }
}

window.renderAdminMessages = function() {
  const container = document.getElementById('admin-messages-list');
  if (!container) return;

  if (CONTACT_MESSAGES.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <svg viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/></svg>
        <h3>No Messages Yet</h3>
        <p>Contact form submissions will appear here.</p>
      </div>`;
    return;
  }

  container.innerHTML = CONTACT_MESSAGES.map(m => {
    const initials = m.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    const waMsg = encodeURIComponent(`Hello ${m.name}, thank you for contacting Funke Furnishers! We received your message regarding "${m.product}". How can we assist you further?`);
    const waLink = `https://wa.me/${m.phone.replace(/[\s\+\(\)\-]/g, '')}?text=${waMsg}`;

    return `
      <div class="msg-card${m.read ? '' : ' unread'}" id="msg-card-${m.id}">
        <div class="msg-header">
          <div class="msg-sender-info">
            <div class="msg-avatar">${initials}</div>
            <div>
              <div class="msg-sender-name">${m.name}</div>
              <div class="msg-sender-meta">
                <a href="tel:${m.phone}" style="color:var(--ink-2); font-weight:600;">${m.phone}</a>
                ${m.product !== 'General Enquiry' ? `<span class="msg-product-interest">re: ${m.product}</span>` : ''}
              </div>
            </div>
          </div>
          <div class="msg-badge-wrap">
            ${!m.read ? '<span class="msg-unread-dot" title="Unread"></span>' : ''}
            <span class="msg-time">${m.time}</span>
          </div>
        </div>
        <div class="msg-body">${m.message}</div>
        <div class="msg-footer">
          <div class="msg-actions">
            <a href="${waLink}" target="_blank" class="btn-wa-reply">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
              Reply on WhatsApp
            </a>
            <a href="tel:${m.phone}" class="btn-msg-read">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" style="vertical-align:middle; margin-right:4px;"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
              Call
            </a>
          </div>
          <button class="btn-msg-delete" onclick="deleteMessage(${m.id})">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
            Delete
          </button>
        </div>
      </div>
    `;
  }).join('');
};

window.deleteMessage = function(id) {
  const idx = CONTACT_MESSAGES.findIndex(m => m.id === id);
  if (idx !== -1) {
    CONTACT_MESSAGES.splice(idx, 1);
    window.renderAdminMessages();
    updateMsgBadge();
  }
};

window.deleteAllMessages = function() {
  if (CONTACT_MESSAGES.length === 0) return;
  if (confirm('Are you sure you want to delete all contact messages?')) {
    CONTACT_MESSAGES.length = 0;
    window.renderAdminMessages();
    updateMsgBadge();
  }
};

window.renderAdminReports = function() {
  const contactedRequests = CUSTOM_REQUESTS.filter(r => r.status === 'contacted');
  const reviewRequests = CUSTOM_REQUESTS.filter(r => r.status === 'review');
  const newRequests = CUSTOM_REQUESTS.filter(r => r.status === 'new');
  
  // Calculate dynamic stats
  const addedOrders = contactedRequests.length;
  const totalInquiries = 47 + newRequests.length + CONTACT_MESSAGES.filter(m => !m.read).length;
  const customOrders = 6 + reviewRequests.length + newRequests.length;
  const additionalRevenueVal = addedOrders * 180000;
  const totalRevenueVal = 1200000 + additionalRevenueVal;
  
  // Display stats
  const inquiriesEl = document.getElementById('rep-val-inquiries');
  if (inquiriesEl) inquiriesEl.innerText = totalInquiries;
  
  const revenueEl = document.getElementById('rep-val-revenue');
  if (revenueEl) {
    const formattedRev = totalRevenueVal >= 1000000 
      ? `MK ${(totalRevenueVal / 1000000).toFixed(1)}M` 
      : `MK ${totalRevenueVal.toLocaleString()}`;
    revenueEl.innerText = formattedRev;
  }
  
  const ordersEl = document.getElementById('rep-val-orders');
  if (ordersEl) ordersEl.innerText = customOrders;
  
  // Update Sales by Category
  const categoryData = [
    { label: 'Sofas', val: 78, color: 'var(--gold)' },
    { label: 'Beds', val: 62, color: '#3b82f6' },
    { label: 'Tables', val: 45, color: '#10b981' },
    { label: 'Wardrobes', val: 30, color: '#8b5cf6' }
  ];
  const catContainer = document.getElementById('reports-category-list');
  if (catContainer) {
    catContainer.innerHTML = categoryData.map(c => `
      <div class="category-bar-item">
        <span class="category-bar-label">${c.label}</span>
        <div class="category-bar-track">
          <div class="category-bar-fill" style="width: ${c.val}%; background: ${c.color};"></div>
        </div>
        <span class="category-bar-val">${c.val}%</span>
      </div>
    `).join('');
  }

  // Update Donut Chart
  const waCount = 32 + CONTACT_MESSAGES.length - 3;
  const webCount = 10 + CUSTOM_REQUESTS.length - 6;
  const walkCount = 5;
  const totalSources = waCount + webCount + walkCount;
  
  const waPct = Math.round((waCount / totalSources) * 100);
  const webPct = Math.round((webCount / totalSources) * 100);
  const walkPct = 100 - waPct - webPct;
  
  const totalValEl = document.getElementById('donut-total-val');
  if (totalValEl) totalValEl.innerText = totalSources;
  
  const segWa = document.getElementById('donut-seg-wa');
  const segWeb = document.getElementById('donut-seg-web');
  const segWalk = document.getElementById('donut-seg-walk');
  if (segWa && segWeb && segWalk) {
    segWa.setAttribute('stroke-dasharray', `${waPct} ${100 - waPct}`);
    segWa.setAttribute('stroke-dashoffset', '25');

    segWeb.setAttribute('stroke-dasharray', `${webPct} ${100 - webPct}`);
    segWeb.setAttribute('stroke-dashoffset', `${25 - waPct}`);

    segWalk.setAttribute('stroke-dasharray', `${walkPct} ${100 - walkPct}`);
    segWalk.setAttribute('stroke-dashoffset', `${25 - waPct - webPct}`);
  }
  
  const legendContainer = document.getElementById('donut-legend-list');
  if (legendContainer) {
    legendContainer.innerHTML = `
      <div class="legend-item">
        <span class="legend-dot dot-wa"></span>
        <span class="legend-label">WhatsApp <strong>${waCount} (${waPct}%)</strong></span>
      </div>
      <div class="legend-item">
        <span class="legend-dot dot-web"></span>
        <span class="legend-label">Website Form <strong>${webCount} (${webPct}%)</strong></span>
      </div>
      <div class="legend-item">
        <span class="legend-dot dot-walk"></span>
        <span class="legend-label">Walk-in <strong>${walkCount} (${walkPct}%)</strong></span>
      </div>
    `;
  }

  // Update Monthly Summary Table
  const tableData = [
    { month: 'March 2024', inquiries: totalInquiries, orders: customOrders, revenue: `MK ${(totalRevenueVal + 40000).toLocaleString()}`, trend: '↑ 18%', trendClass: 'trend-up' },
    { month: 'February 2024', inquiries: 38, orders: 4, revenue: 'MK 1,050,000', trend: '↑ 9%', trendClass: 'trend-up' },
    { month: 'January 2024', inquiries: 29, orders: 3, revenue: 'MK 920,000', trend: '↑ 12%', trendClass: 'trend-up' },
    { month: 'December 2023', inquiries: 34, orders: 5, revenue: 'MK 1,120,000', trend: '↓ 4%', trendClass: 'trend-down' }
  ];
  
  const tableBody = document.getElementById('reports-table-body');
  if (tableBody) {
    tableBody.innerHTML = tableData.map(r => `
      <tr>
        <td style="font-weight: 600; color: var(--ink);">${r.month}</td>
        <td>${r.inquiries}</td>
        <td>${r.orders}</td>
        <td>${r.revenue}</td>
        <td><span class="${r.trendClass}">${r.trend}</span></td>
      </tr>
    `).join('');
  }
};

window.openAddProductModal = function() {
  document.getElementById('modal-title').innerText = 'Add New Product';
  document.getElementById('prod-id').value = '';
  document.getElementById('prod-name').value = '';
  document.getElementById('prod-cat').value = 'Sofa';
  document.getElementById('prod-price').value = '';
  document.getElementById('prod-badge').value = '';
  document.getElementById('prod-img').value = '';
  document.getElementById('prod-desc').value = '';
  document.getElementById('prod-feats').value = '';

  window.updateModalImagePreview('');

  document.getElementById('product-modal').classList.add('open');
};

window.openEditProductModal = function(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;

  document.getElementById('modal-title').innerText = 'Edit Product';
  document.getElementById('prod-id').value = p.id;
  document.getElementById('prod-name').value = p.name;
  document.getElementById('prod-cat').value = p.cat;
  document.getElementById('prod-price').value = p.price;
  document.getElementById('prod-badge').value = p.badge || '';
  document.getElementById('prod-img').value = p.img;
  document.getElementById('prod-desc').value = p.desc;
  document.getElementById('prod-feats').value = (p.feats || []).join('\n');

  window.updateModalImagePreview(p.img);

  document.getElementById('product-modal').classList.add('open');
};

window.closeProductModal = function() {
  document.getElementById('product-modal').classList.remove('open');
};

window.updateModalImagePreview = function(url) {
  const img = document.getElementById('prod-img-preview');
  const ph = document.getElementById('prod-img-preview-placeholder');
  if (url && url.startsWith('http')) {
    img.src = url;
    img.style.display = 'block';
    ph.style.display = 'none';
  } else {
    img.src = '';
    img.style.display = 'none';
    ph.style.display = 'block';
  }
};

window.saveProduct = function(e) {
  e.preventDefault();
  const idVal = document.getElementById('prod-id').value;
  const name = document.getElementById('prod-name').value.trim();
  const cat = document.getElementById('prod-cat').value;
  const price = document.getElementById('prod-price').value.trim();
  const badge = document.getElementById('prod-badge').value;
  const img = document.getElementById('prod-img').value.trim() || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=700&q=80';
  const desc = document.getElementById('prod-desc').value.trim();
  const feats = document.getElementById('prod-feats').value
    .split('\n')
    .map(f => f.trim())
    .filter(f => f.length > 0);

  let badgeTxt = '';
  if (badge === 'hot') badgeTxt = 'Best Seller';
  else if (badge === 'new') badgeTxt = 'New Arrival';
  else if (badge === 'pop') badgeTxt = 'Popular';

  if (idVal) {
    const p = PRODUCTS.find(x => x.id === parseInt(idVal));
    if (p) {
      p.name = name;
      p.cat = cat;
      p.price = price;
      p.badge = badge;
      p.badgeTxt = badgeTxt;
      p.img = img;
      p.desc = desc;
      p.feats = feats;
    }
  } else {
    const nextId = PRODUCTS.length ? Math.max(...PRODUCTS.map(x => x.id)) + 1 : 1;
    const newProd = {
      id: nextId,
      name,
      cat,
      price,
      badge,
      badgeTxt,
      img,
      desc,
      feats
    };
    PRODUCTS.unshift(newProd);
  }

  initProducts();
  initCategories();
  window.renderAdminProducts();
  window.closeProductModal();
};

window.deleteProduct = function(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;

  if (confirm(`Are you sure you want to delete "${p.name}"?`)) {
    const idx = PRODUCTS.findIndex(x => x.id === id);
    if (idx !== -1) {
      PRODUCTS.splice(idx, 1);
      initProducts();
      initCategories();
      window.renderAdminProducts();
    }
  }
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
