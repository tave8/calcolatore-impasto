/**
 * 
 * 
 * SCHEMA CONCRETO

 * {
 *    nomeRicetta: str
 *    ingredienti: [
 *       {
 *          nome: str
 *          quantita: float
 *          _ui: {
                nome: htmlEl
                quantita: htmlEl
 *          }
 *       },
 *       ...
 *    ]  
 * }
 * 
 * Nella proprietà _ui_input ci sono i campi UI da dove
 * i valori di quelle stesse proprietà verranno estratti.
 */
const ricettaUtente = {
  nome: null,
  ingredienti: [],
};

// const ricettaUI = {
//   tableRicetta: null,
//   tableRicettaRows: null,
// };

// appena la pagina è caricata, aggiungi una riga

function aggiornaIngredienti(ingredienti, ricetta) {}

// AGGIUNGI CAMPO INGREDIENTE UI

function aggiungiCampoIngredienteUI() {
  const htmlTable = document.getElementById("table-ricetta");
  const htmlBody = htmlTable.querySelectorAll("tbody")[0];
  //   console.log(htmlTable)
  //   console.log(htmlBody)
}

// AGGIUNGI INGREDIENTE

function aggiungiIngrediente() {}

function aggiungiIngredienteInUI() {}

function aggiungiIngredienteInDato() {}

// RIMUOVI INGREDIENTE

function rimuoviIngrediente() {}

// TROVA INGREDIENTE

function trovaIngrediente() {}

/**
 * Avvia l'esempio/la narrazione della ricetta nell'UI.
 */
function avviaEsempioUI() {
  const elementoTestoEsempio = document.getElementById("esempio-testo");
  // console.log(elementoTestoEsempio)
  const testo = generaStoriaEsempio();
  typeWrite(testo, elementoTestoEsempio);

  // elementoTestoEsempio.textContent = testo
}
