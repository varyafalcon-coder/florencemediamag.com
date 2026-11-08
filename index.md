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

{%- assign heroslugs = "what-not-to-miss-in-florence|aperitivo-in-florence|skiing-from-florence" | split: "|" -%}
<div class="wrap hero hero-split">
  <div class="hero-text">
    <p class="hero-kicker">Independent guide &middot; {{ site.time | date: "%B %Y" }}</p>
    <h1>Florence, and everything within reach.</h1>
    <p>Sorted by what you actually want to do.</p>

    <div class="switch" role="tablist" aria-label="In or out of Florence">
      <button class="switch-btn" type="button" role="tab" id="tab-in" data-pane="in" aria-selected="true" aria-controls="in-florence">In Florence</button>
      <button class="switch-btn" type="button" role="tab" id="tab-out" data-pane="out" aria-selected="false" aria-controls="from-florence">From Florence</button>
    </div>
  </div>
  <div class="hero-mosaic">
    <div class="hm-grid">
    {%- assign credits = "" -%}
    {%- for slug in heroslugs -%}
    {%- assign u = "/articles/" | append: slug | append: "/" -%}
    {%- assign ap = site.pages | where: "url", u | first -%}
    {%- assign ph = ap.photo -%}{%- assign cr = ap.photo_credit -%}
    {%- if ph == nil and ap.photo_area -%}{%- assign sa = site.data.ski.areas | where: "id", ap.photo_area | first -%}{%- assign ph = sa.photo -%}{%- assign cr = sa.photo_credit -%}{%- endif -%}
    {%- assign credits = credits | append: "|" | append: cr -%}
    <a class="hm hm{{ forloop.index }}" href="{{ ap.url | relative_url }}">
      <img src="{% if forloop.first %}{{ ph | relative_url }}{% else %}{{ ph | replace: '.jpg', '-640.jpg' | relative_url }}{% endif %}" alt="{{ ap.photo_alt | default: '' }}" width="640" height="360" decoding="async"{% if forloop.first %} fetchpriority="high"{% else %} loading="lazy"{% endif %}>
      <span class="hm-label"><span class="hm-kicker">{% if forloop.index == 3 %}Ski season{% else %}From the magazine{% endif %}</span>{{ ap.title }}</span>
    </a>
    {%- endfor %}
    </div>
    <p class="hm-credits">{% assign cl = credits | split: "|" %}{% for c in cl %}{% if c != "" %}{{ c | strip_html | remove: "Photo: " }}{% unless forloop.last %} &middot; {% endunless %}{% endif %}{% endfor %}</p>
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
    <p class="hint">Pick more than one to narrow it down: “places to eat” and “in the mountains” shows only mountain restaurants.</p>
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
    {%- assign tk = "near" -%}
    {%- for c in tp.categories -%}{%- if c == "nice cute places to eat at" or c == "pizza worth crossing town for" or c == "eat like a local for under 10 euro" or c == "real gelato, not the coloured stuff" or c == "drink wine somewhere real" or c == "aperitivo" -%}{%- unless tk contains "eat" -%}{%- assign tk = tk | append: " eat" -%}{%- endunless -%}{%- endif -%}{%- if c == "see art without queueing" or c == "places with an old soul" or c == "enjoy the view" -%}{%- unless tk contains "see" -%}{%- assign tk = tk | append: " see" -%}{%- endunless -%}{%- endif -%}{%- endfor %}
    <article class="card tripcard" data-dist="hour" data-kind="{{ tk }}">
      <span class="card-em" aria-hidden="true">{% if tk contains "eat" %}<span>🍝</span>{% endif %}{% if tk contains "see" %}<span>🏛️</span>{% endif %}<span>🌳</span><span>🚗</span></span>
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

{%- assign magslugs = "are-two-days-enough-for-florence|florence-off-the-tourist-track|real-gelato-in-florence|where-to-eat-and-stay-in-cortina" | split: "|" -%}
<section class="wrap magazine">
  <div class="mag-head">
    <h2>From the magazine</h2>
    <a class="mag-all" href="{{ '/articles/' | relative_url }}">All articles &rarr;</a>
  </div>
  <div class="mag-grid">
    {%- for slug in magslugs -%}
    {%- assign u = "/articles/" | append: slug | append: "/" -%}
    {%- assign ap = site.pages | where: "url", u | first -%}
    {%- if ap -%}
    {%- assign ph = ap.photo -%}{%- assign cr = ap.photo_credit -%}
    {%- if ph == nil and ap.photo_area -%}{%- assign sa = site.data.ski.areas | where: "id", ap.photo_area | first -%}{%- assign ph = sa.photo -%}{%- assign cr = sa.photo_credit -%}{%- endif -%}
    {%- if ph == nil -%}{%- assign sa = site.data.ski.areas | where: "guide", u | first -%}{%- assign ph = sa.photo -%}{%- assign cr = sa.photo_credit -%}{%- endif -%}
    <a class="artcard has-photo" href="{{ ap.url | relative_url }}">
      {% if ph %}<img class="cardphoto" src="{{ ph | replace: '.jpg', '-640.jpg' | relative_url }}" width="640" height="360" alt="" loading="lazy" decoding="async">{% endif %}
      <h2>{{ ap.title }}</h2>
      <p>{{ ap.answer | default: ap.seo_description }}</p>
      {% if cr %}<span class="cardcredit">{{ cr | strip_html }}</span>{% endif %}
    </a>
    {%- endif -%}
    {%- endfor %}
  </div>
</section>

<section class="trust">
  <div class="wrap">
    <p class="trust-kicker">How this guide works</p>
    <h2>Why anything here is worth trusting</h2>
    <div class="trust-grid">
      <div class="trust-card"><span class="trust-word">In person</span><p>We go to every place in Florence before it is listed, and the entry shows the day we were there. Outside the city, the entry says plainly when we have not been yet.</p></div>
      <div class="trust-card"><span class="trust-word">Up to date</span><p>Every entry shows when it was last checked. Anything not checked in six months comes off the site until it is, so you never follow a tip from ten years ago.</p></div>
      <div class="trust-card"><span class="trust-word">Sourced</span><p>Prices, opening dates and events come with the source and the date we read it, so you can check them yourself.</p></div>
      <div class="trust-card"><span class="trust-word">Independent</span><p>We choose every place ourselves. If someone has hosted us, the entry says so in plain text.</p></div>
    </div>
    <a class="trust-link" href="{{ '/how-we-verify/' | relative_url }}">How every place is checked →</a>
  </div>
</section>

<script src="{{ '/assets/filter.js' | relative_url }}?v={{ site.time | date: '%s' }}"></script>
