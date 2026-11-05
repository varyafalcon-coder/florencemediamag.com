---
layout: default
seo_title: "Florence Media. Florence and everything within reach"
seo_description: "Where to eat, what to see and where to go from Florence, for people who live here and people passing through. Places in the city sorted by what you want to do, and day trips and weekends from Florence. Every entry visited and dated."
---
{% include all-places.html %}
{%- assign allcats = site.data.categories.primary -%}
{%- for grp in site.data.categories.groups -%}{%- assign allcats = allcats | concat: grp.items -%}{%- endfor -%}
{%- comment -%} Order of the category buttons. The first eight show by default, eating first. {%- endcomment -%}
{%- assign order = "nice cute places to eat at|places with an old soul|pizza worth crossing town for|aperitivo|night heart of the city|enjoy the view|do some outdoor activities|hide from the crowd|eat like a local for under 10 euro|real gelato, not the coloured stuff|drink wine somewhere real|see art without queueing|by the river|pools in the city|a bit out of the city|modern cafes to work at|to do with kids" | split: "|" -%}

<div class="wrap hero">
  <h1>Florence, and everything within reach.</h1>
  <p>Where to eat, what to see and where to go next. Every place visited, dated and checked again each season.</p>

  <div class="switch" role="tablist" aria-label="In or out of Florence">
    <button class="switch-btn" type="button" role="tab" id="tab-in" data-pane="in" aria-selected="true" aria-controls="in-florence">In Florence</button>
    <button class="switch-btn" type="button" role="tab" id="tab-out" data-pane="out" aria-selected="false" aria-controls="from-florence">From Florence</button>
  </div>
</div>

<section class="wrap pane" id="in-florence" role="tabpanel" aria-labelledby="tab-in">
  <div class="filters">
    <div class="pills" id="catpills">
      {% for name in order %}{% assign c = allcats | where: "name", name | first %}{% if c %}
      <button class="pill{% if forloop.index > 8 %} extra{% endif %}" type="button" data-tag="{{ c.name }}" aria-pressed="false"><span class="em" aria-hidden="true">{{ c.emoji }}</span> {{ c.label | default: c.name }}</button>
      {% endif %}{% endfor %}
      <button class="pill seeall" type="button" id="seeall" aria-expanded="false">All {{ order | size }}</button>
    </div>
    <div class="toolrow">
      <div class="searchrow">
        <input type="search" id="placesearch" placeholder="Search a place, a street, a dish" autocomplete="off" aria-label="Search places">
        <button type="button" id="searchclear" hidden aria-label="Clear search">&times;</button>
      </div>
      <label class="pricepick">
        <span>Price</span>
        <select id="pricepick">
          <option value="">Any</option>
          <option value="€">€ cheap</option>
          <option value="€€">€€ mid</option>
          <option value="€€€">€€€ splash out</option>
        </select>
      </label>
    </div>
    <p class="hint">Pick more than one to narrow it down.</p>
  </div>

  <div class="resultbar">
    <h2 id="resulttitle">Everything in Florence</h2>
    <span id="resultcount">{{ all_places | size }} places</span>
    <button class="clearall" type="button" id="clearall" hidden>Clear</button>
  </div>
  <p id="guidelink" class="guidelink" hidden></p>

  <div class="grid" id="grid">
  {% assign pinned = all_places | where_exp: "p", "p.pin" | sort: "pin" %}
  {% assign rest = all_places | where_exp: "p", "p.pin == nil" %}
  {% for p in pinned %}{% include place-card.html place=p %}{% endfor %}
  {% for p in rest %}{% include place-card.html place=p %}{% endfor %}
  </div>
  <p class="empty" id="empty" hidden>Nothing here yet for that combination. Try one category instead of two, or tell us what you were looking for.</p>
  <div class="moreline"><button class="morebtn" type="button" id="showall" hidden>Show all {{ all_places | size }} places</button></div>
</section>

