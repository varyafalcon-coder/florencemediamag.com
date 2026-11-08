(function(){
  /* ---------- In Florence / From Florence switch ---------- */
  var switchBtns = document.querySelectorAll('.switch-btn');
  var panes = { 'in': document.getElementById('in-florence'), 'out': document.getElementById('from-florence') };

  function showPane(name, scroll){
    switchBtns.forEach(function(b){ b.setAttribute('aria-selected', String(b.getAttribute('data-pane') === name)); });
    Object.keys(panes).forEach(function(k){ panes[k].hidden = k !== name; });
    if(scroll){ document.querySelector('.switch').scrollIntoView({ block: 'start' }); }
  }
  switchBtns.forEach(function(b){
    b.addEventListener('click', function(){
      var name = b.getAttribute('data-pane');
      showPane(name, false);
      history.replaceState(null, '', name === 'out' ? '#from-florence' : location.pathname);
    });
  });
  function fromHash(){
    if(location.hash === '#from-florence'){ showPane('out', true); }
    else if(location.hash === '#in-florence'){ showPane('in', true); }
  }
  window.addEventListener('hashchange', fromHash);
  fromHash();

  /* ---------- In Florence: categories, price, search ---------- */
  var LIMIT = window.matchMedia('(max-width: 640px)').matches ? 6 : 12;
  var pills = document.querySelectorAll('#catpills .pill[data-tag]');
  var seeall = document.getElementById('seeall');
  var catbox = document.getElementById('catpills');
  var cards = document.querySelectorAll('#grid .card');
  var titleEl = document.getElementById('resulttitle');
  var countEl = document.getElementById('resultcount');
  var clearBtn = document.getElementById('clearall');
  var emptyEl = document.getElementById('empty');
  var guideEl = document.getElementById('guidelink');
  var showAllBtn = document.getElementById('showall');
  var searchEl = document.getElementById('placesearch');
  var searchClear = document.getElementById('searchclear');
  var priceEl = document.getElementById('pricepick');

  var active = [];
  var price = '';
  var query = '';
  var expanded = false;

  function slugify(s){
    return s.toLowerCase().replace(/[^\w\s-]/g,'').trim().replace(/[-\s]+/g,'-');
  }
  function labelOf(t){
    var out = t;
    pills.forEach(function(p){
      if(p.getAttribute('data-tag') === t){ out = p.getAttribute('data-label'); }
    });
    return out;
  }
  function cap1(x){ return x.charAt(0).toUpperCase() + x.slice(1); }
  function filtering(){ return !!(active.length || price || query); }

  function apply(){
    var n = 0, shown = 0;
    var cap = (!filtering() && !expanded) ? LIMIT : Infinity;
    cards.forEach(function(c){
      var cats = c.getAttribute('data-cats').split('|');
      var ok = active.every(function(t){ return cats.indexOf(t) > -1; });
      if(ok && price){ ok = c.getAttribute('data-price') === price; }
      if(ok && query){ ok = (c.getAttribute('data-find') || '').indexOf(query) > -1; }
      if(ok){ n++; }
      var visible = ok && shown < cap;
      if(visible){ shown++; }
      c.style.display = visible ? '' : 'none';
    });

    var label = active.length ? cap1(active.map(labelOf).join(' + ')) : 'Everything in Florence';
    if(query){ label = 'Search: ' + searchEl.value.trim(); }
    titleEl.textContent = label;
    countEl.textContent = n + (n === 1 ? ' place' : ' places') + (price ? ' at ' + price : '');
    if(n === 0){ titleEl.textContent = 'No matches'; }
    clearBtn.hidden = !filtering() || n === 0;
    countEl.hidden = n === 0;
    emptyEl.hidden = n !== 0;
    showAllBtn.hidden = shown >= n;

    if(active.length === 1){
      guideEl.hidden = false;
      guideEl.innerHTML = '<a href="/collections/' + slugify(active[0]) + '/">Read the full guide: ' + labelOf(active[0]) + '</a>';
    } else { guideEl.hidden = true; }

    pills.forEach(function(p){ p.setAttribute('aria-pressed', String(active.indexOf(p.getAttribute('data-tag')) > -1)); });
  }

  pills.forEach(function(p){
    var em = p.querySelector('.em');
    p.setAttribute('data-label', p.textContent.replace(em ? em.textContent : '', '').trim());
    p.addEventListener('click', function(){
      var t = p.getAttribute('data-tag');
      var i = active.indexOf(t);
      if(i > -1){ active.splice(i,1); } else { active.push(t); }
      apply();
    });
  });
  seeall.setAttribute('data-label', seeall.textContent);
  seeall.addEventListener('click', function(){
    var open = catbox.classList.toggle('open');
    seeall.setAttribute('aria-expanded', String(open));
    seeall.textContent = open ? 'Fewer' : seeall.getAttribute('data-label');
  });

  priceEl.addEventListener('change', function(){ price = priceEl.value; apply(); });
  clearBtn.addEventListener('click', function(){
    active = []; price = ''; priceEl.value = '';
    searchEl.value = ''; query = ''; searchClear.hidden = true;
    apply();
  });
  showAllBtn.addEventListener('click', function(){ expanded = true; apply(); });
  document.getElementById('emptyclear').addEventListener('click', function(){ clearBtn.click(); });

  searchEl.addEventListener('input', function(){
    query = searchEl.value.trim().toLowerCase();
    searchClear.hidden = query === '';
    apply();
  });
  searchClear.addEventListener('click', function(){
    searchEl.value = ''; query = ''; searchClear.hidden = true; apply(); searchEl.focus();
  });
  searchEl.addEventListener('keydown', function(e){
    if(e.key === 'Escape'){ searchEl.value = ''; query = ''; searchClear.hidden = true; apply(); }
  });

  apply();

  /* ---------- From Florence: what and how far ---------- */
  var kindPills = document.querySelectorAll('#kindpills .pill[data-kind]');
  var distPills = document.querySelectorAll('#distpills .pill[data-dist]');
  var tripCards = document.querySelectorAll('#tripgrid > *');
  var tripTitle = document.getElementById('triptitle');
  var tripCount = document.getElementById('tripcount');
  var tripsAll = document.getElementById('tripsall');
  var kinds = [], dist = [];
  var tripsExpanded = false;

  function pillText(p){ var em = p.querySelector('.em'); return p.textContent.replace(em ? em.textContent : '', '').trim(); }
  function matches(list, attr){
    var have = (attr || '').split(' ');
    return !list.length || list.some(function(x){ return have.indexOf(x) > -1; });
  }
  function applyTrips(){
    var n = 0, shown = 0;
    var cap = (!kinds.length && !dist.length && !tripsExpanded) ? LIMIT : Infinity;
    tripCards.forEach(function(c){
      var haveKinds = (c.getAttribute('data-kind') || '').split(' ');
      var allKinds = kinds.every(function(k){ return haveKinds.indexOf(k) > -1; });
      var ok = allKinds && matches(dist, c.getAttribute('data-dist'));
      if(ok){ n++; }
      var visible = ok && shown < cap;
      if(visible){ shown++; }
      c.style.display = visible ? '' : 'none';
    });
    var a = [], b = [];
    kindPills.forEach(function(p){ var on = kinds.indexOf(p.getAttribute('data-kind')) > -1; p.setAttribute('aria-pressed', String(on)); if(on){ a.push(pillText(p)); } });
    distPills.forEach(function(p){ var on = dist.indexOf(p.getAttribute('data-dist')) > -1; p.setAttribute('aria-pressed', String(on)); if(on){ b.push(pillText(p)); } });
    var label = [a.join(' and '), b.join(' or ')].filter(Boolean).join(', ');
    tripTitle.textContent = label ? cap1(label) : 'Day trips and weekends';
    if(n === 0){ tripTitle.textContent = 'No matches'; }
    tripCount.hidden = n === 0;
    tripCount.textContent = n + (n === 1 ? ' result' : ' results');
    tripsAll.hidden = shown >= n;
    emptyTrips.hidden = n !== 0;
  }
  var emptyTrips = document.getElementById('tripempty');
  function toggler(list, attr){
    return function(){
      var v = this.getAttribute(attr);
      var i = list.indexOf(v);
      if(i > -1){ list.splice(i,1); } else { list.push(v); }
      applyTrips();
    };
  }
  kindPills.forEach(function(p){ p.addEventListener('click', toggler(kinds, 'data-kind')); });
  distPills.forEach(function(p){ p.addEventListener('click', toggler(dist, 'data-dist')); });
  tripsAll.addEventListener('click', function(){ tripsExpanded = true; applyTrips(); });
  document.getElementById('tripclear').addEventListener('click', function(){ kinds.length = 0; dist.length = 0; applyTrips(); });
  applyTrips();
})();
