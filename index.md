---
title: Farshad Nayeri
layout: default
---

<style>
  .info {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    /* background-color: white; */
    border-radius: 40px;
    gap: 20px;
    width: 940px;
    /* padding: 20px; */
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
    font-size: 1.55em;
    line-height: 1.6em;
    padding-left: 20px;
    padding-right: 30px;
  }

  @media (max-width: 600px) {
    .info {
      flex-direction: column;
      width: 100%;
    }

    .info p {
      padding: 20px;
      font-size: 1.2em;
      max-width: 300px;
    }

    .info img {
      margin-bottom: 5px;
      /* Add space below the image */
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
                    border-color:     #{{ p.border | default: p.background | default: "FFFFF" }};
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
    console.log("CONTENT LOADED");
    const urlParams = new URLSearchParams(window.location.search);
    const fmt = urlParams.get('fmt');
    const tags= urlParams.get('tags') || urlParams.get('tag');

    console.log("Format", fmt);
    console.log("Tags", tags);

    
    if (fmt) {
      console.log("FMT", tags);
      if (fmt === 'list' || fmt == 'text') {
        document.querySelector('.text-lines').style.display = 'block';
        document.querySelector('.icon-lines').style.display = 'none';
      } else if (fmt === 'icons') {
        document.querySelector('.icon-lines').style.display = 'block';
        document.querySelector('.text-lines').style.display = 'none';
      }
    }
  
  if (tags) {
      console.log("TAGS", tags);
      const tagArray = tags.split(/[ ]*,[ ]*/);
      const items = document.querySelectorAll('[data-tags]');

      console.log("DATA TAGS", items);

      items.forEach(item => {
        console.log("EACH TAG", item);
        const itemTags = item.getAttribute('data-tags').split(/[ ]*,[ ]*/);
        const hasTag = tagArray.some(tag => itemTags.includes(tag));
        console.log("TAG", itemTags, hasTag);
        if (!hasTag) {
          item.style.opacity = 0.2;
        }
      });
    }
  });


</script>