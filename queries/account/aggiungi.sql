-- aggiungi un account

INSERT INTO	
	account
(
    nome,
    cognome,
    email
)
VALUES
(
	:nome,
    :cognome,
    LOWER(:email)
);