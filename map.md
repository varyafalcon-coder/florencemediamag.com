---
layout: page
title: Map
permalink: /map/
seo_title: "Map of every place in Florence Media"
seo_description: "Every place on Florence Media on one map, sorted by what you want to do. Each one visited in person and dated."
---

Every place on this site on one map. Each one was visited in person and carries the month it was last checked.

{% if site.map_id and site.map_id != "" %}
<div class="mapwrap">
  <iframe
    src="https://www.google.com/maps/d/embed?mid={{ site.map_id }}&ehbc=2E2E2E"
    title="Map of every place in Florence Media"
    loading="lazy"
    referrerpolicy="no-referrer-when-downgrade"
    allowfullscreen></iframe>
</div>

The map is grouped by category. Open any pin for the address and a link to the full entry.
{% else %}
<div class="callout">
<p><strong>The map is being built.</strong> In the meantime, every place is on the <a href="/">main list</a>, filterable by what you want to do and by price, and each entry links straight to Google Maps.</p>
</div>
{% endif %}
