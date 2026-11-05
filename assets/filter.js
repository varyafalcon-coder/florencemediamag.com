(function(){
  var LIMIT = window.matchMedia('(max-width: 640px)').matches ? 6 : 12;
  var tabs = document.querySelectorAll('.tab[data-section]');
  var subtabs = document.querySelectorAll('.subtab[data-tag]');
  var subrows = document.querySelectorAll('.subtabs');
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

  var section = null;      // {name, tags[]}
  var tag = null;          // one specific category inside the section
  var tagLabel = '';
  var price = '';
  var query = '';
  var expanded = false;

  function slugify(s){
    return s.toLowerCase().replace(/[^\w\s-]/g,'').trim().replace(/[-\s]+/g,'-');
  }
  function filtering(){ return !!(section || price || query); }

  function apply(){
    var n = 0, shown = 0;
    var cap = (!filtering() && !expanded) ? LIMIT : Infinity;
    cards.forEach(function(c){
      var cats = c.getAttribute('data-cats').split('|');
      var ok = true;
      if(tag){ ok = cats.indexOf(tag) > -1; }
      else if(section){ ok = section.tags.some(function(t){ return cats.indexOf(t) > -1; }); }
      if(ok && price){ ok = c.getAttribute('data-price') === price; }
      if(ok && query){ ok = (c.getAttribute('data-find') || '').indexOf(query) > -1; }
      if(ok){ n++; }
      var visible = ok && shown < cap;
      if(visible){ shown++; }
      c.style.display = visible ? '' : 'none';
    });

    var label = 'Everything in Florence';
    if(section){ label = tag ? tagLabel : section.name; }
    if(query){ label = 'Search: ' + searchEl.value.trim(); }
    titleEl.textContent = label;
    countEl.textContent = n + (n === 1 ? ' place' : ' places') + (price ? ' at ' + price : '');
    clearBtn.hidden = !filtering();
    emptyEl.hidden = n !== 0;
    showAllBtn.hidden = shown >= n;

    if(tag){
      guideEl.hidden = false;
      guideEl.innerHTML = '<a href="/collections/' + slugify(tag) + '/">Read the full guide: ' + tagLabel.toLowerCase() + '</a>';
    } else { guideEl.hidden = true; }
  }

  function setSection(btn){
    var name = btn.getAttribute('data-section');
    section = (name === 'all') ? null : { name: name, tags: btn.getAttribute('data-tags').split('|') };
    tag = null; tagLabel = '';
    // a section with a single category goes straight to it
    if(section && section.tags.length === 1){ tag = section.tags[0]; tagLabel = name; }
    tabs.forEach(function(t){ t.setAttribute('aria-pressed', String(t === btn)); });
    subtabs.forEach(function(s){ s.setAttribute('aria-pressed', 'false'); });
    subrows.forEach(function(r){ r.hidden = !section || r.getAttribute('data-for') !== section.name; });
    apply();
  }

  tabs.forEach(function(btn){
    btn.addEventListener('click', function(){
      // clicking the open section again closes it
      if(section && btn.getAttribute('data-section') === section.name){
        setSection(document.querySelector('.tab[data-section="all"]'));
      } else { setSection(btn); }
    });
  });

  subtabs.forEach(function(btn){
    btn.addEventListener('click', function(){
      var t = btn.getAttribute('data-tag');
      if(tag === t){ tag = null; tagLabel = ''; }
      else { tag = t; tagLabel = btn.textContent.trim(); }
      subtabs.forEach(function(s){ s.setAttribute('aria-pressed', String(s.getAttribute('data-tag') === tag)); });
      apply();
    });
  });

  priceEl.addEventListener('change', function(){ price = priceEl.value; apply(); });

  clearBtn.addEventListener('click', function(){
    searchEl.value = ''; query = ''; searchClear.hidden = true;
    priceEl.value = ''; price = '';
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
