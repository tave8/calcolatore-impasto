# Calcolatore d'impasto

Il Calcolatore d'Impasto permette di fari diversi calcoli con ricette, ingredienti e quantità.



## Casi d'uso

### Ho un ingrediente e la sua quantità. Calcola la quantità degli altri ingredienti

Voglio fare il pane, ma ho 400g di farina. Ho la ricetta.
Quanto degli ingredienti devo avere?


### Ho il totale dell'impasto. Calcola la quantità di ogni ingrediente

Voglio fare 10 pizze. Ho la ricetta della pizza.
Per fare 10 pizze ci vogliono X kg d'impasto.
Quanto di ogni ingrediente devo avere?
 

### Ho una ricetta. Calcola le percentuali di ogni ingrediente

Ho una ricetta. Quali sono le percentuali dei suoi ingredienti, da 0 a 100?


## Come usare l'app

1. Ho già salvato la ricetta nell'app? Se sì, vai avanti. Se no, aggiungi la ricetta

2. Scegli il caso d'uso

3. Scegli la ricetta su cui applicare



## Convenzioni & Assunzioni

### Le quantità sono in grammi

Qualsiasi quantità non specificata, verrà assunto che la sua unità di misura sono i grammi.

### Le proporzioni sono in base 0-1

Qualsiasi etichetta contentente un chiaro riferimento (anche parziale) al concetto di proporzione, indica una proporzione in base 1.
Si rifiutano quindi proporzioni, range o scale personalizzata o ambigue, come ad esempio: una scala da 0 a 1000, una scala da 0 a 10 e così via.
L'unica scala/proporzione valida è da 0 a 1. Qualsiasi altro valore di comodità dovra essere derivato. 

Questo è un dato irriducibile, e quindi va sempre incluso nel risultato, ove rilevante. 

Qualsiasi valore di comodità (ad esempio in base 100, quindi la percentuale) dovrà essere aggiunto come campo aggiuntivo nel risultato.

### Le proporzioni in base 0-1 esprimono il rapporto degli ingredienti sull'impasto

Ecco il problema: le quantità degli ingredienti di una ricetta possono spesso espresse con unità di misura diverse (ad esempio chilo o grammo).

Anche una volta uniformata l'unità di misura, ad esempio usando sempre il grammo, la domanda rimane: come stanno in proporzione le quantità di questi ingredienti tra di loro?

#### Esempio A 
Se in una ricetta ho:
- 1000g di farina
- 250g di acqua
- 10g di lievito

è facile calcolare quanta acqua e lievito mi servono, se ho 500g di farina. Infatti, basta dividere i rimanenti ingredienti per 2.

Quando uscirà:
- 500g di farina
- 125g di acqua
- 5g di lievito

Questo perché le cifre sono "pulite" e facilmente moltiplicabili/divisibili. Cosa succede invece quando le cifre cominciano ad essere più "sporchi"?

O quando ho solo un ingrediente, e voglio calcolare il resto degli ingredienti?

#### Esempio B

Facciamo che la mia ricetta funziona così: 
- 885g di farina
- 253g di acqua
- 6g di lievito

E ho 250g di farina con cui posso fare l'impasto. Domanda: Quanta farina e lievito mi servirà? 

#### Soluzione: proporzioni sull'impasto

è proprio da qui che nasce il bisogno di standardizzare il modo in cui vengono rappresentate le quantità degli ingredienti: non più grammi, non più chili, non più 885g di farina e 253g di acqua ecc. 

Invece, si fornisce al sistema la ricetta una sola volta, e il sistema calcolerà e salverà, una volta per tutte, le esatte proporzioni, sul totale dell'impasto, che compongono la tua ricetta. 

Il valore 1 significa il totale dell'impasto, e ogni ingrediente occuperà una "percentuale" di questo 1.

In questo modo potrà calcolare quantità personalizzate, e potrai anche derivare la quantità degli altri ingredienti, conoscendo un ingrediente.

Riferendoci all'Esempio A, la tua ricetta verrà internamente calcolata non come: 
- 1000g di farina
- 250g di acqua
- 10g di lievito

bensì come:
- 0.794 di farina
- 0.198 di acqua
- 0.008 di lievito

Il totale farà quindi sempre 1, visto che la base è 1.

che significa anche, per comodità:
- 79,4% di farina
- 19,8% di acqua
- 0,8% di lievito

Il totale farà quindi sempre 100, visto che la base è 100 (percentuale).

Visto che le proporzioni in una ricetta (o meglio, in una specifica versione di una ricetta) rimangono le stesse, questo vuol dire che questa ricetta:

- 1000g di farina
- 250g di acqua
- 10g di lievito

è equivalente a:

- 500g di farina
- 125g di acqua
- 5g di lievito

Diverse quantità, stesse proporzioni. 


### Arrotondamento

Bisogna essere consapoli di piccoli margini di errori nei numeri delle quantità, dovuti ad arrotondamenti.



## Osservazioni/Note


/**
In una normale proporzione, le seguenti specifiche vengono adottare, 
con l'unità di misura in grammi:

farina   1000
l.madre  160
acqua    750
sale     20
malto    10

Su una scala da 0 a 1, in quale percentuale sono costituiti
ogni ingrediente?

*/

// somma ingredienti: 1940
// farina su scala 0-1 = 1000/1940

// la somma degli ingredienti mi dà il valore 1
// (somma ingredienti):1 = ingrediente specifico: quantità in grammi

// per rappresentare ogni ingredienti in una scala da 0 a 1,
// bisogna fare:
// 1. calcolare la somma degli ingredienti in grammi
// 2. per quel ingrediente, fare l'operazione: (quantita in grammi ingrediente)/(somma ingredienti in grammi)


// problema: data le proporzioni personalizzate precedentemente definite,
// dammi la quantità degli altri ingredienti, data la quantità di un
// ingrediente noto
// ad esempio, su 300 g di farina, quanti grammi degli ingredienti
// dovrò avere, in base alle proporzioni personalizzate già ricavate?

