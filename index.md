---
layout: default
seo_title: "Florence Media. Florence and everything within reach"
seo_description: "Where to eat, what to see and where to go from Florence, for people who live here and people passing through. Places in the city sorted by what you want to do, and day trips and weekends from Florence. Every entry visited and dated."
---
{% include all-places.html %}
{%- assign allcats = site.data.categories.primary -%}
{%- for grp in site.data.categories.groups -%}{%- assign allcats = allcats | concat: grp.items -%}{%- endfor -%}
{%- comment -%} Order of the category buttons. The first eight show by default, eating first. {%- endcomment -%}
{%- assign outplaces = all_places | where_exp: "p", "p.categories contains 'a bit out of the city'" -%}
{%- assign incount = all_places.size | minus: outplaces.size -%}
{%- assign order = "nice cute places to eat at|places with an old soul|pizza worth crossing town for|aperitivo|night heart of the city|enjoy the view|do some outdoor activities|hide from the crowd|eat like a local for under 10 euro|real gelato, not the coloured stuff|drink wine somewhere real|see art without queueing|by the river|pools in the city|modern cafes to work at|to do with kids" | split: "|" -%}

<div class="wrap hero">
  <h1>Florence, and everything within reach.</h1>
  <p>Sorted by what you actually want to do.</p>

  <div class="switch" role="tablist" aria-label="In or out of Florence">
    <button class="switch-btn" type="button" role="tab" id="tab-in" data-pane="in" aria-selected="true" aria-controls="in-florence">In Florence</button>
    <button class="switch-btn" type="button" role="tab" id="tab-out" data-pane="out" aria-selected="false" aria-controls="from-florence">From Florence</button>
  </div>
</div>

<section class="wrap pane" id="in-florence" role="tabpanel" aria-labelledby="tab-in">
  <div class="filters">
    <div class="pills" id="catpills">
      {% for name in order %}{% assign c = allcats | where: "name", name | first %}{% if c %}
      <button class="pill{% if forloop.index > 8 %} extra{% endif %}" type="button" data-tag="{{ c.name }}" aria-pressed="false"><span class="em" aria-hidden="true">{{ c.emoji }}</span> {{ c.label | default: c.name | downcase }}</button>
      {% endif %}{% endfor %}
      <button class="pill seeall" type="button" id="seeall" aria-expanded="false">all {{ order | size }}</button>
    </div>
    <div class="toolrow">
      <div class="searchrow">
        <input type="search" id="placesearch" placeholder="Search a place" autocomplete="off" aria-label="Search places">
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
    <span id="resultcount">{{ incount }} places</span>
    <button class="clearall" type="button" id="clearall" hidden>Clear</button>
  </div>
  <p id="guidelink" class="guidelink" hidden></p>

  <div class="grid" id="grid">
  {% assign pinned = all_places | where_exp: "p", "p.pin" | sort: "pin" %}
  {% assign rest = all_places | where_exp: "p", "p.pin == nil" %}
  {% for p in pinned %}{% unless p.categories contains "a bit out of the city" %}{% include place-card.html place=p %}{% endunless %}{% endfor %}
  {% for p in rest %}{% unless p.categories contains "a bit out of the city" %}{% include place-card.html place=p %}{% endunless %}{% endfor %}
  </div>
  <div class="emptybox" id="empty" hidden><p>No place has all of these yet.</p><button type="button" class="morebtn" id="emptyclear">Clear filters</button></div>
  <div class="moreline"><button class="morebtn" type="button" id="showall" hidden>Show all {{ incount }} places</button></div>
</section>

<section class="wrap pane" id="from-florence" role="tabpanel" aria-labelledby="tab-out" hidden>
  <div class="filters">
    <div class="pills" id="kindpills">
      <button class="pill" type="button" data-kind="eat" aria-pressed="false"><span class="em" aria-hidden="true">🍝</span> places to eat</button>
      <button class="pill" type="button" data-kind="see" aria-pressed="false"><span class="em" aria-hidden="true">🏛️</span> things to see</button>
      <button class="pill" type="button" data-kind="near" aria-pressed="false"><span class="em" aria-hidden="true">🌳</span> a bit out of the city</button>
      <button class="pill" type="button" data-kind="mountain" aria-pressed="false"><span class="em" aria-hidden="true">⛷️</span> in the mountains</button>
    </div>
    <div class="pills pills-second" id="distpills">
      <button class="pill" type="button" data-dist="hour" aria-pressed="false"><span class="em" aria-hidden="true">🚗</span> an hour or so</button>
      <button class="pill" type="button" data-dist="two" aria-pressed="false"><span class="em" aria-hidden="true">⏳</span> around two hours</button>
      <button class="pill" type="button" data-dist="four" aria-pressed="false"><span class="em" aria-hidden="true">🧳</span> four to five hours</button>
    </div>
  </div>

  <div class="resultbar">
    <h2 id="triptitle">Day trips and weekends</h2>
    <span id="tripcount"></span>
  </div>

  <div class="grid" id="tripgrid">

    {%- comment -%} Towns an hour or so away, from _data/trips.yml {%- endcomment -%}
    {% assign towns = site.data.trips | where: "dist", "hour" %}
    {% for t in towns %}{% include trip-card.html slug=t.slug %}{% endfor %}

    {%- comment -%} Places on this site tagged "a bit out of the city": visited and dated {%- endcomment -%}
    {% for tp in outplaces %}
    <article class="card tripcard" data-dist="hour" data-kind="near">
      <span class="card-em" aria-hidden="true"><span>🌳</span></span>
      <span class="tripkicker">{{ tp.area }} &middot; a bit out of the city</span>
      <h3><a href="{{ tp.url | relative_url }}">{{ tp.title }}</a>{% if tp.price %} <span class="pricetag">{{ tp.price }}</span>{% endif %}</h3>
      <p>{{ tp.answer }}</p>
    </article>
    {% endfor %}

    {%- comment -%} Places in the ski areas, from _data/trips.yml {%- endcomment -%}
    {% assign ski = site.data.trips | where: "area", "ski" %}
    {% for t in ski %}{% include trip-card.html slug=t.slug %}{% endfor %}
  </div>
  <div class="emptybox" id="tripempty" hidden><p>Nothing matches all of these yet.</p><button type="button" class="morebtn" id="tripclear">Clear filters</button></div>
  <div class="moreline"><button class="morebtn" type="button" id="tripsall" hidden>Show everything</button></div>
  <p class="tripnote">Places outside the city are chosen from the Michelin guide, local tourist boards and recent reviews, and not all of them have been visited by us yet. The places marked 🌳 a bit out of the city have.</p>
</section>

<section class="method wrap">
  <h2>Why anything here is worth trusting</h2>
  <div class="cols3 cols2">
    <div><h3>Every place carries a date</h3><p>Nothing is listed without the day somebody stood in it. If a place has not been checked in six months it comes off the site until it is.</p></div>
    <div><h3>Sorted by intent, not category</h3><p>People do not search for restaurants. They search for somewhere quiet, somewhere cheap, somewhere with a view.</p></div>
  </div>
</section>

<script src="{{ '/assets/filter.js' | relative_url }}?v={{ site.time | date: '%s' }}"></script>
