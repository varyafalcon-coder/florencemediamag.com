---
layout: default
seo_title: "Florence Media. Florence sorted by what you actually want to do"
seo_description: "Florence filtered by intent, not by category. Places to eat, cafes to work from, spots to escape the crowds, viewpoints and pools. Every entry visited in person and dated."
---

<div class="wrap hero">
  <h1>Florence, sorted by what you actually want to do.</h1>
  <p>Not a top 50 list. Pick the mood, get the places. Each one visited in person, dated, and checked again every season.</p>
</div>

<div class="wrap">
  <h2>Pick what you want to do</h2>
  <ul class="pills">
  {% for p in site.pages %}{% if p.layout == 'collection' %}
    <li><a href="{{ p.url | relative_url }}">{{ p.title }}</a></li>
  {% endif %}{% endfor %}
  </ul>

  <h2>Every place</h2>
  <div class="grid">
  {% for p in site.places %}
    <article class="card">
      <h3><a href="{{ p.url | relative_url }}">{{ p.title }}</a></h3>
      <p>{{ p.answer }}</p>
      <dl class="facts">
        <div><dt>Area</dt><dd>{{ p.area }}</dd></div>
        {% if p.verified != "" %}<div><dt>Verified</dt><dd>{{ p.verified }}</dd></div>{% endif %}
      </dl>
    </article>
  {% endfor %}
  </div>
</div>

<section class="method wrap">
  <h2>Why anything here is worth trusting</h2>
  <div class="cols3">
    <div><h3>Every place carries a date</h3><p>Nothing is listed without the day somebody stood in it. If a place has not been checked in six months it comes off the site until it is.</p></div>
    <div><h3>No paid placement</h3><p>Nobody buys a listing and nothing here is affiliate. Bookings go straight to the operator.</p></div>
    <div><h3>Sorted by intent, not category</h3><p>People do not search for restaurants. They search for somewhere quiet, somewhere cheap, somewhere with a view.</p></div>
  </div>
</section>
