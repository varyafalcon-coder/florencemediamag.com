---
layout: default
seo_title: "Florence Media. Florence sorted by what you actually want to do"
seo_description: "Florence filtered by intent, not by category. Places to eat, cafes to work from, spots to escape the crowds, viewpoints and pools. Every entry visited in person and dated."
it_url: /it/
---

<div class="wrap hero">
  <h1>Florence, sorted by what you actually want to do.</h1>
  <p>Not a top 50 list. Pick the mood, get the places. Each one visited in person, dated, and checked again every season.</p>
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

  <p class="hint">Pick more than one to narrow it down. Quiet plus a view, or cheap plus late.</p>
</div>

<div class="wrap">
  <div class="resultbar">
    <h2 id="resulttitle">Everything in Florence</h2>
    <span id="resultcount">{{ site.places | size }} places</span>
    <button class="clearall" type="button" id="clearall" hidden>clear filters</button>
  </div>
  <p id="guidelink" class="guidelink" hidden></p>

  <div class="grid" id="grid">
  {% for p in site.places %}
    <article class="card" data-cats="{{ p.categories | join: '|' }}">
      <h3><a href="{{ p.url | relative_url }}">{{ p.title }}</a></h3>
      <p>{{ p.answer }}</p>
      <dl class="facts">
        <div><dt>Area</dt><dd>{{ p.area }}</dd></div>
        {% if p.verified != "" %}<div><dt>Verified</dt><dd>{{ p.verified }}</dd></div>{% endif %}
      </dl>
    </article>
  {% endfor %}
  </div>
  <p class="empty" id="empty" hidden>Nothing here yet for that combination. Try one tag instead of two, or tell us what you were looking for.</p>

  <h2>Written guides</h2>
  <p>Some questions need more than a filter.</p>
  <ul class="pills guides">
  {% for c in site.data.categories.primary %}
    <li><a href="/collections/{{ c.slug }}/">{{ c.emoji }} {{ c.name }}</a></li>
  {% endfor %}
    <li><a href="/collections/">all guides</a></li>
    <li><a href="/articles/">articles</a></li>
  </ul>
</div>

<section class="method wrap">
  <h2>Why anything here is worth trusting</h2>
  <div class="cols3">
    <div><h3>Every place carries a date</h3><p>Nothing is listed without the day somebody stood in it. If a place has not been checked in six months it comes off the site until it is.</p></div>
    <div><h3>No paid placement</h3><p>Nobody buys a listing and nothing here is affiliate. Bookings go straight to the operator.</p></div>
    <div><h3>Sorted by intent, not category</h3><p>People do not search for restaurants. They search for somewhere quiet, somewhere cheap, somewhere with a view.</p></div>
  </div>
</section>

<script src="{{ '/assets/filter.js' | relative_url }}"></script>
