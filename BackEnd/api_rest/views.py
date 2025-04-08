from rest_framework import viewsets
from .models import (
    ConteudoPaginas, Equipe, Noticias, Parcerias,
    Projetos, Publicacoes, Relatorio, Usuarios
)
from .serializers import (
    ConteudoPaginasSerializer, EquipeSerializer, NoticiasSerializer, ParceriasSerializer,
    ProjetosSerializer, PublicacoesSerializer, RelatorioSerializer, UsuariosSerializer
)

class ConteudoPaginasViewSet(viewsets.ModelViewSet):
    queryset = ConteudoPaginas.objects.all()
    serializer_class = ConteudoPaginasSerializer

class EquipeViewSet(viewsets.ModelViewSet):
    queryset = Equipe.objects.all()
    serializer_class = EquipeSerializer

class NoticiasViewSet(viewsets.ModelViewSet):
    queryset = Noticias.objects.all()
    serializer_class = NoticiasSerializer

class ParceriasViewSet(viewsets.ModelViewSet):
    queryset = Parcerias.objects.all()
    serializer_class = ParceriasSerializer

class ProjetosViewSet(viewsets.ModelViewSet):
    queryset = Projetos.objects.all()
    serializer_class = ProjetosSerializer

class PublicacoesViewSet(viewsets.ModelViewSet):
    queryset = Publicacoes.objects.all()
    serializer_class = PublicacoesSerializer

class RelatorioViewSet(viewsets.ModelViewSet):
    queryset = Relatorio.objects.all()
    serializer_class = RelatorioSerializer

class UsuariosViewSet(viewsets.ModelViewSet):
    queryset = Usuarios.objects.all()
    serializer_class = UsuariosSerializer
