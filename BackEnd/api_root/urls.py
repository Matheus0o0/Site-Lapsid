"""
URL configuration for api_root project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
from django.conf import settings
from django.conf.urls.static import static
from api_rest.views import login_view, logout_view, CreateUserView, get_csrf_token
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.generic import TemplateView

from api_rest.views import (
    ConteudoPaginasViewSet, EquipeViewSet, NoticiasViewSet, ParceriasViewSet,
    ProjetosViewSet, PublicacoesViewSet, RelatorioViewSet, UsuariosViewSet
)

router = DefaultRouter()
router.register(r'conteudo-paginas', ConteudoPaginasViewSet)
router.register(r'equipe', EquipeViewSet)
router.register(r'noticias', NoticiasViewSet)
router.register(r'parcerias', ParceriasViewSet)
router.register(r'projetos', ProjetosViewSet)
router.register(r'publicacoes', PublicacoesViewSet)
router.register(r'relatorio', RelatorioViewSet)
router.register(r'usuarios', UsuariosViewSet)

auth_urlpatterns = [
    path('csrf', get_csrf_token, name='csrf'),
    path('login', login_view, name='login'),
    path('logout', logout_view, name='logout'),
]

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),

    path('api/', include(auth_urlpatterns)),

    path('api/', include(router.urls)),
    path('api-auth/', include('rest_framework.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)