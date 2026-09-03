(function(){
  var pills = document.querySelectorAll('.pill[data-tag]');
  var cards = document.querySelectorAll('#grid .card');
  var titleEl = document.getElementById('resulttitle');
  var countEl = document.getElementById('resultcount');
  var clearBtn = document.getElementById('clearall');
  var emptyEl = document.getElementById('empty');
  var guideEl = document.getElementById('guidelink');
  var seeall = document.getElementById('seeall');
  var active = [];
  var pricePills = document.querySelectorAll('.pill.price');
  var activePrice = null;

  function slugify(s){
    return s.toLowerCase().replace(/[^\w\s-]/g,'').trim().replace(/[-\s]+/g,'-');
  }
  function apply(){
    var n = 0;
    cards.forEach(function(c){
      var tags = c.getAttribute('data-cats').split('|');
      var show = active.every(function(t){ return tags.indexOf(t) > -1; });
      if(show && activePrice){ show = c.getAttribute('data-price') === activePrice; }
      c.style.display = show ? '' : 'none';
      if(show) n++;
    });
    var label = active.length ? active.join(' + ') : 'Everything in Florence';
    if(activePrice){ label += ' · ' + activePrice; }
    titleEl.textContent = label;
    countEl.textContent = n + (n === 1 ? ' place' : ' places');
    clearBtn.hidden = active.length === 0 && !activePrice;
    emptyEl.hidden = n !== 0;
    if(active.length === 1){
      guideEl.hidden = false;
      guideEl.innerHTML = '<a href="/collections/' + slugify(active[0]) + '/">Read the full guide to ' + active[0] + '</a>';
    } else { guideEl.hidden = true; }
    document.querySelector('.pill[data-tag="all"]').setAttribute('aria-pressed', String(active.length === 0));
  }
  pills.forEach(function(p){
    p.addEventListener('click', function(){
      var t = p.getAttribute('data-tag');
      if(t === 'all'){
        active = [];
        pills.forEach(function(o){ o.setAttribute('aria-pressed', String(o === p)); });
      } else {
        var i = active.indexOf(t);
        if(i > -1){ active.splice(i,1); } else { active.push(t); }
        p.setAttribute('aria-pressed', String(active.indexOf(t) > -1));
      }
      apply();
    });
  });
  clearBtn.addEventListener('click', function(){
    active = [];
    pills.forEach(function(o){ o.setAttribute('aria-pressed', String(o.getAttribute('data-tag') === 'all')); });
    apply();
  });
  seeall.addEventListener('click', function(){
    var open = document.body.classList.toggle('allpills');
    seeall.setAttribute('aria-expanded', String(open));
    seeall.textContent = open ? 'show fewer' : 'see all 16';
  });
})();

  pricePills.forEach(function(p){
    p.addEventListener('click', function(){
      var v = p.getAttribute('data-price');
      activePrice = (activePrice === v) ? null : v;
      pricePills.forEach(function(o){
        o.setAttribute('aria-pressed', String(o.getAttribute('data-price') === activePrice));
      });
      apply();
    });
  });
