-- Tabela de usuários
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    role ENUM('admin', 'user') DEFAULT 'user',
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de publicações
CREATE TABLE publicacoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    conteudo TEXT NOT NULL,
    autor_id INT,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    link VARCHAR(255) NOT NULL,
    ano VARCHAR(50) NOT NULL,
    FOREIGN KEY (autor_id) REFERENCES usuarios(id) 
        ON DELETE SET NULL
        ON UPDATE CASCADE
);

-- Tabela de notícias
CREATE TABLE noticias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    conteudo TEXT NOT NULL,
    autor_id INT,
    imagem VARCHAR(255),
    link VARCHAR(255),
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    data_noticia TIMESTAMP,
    FOREIGN KEY (autor_id) REFERENCES usuarios(id)
        ON DELETE SET NULL
        ON UPDATE CASCADE
);

-- (Opcional) Tabela para múltiplas imagens por notícia
CREATE TABLE noticia_imagens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    noticia_id INT,
    caminho_imagem VARCHAR(255),
    FOREIGN KEY (noticia_id) REFERENCES noticias(id)
        ON DELETE CASCADE
);

-- Tabela de parcerias
CREATE TABLE parcerias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome_parceria VARCHAR(255) NOT NULL,
    descricao TEXT,
    imagem VARCHAR(255),
    link VARCHAR(255),
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabela de conteúdo das páginas
CREATE TABLE conteudo_paginas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    conteudo TEXT NOT NULL,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabela de relatório
CREATE TABLE relatorio (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tabela_afetada VARCHAR(100) NOT NULL,
    id_registro_afetado INT NOT NULL,
    tipo_acao ENUM('Insercao', 'Exclusao') NOT NULL,
    data_ocorrencia TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de equipe
CREATE TABLE equipe (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    tipo_integrante VARCHAR(255) NOT NULL,
    curso VARCHAR(255) NOT NULL,
    linha_pesquisa VARCHAR(255) NOT NULL,
    titulacao_maxima VARCHAR(100),
    data_inclusao DATE
);

-- Tabela de projetos
CREATE TABLE projetos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    conteudo TEXT NOT NULL,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
-- Tabela de usuários
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    role ENUM('admin', 'user') DEFAULT 'user',
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de publicações
CREATE TABLE publicacoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    conteudo TEXT NOT NULL,
    autor_id INT,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    link VARCHAR(255) NOT NULL,
    ano VARCHAR(50) NOT NULL,
    FOREIGN KEY (autor_id) REFERENCES usuarios(id) 
        ON DELETE SET NULL
        ON UPDATE CASCADE
);

-- Tabela de notícias
CREATE TABLE noticias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    conteudo TEXT NOT NULL,
    autor_id INT,
    imagem VARCHAR(255),
    link VARCHAR(255),
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    data_noticia TIMESTAMP,
    FOREIGN KEY (autor_id) REFERENCES usuarios(id)
        ON DELETE SET NULL
        ON UPDATE CASCADE
);

-- (Opcional) Tabela para múltiplas imagens por notícia
CREATE TABLE noticia_imagens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    noticia_id INT,
    caminho_imagem VARCHAR(255),
    FOREIGN KEY (noticia_id) REFERENCES noticias(id)
        ON DELETE CASCADE
);

-- Tabela de parcerias
CREATE TABLE parcerias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome_parceria VARCHAR(255) NOT NULL,
    descricao TEXT,
    imagem VARCHAR(255),
    link VARCHAR(255),
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabela de conteúdo das páginas
CREATE TABLE conteudo_paginas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    conteudo TEXT NOT NULL,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabela de relatório
CREATE TABLE relatorio (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tabela_afetada VARCHAR(100) NOT NULL,
    id_registro_afetado INT NOT NULL,
    tipo_acao ENUM('Insercao', 'Exclusao') NOT NULL,
    data_ocorrencia TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de equipe
CREATE TABLE equipe (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    tipo_integrante VARCHAR(255) NOT NULL,
    curso VARCHAR(255) NOT NULL,
    linha_pesquisa VARCHAR(255) NOT NULL,
    titulacao_maxima VARCHAR(100),
    data_inclusao DATE
);

-- Tabela de projetos
CREATE TABLE projetos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    conteudo TEXT NOT NULL,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
