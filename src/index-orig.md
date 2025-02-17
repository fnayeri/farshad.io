---
layout: default
---

<!-- <div class="posts">
  {% for p in site.posts %}
    <article class="post">

      <h1><a href="{{ site.baseurl }}{{ p.url }}">{{ p.title }}</a></h1>

      <div class="entry">
        {{ p.excerpt }}
      </div>

      <a href="{{ site.baseurl }}{{ p.url }}" class="read-more">Read More</a>
    </article>
  {% endfor %}
</div> -->

<div class="portfolios">
  {% for p in site.data.portfolio %}
    <article class="portfolio">

      <h1><a href="{{ site.baseurl }}{{ p.url }}">{{ p.title }}</a></h1>

      <div class="entry">
        {{ p.excerpt }}
      </div>

      <a href="{{ site.baseurl }}{{ p.url }}" class="read-more">Read More</a>
    </article>
  {% endfor %}
</div>