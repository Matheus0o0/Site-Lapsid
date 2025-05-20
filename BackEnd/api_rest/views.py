from rest_framework import viewsets, permissions
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.authentication import SessionAuthentication
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response
from rest_framework import status, serializers
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.views.decorators.csrf import ensure_csrf_cookie
from django.contrib.auth import get_user_model

from .permissions import ReadOnlyOrAuthenticated
from .models import (
    ConteudoPaginas, Equipe, Noticias, Parcerias,
    Projetos, Publicacoes, Relatorio, Usuarios
)
from .serializers import (
    ConteudoPaginasSerializer, EquipeSerializer, NoticiasSerializer, ParceriasSerializer,
    ProjetosSerializer, PublicacoesSerializer, RelatorioSerializer, UsuariosSerializer
)

class BaseView(APIView):
    permission_classes = [permissions.AllowAny]  # Permite acesso a todos (não requer login)
    
    def get(self, request):
        # Sua lógica para retornar dados aqui
        return Response({'message': 'Esta é a página inicial pública'})
    
class IsAuthenticatedOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        # Permite GET, HEAD ou OPTIONS para qualquer um
        if request.method in permissions.SAFE_METHODS:
            return True
        # Requer autenticação para outros métodos
        return request.user and request.user.is_authenticated


# ViewSets com leitura pública e escrita autenticada
class ConteudoPaginasViewSet(viewsets.ModelViewSet):
    queryset = ConteudoPaginas.objects.all()
    serializer_class = ConteudoPaginasSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

class EquipeViewSet(viewsets.ModelViewSet):
    queryset = Equipe.objects.all()
    serializer_class = EquipeSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

class NoticiasViewSet(viewsets.ModelViewSet):
    queryset = Noticias.objects.all()
    serializer_class = NoticiasSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

class ParceriasViewSet(viewsets.ModelViewSet):
    queryset = Parcerias.objects.all()
    serializer_class = ParceriasSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

class ProjetosViewSet(viewsets.ModelViewSet):
    queryset = Projetos.objects.all()
    serializer_class = ProjetosSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

class PublicacoesViewSet(viewsets.ModelViewSet):
    queryset = Publicacoes.objects.all()
    serializer_class = PublicacoesSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

class RelatorioViewSet(viewsets.ModelViewSet):
    queryset = Relatorio.objects.all()
    serializer_class = RelatorioSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

# ViewSet de usuários - restrito apenas a administradores
class UsuariosViewSet(viewsets.ModelViewSet):
    queryset = Usuarios.objects.all()
    serializer_class = UsuariosSerializer
    permission_classes = [IsAdminUser] 

    def get_serializer_class(self):
        if self.action == 'create':
            return CreateUserSerializer
        return UsuariosSerializer
# Login
@api_view(['POST'])
@permission_classes([])  # Sem permissão obrigatória para login
@authentication_classes([])  # Sem autenticação obrigatória para login
def login_view(request):
    email = request.data.get('email')
    senha = request.data.get('senha')

    try:
        usuario = Usuarios.objects.get(email=email)
        if usuario.check_password(senha):
            login(request, usuario)
            return Response({'message': 'Login realizado com sucesso'})
        return Response({'error': 'Credenciais inválidas'}, status=status.HTTP_401_UNAUTHORIZED)
    except Usuarios.DoesNotExist:
        return Response({'error': 'Credenciais inválidas'}, status=status.HTTP_401_UNAUTHORIZED)


# Logout
@api_view(['POST'])
@authentication_classes([SessionAuthentication])
@permission_classes([IsAuthenticated])
def logout_view(request):
    logout(request)
    return Response({'message': 'Logout realizado com sucesso'})

# Criar usuário (somente admin)
class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuarios
        fields = ['nome', 'email', 'senha', 'role']  
        extra_kwargs = {'senha': {'write_only': True}}

    def create(self, validated_data):
        usuario = Usuarios.objects.create_user(**validated_data)  
        return usuario

class CreateUserView(APIView):
    permission_classes = [IsAdminUser]  

    def post(self, request):
        serializer = CreateUserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            user.set_password(request.data['senha'])
            user.save()
            return Response({'message': 'Usuário criado com sucesso'}, status=201)
        return Response(serializer.errors, status=400)

class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuarios  #
        fields = ['nome', 'email', 'senha', 'role']  
        extra_kwargs = {'senha': {'write_only': True}}

    def create(self, validated_data):
        usuario = Usuarios.objects.create_user(**validated_data) 
        return usuario

class CreateUserView(APIView):
    permission_classes = [IsAdminUser]

    def post(self, request):
        serializer = CreateUserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            user.set_password(request.data['senha'])
            user.save()
            return Response({'message': 'Usuário criado com sucesso'}, status=201)
        return Response(serializer.errors, status=400)
