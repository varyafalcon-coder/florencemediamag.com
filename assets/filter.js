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
    clearBtn.hidden = !filtering();
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

  /* ---------- From Florence: distance ---------- */
  var distPills = document.querySelectorAll('#distpills .pill[data-dist]');
  var tripCards = document.querySelectorAll('#tripgrid > *');
  var tripTitle = document.getElementById('triptitle');
  var tripCount = document.getElementById('tripcount');
  var tripsAll = document.getElementById('tripsall');
  var dist = [];
  var tripsExpanded = false;

  function applyTrips(){
    var n = 0, shown = 0;
    var cap = (!dist.length && !tripsExpanded) ? LIMIT : Infinity;
    tripCards.forEach(function(c){
      var d = (c.getAttribute('data-dist') || '').split(' ');
      var ok = !dist.length || dist.some(function(x){ return d.indexOf(x) > -1; });
      if(ok){ n++; }
      var visible = ok && shown < cap;
      if(visible){ shown++; }
      c.style.display = visible ? '' : 'none';
    });
    var names = [];
    distPills.forEach(function(p){
      var on = dist.indexOf(p.getAttribute('data-dist')) > -1;
      p.setAttribute('aria-pressed', String(on));
      if(on){ var em = p.querySelector('.em'); names.push(p.textContent.replace(em ? em.textContent : '', '').trim()); }
    });
    tripTitle.textContent = names.length ? cap1(names.join(' or ')) : 'Day trips and weekends';
    tripCount.textContent = n + ' places and guides';
    tripsAll.hidden = shown >= n;
  }
  distPills.forEach(function(p){
    p.addEventListener('click', function(){
      var v = p.getAttribute('data-dist');
      var i = dist.indexOf(v);
      if(i > -1){ dist.splice(i,1); } else { dist.push(v); }
      applyTrips();
    });
  });
  tripsAll.addEventListener('click', function(){ tripsExpanded = true; applyTrips(); });
  applyTrips();
})();
