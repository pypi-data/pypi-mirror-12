=====
Luhu Blog
=====

Luhu Blog es una app Django simple para crear blog

La documentación detallada está en el directorio "docs".

Comienzo rápido
---------------

1. Agregar "luhublog" al setting INSTALLED_APPS::

      INSTALLED_APPS = (
          ...
          'luhublog',
          'froala_editor',
      )

2. Incuir el URLconf de polls en el urls.py del proyecto::

      url(r'^blog/', include('luhublog.urls')),
      url(r'^froala_editor/', include('froala_editor.urls')),

3. Correr `python manage.py syncdb` para crear los modelos de luhublog.

4. Levantar el servidor de desarrollo y visitar http://127.0.0.1:8000/admin/
  para crear una entrada de blog (es necesario tener la app Admin habilitada).

5. Visitar http://127.0.0.1:8000/blog/ para ver el blog.


Incluid en la plantilla base entre el head
{% block seo_meta %}
{% endblock seo_meta %}

Añadir en 'context_processors'

context_processors: [
    ...
    'luhublog.context_processors.blog_info'
    ...
],