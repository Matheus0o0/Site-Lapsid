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
    class Meta:
        model = Parcerias
        fields = '__all__'

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
            senha=validated_data['senha']
        )
        return user
    
    
class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuarios
        fields = ['nome', 'email', 'senha', 'role']
        extra_kwargs = {'senha': {'write_only': True}}

    def create(self, validated_data):
        senha = validated_data.pop('senha')
        user = Usuarios.objects.create_user(
            senha=senha,
            **validated_data
        )
        return user