from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.utils import timezone
import os
import time

class ConteudoPaginas(models.Model):
    titulo = models.CharField(max_length=255)
    conteudo = models.TextField()
    data_criacao = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    data_atualizacao = models.DateTimeField(auto_now=True, blank=True, null=True)

    class Meta:
        db_table = 'conteudo_paginas'


class Equipe(models.Model):
    nome = models.CharField(max_length=255)
    tipo_integrante = models.CharField(max_length=255)
    curso = models.CharField(max_length=255)
    linha_pesquisa = models.CharField(max_length=255)
    titulacao_maxima = models.CharField(max_length=100, blank=True, null=True)
    data_inclusao = models.DateField(blank=True, null=True)

    class Meta:
        db_table = 'equipe'


class Noticias(models.Model):
    titulo = models.CharField(max_length=255)
    conteudo = models.TextField()
    autor = models.ForeignKey('Usuarios', models.DO_NOTHING, blank=True, null=True)
    data_criacao = models.DateTimeField(blank=True, null=True)
    data_atualizacao = models.DateTimeField(blank=True, null=True)
    data_noticia = models.DateTimeField(blank=True, null=True)
    imagem = models.ImageField(upload_to='noticias/', blank=True, null=True)
    link = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        db_table = 'noticias'


class Parcerias(models.Model):
    nome_parceria = models.CharField(max_length=255)
    descricao = models.TextField(blank=True, null=True)
    imagem = models.ImageField(upload_to='parcerias/', max_length=255, blank=True, null=True)
    data_criacao = models.DateTimeField(blank=True, null=True)
    data_atualizacao = models.DateTimeField(blank=True, null=True)

    def save(self, *args, **kwargs):
        if not self.data_criacao:
            self.data_criacao = timezone.now()
        self.data_atualizacao = timezone.now()
        
        # Renomear a imagem se existir
        if self.imagem:
            # Obter a extensão do arquivo
            ext = os.path.splitext(self.imagem.name)[1]
            # Gerar um nome único para o arquivo
            filename = f'parceria_{self.id or "new"}_{int(time.time())}{ext}'
            # Atualizar o nome do arquivo
            self.imagem.name = f'parcerias/{filename}'
            
        super().save(*args, **kwargs)

    @property
    def imagem_url(self):
        if self.imagem:
            return f'http://localhost:8001{self.imagem.url}'
        return None

    class Meta:
        db_table = 'parcerias'


class Projetos(models.Model):
    titulo = models.CharField(max_length=255)
    conteudo = models.TextField()
    autor = models.CharField(max_length=255, blank=True, null=True)
    data_criacao = models.DateTimeField(blank=True, null=True)
    data_atualizacao = models.DateTimeField(blank=True, null=True)

    class Meta:
        db_table = 'projetos'


class Publicacoes(models.Model):
    titulo = models.CharField(max_length=255)
    conteudo = models.TextField()
    autor = models.CharField(max_length=255, blank=True, null=True)
    data_criacao = models.DateTimeField(blank=True, null=True)
    data_atualizacao = models.DateTimeField(blank=True, null=True)
    link = models.CharField(max_length=255)
    ano = models.CharField(max_length=50)

    class Meta:
        db_table = 'publicacoes'


class Relatorio(models.Model):
    tabela_afetada = models.CharField(max_length=100)
    id_registro_afetado = models.IntegerField()
    tipo_acao = models.CharField(max_length=8)
    data_ocorrencia = models.DateTimeField(blank=True, null=True)

    class Meta:
        db_table = 'relatorio'
        
class CustomUserManager(BaseUserManager):
    def create_user(self, email, nome, password=None, role='user', **extra_fields):
        if not email:
            raise ValueError('O usuário deve ter um e-mail')
        email = self.normalize_email(email)
        user = self.model(email=email, nome=nome, role=role, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, nome, password=None):
        user = self.create_user(email, nome, password=password, role='admin')
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


class Usuarios(AbstractBaseUser, PermissionsMixin):
    ROLE_CHOICES = (
        ('admin', 'Admin'),
        ('user', 'User'),
    )

    id = models.AutoField(primary_key=True)
    nome = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128, verbose_name='password')
    role = models.CharField(max_length=5, choices=ROLE_CHOICES, default='user')
    data_criacao = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['nome']

    objects = CustomUserManager()

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        return True if self.role == 'admin' else super().has_perm(perm, obj)

    def has_module_perms(self, app_label):
        return True if self.role == 'admin' else super().has_module_perms(app_label)