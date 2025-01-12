---
title: farshad.io - Farshad Nayeri
layout: default
---

<style>
  .info {
    margin-top: 10px;
    display: flex;
    flex-direction: row;
    background-color: white;
    border-radius: 40px;
    gap: 20px;
    width: 940px;
    /* padding: 20px; */
  }

  .info img {
    width: 300px;
    height: 300px;
    border-radius: 40px;
    /* border-radius: 20px; */
    /* margin: 0 auto;
    float: left; */
  }

  .bio {
    flex: 1;
    /* Allow the bio to take up the remaining space */
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
</style>
<meta property="og:image"  content="{{ '/assets/about/farshad-nayeri-faceshot.jpeg' | absolute_url }}" />

{%if false %}

<meta http-equiv="refresh" content="0; url={{ '/docs/' | relative_url }}" />

<h1><a href="/docs/">Farshad Nayeri - farshad.io</a></h1>

{% else %}

<div class='container'>
  <div class="bento-box">
    <div class='info'>
      <a href='/docs/resume/Farshad-Nayeri-Resume.pdf'>
        <img src='/assets/about/farshad-nayeri-faceshot.jpeg' alt='{{ p.title | default: "" }}' />
      </a>
      <p>Proven product leader who transforms business, technical, and strategic constraints into scalable,
        high-impact solutions.
        Thrives in dynamic, hands-on, high-stakes environments, delivering tangible results across the entire product
        lifecycle.
      </p>
    </div>
  </div>

  <div style='clear: both'> </div>

  <div class="bento-box">
    {% for p in site.pages %}
      {% if p.enabled %}
          <a style='color: #{{ p.color | default: "000000" }}' href='{{ p.permalink | relative_url }}'>
            <div class='bento' style='
                    color:            #{{ p.color | default: "000000" }}; 
                    background-color: #{{ p.background | default: "ffffff" }};
                    border-color:     #{{ p.border | default: p.background | default: "FFFFF" }}'>
              <h2 class='title'>{{ p.title }} </h2>
              <img src='{{ p.image | relative_url }}' alt='{{ p.title | default: "" }}' />
              <h2 class='subtitle' style='text-wrap: no-wrap; vertical-align: top;'>{{ p.customer}}→</h2>
            </div>
          </a>
      {% endif %}
    {% endfor %}
  </div>
</div>

{% endif %}
