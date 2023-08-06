{%- extends 'full.tpl' -%}


{% macro nbpresent_id(cell) -%}
  {% if cell.metadata.nbpresent %}
    data-nbpresent-id="{{ cell.metadata.nbpresent.id }}"
  {% endif %}
{%- endmacro %}


{% block codecell %}
  <div class="cell border-box-sizing code_cell rendered" {{ nbpresent_id(cell) }}>
    {{ super() }}
  </div>
{%- endblock codecell %}


{% block markdowncell scoped %}
  <div class="cell border-box-sizing text_cell rendered" {{ nbpresent_id(cell) }}>
    {{ self.empty_in_prompt() }}
    <div class="inner_cell">
      <div class="text_cell_render border-box-sizing rendered_html">
      {{ cell.source  | markdown2html | strip_files_prefix }}
      </div>
    </div>
  </div>
{%- endblock markdowncell %}


{% block html_head %}
  {{ super() }}
  {% for css in resources.nbpresent_inline.css -%}
    <style>
      {{ css }}
    </style>
  {% endfor %}
{% endblock html_head %}


{% block body %}
  {{ super() }}

  <script type="application/json" id="nbpresent_tree">
    {{ resources.nbpresent.metadata }}
  </script>
  <script>
    ;(function(){
      var local = "./nbpresent/static/nbpresent/nbpresent.min",
        cdn = "https://continuumio.github.io/nbpresent/nbpresent/nbpresent.min",
        init = function(loader){
          loader.load_presentation_standalone();
        }

      requirejs([local], init, function(){ requirejs([cdn], init); })

    }).call(this);
  </script>
{% endblock body %}
