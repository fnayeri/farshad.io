---
title: farshad.io - Farshad Nayeri
layout: default
---

{%if false %}

  <meta http-equiv="refresh" content="0; url={{ "/docs/" | relative_url }}" />
  <h1><a href="/docs/">Farshad Nayeri - farshad.io</a></h1>

{% else %}

<div class="bento-box">
      {% for p in site.data.portfolio %}
            <!-- {{p | escape}} -->
            {% if true or p.name != nil  %}
            <div class='bento' style='color: #{{ p.color | default: "000000" }}; background-color: #{{ p.background | default: "ffffff" }}'>
              <a style='color: #{{ p.color | default: "000000" }}' href='{{ p.permalink | relative_url }}'> 
                <img src='{{ p.image | relative_url }}' alt='{{ p.title | default: "No Title" }}' />
                <h2>{{ p.title  }} </h2>
                <h3>{{ p.subtitle  }}</h3>
                <h1> → </h1>
                <p>{{ p.body }}</p>
              </a>
            </div>
            {% endif %}
      {% endfor %}
</div> 

{%endif%}