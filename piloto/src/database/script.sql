SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema AcervoRct
-- -----------------------------------------------------
-- Acervos de recetas a serem publicados em forna de livros a serem vendidos no mecado.
-- 

-- -----------------------------------------------------
-- Schema AcervoRct
--
-- Acervos de recetas a serem publicados em forna de livros a serem vendidos no mecado.
-- 
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `AcervoRct` ;
USE `AcervoRct` ;

-- -----------------------------------------------------
-- Table `AcervoRct`.`Cargo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `AcervoRct`.`Cargo` (
  `idCargo` INT NOT NULL AUTO_INCREMENT COMMENT 'Atributo identificador do cargo.',
  `descricao` CHAR(15) NOT NULL COMMENT 'Descrição do cargo',
  `data_inicio` DATE NOT NULL COMMENT 'Data do início do cargo',
  `data_fim` DATE NULL COMMENT 'Data do fim do cargo',
  `ind_ativo` CHAR(10) NOT NULL COMMENT 'Status do cargo.\n',
  PRIMARY KEY (`idCargo`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `AcervoRct`.`Funcionario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `AcervoRct`.`Funcionario` (
  `idFuncionario` INT NOT NULL AUTO_INCREMENT COMMENT 'Atributo identificador do funcionário\n\nex:\nID       Funcionário\n001     João\n002     Ana',
  `rg` INT NOT NULL COMMENT 'Contém o registro geral do funcionário (Número  da identidade)',
  `nome` VARCHAR(100) NOT NULL COMMENT 'Nome do funcionário.\n\nExemplo:\nNome\nJosé',
  `dt_admissao` DATE NOT NULL COMMENT 'Data em que o fucionário foi admitido\nex:\n13/08/2024',
  `salario` DECIMAL(9,2) NOT NULL COMMENT 'Contém o salário do funcionário',
  `nome_fantasia` VARCHAR(45) NULL COMMENT 'Contém um nome fantasia para o funcionário, não obrigatório',
  `foto_func` BLOB NULL COMMENT 'Atributo que vai armazenar a foto do funcionário',
  `Cargo_idCargo` INT NOT NULL COMMENT 'chave estrangeira não identificadora - Chave estrangeira do cargo ',
  PRIMARY KEY (`idFuncionario`),
  INDEX `fk_Funcionario_Cargo1_idx` (`Cargo_idCargo` ASC) VISIBLE,
  CONSTRAINT `fk_Funcionario_Cargo1`
    FOREIGN KEY (`Cargo_idCargo`)
    REFERENCES `AcervoRct`.`Cargo` (`idCargo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;




-- -----------------------------------------------------
-- Table `AcervoRct`.`Categoria`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `AcervoRct`.`Categoria` (
  `idCategoria` INT NOT NULL AUTO_INCREMENT COMMENT 'Identificador da categoria',
  `nome` VARCHAR(45) NOT NULL COMMENT 'Nome da categoria (ex: Sobremesa, Prato Principal)',
  PRIMARY KEY (`idCategoria`)
) ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `AcervoRct`.`Receita`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `AcervoRct`.`Receita` (
  `nome_rct` VARCHAR(50) NOT NULL COMMENT 'Nome da receita',
  `idReceita` INT NOT NULL AUTO_INCREMENT COMMENT 'Identificador único da receita',
  `dt_criacao` DATE NOT NULL COMMENT 'Data da criação da receita por um cozinheiro.',
  `cozinheiro` INT NOT NULL COMMENT 'ID do cozinheiro que publicou a receita',
  `preparo` VARCHAR(5000) NOT NULL COMMENT 'Modo de preparo',
  `quantidade_porcao` DECIMAL(3,1) NOT NULL COMMENT 'Quantidade de porções obtidas nesta receita',
  `ind_rec_inedita` CHAR(1) NOT NULL COMMENT 'Indicador de receita inédita',
  `FKcategoria` INT NOT NULL COMMENT 'Chave estrangeira da categoria da receita',
  PRIMARY KEY (`nome_rct`, `cozinheiro`),
  UNIQUE INDEX `idReceita_UNIQUE` (`idReceita` ASC),
  INDEX `fk_Receita_Funcionario_idx` (`cozinheiro` ASC),
  INDEX `fk_Receita_Categoria_idx` (`FKcategoria` ASC),
  CONSTRAINT `fk_Receita_Funcionario`
    FOREIGN KEY (`cozinheiro`)
    REFERENCES `AcervoRct`.`Funcionario` (`idFuncionario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Receita_Categoria`
    FOREIGN KEY (`FKcategoria`)
    REFERENCES `AcervoRct`.`Categoria` (`idCategoria`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `AcervoRct`.`Ingrediente`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `AcervoRct`.`Ingrediente` (
  `idIngrediente` INT NOT NULL AUTO_INCREMENT COMMENT 'Contém a identificação do ingrediente utilizado nas receitas\n',
  `nome` VARCHAR(45) NOT NULL COMMENT 'Nome do ingrediente utilizado nas receitas\n',
  `descricao` VARCHAR(1000) NULL COMMENT 'Desrição do ingrediente\n',
  PRIMARY KEY (`idIngrediente`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `AcervoRct`.`Medida`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `AcervoRct`.`Medida` (
  `idMedida` INT NOT NULL COMMENT 'Identificador da medida\n',
  `descricao` VARCHAR(45) NOT NULL COMMENT 'Descrição da medida\n',
  PRIMARY KEY (`idMedida`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `AcervoRct`.`Receita contem ingrediente`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `AcervoRct`.`Receita contem ingrediente` (
  `FKnome_rct` VARCHAR(50) NOT NULL COMMENT 'Identificador - Nome da receita',
  `FKcozinheiro` INT NOT NULL COMMENT 'Chave estrangeira identificadora - Identificador do cozinheiro',
  `FKidIngrediente` INT NOT NULL COMMENT 'Chave estrangeira identificadora - Identificador de ingrediente',
  `FKMedida` INT NOT NULL COMMENT 'Chave estrangeira não identificadora - Identificador da medida',
  `quant_ingrediente` DECIMAL(5,1) NOT NULL COMMENT 'Quantidade de ingredientes usados',
  PRIMARY KEY (`FKnome_rct`, `FKcozinheiro`, `FKidIngrediente`),
  INDEX `fk_Receita_has_Ingrediente_Ingrediente1_idx` (`FKidIngrediente` ASC),
  INDEX `fk_Receita_has_Ingrediente_Receita1_idx` (`FKnome_rct` ASC, `FKcozinheiro` ASC),
  INDEX `fk_Receita_has_Ingrediente_Medida1_idx` (`FKMedida` ASC),
  CONSTRAINT `fk_Receita_has_Ingrediente_Receita1`
    FOREIGN KEY (`FKnome_rct`, `FKcozinheiro`)
    REFERENCES `AcervoRct`.`Receita` (`nome_rct`, `cozinheiro`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Receita_has_Ingrediente_Ingrediente1`
    FOREIGN KEY (`FKidIngrediente`)
    REFERENCES `AcervoRct`.`Ingrediente` (`idIngrediente`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Receita_has_Ingrediente_Medida1`
    FOREIGN KEY (`FKMedida`)
    REFERENCES `AcervoRct`.`Medida` (`idMedida`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB;



-- -----------------------------------------------------
-- Table `AcervoRct`.`Restaurante`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `AcervoRct`.`Restaurante` (
  `idRestaurante` SMALLINT NOT NULL COMMENT 'Identificador do restaurante\n',
  `nome` VARCHAR(45) NOT NULL COMMENT 'Nome do restaurante',
  `contato` VARCHAR(45) NOT NULL COMMENT 'Contato do restaurante',
  `telefone` CHAR(15) NOT NULL COMMENT 'Telefone de contato do restaurante referência',
  PRIMARY KEY (`idRestaurante`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `AcervoRct`.`Referencia`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `AcervoRct`.`Referencia` (
  `FKfuncionario` INT NOT NULL COMMENT 'Identificador estrangeiro do funcionário',
  `FKRestaurante` SMALLINT NOT NULL COMMENT 'Chave estrangeira do restaurante\n',
  `data_inicio` DATE NOT NULL COMMENT 'Data de início do contrato do funcionário',
  `data_fim` DATE NULL COMMENT 'Data do fim do contrato do funcionário',
  PRIMARY KEY (`FKfuncionario`, `FKRestaurante`),
  INDEX `fk_Funcionario_has_Restaurante_Restaurante1_idx` (`FKRestaurante` ASC) VISIBLE,
  INDEX `fk_Funcionario_has_Restaurante_Funcionario1_idx` (`FKfuncionario` ASC) VISIBLE,
  CONSTRAINT `fk_Funcionario_has_Restaurante_Funcionario1`
    FOREIGN KEY (`FKfuncionario`)
    REFERENCES `AcervoRct`.`Funcionario` (`idFuncionario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Funcionario_has_Restaurante_Restaurante1`
    FOREIGN KEY (`FKRestaurante`)
    REFERENCES `AcervoRct`.`Restaurante` (`idRestaurante`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `AcervoRct`.`Parametro`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `AcervoRct`.`Parametro` (
  `idMes` SMALLINT NOT NULL COMMENT 'Contêm o mês de referência ',
  `idAno` SMALLINT NOT NULL COMMENT 'Ano de referência',
  `quant_rec_meta` SMALLINT NOT NULL COMMENT 'Metas de receitas de cada cozinheiro a serem atingidas\n\n\nQuantidade\n   1\n   2\n   3\n   4',
  PRIMARY KEY (`idMes`, `idAno`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `AcervoRct`.`Degustacao`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `AcervoRct`.`Degustacao` (
  `idDegustacao` INT NOT NULL AUTO_INCREMENT COMMENT 'Contém a identificação única da degustação.\n\n',
  `nota_degustacao` DECIMAL(3,1) NOT NULL COMMENT 'Contém a nota da degustação.\n',
  `data_degustacao` DATE NOT NULL COMMENT 'Data da degustação\n\n\n',
  `FKnome_rct` VARCHAR(50) NOT NULL COMMENT 'Chave estrangeira da receita',
  `FKcozinheiro` INT NOT NULL COMMENT 'Chave estrangeira do cozinheiro',
  `FKdegustador` INT NOT NULL COMMENT 'Chave estrangeira do degustador',
  PRIMARY KEY (`idDegustacao`),
  INDEX `fk_Degustacao_Receita1_idx` (`FKnome_rct` ASC, `FKcozinheiro` ASC) VISIBLE,
  INDEX `fk_Degustacao_Funcionario1_idx` (`FKdegustador` ASC) VISIBLE,
  CONSTRAINT `fk_Degustacao_Receita1`
    FOREIGN KEY (`FKnome_rct` , `FKcozinheiro`)
    REFERENCES `AcervoRct`.`Receita` (`nome_rct` , `cozinheiro`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Degustacao_Funcionario1`
    FOREIGN KEY (`FKdegustador`)
    REFERENCES `AcervoRct`.`Funcionario` (`idFuncionario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `AcervoRct`.`Foto_Receita`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `AcervoRct`.`Foto_Receita` (
  `idFoto_Receita` INT NOT NULL AUTO_INCREMENT COMMENT 'Contém o identificador da foto da receita.\n\nEx;\nidFoto\n 00001',
  `FKnome_rct` VARCHAR(50) NOT NULL COMMENT 'Chave estrangeira do nome da receita',
  `FKcozinheiro` INT NOT NULL COMMENT 'Chave estrangeira do cozinheiro',
  `foto` BLOB NOT NULL COMMENT 'Foto da receita',
  `descricao` VARCHAR(45) NOT NULL COMMENT 'Título da receita',
  PRIMARY KEY (`idFoto_Receita`),
  INDEX `fk_Foto_Receita_Receita1_idx` (`FKnome_rct` ASC, `FKcozinheiro` ASC) VISIBLE,
  CONSTRAINT `fk_Foto_Receita_Receita1`
    FOREIGN KEY (`FKnome_rct` , `FKcozinheiro`)
    REFERENCES `AcervoRct`.`Receita` (`nome_rct` , `cozinheiro`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `AcervoRct`.`Livro`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `AcervoRct`.`Livro` (
  `idLivro` SMALLINT NOT NULL COMMENT ' Indentificador do livro\n\n',
  `FKeditor` INT NOT NULL COMMENT 'Chave estrangeira não identificadora - Funcionário',
  `titulo` VARCHAR(45) NOT NULL COMMENT 'Título do livro\n\n',
  `isbn` CHAR(20) NULL COMMENT 'Identificação do autor, (Cód 13 Dígitos) título, país, editora e a edição da obra\n\n\n',
  PRIMARY KEY (`idLivro`),
  UNIQUE INDEX `titulo_UNIQUE` (`titulo` ASC) VISIBLE,
  INDEX `fk_Livro_Funcionario1_idx` (`FKeditor` ASC) VISIBLE,
  CONSTRAINT `fk_Livro_Funcionario1`
    FOREIGN KEY (`FKeditor`)
    REFERENCES `AcervoRct`.`Funcionario` (`idFuncionario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `AcervoRct`.`Publicacao`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `AcervoRct`.`Publicacao` (
  `FKLivro` SMALLINT NOT NULL COMMENT 'Chave estrangeira identificadora - livro',
  `FKnome_rct` VARCHAR(50) NOT NULL COMMENT 'Chave estrangeira identificadora - Nome da receita',
  `FKcozinheiro` INT NOT NULL COMMENT 'Chave estrangeira identificadora - cozinheiro',
  PRIMARY KEY (`FKLivro`, `FKnome_rct`, `FKcozinheiro`),
  INDEX `fk_Livro_has_Receita_Receita1_idx` (`FKnome_rct` ASC, `FKcozinheiro` ASC) VISIBLE,
  INDEX `fk_Livro_has_Receita_Livro1_idx` (`FKLivro` ASC) VISIBLE,
  CONSTRAINT `fk_Livro_has_Receita_Livro1`
    FOREIGN KEY (`FKLivro`)
    REFERENCES `AcervoRct`.`Livro` (`idLivro`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Livro_has_Receita_Receita1`
    FOREIGN KEY (`FKnome_rct` , `FKcozinheiro`)
    REFERENCES `AcervoRct`.`Receita` (`nome_rct` , `cozinheiro`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `AcervoRct`.`Usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `AcervoRct`.`Usuarios` (
  `idUsuarios` INT NOT NULL AUTO_INCREMENT COMMENT 'Neste campo contém o atributo identificador do usuário\n\n',
  `email` VARCHAR(60) NOT NULL COMMENT 'Email do Funcionário\n\nexemplo123@gmail.com',
  `senha` VARCHAR(256) NOT NULL COMMENT 'Atributo que vai guardar a senha do usuário',
  `FKfuncionario` INT NOT NULL COMMENT 'Chave estrangeira identificadora - Funcionário',
  PRIMARY KEY (`idUsuarios`, `FKfuncionario`),
  INDEX `fk_Usuarios_Funcionario1_idx` (`FKfuncionario` ASC) VISIBLE,
  CONSTRAINT `fk_Usuarios_Funcionario1`
    FOREIGN KEY (`FKfuncionario`)
    REFERENCES `AcervoRct`.`Funcionario` (`idFuncionario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;


/*Inserts
INSERT INTO Cargo (
  idCargo,
  descricao,
  data_inicio,
  data_fim,
  ind_ativo
)
VALUES (
  1,
  'Analista',
  '2024-01-01',
  NULL,       -- Cargo ainda ativo, sem data de fim
  'ativo'
);


INSERT INTO Funcionario (
  rg,
  nome,
  dt_admissao,
  salario,
  nome_fantasia,
  foto_func,
  Cargo_idCargo
)
VALUES (
  123456789,
  'José da Silva',
  '2024-08-13',
  3500.00,
  'Zé',
  NULL,  -- ou pode usar LOAD_FILE se for inserir imagem
  1
);


INSERT INTO Usuarios (email, senha, FKfuncionario)
VALUES ('exemplo123@gmail.com', 'senha_aqui', 1);


//ALTERAR NO BANCO DEPOIS 
ALTER TABLE usuarios
DROP FOREIGN KEY fk_Usuarios_Funcionario1;

ALTER TABLE usuarios
ADD CONSTRAINT fk_Usuarios_Funcionario1
FOREIGN KEY (FKfuncionario)
REFERENCES funcionario(idFuncionario)
ON DELETE CASCADE;


 */