:orphan:

{{ fullname }}
{{ underline }}

.. currentmodule:: {{ module }}

.. autoclass:: {{ objname }}
    :members:
    :private-members:
    :special-members: __module__, __regid__, __call__
    :undoc-members:
    {% block methods %}
    {% if methods %}
    .. rubric:: Methods
    .. autosummary::
    {% for item in methods %}
      ~{{ name }}.{{ item }}
    {%- endfor %}
    {% endif %}
    {% endblock %}
    {% block attributes %}
    {% if attributes %}
    .. rubric:: Attributes
    .. autosummary::
    {% for item in attributes %}
      ~{{ name }}.{{ item }}
    {%- endfor %}
    {% endif %}
    {% endblock %}


