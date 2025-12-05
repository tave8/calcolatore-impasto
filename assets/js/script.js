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


function calcolaProporzioniPane(ingredienti) {
   const ret = {}
   let quantitaTot = 0
//    calcola la somma delle quantità degli ingredienti
  for(nomeIngrediente in ingredienti) {
     quantitaTot +=  ingredienti[nomeIngrediente].quantita
  }   
  // salva la proporzione che quell'ingrediente rappresenta nel totale delle quantità
  // degli ingredienti, in una scala da 0 a 1 
  
   for(nomeIngrediente in ingredienti) {
     ret[nomeIngrediente] = ingredienti[nomeIngrediente]
     const quantita = ingredienti[nomeIngrediente].quantita
     delete ret[nomeIngrediente].quantita
     const proporzione = quantita / quantitaTot
//      arrotonda la proporzione a n cifre significative
     const proporzioneSignificativa = parseFloat(proporzione.toFixed(3))
     ret[nomeIngrediente]["proporzione1"] = proporzioneSignificativa
//      ret[nomeIngrediente]["proporzione100"] = proporzioneSignificativa * 100
     
  }   
   
   return ret
}



function calcolaProporzioniPaneDaIngrediente(opzioni) {
  const ret = {}
  const {nomeIngrediente: nomeIngredienteNoto, 
         quantita: quantitaNota, 
         proporzioni} = opzioni
  //   trova proporzione dell'ingrediente noto, dalle proporzioni personalizzate
  const proporzioneNota = proporzioni[nomeIngredienteNoto].proporzione1
  const proporzioneNotaRimanente = 1 - proporzioneNota
  const quantitaRimanente = (quantitaNota * proporzioneNotaRimanente) / proporzioneNota
   const quantitaTot = quantitaNota + quantitaRimanente
//    console.log(quantitaTot)
   
   for(ingrediente in proporzioni) {
     const proporzione = proporzioni[ingrediente].proporzione1
     ret[ingrediente] = proporzioni[ingrediente]
//      console.log(quantitaTot, proporzione)
     const quantitaCalcolata =  quantitaTot * proporzione
     const quantitaCalcolataArrotondata = parseFloat(quantitaCalcolata.toFixed(2))
     ret[ingrediente]["quantitaCalcolata"] = quantitaCalcolataArrotondata
   }
  
  return ret
}



function calcolaIngredientiDaTotImpasto(totImpasto, proporzioni) {
 const ret = {}
 for(ingrediente in proporzioni) {
   ret[ingrediente] = proporzioni[ingrediente]
   const proporzione = proporzioni[ingrediente].proporzione1
   const quantitaCalcolata = totImpasto * proporzione
   const quantitaCalcolataArrotondata = parseFloat(quantitaCalcolata.toFixed(2))
   ret[ingrediente]["quantitaCalcolata"] = quantitaCalcolataArrotondata
 }
 return ret
}




// problema: data le proporzioni personalizzate precedentemente definite, 
// dammi la quantità degli altri ingredienti, data la quantità di un 
// ingrediente noto
// ad esempio, su 300 g di farina, quanti grammi degli ingredienti 
// dovrò avere, in base alle proporzioni personalizzate già ricavate?



const proporzioni = calcolaProporzioniPane({
  lievitoMadre: {
    quantita: 160
  },
  farina: {
    quantita: 1000
  },
  acqua: {
    quantita: 750
  },
  sale: {
    quantita: 20
  },
  malto: {
    quantita: 10
  }
})

const proporzioniDaIngrediente = calcolaProporzioniPaneDaIngrediente({
  nomeIngrediente: "malto",
  quantita: 10,
  proporzioni: proporzioni
})


const quantitaDaTotaleImpasto = calcolaIngredientiDaTotImpasto(1164, proporzioni)


console.log(quantitaDaTotaleImpasto)

// console.log(proporzioni)
