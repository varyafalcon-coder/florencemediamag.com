---
layout: default
seo_title: "Florence Media. Florence sorted by what you actually want to do"
seo_description: "Florence filtered by intent, not by category. Places to eat, cafes to work from, spots to escape the crowds, viewpoints and pools. Every entry visited in person and dated."
---

<div class="wrap hero">
  <h1>Florence, sorted by what you actually want to do.</h1>
  <p>Here you won't find top 50 lists. Pick the mood, get the places. Each one is visited in person, dated, and checked again every season.</p>
</div>

<div class="wrap filters">
  <div class="pills">
    <button class="pill" type="button" data-tag="all" aria-pressed="true">everything</button>
    {% for c in site.data.categories.primary %}
    <button class="pill" type="button" data-tag="{{ c.name }}" aria-pressed="false"><span class="em" aria-hidden="true">{{ c.emoji }}</span> {{ c.name }}</button>
    {% endfor %}
    <button class="pill seeall" type="button" id="seeall" aria-expanded="false">see all 16</button>
  </div>

  {% for g in site.data.categories.groups %}
  <div class="group">
    <p class="axis">{{ g.label }}</p>
    <div class="pills">
      {% for c in g.items %}
      <button class="pill" type="button" data-tag="{{ c.name }}" aria-pressed="false"><span class="em" aria-hidden="true">{{ c.emoji }}</span> {{ c.name }}</button>
      {% endfor %}
    </div>
  </div>
  {% endfor %}

  <div class="group">
    <p class="axis">Price</p>
    <div class="pills">
      <button class="pill price" type="button" data-price="€" aria-pressed="false">€ cheap</button>
      <button class="pill price" type="button" data-price="€€" aria-pressed="false">€€ mid</button>
      <button class="pill price" type="button" data-price="€€€" aria-pressed="false">€€€ splash out</button>
    </div>
  </div>

  <p class="hint">Pick more than one to narrow it down.</p>
</div>

<div class="wrap">
  <div class="resultbar">
    <h2 id="resulttitle">Everything in Florence</h2>
    <span id="resultcount">{{ all_places | size }} places</span>
    <button class="clearall" type="button" id="clearall" hidden>clear filters</button>
  </div>
  <p id="guidelink" class="guidelink" hidden></p>

  <div class="grid" id="grid">
  {% include all-places.html %}
  {% assign pinned = all_places | where_exp: "p", "p.pin" | sort: "pin" %}
  {% assign rest = all_places | where_exp: "p", "p.pin == nil" %}
  {% for p in pinned %}{% include place-card.html place=p %}{% endfor %}
  {% for p in rest %}{% include place-card.html place=p %}{% endfor %}
  </div>
  <p class="empty" id="empty" hidden>Nothing here yet for that combination. Try one tag instead of two, or tell us what you were looking for.</p>
</div>

<section class="method wrap">
  <h2>Why anything here is worth trusting</h2>
  <div class="cols3">
    <div><h3>Every place carries a date</h3><p>Nothing is listed without the day somebody stood in it. If a place has not been checked in six months it comes off the site until it is.</p></div>
    <div><h3>No paid placement</h3><p>Nobody buys a listing and nothing here is affiliate. Bookings go straight to the operator.</p></div>
    <div><h3>Sorted by intent, not category</h3><p>People do not search for restaurants. They search for somewhere quiet, somewhere cheap, somewhere with a view.</p></div>
  </div>
</section>

<script src="{{ '/assets/filter.js' | relative_url }}?v={{ site.time | date: '%s' }}"></script>
