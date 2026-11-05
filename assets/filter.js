(function(){
  var LIMIT = window.matchMedia('(max-width: 640px)').matches ? 6 : 12;
  var tabs = document.querySelectorAll('.tab[data-section]');
  var subtabs = document.querySelectorAll('.subtab[data-tag]');
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

  var section = null;      // {name, tags[]} or null for everything
  var active = [];         // selected categories, combined with AND
  var price = '';
  var query = '';
  var expanded = false;

  function slugify(s){
    return s.toLowerCase().replace(/[^\w\s-]/g,'').trim().replace(/[-\s]+/g,'-');
  }
  function labelOf(t){
    var b = document.querySelector('.subtab[data-tag="' + t.replace(/"/g,'\\"') + '"]');
    return b ? b.textContent.trim() : t;
  }
  function filtering(){ return !!(section || active.length || price || query); }

  function apply(){
    var n = 0, shown = 0;
    var cap = (!filtering() && !expanded) ? LIMIT : Infinity;
    cards.forEach(function(c){
      var cats = c.getAttribute('data-cats').split('|');
      var ok = true;
      if(active.length){ ok = active.every(function(t){ return cats.indexOf(t) > -1; }); }
      else if(section){ ok = section.tags.some(function(t){ return cats.indexOf(t) > -1; }); }
      if(ok && price){ ok = c.getAttribute('data-price') === price; }
      if(ok && query){ ok = (c.getAttribute('data-find') || '').indexOf(query) > -1; }
      if(ok){ n++; }
      var visible = ok && shown < cap;
      if(visible){ shown++; }
      c.style.display = visible ? '' : 'none';
    });

    var label = 'Everything in Florence';
    if(active.length){ label = active.map(labelOf).join(' + '); }
    else if(section){ label = section.name; }
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

    subtabs.forEach(function(b){
      var t = b.getAttribute('data-tag');
      b.hidden = !!section && section.tags.indexOf(t) === -1;
      b.setAttribute('aria-pressed', String(active.indexOf(t) > -1));
    });
  }

  function setSection(btn){
    var name = btn.getAttribute('data-section');
    section = (name === 'all') ? null : { name: name, tags: btn.getAttribute('data-tags').split('|') };
    // keep only the selected categories that still make sense in this section
    if(section){ active = active.filter(function(t){ return section.tags.indexOf(t) > -1; }); }
    tabs.forEach(function(t){ t.setAttribute('aria-pressed', String(t === btn)); });
    apply();
  }

  tabs.forEach(function(btn){
    btn.addEventListener('click', function(){
      if(section && btn.getAttribute('data-section') === section.name){
        setSection(document.querySelector('.tab[data-section="all"]'));
      } else { setSection(btn); }
    });
  });

  subtabs.forEach(function(btn){
    btn.addEventListener('click', function(){
      var t = btn.getAttribute('data-tag');
      var i = active.indexOf(t);
      if(i > -1){ active.splice(i,1); } else { active.push(t); }
      apply();
    });
  });

  priceEl.addEventListener('change', function(){ price = priceEl.value; apply(); });

  clearBtn.addEventListener('click', function(){
    searchEl.value = ''; query = ''; searchClear.hidden = true;
    priceEl.value = ''; price = ''; active = [];
    setSection(document.querySelector('.tab[data-section="all"]'));
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
})();
