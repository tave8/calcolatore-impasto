-- aggiungi una ricetta


INSERT INTO
	ricette
(
	id_account,
    categoria,
    nome
)
VALUES 
(
    :id_account,
    :categoria,
    :nome
);