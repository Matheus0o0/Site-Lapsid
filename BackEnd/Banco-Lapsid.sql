-- Tabela de usuários
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
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
    FOREIGN KEY (autor_id) REFERENCES usuarios(id) 
        ON DELETE SET NULL
        ON UPDATE CASCADE,
	link VARCHAR(255) NOT NULL,
    ano VARCHAR(50) NOT NULL
);

-- Tabela de notícias
CREATE TABLE noticias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    conteudo TEXT NOT NULL,
    autor_id INT,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (autor_id) REFERENCES usuarios(id)
        ON DELETE SET NULL
        ON UPDATE CASCADE,
	data_noticia TIMESTAMP
);

-- Tabela de parcerias
CREATE TABLE parcerias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome_parceria VARCHAR(255) NOT NULL,
    descricao TEXT,
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

CREATE TABLE equipe (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    tipo_integrante VARCHAR(255) NOT NULL,
    curso VARCHAR(255) NOT NULL,
    linha_pesquisa VARCHAR(255) NOT NULL
);

CREATE TABLE projetos (
	id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    conteudo TEXT NOT NULL,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


-- Triggers

DELIMITER $$

-- Trigger para registro de inserção em 'usuarios'
CREATE TRIGGER after_insert_usuario
AFTER INSERT ON usuarios
FOR EACH ROW
BEGIN
    INSERT INTO relatorio (tabela_afetada, id_registro_afetado, tipo_acao)
    VALUES ('usuarios', NEW.id, 'Insercao');
END$$

-- Trigger para registro de exclusão em 'usuarios'
CREATE TRIGGER after_delete_usuario
AFTER DELETE ON usuarios
FOR EACH ROW
BEGIN
    INSERT INTO relatorio (tabela_afetada, id_registro_afetado, tipo_acao)
    VALUES ('usuarios', OLD.id, 'Exclusao');
END$$

-- Trigger para registro de inserção em 'publicacoes'
CREATE TRIGGER after_insert_publicacao
AFTER INSERT ON publicacoes
FOR EACH ROW
BEGIN
    INSERT INTO relatorio (tabela_afetada, id_registro_afetado, tipo_acao)
    VALUES ('publicacoes', NEW.id, 'Insercao');
END$$

-- Trigger para registro de exclusão em 'publicacoes'
CREATE TRIGGER after_delete_publicacao
AFTER DELETE ON publicacoes
FOR EACH ROW
BEGIN
    INSERT INTO relatorio (tabela_afetada, id_registro_afetado, tipo_acao)
    VALUES ('publicacoes', OLD.id, 'Exclusao');
END$$

-- Trigger para registro de inserção em 'noticias'
CREATE TRIGGER after_insert_noticia
AFTER INSERT ON noticias
FOR EACH ROW
BEGIN
    INSERT INTO relatorio (tabela_afetada, id_registro_afetado, tipo_acao)
    VALUES ('noticias', NEW.id, 'Insercao');
END$$

-- Trigger para registro de exclusão em 'noticias'
CREATE TRIGGER after_delete_noticia
AFTER DELETE ON noticias
FOR EACH ROW
BEGIN
    INSERT INTO relatorio (tabela_afetada, id_registro_afetado, tipo_acao)
    VALUES ('noticias', OLD.id, 'Exclusao');
END$$

-- Trigger para registro de inserção em 'parcerias'
CREATE TRIGGER after_insert_parceria
AFTER INSERT ON parcerias
FOR EACH ROW
BEGIN
    INSERT INTO relatorio (tabela_afetada, id_registro_afetado, tipo_acao)
    VALUES ('parcerias', NEW.id, 'Insercao');
END$$

-- Trigger para registro de exclusão em 'parcerias'
CREATE TRIGGER after_delete_parceria
AFTER DELETE ON parcerias
FOR EACH ROW
BEGIN
    INSERT INTO relatorio (tabela_afetada, id_registro_afetado, tipo_acao)
    VALUES ('parcerias', OLD.id, 'Exclusao');
END$$

DELIMITER ;

-- Procedures

DELIMITER $$

CREATE PROCEDURE insere_usuario(
    IN nome_usuario VARCHAR(100), 
    IN email_usuario VARCHAR(100), 
    IN senha_usuario VARCHAR(255)
)
BEGIN
    INSERT INTO usuarios (nome, email, senha) 
    VALUES (nome_usuario, email_usuario, senha_usuario);
END$$

CREATE PROCEDURE insere_publicacao(
    IN titulo_publicacao VARCHAR(255), 
    IN conteudo_publicacao TEXT, 
    IN autor_id_publicacao INT
)
BEGIN
    INSERT INTO publicacoes (titulo, conteudo, autor_id) 
    VALUES (titulo_publicacao, conteudo_publicacao, autor_id_publicacao);
END$$

CREATE PROCEDURE insere_parceria(
    IN nome_parceria VARCHAR(255), 
    IN descricao_parceria TEXT
)
BEGIN
    INSERT INTO parcerias (nome, descricao) 
    VALUES (nome_parceria, descricao_parceria);
END$$

DELIMITER ;

-- Views

CREATE VIEW view_usuarios_publicacoes AS
SELECT 
    u.id AS usuario_id, 
    u.nome AS nome_usuario, 
    u.email, 
    p.id AS publicacao_id, 
    p.titulo AS titulo_publicacao, 
    p.conteudo AS conteudo_publicacao, 
    p.data_criacao AS data_criacao_publicacao
FROM 
    usuarios u
LEFT JOIN 
    publicacoes p ON u.id = p.autor_id;

CREATE VIEW view_usuarios_noticias AS
SELECT 
    u.id AS usuario_id, 
    u.nome AS nome_usuario, 
    u.email, 
    n.id AS noticia_id, 
    n.titulo AS titulo_noticia, 
    n.conteudo AS conteudo_noticia, 
    n.data_criacao AS data_criacao_noticia
FROM 
    usuarios u
LEFT JOIN 
    noticias n ON u.id = n.autor_id;

CREATE VIEW view_usuarios_parcerias AS
SELECT 
    u.id AS usuario_id, 
    u.nome AS nome_usuario, 
    u.email, 
    p.id AS parceria_id, 
    p.nome_parceria AS nome_parceria,  -- Corrigido para usar o nome correto da coluna
    p.descricao AS descricao_parceria, 
    p.data_criacao AS data_criacao_parceria
FROM 
    usuarios u
CROSS JOIN 
    parcerias p;

CREATE VIEW view_relatorio AS
SELECT 
    r.tabela_afetada, 
    r.id_registro_afetado, 
    r.tipo_acao, 
    r.data_ocorrencia
FROM 
    relatorio r;
