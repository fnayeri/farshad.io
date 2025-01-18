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
  }

  .project a:hover {
      text-decoration: none;

  }

  h1 {
    font-size: 26px;
    text-align: center;
    padding-bottom: 10px;
    margin: 0;
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
  
  <h1>Selected Work</h1>

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

<div class="text-lines">
</div>

{% endif %}

<script>
  document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const fmt = urlParams.get('fmt');
    const tags= urlParams.get('tags') || urlParams.get('tag');

    if (fmt) {
      if (fmt === 'list' || fmt == 'text') {
        document.querySelector('.text-lines').style.display = 'block';
        document.querySelector('.icon-lines').style.display = 'none';
      } else if (fmt === 'icons') {
        document.querySelector('.icon-lines').style.display = 'block';
        document.querySelector('.text-lines').style.display = 'none';
      }
    }
  
  if (tags) {
      const tagArray = tags.split(/[ ]*,[ ]*/);
      const items = document.querySelectorAll('[data-tags]');

      items.forEach(item => {
        const itemTags = item.getAttribute('data-tags').split(/[ ]*,[ ]*/);
        const hasTag = tagArray.some(tag => itemTags.includes(tag));
        if (!hasTag) {
          item.style.opacity = 0.2;
        }
      });
    }
  });

</script>