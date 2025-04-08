from django.contrib import admin

from .models import (
    ConteudoPaginas, Equipe, Noticias, Parcerias,
    Projetos, Publicacoes, Relatorio, Usuarios
)

admin.site.register(ConteudoPaginas)
admin.site.register(Equipe)
admin.site.register(Noticias)
admin.site.register(Parcerias)
admin.site.register(Projetos)
admin.site.register(Publicacoes)
admin.site.register(Relatorio)
admin.site.register(Usuarios)