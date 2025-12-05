-- insert dummy data

-- ACCOUNT

INSERT INTO	
	account
(
    nome,
    cognome,
    email
)
VALUES
(
	'Giuseppe',
    'Tavella',
    LOWER('giuseppetavella8@gmail.com')
);

INSERT INTO	
	account
(
    nome,
    cognome,
    email
)
VALUES
(
	'Fatima',
    'Zaroual',
    LOWER('fatima.zaroual1983@gmail.com')
);


-- RICETTE


INSERT INTO
	ricette
(
	id_account,
    categoria,
    nome
)
VALUES 
(
    1,
    'lievitato',
    'Pane di Fatima'
);


-- RICETTE INGREDIENTI

INSERT INTO
	ricette_ingredienti
(
	id_ricetta,
    ingrediente,
    proporzione
)
VALUES 
(
    2,
    'acqua',
    0.387
),
(
    2,
    'farina',
    0.515
),
(
    2,
    'lievito madre',
    0.082
),
(
    2,
    'malto',
    0.005
),
(
    2,
    'sale',
    0.01
);

 

