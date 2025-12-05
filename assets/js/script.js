// Algoritmo per calcolare proporzioni impasto/lievito e ingredienti

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

/**
 * Data una ricetta dove conosci ogni ingrediente con le sue quantità,
 * ottieni le proporzioni di ogni ingrediente nella ricetta,
 * rappresentate in una scala da 0 a 1.
 *
 * INPUT
 * ingredienti:
 * [
 *   {ingrediente: str, quantita: float}
 * ]
 *
 * OUTPUT:
 * [
 *    {ingrediente: str, proporzione: float}
 * ]
 *
 */
function calcolaProporzioniIngredientiDaTotale(ingredienti) {
  const ret = [];
  let quantitaTot = 0;
  //    calcola la somma delle quantità degli ingredienti
  for (ingrediente of ingredienti) {
    quantitaTot += ingrediente.quantita;
  }
  // salva la proporzione che quell'ingrediente rappresenta nel totale delle quantità
  // degli ingredienti, in una scala da 0 a 1

  for (ingrediente of ingredienti) {
    // la proporzione del singolo ingrediente è data dalla sua quantita
    // rispetto alla quantità totale
    const proporzione = ingrediente.quantita / quantitaTot;
    // copia l'ingrediente
    const nuovoIngrediente = Object.assign({}, ingrediente);
    // rimuovi la quantita inizialmente fornita dall'utente
    delete nuovoIngrediente.quantita;
    //      arrotonda la proporzione a n cifre significative
    const proporzioneArrotondata = arrotonda(proporzione);
    nuovoIngrediente["proporzione"] = proporzioneArrotondata;
    ret.push(nuovoIngrediente);
  }

  return ret;
}

/**
 * Noto un ingrediente con la sua quantità, e note le proporzioni
 * degli ingredienti di una ricetta, ottieni le proporzioni degli altri ingredienti.
 *
 * INPUT
 * {
 *    ingrediente: str
 *    quantita: float
 *    proporzioni: [
 *        {ingrediente: str, proporzione: float}
 *    ]
 * }
 *
 * OUTPUT
 * [
 *    {ingrediente: str, quantita: float, proporzione: float},
 *    ...
 * ]
 *
 *
 */
function calcolaProporzioniDaIngrediente({ ingrediente: ingredienteNoto, quantita: quantitaNota, proporzioni }) {
  const ret = [];
  //   trova proporzione dell'ingrediente noto, dalle proporzioni personalizzate
  const proporzioneNota = trovaProporzioneDiIngrediente(ingredienteNoto, proporzioni);
  // visto che il totale delle proporzioni sarà sempre 1, allora
  // la proporzione rimanente si ottiene sottraendo  1 - proporzioneNota
  const proporzioneNotaRimanente = 1 - proporzioneNota;
  // la quantita rimanente del totale
  const quantitaRimanente = (quantitaNota * proporzioneNotaRimanente) / proporzioneNota;
  // alla fine, dalla quantita nota di un ingrediente, e dalle proporzioni della ricetta,
  // si ricava la quantità totale di quell'impasto
  const quantitaTot = quantitaNota + quantitaRimanente;

  for (ingrediente of proporzioni) {
    const nuovoIngrediente = Object.assign({}, ingrediente);
    // la quantità di ogni ingrediente
    const quantita = quantitaTot * ingrediente.proporzione;
    const quantitaArrotondata = arrotonda(quantita);
    nuovoIngrediente["quantita"] = quantitaArrotondata;
    ret.push(nuovoIngrediente);
  }

  return ret;
}

function calcolaIngredientiDaTotImpasto(totImpasto, proporzioni) {
  const ret = {};
  for (ingrediente in proporzioni) {
    ret[ingrediente] = proporzioni[ingrediente];
    const proporzione = proporzioni[ingrediente].proporzione1;
    const quantitaCalcolata = totImpasto * proporzione;
    const quantitaCalcolataArrotondata = parseFloat(quantitaCalcolata.toFixed(2));
    ret[ingrediente]["quantitaCalcolata"] = quantitaCalcolataArrotondata;
  }
  return ret;
}

/**
 * Dato una lista di ingredienti con ognuno la sua proporzione,
 * trova la proporzione dell'ingrediente dato.
 */
function trovaProporzioneDiIngrediente(ingredienteNoto, proporzioni) {
  let ret = null
  for(ingrediente of proporzioni) {
    // se trovo l'ingrediente che mi interessa
    if (ingrediente.ingrediente === ingredienteNoto) {
      return ingrediente.proporzione
    }
  }
  if (ret === null) {
    throw Error("Non è stato trovato nessuna proporzione per l'ingrediente dato.")
  }
  return ret
}

function arrotonda(x, nDigits = 8) {
  return parseFloat(x.toFixed(nDigits));
}

// problema: data le proporzioni personalizzate precedentemente definite,
// dammi la quantità degli altri ingredienti, data la quantità di un
// ingrediente noto
// ad esempio, su 300 g di farina, quanti grammi degli ingredienti
// dovrò avere, in base alle proporzioni personalizzate già ricavate?

const proporzioni = calcolaProporzioniIngredientiDaTotale([
  { ingrediente: "lievito madre", quantita: 160 },
  { ingrediente: "farina", quantita: 1000 },
  { ingrediente: "acqua", quantita: 750 },
  { ingrediente: "sale", quantita: 20 },
  { ingrediente: "malto", quantita: 10 },
]);

const proporzioniDaIngrediente = calcolaProporzioniDaIngrediente({
  ingrediente: "malto",
  quantita: 6,
  proporzioni: proporzioni,
});

// const quantitaDaTotaleImpasto = calcolaIngredientiDaTotImpasto(1164, proporzioni);

// console.log(quantitaDaTotaleImpasto);

// console.log(proporzioni);
console.log(proporzioniDaIngrediente)