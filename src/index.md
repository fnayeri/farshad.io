---
title: Farshad Nayeri - Technology Product Leader
layout: default
---

<style>
  .container {
    display: flex ;
    flex-direction: column;
    justify-content: center;
    margin: 0 30px;
    padding: 5px 50px 5px 50px;
    max-width: 1000px;
  }


  .container .info a img {
    width: 300px;
    height: 300px;
  }

  .bio {
    flex: 1;
  }

  .container .info p {
    font-size: 1.40em;
    line-height: 1.6em;
    margin: 15px 55px 15px 55px;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }

  th,
  td {
    border: none;
    text-align: left;
    font-weight: demibold
    vertical-align: top;
  }

  th {
    background-color: #f2f2f2;
    text-align: left;
  }

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
    border-radius: 40px;
  }

  .project a:hover {
    margin: 0;
    padding: 0;
      /* text-decoration: none; */

  }

  h1 {
    font-size: 26px;
    text-align: center;
    padding-bottom: 10px;
    margin: 0;
  }

  h3 {
    text-align: center;
    font-size: 1em;
    text-transform: uppercase;
    letter-spacing: 15%;
  }

  .portfolio-table {
      width: 100%;
      border-spacing: 0;
      border-collapse: separate;
  }

  .portfolio-cell {
      padding: 10px 40px;
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
      width: 150px;
      height: auto;
      object-fit: cover;
      border-radius: 40px;
  }

  .header-row {
    background-color: #DDD;
    border-radius: 40px;
    margin-top: 30px;
    margin-left: 50px;
    margin-right: 50px;
  }

  .showcase {
    display: flex;
    align-items: middle;
    background-color: gray;
    padding: 0 5px 10px 15px;
    flex-direction: column;
    border-radius: 30px;
    background-color: black;
    color: white;
  }

  .showcase a {
    color: white;
    font-weight: bold;
  }

  .showcase a:hover {
    text-decoration: underline;
  }

  .showcase img {
    width: 300pt;
  }

  img {
    /* width: 700px; */
  }

  div.showcase h3 {
    padding: 0;
    padding-top: 10px;
    margin: 10px;
  }

  .showcase-content {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 10px;
    position: relative;
  }

  div.showcase-content video {
    background-color: black;
    height: 200px;
  }
  
  div.showcase-content p {
    line-height: 1.6em;
    padding-left: 10px;
    padding-right: 10px;
  }

  div.showcase-content p b {
    text-transform: uppercase;
  }

  .fullscreen-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    border: none;
    padding: 10px;
    cursor: pointer;
    border-radius: 5px;
  }

  .fullscreen-btn:hover {
    background-color: rgba(0, 0, 0, 0.7);
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
      font-weight: normal;
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

  a.button {
    font-size: smaller;
    border: solid white 1px;
    padding: 3px;
    border-radius: 5px;
    margin: 5px;
    height: 1.4em;
    color: white;
  }

  
@media (max-width: 800px) {

  div#main {
    margin: 0;
    padding: 0;
  }

  .portfolio-cell {
    padding: 0 !important;
    margin: 0 !important;
  }

  div.title {
    font-size: 1em;
    font-weight: bold;
  }

  div.customer {
    font-size: 1em;
  }

  div.body-text {
    font-size: 1em;
    width: 310px;
  }

  div.showcase-content {
    flex-direction: column;
  }

  .text-lines img.portfolio-image {
      max-width: 100px;
      float: left;
  }

  .container .info p {
    max-width: 500px;
    margin: 10px 5px 30px 5px;
    font-size: 1.2em;
  }

  .container .info img {
    margin-bottom: 5px;
    /* Add space below the image */
  }

  .bento-box {
    grid-template-columns: repeat(2, 1fr);
    width: 80%;
    justify-content: center;
    gap: 5px;
  }

  .bento {
    width: 180px !important;
    height: 180px !important;
    padding: 10px !important;
    margin: 10px !important;
  }

  .title {
    padding-top: 10px;
    font-size: 1em !important;
    max-lines: 2;
  }
  
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
    <p style='display: none'>Proven product leader with deep experience in technology and product innovation &star;        Transforms business, technical, and strategic constraints into scalable,
      high-impact solutions &star; Thrives in dynamic, hands-on, high-stakes environments, delivering tangible results across the entire product
      lifecycle &star;
      </p>
  </div>

  <div class='showcase' style='display:none'>
    <h3><b>Showcase:</b> Pixxa</h3>
    <div class='showcase-content'>
      <p>
        Pixxa platform brings the power of Data Cinematography to the ordinary presenter. Pixxa's Perspective app has been used in many high-stakes presentations in such companies as Apple, Samsung, and Fidelity.<br/><br/> <a class='button' href="/#" id='fullscreen-play'>Expand ⛶</a> <a class='button' href='https://pixxa.com/'>Learn &rarr;</a>
      </p>
      <video id="showcase-video" controls 
            poster="{{ '/assets/video/pixxa-sankey.png' | relative_url }}"> 
          <source src="{{ '/assets/video/farshad-nayeri-pixxa.m4v' | relative_url}}"      type="video/mp4"/>
      </video>
    </div>
  </div>

  <div style='padding: 0; margin: 0;'> <p style='text-align: center; font-weight: bold'><a href='/about/'>About Farshad &rarr;</a></p></div>
  
  <div class='showcase'>
    <h3>Harvard XR 2025</h3>
    <div class='showcase-content' style='background: url(/assets/artifacts/harvardxr/harvardxr.png)'>
      <p> 
        <a href='https://harvardxr.com/'>HarvardXR</a> invited me to <a href='https://www.harvardxr.com/2025/speakers'>speak</a> about <a href='https://www.linkedin.com/posts/farshadnayeri_harvard-harvardxr-harvardxr2026-activity-7321267481459712000-xfqF'>Data&nbsp;Cinematography</a>. This made for a great opportunity to showcase the data cinematography app  <a href='https://itunes.apple.com/us/app/perspective/id516098684?ls=1'>Perspective</a> whose development I led at <a href='https://pixxa.com/'> Pixxa</a>.
      </p>
      <a href='https://www.harvardxr.com/events/immersive-storytelling-games-and-design'><img width="40%" src='/assets/artifacts/harvardxr/Data%20Cinematography%20-%20HarvardXR%20v1.0.png' /></a>
    </div>
  </div>

</div>
  <div style='clear: both'> </div>

  <div class="header-row">
    <h3>Selected Work</h3>
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
                    <div class="customer">{{ p.customer }}</div>                    
                    <div class="title">{{ p.title }}</div>
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
            <h2 class='title'>{{ p.title }}</h2>
            <img class='portfolio-image' src='{{ p.image | relative_url }}' alt='{{ p.title | default: "" }}' />
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
        // set the right class to be active
        if (fmt == 'list') {
          document.querySelector(`.text-lines`).style.display = 'block';
          document.querySelector(`.icon-lines`).style.display = 'none';
        } else {
          document.querySelector(`.icon-lines`).style.display = 'block';
          document.querySelector(`.text-lines`).style.display = 'none';
        }
        // classList.add('active');
    }
    
    if (tagParam) {
        const decodedTag = decodeURIComponent(tagParam);
        filterByTag(decodedTag);
    }
});

document.getElementById('fullscreen-play').addEventListener('click', function() {
    const video = document.getElementById('showcase-video');
    if (video.requestFullscreen) {
      video.requestFullscreen();
    } else if (video.mozRequestFullScreen) { /* Firefox */
      video.mozRequestFullScreen();
    } else if (video.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
      video.webkitRequestFullscreen();
    } else if (video.msRequestFullscreen) { /* IE/Edge */
      video.msRequestFullscreen();
    }
});
</script>


{% endif %}
