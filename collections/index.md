---
layout: page
title: Collections
permalink: /collections/
seo_title: "Collections. Florence sorted by what you actually want to do"
seo_description: "Every Florence guide on this site in one place: where to eat cheaply, which cafes allow laptops, where to escape the crowds, viewpoints, pools and what to do with children."
---

Every guide on this site, each one a written page with the places attached. Pick what you actually want to do.

{% include all-places.html %}
{%- assign allcats = site.data.categories.primary -%}
{%- for grp in site.data.categories.groups -%}{%- assign allcats = allcats | concat: grp.items -%}{%- endfor -%}
<div class="colgrid">
{% assign guides = site.pages | where: "layout", "collection" | sort: "order" %}
{% for g in guides %}
  {% assign list = all_places | where_exp: "p", "p.categories contains g.category" %}
  <a class="colcard" href="{{ g.url | relative_url }}">
    <span class="colcard-em" aria-hidden="true">{{ g.emoji }}</span>
    {% assign gc = allcats | where: "name", g.category | first %}<span class="colcard-tag">{{ gc.label | default: g.category }}</span>
    <h2>{{ g.title }}</h2>
    <p>{{ g.answer }}</p>
    <span class="colcard-meta">{{ list | size }} places{% if g.article %} &middot; full guide{% endif %}</span>
  </a>
{% endfor %}
</div>
