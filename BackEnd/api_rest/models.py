from django.db import models

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
    imagem = models.ImageField(upload_to='noticias/', blank=True, null=True)
    link = models.CharField(max_length=255, blank=True, null=True)
    data_criacao = models.DateTimeField(blank=True, null=True)
    data_atualizacao = models.DateTimeField(blank=True, null=True)

    class Meta:
        db_table = 'parcerias'


class Projetos(models.Model):
    titulo = models.CharField(max_length=255)
    conteudo = models.TextField()
    data_criacao = models.DateTimeField(blank=True, null=True)
    data_atualizacao = models.DateTimeField(blank=True, null=True)

    class Meta:
        db_table = 'projetos'


class Publicacoes(models.Model):
    titulo = models.CharField(max_length=255)
    conteudo = models.TextField()
    autor = models.ForeignKey('Usuarios', models.DO_NOTHING, blank=True, null=True)
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


class Usuarios(models.Model):
    nome = models.CharField(max_length=100)
    email = models.CharField(unique=True, max_length=100)
    senha = models.CharField(max_length=255)
    role = models.CharField(max_length=5, choices=[('admin', 'admin'), ('user', 'user')], default='user')
    data_criacao = models.DateTimeField(blank=True, null=True)

    class Meta:
        db_table = 'usuarios'
