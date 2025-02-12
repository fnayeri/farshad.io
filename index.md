---
title: Farshad Nayeri - Technology Product Leader
layout: default
---

<style>
  .info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0 auto;
    padding: 0 50px 0 50px;
    max-width: 1000px;
    /* background-color: pink; */
 }

  .info a img {
    width: 300px;
    height: 300px;
    border-radius: 40px;
  }

  .bio {
    flex: 1;
  }

  .info p {
    font-size: 1.40em;
    line-height: 1.6em;
    margin: 20px 55px 30px 55px;
  }

  @media (max-width: 800px) {

    .info p {
      max-width: 500px;
      margin: 10px 5px 30px 5px;
      font-size: 1.2em;
    }

    .info img {
      margin-bottom: 5px;
      /* Add space below the image */
    }
  }

/* bento */
@media (max-width: 800px) {
  .bento-box {
    grid-template-columns: repeat(2, 1fr);
    width: 80%;
    justify-content: center;
    gap: 5px;
  }

  .bento {
    width: 180px !important;
    height: 180px !important;
    padding: 5px !important;
    margin: 5px !important;
  }
  
  .bento .subtitle {
    font-size: 1.2em;
    /* background-color: LightSalmon;  */
  }

  .bento .title {
    font-size: 1.05em;
  }

  .bento img {
    padding-top: 0;
    margin-top: 0;
    margin-bottom: 20px;
  }

  .bento:hover {
  }
}

  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }

  th,
  td {
    border: none;
    padding: 8px;
    text-align: left;
    font-weight: demibold
    vertical-align: top;
  }

  th {
    background-color: #f2f2f2;
    text-align: left;
  }

  /* tr:nth-child(even) {
    background-color: #f9f9f9;
  }
 */
  tr:hover {
    background-color: #f1f1f1;
  }

  .view-project {
    text-decoration: underline;
    cursor: pointer;
  }

  .text-lines {
    display: none;
  }

  .icon-lines {
    display: block;
    padding: 50px;
  }

  .project a:hover {
      /* text-decoration: none; */

  }

  h1 {
    font-size: 26px;
    text-align: center;
    padding-bottom: 10px;
    margin: 0;
  }

  .portfolio-table {
      width: 100%;
      border-spacing: 0;
      border-collapse: separate;
  }

  .portfolio-cell {
      padding: 20px 40px;
  }

  .portfolio-content {
      display: flex;
      gap: 20px;
  }

  .image-column {
      flex: 0 0 25%;
      max-width: 150px;
  }

  .portfolio-image {
      width: 100%;
      height: auto;
      object-fit: cover;
      border-radius: 8px;
  }

  .content-right {
      flex: 1;
  }

  .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
  }

  .title-group {
      margin-bottom: 8px;
  }

  .title {
      font-size: 1.2em;
      font-weight: bold;
  }

  .customer {
      font-size: 1.2em;
      font-weight: bold;
      color: #666;
  }

  .description {
      margin-bottom: 8px;
  }

  .body-text {
      color: #666;
      margin-bottom: 12px;
  }

  .tags-cell {
      display: none;
      flex-wrap: wrap;
      gap: 8px;
  }

.view-controls {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
}

.view-icons {
    display: flex;
    gap: 8px;
}

.view-icon {
    color: #666;
    padding: 4px;
    border-radius: 4px;
    transition: all 0.2s ease;
}

.view-icon:hover {
    color: #000;
    background: #f5f5f5;
}

.view-icon.active {
    color: #000;
    background: #eee;
}
</style>

<meta property="og:image" content="{{ '/assets/about/farshad-nayeri.png' | absolute_url }}" />

<script>
  const enable_tags = function (tag) {
  const items = document.querySelectorAll('[data-tags]');
  const tagArray = [tag];

  items.forEach(item => {
    const itemTags = item.getAttribute('data-tags').split(/[ ]*,[ ]*/);
    const hasTag = tagArray.some(tag => itemTags.includes(tag));
    if (!hasTag) {
      item.style.opacity = 0.2;
    } else {
      item.style.opacity = 1.0;
    }
  });
}

</script>

{%if false %}

