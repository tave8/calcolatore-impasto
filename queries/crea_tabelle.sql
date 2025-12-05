-- table account
CREATE TABLE account (
    id INT AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    cognome VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    PRIMARY KEY(id), 
    UNIQUE(email)
);


-- table opzioni_ingredienti
CREATE TABLE opzioni_ingredienti (
    nome VARCHAR(50) NOT NULL,
    PRIMARY KEY(nome)
);


-- table opzioni_categorie_ricette
CREATE TABLE opzioni_categorie_ricette (
    nome VARCHAR(50) NOT NULL,
    PRIMARY KEY(nome)
);

-- table ricette
CREATE TABLE ricette (
    id INT AUTO_INCREMENT,
    id_account INT NOT NULL,
    categoria VARCHAR(50) NOT NULL,
    nome VARCHAR(50) NOT NULL,
    descrizione TEXT NOT NULL DEFAULT '',
    PRIMARY KEY(id),
    FOREIGN KEY(id_account) REFERENCES account(id),
    FOREIGN KEY(categoria) REFERENCES opzioni_categorie_ricette(nome)
);


-- table ricette
CREATE TABLE ricette_ingredienti (
    id_ricetta INT NOT NULL,
    ingrediente VARCHAR(50) NOT NULL,
    -- numbers from 0 to 1, with 4 decimals, example: 0.5375
    proporzione DECIMAL(5,4) NOT NULL,
    -- significato chiave primaria: una ricetta può avere più ingredienti. un ingrediente può essere contenuto in più ricette.
    PRIMARY KEY(id_ricetta, ingrediente),
    FOREIGN KEY(id_ricetta) REFERENCES ricette(id),
    FOREIGN KEY(ingrediente) REFERENCES opzioni_ingredienti(nome)
);
