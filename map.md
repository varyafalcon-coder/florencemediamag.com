---
layout: page
title: Map
permalink: /map/
seo_title: "Map of every place in Florence Media"
seo_description: "Every place on Florence Media on one map. Filter by what you want to do and by price, then open any place to see exactly where it is."
---

Every place on this site, on one map. Filter the list, then pick a place to move the map to it.

<div class="mapfilters">
  <button class="mchip is-on" type="button" data-mtag="all">everything</button>
  {% for c in site.data.categories.primary %}
  <button class="mchip" type="button" data-mtag="{{ c.name }}"><span aria-hidden="true">{{ c.emoji }}</span> {{ c.name }}</button>
  {% endfor %}
  {% for g in site.data.categories.groups %}{% for c in g.items %}
  <button class="mchip" type="button" data-mtag="{{ c.name }}"><span aria-hidden="true">{{ c.emoji }}</span> {{ c.name }}</button>
  {% endfor %}{% endfor %}
  <span class="mchip-sep" aria-hidden="true"></span>
  <button class="mchip" type="button" data-mprice="€">€</button>
  <button class="mchip" type="button" data-mprice="€€">€€</button>
  <button class="mchip" type="button" data-mprice="€€€">€€€</button>
</div>

<div class="maplayout">
  <div class="maplist" id="maplist">
    <p class="mapcount" id="mapcount"></p>
    <ul>
    {% assign pinned = site.places | where_exp: "p", "p.pin" | sort: "pin" %}
    {% assign rest = site.places | where_exp: "p", "p.pin == nil" %}
    {% for p in pinned %}{% include map-item.html place=p %}{% endfor %}
    {% for p in rest %}{% include map-item.html place=p %}{% endfor %}
    </ul>
    <p class="mapempty" id="mapempty" hidden>Nothing matches those filters together. Remove one.</p>
  </div>

  <div class="mapframe">
    <div class="mapbar">
      <span class="mapbar-label" id="mapbarlabel">All places</span>
      {% if site.map_id and site.map_id != "" %}<button class="mapbar-all" type="button" id="mapall">Show all pins</button>{% endif %}
    </div>
    <iframe id="mapiframe" title="Map of Florence" loading="lazy"
      src="{% if site.map_id and site.map_id != '' %}https://www.google.com/maps/d/embed?mid={{ site.map_id }}{% else %}https://maps.google.com/maps?q=Firenze%2C%20Italy&z=13&output=embed{% endif %}"></iframe>
  </div>
</div>

<script>
(function(){
  var items   = Array.prototype.slice.call(document.querySelectorAll('.mapitem'));
  var chips   = Array.prototype.slice.call(document.querySelectorAll('.mchip'));
  var frame   = document.getElementById('mapiframe');
  var countEl = document.getElementById('mapcount');
  var emptyEl = document.getElementById('mapempty');
  var labelEl = document.getElementById('mapbarlabel');
  var allBtn  = document.getElementById('mapall');
  var overview = frame.getAttribute('src');
  var tag = null, price = null, current = null;

  function showAll(){
    if(current) current.classList.remove('is-active');
    current = null;
    labelEl.textContent = 'All places';
    frame.src = overview;
  }
  function show(li){
    if(current) current.classList.remove('is-active');
    li.classList.add('is-active');
    current = li;
    labelEl.textContent = li.getAttribute('data-name');
    frame.src = 'https://maps.google.com/maps?q=' +
      encodeURIComponent(li.getAttribute('data-q')) + '&z=17&output=embed';
  }

  function apply(){
    var n = 0;
    items.forEach(function(li){
      var cats = li.getAttribute('data-cats').split('|');
      var ok = (!tag || cats.indexOf(tag) > -1) && (!price || li.getAttribute('data-price') === price);
      li.hidden = !ok;
      if(ok) n++;
    });
    countEl.textContent = n + (n === 1 ? ' place' : ' places');
    emptyEl.hidden = n !== 0;
    if(current && current.hidden) showAll();
  }

  chips.forEach(function(ch){
    ch.addEventListener('click', function(){
      if(ch.hasAttribute('data-mprice')){
        var v = ch.getAttribute('data-mprice');
        price = (price === v) ? null : v;
      } else {
        var t = ch.getAttribute('data-mtag');
        tag = (t === 'all' || tag === t) ? null : t;
      }
      chips.forEach(function(o){
        var on = o.hasAttribute('data-mprice')
          ? o.getAttribute('data-mprice') === price
          : (o.getAttribute('data-mtag') === 'all' ? !tag : o.getAttribute('data-mtag') === tag);
        o.classList.toggle('is-on', !!on);
      });
      apply();
    });
  });

  items.forEach(function(li){
    li.querySelector('.mapitem-pick').addEventListener('click', function(){
      show(li);
      if(window.matchMedia('(max-width: 900px)').matches){
        document.querySelector('.mapframe').scrollIntoView({behavior:'smooth', block:'center'});
      }
    });
  });

  if(allBtn) allBtn.addEventListener('click', showAll);

  apply();
})();
</script>