<meta http-equiv="refresh" content="0; url={{ '/docs/' | relative_url }}" />
<h1><a href="/docs/">Farshad Nayeri - farshad.io</a></h1>

{% else %}

<div class='container'>
    <div class="info">
      <br clear="all"/>
      <p>Proven product leader with deep experience in technology and product innovation &star; Transforms business, technical, and strategic constraints into scalable,
        high-impact solutions &star; Thrives in dynamic, hands-on, high-stakes environments, delivering tangible results across the entire product
        lifecycle &star;
        </p>
  </div>

  <div style='clear: both'> </div>
  
  <div class="header-row">
    <div class="view-controls">
      <div class="view-icons">
        <a href="?fmt=bento" class="view-icon {% if fmt == 'bento' %}
        {% endif %}">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" stroke-width="2"/>
            <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" stroke-width="2"/>
            <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" stroke-width="2"/>
            <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" stroke-width="2"/>
          </svg>
        </a>
        <a href="?fmt=list" class="view-icon {% if fmt == 'list' %}active{% endif %}">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="4" width="18" height="2" rx="1" stroke="currentColor" stroke-width="2"/>
            <rect x="3" y="11" width="18" height="2" rx="1" stroke="currentColor" stroke-width="2"/>
            <rect x="3" y="18" width="18" height="2" rx="1" stroke="currentColor" stroke-width="2"/>
          </svg>
        </a>
      </div>
  </div>

  <div class="text-lines">
    <table class="portfolio-table">
      {% for p in site.pages %}{% if p.enabled %}
      <tr class="project" data-tags="{{ p.tags | join: ',' }}">
        <td class="portfolio-cell">
          <a href='{{ p.permalink | relative_url }}' class="portfolio-link">
            <div class="portfolio-content">
              <div class="image-column">
                <img src="{{ p.image }}" class="portfolio-image">
              </div>
              <div class="content-right">
                <div class="header">
                  <div class="title-group">
                    <div class="customer">{{ p.title }}, {{ p.customer }}</div>
                <div class="body-text">{{ p.body }}</div>
                  </div>
                </div>
                <div class="tags-cell">
                  {% for tag in p.tags %}
                    <span class="tag-bubble" style="background-color: {{ tag.color }}">{{ tag }}</span>
                  {% endfor %}
                </div>
              </div>
            </div>
          </a>
        </td>
      </tr>
      {% endif %}{% endfor %}
    </table>
  </div>
    <div class="icon-lines">
      <div class="bento-box projects">
        {% for p in site.pages %}
        {% if p.enabled %}
        <a style='color: #{{ p.color | default: "000000" }}' href='{{ p.permalink | relative_url }}'>
          <div class='bento' 
               style='
                      color:            #{{ p.color | default: "000000" }}; 
                      background-color: #{{ p.background | default: "ffffff" }};
                      border-color:     #{{ p.border | append: '77' | default: p.background | default: "ffffff" }};
                      '
                data-tags='{{p.tags}}'>
            <h2 class='title'>{{ p.title }} </h2>
            <img src='{{ p.image | relative_url }}' alt='{{ p.title | default: "" }}' />
            <h2 class='subtitle' style='text-wrap: no-wrap; vertical-align: top;'>{{ p.customer}}→</h2>
          </div>
        </a>
        {% endif %}
        {% endfor %}
      </div>
    </div>
  </div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const fmtParam = urlParams.get('fmt');
    const tagParam = urlParams.get('tag');

    if (fmtParam) {
        const decodedFmt = decodeURIComponent(fmtParam);
        fmt = decodedFmt;
        console.log("FMT", fmt);
        // set the right class to be active
        if (fmt == 'list') {
          document.querySelector(`.text-lines`).style.display = 'block';
          document.querySelector(`.icon-lines`).style.display = 'none';
        } else {
          document.querySelector(`.icon-lines`).style.display = 'block';
          document.querySelector(`.text-lines`).style.display = 'none';
        }
        classList.add('active');
    }
    
    if (tagParam) {
        const decodedTag = decodeURIComponent(tagParam);
        filterByTag(decodedTag);
    }
});
</script>

{% endif %}