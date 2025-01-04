-- 
file: portfolio.md
--

<div class="bento-box">
      {% for p in site.data.portfolio %}
            <div class='bento' style='color: #{{ p.color | default: "000000" }}; background-color: #{{ p.background | default: "ffffff" }}'>
              <a style='color: #{{ p.color | default: "000000" }}' href='{{ p.permalink | relative_url }}'> 
                <img src='{{ p.image | relative_url }}' alt='{{ p.title | default: "No Title" }}' />
                <h2>{{ p.title  }} </h2>
                <h3>{{ p.subtitle  }} → </h3>
                <p>{{ p.content }}</p>
                <p>{{ p.permalink }}</p>
              </a>
            </div>
      {% endfor %}
</div> 
 -->