<section class="wrap pane" id="from-florence" role="tabpanel" aria-labelledby="tab-out" hidden>
  <div class="filters">
    <div class="pills" id="distpills">
      <button class="pill" type="button" data-dist="hour" aria-pressed="false"><span class="em" aria-hidden="true">🌳</span> An hour or so</button>
      <button class="pill" type="button" data-dist="two" aria-pressed="false"><span class="em" aria-hidden="true">⛰️</span> Around two hours</button>
      <button class="pill" type="button" data-dist="four" aria-pressed="false"><span class="em" aria-hidden="true">🏔️</span> Four to five hours</button>
    </div>
  </div>

  <div class="resultbar">
    <h2 id="triptitle">Day trips and weekends</h2>
    <span>By car from the centre of Florence</span>
  </div>

  <div class="artgrid tripgrid" id="tripgrid">
    {% assign trips = "walking-up-to-fiesole|settignano-and-the-desiderio-hills|villa-demidoff-pratolino|badia-a-passignano|vallombrosa-abbey-and-forest|cascata-dellacquacheta" | split: "|" %}
    {% assign kicks = "Fiesole · on foot|Settignano|Pratolino|Chianti|Vallombrosa|Romagna Apennines" | split: "|" %}
    {% for slug in trips %}{% assign tp = all_places | where_exp: "p", "p.slug == slug" | first %}{% if tp %}
    <a class="artcard" data-dist="hour" href="{{ tp.url | relative_url }}">
      <span class="kicker">{{ kicks[forloop.index0] }} &middot; an hour or so</span>
      <h2>{{ tp.title }}</h2>
      <p>{{ tp.answer | truncatewords: 26 }}</p>
    </a>
    {% endif %}{% endfor %}
    <a class="artcard" data-dist="two four" href="{{ '/articles/skiing-from-florence/' | relative_url }}">
      <span class="kicker">Skiing &middot; 2 to 5 hours</span>
      <h2>Where to go skiing from Florence this winter</h2>
      <p>Nine ski areas side by side: driving time, size, altitude and 2026/27 lift prices.</p>
    </a>
    <a class="artcard" data-dist="two" href="{{ '/articles/where-to-eat-and-stay-in-abetone/' | relative_url }}">
      <span class="kicker">Abetone &middot; 1 h 50</span>
      <h2>Where to eat and stay in Abetone</h2>
      <p>Ski at Abetone, eat in Cutigliano. A Bib Gourmand trattoria, tortelli at a refuge, and two hotels by the lifts.</p>
    </a>
    <a class="artcard" data-dist="two" href="{{ '/articles/where-to-eat-and-stay-on-the-cimone/' | relative_url }}">
      <span class="kicker">Cimone &middot; 2 h 15</span>
      <h2>Where to eat and stay on the Cimone</h2>
      <p>Tigelle country. A medieval inn near Sestola, a refuge hotel at the lifts, and where to eat in Fanano.</p>
    </a>
    <a class="artcard" data-dist="four" href="{{ '/articles/where-to-eat-and-stay-in-the-dolomites/' | relative_url }}">
      <span class="kicker">Dolomites &middot; 4 to 4 h 30</span>
      <h2>Where to eat and stay in the Dolomites</h2>
      <p>Val Gardena, Cortina and Madonna di Campiglio: a dinner, a mountain hut and a hotel in each.</p>
    </a>
    <a class="artcard" data-dist="four" href="{{ '/articles/where-to-eat-and-stay-in-ponte-di-legno/' | relative_url }}">
      <span class="kicker">Ponte di Legno &middot; 4 h 30</span>
      <h2>Where to eat in Ponte di Legno and on the Tonale</h2>
      <p>Casoncelli, gnoc de la cua and Silter cheese. Dinner in the valley, huts on the slopes, and which village to sleep in.</p>
    </a>
    <a class="artcard" data-dist="four" href="{{ '/articles/where-to-eat-and-stay-in-cervinia/' | relative_url }}">
      <span class="kicker">Cervinia &middot; 5 h</span>
      <h2>Where to eat and stay in Cervinia</h2>
      <p>Lunch facing the Matterhorn, a dinner worth leaving the village for, and a hotel you can ski to.</p>
    </a>
  </div>
</section>

<section class="method wrap">
  <h2>Why anything here is worth trusting</h2>
  <div class="cols3">
    <div><h3>Every place carries a date</h3><p>Nothing is listed without the day somebody stood in it. If a place has not been checked in six months it comes off the site until it is.</p></div>
    <div><h3>No paid placement</h3><p>Nobody buys a listing and nothing here is affiliate. Bookings go straight to the operator.</p></div>
    <div><h3>Sorted by intent, not category</h3><p>People do not search for restaurants. They search for somewhere quiet, somewhere cheap, somewhere with a view.</p></div>
  </div>
</section>

<script src="{{ '/assets/filter.js' | relative_url }}?v={{ site.time | date: '%s' }}"></script>
