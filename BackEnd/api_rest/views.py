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
from django.http import JsonResponse
from django.middleware.csrf import get_token
from rest_framework.decorators import action

from .permissions import ReadOnlyOrAuthenticated, IsAdminRole
from .models import (
    ConteudoPaginas, Equipe, Noticias, Parcerias,
    Projetos, Publicacoes, Relatorio, Usuarios
)
from .serializers import (
    ConteudoPaginasSerializer, EquipeSerializer, NoticiasSerializer, ParceriasSerializer,
    ProjetosSerializer, PublicacoesSerializer, RelatorioSerializer, UsuariosSerializer
)

class BaseView(APIView):
    permission_classes = [permissions.AllowAny] 
    
    def get(self, request):

        return Response({'message': 'Esta é a página inicial pública'})
    
class IsAuthenticatedOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user and request.user.is_authenticated


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

class UsuariosViewSet(viewsets.ModelViewSet):
    queryset = Usuarios.objects.all()
    serializer_class = UsuariosSerializer
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAdminRole]

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated:
            if user.role == 'admin':
                return Usuarios.objects.all()
            return Usuarios.objects.filter(id=user.id)
        return Usuarios.objects.none()

    def get_permissions(self):
        if self.action in ['retrieve', 'me']:
            return [IsAuthenticated()]
        return [IsAdminRole()]

    def get_serializer_class(self):
        if self.action == 'create':
            return CreateUserSerializer
        return UsuariosSerializer

    def check_object_permissions(self, request, obj):
        super().check_object_permissions(request, obj)
        
        if request.method == 'DELETE' and obj.id == request.user.id:
            self.permission_denied(
                request,
                message='Você não pode excluir sua própria conta.'
            )

    @action(detail=False, methods=['get'])
    def me(self, request):
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        
        if instance.id == request.user.id:
            return Response(
                {'error': 'Você não pode excluir sua própria conta.'},
                status=status.HTTP_403_FORBIDDEN
            )
            
        return super().destroy(request, *args, **kwargs)

@api_view(['GET'])
@ensure_csrf_cookie
def get_csrf_token(request):
    csrf_token = get_token(request)
    response = JsonResponse({'detail': 'CSRF cookie set', 'csrfToken': csrf_token})
    response['X-CSRFToken'] = csrf_token
    return response

@api_view(['POST'])
@permission_classes([])
@authentication_classes([])
@ensure_csrf_cookie
def login_view(request):
    email = request.data.get('email')
    password = request.data.get('password')

    if not email or not password:
        return Response(
            {'error': 'Email e senha são obrigatórios'},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        usuario = Usuarios.objects.get(email=email)
        if usuario.check_password(password):
            login(request, usuario)
            request.session.save()
            
            return Response({
                'id': usuario.id,
                'nome': usuario.nome,
                'email': usuario.email,
                'role': usuario.role,
                'data_criacao': usuario.data_criacao,
            }, status=status.HTTP_200_OK)
            
        return Response(
            {'error': 'Email ou senha inválidos'},
            status=status.HTTP_401_UNAUTHORIZED
        )
    except Usuarios.DoesNotExist:
        return Response(
            {'error': 'Email ou senha inválidos'},
            status=status.HTTP_401_UNAUTHORIZED
        )
    except Exception as e:
        print(f"Erro no login: {str(e)}") 
        return Response(
            {'error': 'Erro interno do servidor'},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['POST'])
@authentication_classes([SessionAuthentication])
@permission_classes([IsAuthenticated])
def logout_view(request):
    logout(request)
    return Response({'message': 'Logout realizado com sucesso'})

class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuarios
        fields = ['nome', 'email', 'password', 'role']  
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        usuario = Usuarios.objects.create_user(**validated_data)  
        return usuario

class CreateUserView(APIView):
    permission_classes = [IsAdminRole]

    def post(self, request):
        serializer = CreateUserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            user.set_password(request.data['password'])
            user.save()
            return Response({'message': 'Usuário criado com sucesso'}, status=201)
        return Response(serializer.errors, status=400)
