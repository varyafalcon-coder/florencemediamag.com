---
layout: default
title: "Ski season from Florence"
permalink: /ski-season/
seo_title: "Ski season from Florence 2026/27: nine ski areas, chosen by what you want"
seo_description: "Nine ski areas from two to five and a half hours from Florence. Après-ski or quiet, families or big terrain, snow-sure or cheap: what each one feels like, how far it is, and what a day pass costs in 2026/27."
---
{%- assign ski = site.data.ski -%}

<div class="wrap hero skihero">
  <p class="axis">Ski season 2026/27</p>
  <h1>Ski season from Florence.</h1>
  <p>Nine ski areas, 2 to 6 hours away. Pick by what you want from the trip.</p>
</div>

<section class="wrap">
  <div class="filters">
    <div class="pills" id="wantpills">
      {% for w in ski.wants %}
      <button class="pill" type="button" data-want="{{ w.key }}" aria-pressed="false"><span class="em" aria-hidden="true">{{ w.emoji }}</span> {{ w.label }}</button>
      {% endfor %}
    </div>
    <p class="hint">Pick more than one to narrow it down.</p>
  </div>

  {% for tier in ski.tiers %}
  {% assign list = ski.areas | where: "tier", tier.key %}
  <div class="skitier" data-tier="{{ tier.key }}">
    <div class="skitier-head">
      <h2>{{ tier.title }}</h2>
      <p>{{ tier.note }}</p>
    </div>
    <div class="skigrid">
      {% for a in list %}
      <article class="skicard" id="{{ a.id }}" data-want="{{ a.want | join: ' ' }}">
        <span class="card-em" aria-hidden="true">{% for k in a.want limit: 3 %}{% assign w = ski.wants | where: "key", k | first %}<span>{{ w.emoji }}</span>{% endfor %}</span>
        <p class="skicard-kicker">{{ a.region }}</p>
        <h3><a href="{{ '/ski-season/' | append: a.id | append: '/' | relative_url }}">{{ a.name }}</a></h3>
        <p class="skicard-time"><strong>{{ a.car }}</strong> by car &middot; {{ a.top }} top</p>
        <p class="skicard-vibe">{{ a.short }}</p>
        <span class="skicard-more">Read more</span>
      </article>
      {% endfor %}
    </div>
  </div>
  {% endfor %}

  <div class="emptybox" id="skiempty" hidden><p>No ski area does all of these.</p><button type="button" class="morebtn" id="skiclear">Clear filters</button></div>

  <a class="skimore" href="{{ '/articles/skiing-from-florence/' | relative_url }}">
    <span class="kicker">The full comparison</span>
    <span class="skimore-title">All nine side by side, with prices and how to get there</span>
  </a>

  <aside class="note skinote">
    <p><strong>Researched, November 2026.</strong> Lift prices, sizes and season dates come from the resorts' own 2026/27 price lists where published, and from the latest available list where not. Sizes are the resorts' own figures. Driving times are from central Florence without traffic. Openings depend on snow, so check the lift status before you drive. If you find something out of date, <a href="mailto:florencemediamag@gmail.com">tell us</a>.</p>
  </aside>
</section>

<script>
(function(){
  var pills = document.querySelectorAll('#wantpills .pill');
  var cards = document.querySelectorAll('.skicard');
  var tiers = document.querySelectorAll('.skitier');
  var empty = document.getElementById('skiempty');
  var active = [];
  document.getElementById('skiclear').addEventListener('click', function(){ active.length = 0; apply(); });
  function apply(){
    var total = 0;
    cards.forEach(function(c){
      var have = c.getAttribute('data-want').split(' ');
      var ok = active.every(function(k){ return have.indexOf(k) > -1; });
      c.hidden = !ok;
      if(ok){ total++; }
    });
    tiers.forEach(function(t){ t.hidden = !t.querySelector('.skicard:not([hidden])'); });
    pills.forEach(function(p){ p.setAttribute('aria-pressed', String(active.indexOf(p.getAttribute('data-want')) > -1)); });
    empty.hidden = total !== 0;
  }
  var q = new URLSearchParams(location.search).get('want');
  if(q){ active.push(q); }
  pills.forEach(function(p){
    p.addEventListener('click', function(){
      var k = p.getAttribute('data-want');
      var i = active.indexOf(k);
      if(i > -1){ active.splice(i,1); } else { active.push(k); }
      apply();
    });
  });
  apply();
})();
</script>
