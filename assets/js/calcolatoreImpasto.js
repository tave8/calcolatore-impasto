// Algoritmo per calcolare proporzioni impasto/lievito e ingredienti

/**
 * ## Ho la ricetta, voglio le proporzioni degli ingredienti
 *
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
 * {
 *    request: str
 *    items: [
 *      {ingrediente: str, proporzione: float}
 *   ]
 * }
 *
 */
function calcolaProporzioni(ingredienti) {
  const ret = {
    request: "Ho la ricetta, voglio le proporzioni degli ingredienti",
    items: []
  };

  let quantitaTot = calcolaTotIngredienti(ingredienti);

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
    nuovoIngrediente["percentuale"] = proporzioneArrotondata * 100;
    ret.items.push(nuovoIngrediente);
  }

  return ret;
}

/**
 * ## Ho la quantità di un ingrediente, voglio le quantità degli altri ingredienti
 *
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
 * {
 *    request: str
 *    items: [
 *      {ingrediente: str, quantita: float, proporzione: float},
 *    ]
 * }
 *
 *
 */
function calcolaDaIngrediente({ ingrediente: ingredienteNoto, quantita: quantitaNota, proporzioni }) {
  const ret = {
    request: "Ho la quantità di un ingrediente, voglio le quantità degli altri ingredienti",
    items: [],
    input: {
      ingrediente: ingredienteNoto,
      quantita: quantitaNota
    }
  };
  //   trova proporzione dell'ingrediente noto, dalle proporzioni personalizzate
  const proporzioneNota = trovaProporzioneDiIngrediente(ingredienteNoto, proporzioni.items);
  // visto che il totale delle proporzioni sarà sempre 1, allora
  // la proporzione rimanente si ottiene sottraendo  1 - proporzioneNota
  const proporzioneNotaRimanente = 1 - proporzioneNota;
  // la quantita rimanente del totale
  // si basa sulla seguente proporzione
  // quantitaNota : quantitaRimanente = proporzioneNota : proporzioneNotaRimanente 
  // esempio:
  // 10 g di sale stanno alla quantità di impasto che rimane, come la proporzione del sale (nel totale impasto)
  // sta al totale delle proporzioni degli altri ingredienti
  const quantitaRimanente = (quantitaNota * proporzioneNotaRimanente) / proporzioneNota;
  // alla fine, dalla quantita nota di un ingrediente, e dalle proporzioni della ricetta,
  // si ricava la quantità totale di quell'impasto
  const quantitaTot = quantitaNota + quantitaRimanente;
  for (ingrediente of proporzioni.items) {
    const nuovoIngrediente = Object.assign({}, ingrediente);
    // moltiplicando la quantità totale con la proporzione del singolo ingrediente,
    // ricavo finalmente la quantità di ogni altro ingrediente, oltre all'ingrediente dato
    const quantita = quantitaTot * ingrediente.proporzione;
    const quantitaArrotondata = arrotonda(quantita);
    nuovoIngrediente["quantita"] = quantitaArrotondata;
    ret.items.push(nuovoIngrediente);
  }

  return ret;
}

/**
 * ## Ho il totale dell'impasto, voglio le quantità di ogni ingrediente
 *
 * Dato il totale dell'impasto e le proporzioni della ricetta,
 * ottieni la quantità di ogni ingrediente.
 *
 * INPUT
 *  quantitaTot: float
 *  proporzioni: [
 *      {ingrediente: str, proporzione: float}
 *  ]
 *
 * OUTPUT
 * 
 * {
 *    request: str
 *    items: [
 *      {ingrediente: str, quantita: float, proporzione: float},
 *    ]
 * }
 */
function calcolaDaTot(quantitaTot, proporzioni) {
  const ret = {
    request: "Ho il totale dell'impasto, voglio le quantità di ogni ingrediente",
    items: [],
    input: {
      quantita: quantitaTot
    }
  };
  // console.log(quantitaTot, proporzioni)
  for (ingrediente of proporzioni.items) {
    const nuovoIngrediente = Object.assign({}, ingrediente);
    // la quantità dell'ingrediente si ottiene moltiplicando
    // la quantità totale (che è nota) con la proporzione
    // del singolo elemento
    const quantita = quantitaTot * ingrediente.proporzione;
    // console.log(quantita)
    const quantitaArrotondata = arrotonda(quantita);
    nuovoIngrediente["quantita"] = quantitaArrotondata;
    ret.items.push(nuovoIngrediente);
  }
  return ret;
}

// HELPER

/**
 * ## Ho gli ingredienti, voglio il loro totale
 * 
 * INPUT
 * ingredienti:
 * [
 *   {ingrediente: str, quantita: float}
 * ]
 * 
 * OUTPUT
 * 
 */
function calcolaTotIngredienti(ingredienti) {
  let ret = 0
  for (ingrediente of ingredienti) {
    ret += ingrediente.quantita;
  }
  return ret
}

/**
 * Dato una lista di ingredienti con ognuno la sua proporzione,
 * trova la proporzione dell'ingrediente dato.
 */
function trovaProporzioneDiIngrediente(ingredienteNoto, proporzioni) {
  let ret = null;
  for (ingrediente of proporzioni) {
    // se trovo l'ingrediente che mi interessa
    if (ingrediente.ingrediente === ingredienteNoto) {
      return ingrediente.proporzione;
    }
  }
  if (ret === null) {
    throw Error("Non è stato trovato nessuna proporzione per l'ingrediente dato.");
  }
  return ret;
}

function arrotonda(x, nDigits = 8) {
  return parseFloat(x.toFixed(nDigits));
}


/**
 * ## Ho il numero di unità e quanto un unità pesa, voglio il totale 
 * 
 * Semplicemente fa la moltiplicazione tra il numero di unità
 * e la quantità di ciascuna unità. Ad esempio quando voglio calcolare
 * il totale di un impasto partendo dal numero di pizze che voglio fare.
 * numero pizze * impasto per panetto (g) = tot
 */
function calcolaTotDaUnita(nUnita, quantitaUnita) {
  return nUnita * quantitaUnita;
}
