---
title: farshad.io - Farshad Nayeri
layout: default
---

{%if false %}

  <meta http-equiv="refresh" content="0; url={{ '/docs/' | relative_url }}" />
  <h1><a href="/docs/">Farshad Nayeri - farshad.io</a></h1>

{% else %}

<div class="bento-box">
      {% for p in site.pages %}
            {% if p.enabled  %}
          <a style='color: #{{ p.color | default: "000000" }}' href='{{ p.permalink | relative_url }}'> 
            <div class='bento' style='
                color:            #{{ p.color | default: "000000" }}; 
                background-color: #{{ p.background | default: "ffffff" }};
                border-color:     #{{ p.border | default: p.background | default: "FFFFF" }}'
            >
                <h2 class='title'>{{ p.title  }} </h2>
                <h2 class='arrow superlarge'></h2>
                <img src='{{ p.image | relative_url }}' alt='{{ p.title | default: "" }}' />
                <h2 class='subtitle'>{{ p.customer}}<br>
                <span class='superlarge'>→</span>
                </h2>
            </div>
        </a>
            {% endif %}
      {% endfor %}
</div> 

{%endif%}
