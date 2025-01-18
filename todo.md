// attic 

<div class='container' style='display: none'>
    <div class="info">
  <!-- List of all tags -->
  <h2>All Tags</h2>
  <div class='tags'>
      {% for tag in site.all_tags %}
      <a onClick='enable_tag("{{tag}}")' class='tag'>{{ tag }}</a>
    {% endfor %}
  </div>
  </div>
  </div>

