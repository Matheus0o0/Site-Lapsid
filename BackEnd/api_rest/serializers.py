from rest_framework import serializers
from .models import (
    ConteudoPaginas, Equipe, Noticias, Parcerias,
    Projetos, Publicacoes, Relatorio, Usuarios
)

class ConteudoPaginasSerializer(serializers.ModelSerializer):
    class Meta:
        model = ConteudoPaginas
        fields = '__all__'

class EquipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Equipe
        fields = '__all__'

class NoticiasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Noticias
        fields = '__all__'

class ParceriasSerializer(serializers.ModelSerializer):
    imagem_url = serializers.SerializerMethodField()

    class Meta:
        model = Parcerias
        fields = ['id', 'nome_parceria', 'descricao', 'imagem', 'imagem_url', 'data_criacao', 'data_atualizacao']

    def get_imagem_url(self, obj):
        if obj.imagem:
            return f'http://localhost:8001{obj.imagem.url}'
        return None

class ProjetosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Projetos
        fields = '__all__'

class PublicacoesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Publicacoes
        fields = '__all__'

class RelatorioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Relatorio
        fields = '__all__'

class UsuariosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuarios
        fields = ['id', 'nome', 'email', 'role', 'data_criacao']

    def create(self, validated_data):
        user = Usuarios.objects.create_user(
            email=validated_data['email'],
            nome=validated_data['nome'],
            password=validated_data['password']
        )
        return user
    
    
class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuarios
        fields = ['nome', 'email', 'password', 'role']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = Usuarios.objects.create_user(
            password=password,
            **validated_data
        )
        return user