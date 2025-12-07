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
function calcolaProporzioni(ingredienti, ricetta="[non specificato]") {
  const ret = {
    ricetta: ricetta,
    request: "Ho la ricetta, voglio le proporzioni degli ingredienti",
    items: [],
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
    // delete nuovoIngrediente.quantita;
    // arrotondamenti e non
    const proporzioneArrotondata = arrotondaProporzione(proporzione)
    nuovoIngrediente["proporzione"] = proporzione;
    nuovoIngrediente["proporzioneArrotondata"] = proporzioneArrotondata;
    nuovoIngrediente["percentuale"] = proporzione * 100;
    nuovoIngrediente["percentualeArrotondata"] = arrotondaPercentuale(proporzione * 100);

    // infine, aggiungi una nuova proprietà, per mantenere la compatibilità 
    nuovoIngrediente["quantitaArrotondata"] = arrotondaQuantita(ingrediente.quantita);

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
      quantita: quantitaNota,
    },
    ricetta: proporzioni.ricetta
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
    // arrotondamenti e non
    const quantitaArrotondata = arrotondaQuantita(quantita);
    nuovoIngrediente["quantita"] = quantita;
    nuovoIngrediente["quantitaArrotondata"] = quantitaArrotondata;
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
      quantita: quantitaTot,
    },
    ricetta: proporzioni.ricetta
  };
  // console.log(quantitaTot, proporzioni)
  for (ingrediente of proporzioni.items) {
    const nuovoIngrediente = Object.assign({}, ingrediente);
    // la quantità dell'ingrediente si ottiene moltiplicando
    // la quantità totale (che è nota) con la proporzione
    // del singolo elemento
    const quantita = quantitaTot * ingrediente.proporzione;
    // console.log(quantita)
    // arrotondamenti e non
    const quantitaArrotondata = arrotonda(quantita);
    nuovoIngrediente["quantita"] = quantita;
    nuovoIngrediente["quantitaArrotondata"] = quantitaArrotondata;
    ret.items.push(nuovoIngrediente);
  }
  return ret;
}

/**
 * L'utente vuole esempi. Parti da una ricetta default,
 * e crea un testo, una storia pratica, qualcosa di narrativo,
 * con la quale l'utente possa immediatamente capire
 * come funziona il sistema.
 */

function generaStoriaEsempio() {
  // *** INPUT 
  // questi sono gli input

  const nomeRicetta = "Pizza di Fatima"

  const ricetta = [
    { ingrediente: "farina v300", quantita: 430 },
    { ingrediente: "farina semola", quantita: 20 },
    { ingrediente: "acqua", quantita: 315 },
    { ingrediente: "olio", quantita: 15 },
    { ingrediente: "sale", quantita: 15 },
    { ingrediente: "malto", quantita: 6 },
    { ingrediente: "zucchero", quantita: 6 },
    { ingrediente: "lievito birra", quantita: 1 },
  ];

  // l'oggetto proporzioni
  const proporzioni = calcolaProporzioni(ricetta, nomeRicetta);

  // da ingrediente
  const ingredienteNoto = "farina v300"
  const quantitaIngredienteNoto = 660
  const proporzioniDaIngrediente = calcolaDaIngrediente({
    ingrediente: ingredienteNoto,
    quantita: quantitaIngredienteNoto,
    proporzioni: proporzioni,
  });

  // da totale
  const quantitaTot = 1000 //calcolaTotDaUnita(8, 350);
  const quantitaDaTotaleImpasto = calcolaDaTot(quantitaTot, proporzioni);

  // *** GENERA PEZZI DI STORIA
  const storiaIngredienti = generaStoriaIngredienti(ricetta)
  // console.log(storiaIngredienti)
  
  const storiaDaIngrediente = generaStoriaDaIngrediente(proporzioniDaIngrediente)
  const storiaDaTot = generaStoriaDaTot(quantitaDaTotaleImpasto)
  const storiaPercentuali = generaStoriaPercentuali(proporzioni)

  // console.log(storiaDaTot)

  // *** STORIA/NARRAZIONE
  // ora si scrive la storia

  let storia = `
    Ciao e benvenut@ nel Calcolatore di Impasto!

    La ricetta ${nomeRicetta} è così fatta: ${storiaIngredienti}
    
    Se ho ${quantitaIngredienteNoto}g di ${ingredienteNoto}, allora mi serviranno: ${storiaDaIngrediente}

    Se ho ${quantitaTot}g di impasto, allora mi serviranno: ${storiaDaTot}

    Ecco le percentuali degli ingredienti in ${nomeRicetta}: ${storiaPercentuali}
  `

  // console.log(storia)


  // console.log(proporzioni);
  // console.log(proporzioniDaIngrediente);
  // console.log(quantitaDaTotaleImpasto);
  return storia
}


/**
 * ## Voglio la storia di quello che mi serve a partire da un ingrediente e la sua quantità.
 */
function generaStoriaDaIngrediente(proporzioni) {
  let ret = ""
  for(proporzione of proporzioni.items) {
    ret += `
    ${proporzione.quantitaArrotondata}g di ${proporzione.ingrediente}
    `
  }
  return ret
}

/**
 * ## Voglio la storia di quello che mi serve a partire da un totale impasto.
 */
function generaStoriaDaTot(proporzioni) {
  let ret = ""
  for(proporzione of proporzioni.items) {
    ret += `
    ${proporzione.quantitaArrotondata}g di ${proporzione.ingrediente}
    `
  }
  return ret
}


/**
 * ## Voglio la storia delle percentuali degli ingredienti.
 */
function generaStoriaPercentuali(proporzioni) {
  let ret = ""
  for(proporzione of proporzioni.items) {
    ret += `
    ${proporzione.percentualeArrotondata}% di ${proporzione.ingrediente}
    `
  }
  return ret
}

/**
 * ## Voglio la storia degli ingredienti.
 *
 */
function generaStoriaIngredienti(ricetta) {
  let ret = ""
  for(ingrediente of ricetta) {
    ret += `
    ${ingrediente.quantita}g di ${ingrediente.ingrediente}
    `
  }
  return ret
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
  let ret = 0;
  for (ingrediente of ingredienti) {
    ret += ingrediente.quantita;
  }
  return ret;
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

function arrotonda(x, nDigits) {
  return parseFloat(x.toFixed(nDigits));
}

function arrotondaPercentuale(x, nDigits=2) {
  return arrotonda(x, nDigits)
}

function arrotondaQuantita(x, nDigits=2) {
  return arrotonda(x, nDigits)
}

function arrotondaProporzione(x, nDigits=4) {
  return arrotonda(x, nDigits)
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
