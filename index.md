---
layout: default
seo_title: "Florence Media. Florence and everything within reach"
seo_description: "Where to eat, what to see and where to go from Florence, for people who live here and people passing through. Places in the city sorted by what you want to do, and day trips and weekends from Florence. Every entry visited and dated."
---
{% include all-places.html %}

<div class="wrap hero">
  <h1>Florence, and everything within reach.</h1>
  <p>Where to eat, what to see and where to go next, for people who live here and people passing through. Every place is visited, dated and checked again each season.</p>
  <nav class="doors" aria-label="Sections">
    <a class="door" href="#in-florence">
      <span class="door-kicker">In the city</span>
      <span class="door-title">In Florence</span>
      <span class="door-text">{{ all_places | size }} places, sorted by what you feel like doing</span>
    </a>
    <a class="door" href="#from-florence">
      <span class="door-kicker">Day trips and weekends</span>
      <span class="door-title">From Florence</span>
      <span class="door-text">Hills and abbeys an hour away, mountains for the weekend</span>
    </a>
  </nav>
</div>

<section class="wrap homesec" id="in-florence">
  <div class="sechead">
    <p class="axis">In the city</p>
    <h2>In Florence</h2>
  </div>

  <div class="filters">
    <div class="tabs" role="toolbar" aria-label="What do you want to do">
      <button class="tab" type="button" data-section="all" aria-pressed="true">Everything</button>
      {% for s in site.data.sections %}
      <button class="tab" type="button" data-section="{{ s.name }}" data-tags="{{ s.tags | join: '|' }}" aria-pressed="false">{{ s.name }}</button>
      {% endfor %}
    </div>

    {%- assign allcats = site.data.categories.primary -%}
    {%- for grp in site.data.categories.groups -%}{%- assign allcats = allcats | concat: grp.items -%}{%- endfor %}
    <div class="subtabs">
      {% for s in site.data.sections %}{% for t in s.tags %}{% assign c = allcats | where: "name", t | first %}
      <button class="subtab" type="button" data-tag="{{ t }}" data-section="{{ s.name }}" aria-pressed="false">{{ c.label | default: t }}</button>
      {% endfor %}{% endfor %}
    </div>
    <p class="hint">Pick more than one to narrow it down.</p>

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
  </div>

  <div class="resultbar">
    <h3 id="resulttitle">Everything in Florence</h3>
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
  <p class="empty" id="empty" hidden>Nothing here yet for that combination. Try a wider section, or tell us what you were looking for.</p>
  <div class="moreline"><button class="morebtn" type="button" id="showall" hidden>Show all {{ all_places | size }} places</button></div>
</section>

<section class="wrap homesec" id="from-florence">
  <div class="sechead">
    <p class="axis">Day trips and weekends</p>
    <h2>From Florence</h2>
    <p class="secintro">Sorted by how far you are willing to go. Times are by car from the centre.</p>
  </div>

  <div class="tier">
    <div class="tierhead">
      <p class="tiertime">An hour or so</p>
      <p class="tiernote">Hill towns, abbeys, forests and waterfalls. Back for dinner.</p>
    </div>
    <div class="artgrid">
      {% assign trips = "walking-up-to-fiesole|settignano-and-the-desiderio-hills|villa-demidoff-pratolino|badia-a-passignano|vallombrosa-abbey-and-forest|cascata-dellacquacheta" | split: "|" %}
      {% assign kicks = "Fiesole · on foot|Settignano|Pratolino|Chianti|Vallombrosa|Romagna Apennines" | split: "|" %}
      {% for slug in trips %}{% assign tp = all_places | where_exp: "p", "p.slug == slug" | first %}{% if tp %}
      <a class="artcard" href="{{ tp.url | relative_url }}">
        <span class="kicker">{{ kicks[forloop.index0] }}</span>
        <h2>{{ tp.title }}</h2>
        <p>{{ tp.answer | truncatewords: 26 }}</p>
      </a>
      {% endif %}{% endfor %}
    </div>
    <p class="tierlink"><a href="{{ '/collections/a-bit-out-of-the-city/' | relative_url }}">All day trips a bit out of Florence</a></p>
  </div>

  <div class="tier">
    <div class="tierhead">
      <p class="tiertime">Around two hours</p>
      <p class="tiernote">The Apennines: Abetone, the Corno alle Scale and the Cimone. Skiing in winter, cheap and close.</p>
    </div>
    <div class="artgrid">
      <a class="artcard" href="{{ '/articles/where-to-eat-and-stay-in-abetone/' | relative_url }}">
        <span class="kicker">Abetone &middot; 1 h 50</span>
        <h2>Where to eat and stay in Abetone</h2>
        <p>Ski at Abetone, eat in Cutigliano. A Bib Gourmand trattoria, tortelli at a refuge, and two hotels by the lifts.</p>
      </a>
      <a class="artcard" href="{{ '/articles/where-to-eat-and-stay-on-the-cimone/' | relative_url }}">
        <span class="kicker">Cimone &middot; 2 h 15</span>
        <h2>Where to eat and stay on the Cimone</h2>
        <p>Tigelle country. A medieval inn near Sestola, a refuge hotel at the lifts, and where to eat in Fanano.</p>
      </a>
    </div>
  </div>

  <div class="tier">
    <div class="tierhead">
      <p class="tiertime">Four to five hours</p>
      <p class="tiernote">The Alps for a weekend: the Dolomites, Pontedilegno-Tonale and Cervinia.</p>
    </div>
    <div class="artgrid">
      <a class="artcard" href="{{ '/articles/where-to-eat-and-stay-in-the-dolomites/' | relative_url }}">
        <span class="kicker">Dolomites &middot; 4 to 4 h 30</span>
        <h2>Where to eat and stay in the Dolomites</h2>
        <p>Val Gardena, Cortina and Madonna di Campiglio: a dinner, a mountain hut and a hotel in each.</p>
      </a>
      <a class="artcard" href="{{ '/articles/where-to-eat-and-stay-in-ponte-di-legno/' | relative_url }}">
        <span class="kicker">Ponte di Legno &middot; 4 h 30</span>
        <h2>Where to eat in Ponte di Legno and on the Tonale</h2>
        <p>Casoncelli, gnoc de la cua and Silter cheese. Dinner in the valley, huts on the slopes, and which village to sleep in.</p>
      </a>
      <a class="artcard" href="{{ '/articles/where-to-eat-and-stay-in-cervinia/' | relative_url }}">
        <span class="kicker">Cervinia &middot; 5 h</span>
        <h2>Where to eat and stay in Cervinia</h2>
        <p>Lunch facing the Matterhorn, a dinner worth leaving the village for, and a hotel you can ski to.</p>
      </a>
    </div>
  </div>

  <a class="feature" href="{{ '/articles/skiing-from-florence/' | relative_url }}">
    <span class="kicker">The overview</span>
    <span class="feature-title">Where to go skiing from Florence this winter</span>
    <span class="feature-text">Nine ski areas side by side: driving time, size, altitude and 2026/27 lift prices.</span>
  </a>
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
