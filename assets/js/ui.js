/**
 * 
 * 
 * SCHEMA CONCRETO

 * {
 *    nomeRicetta: str
 *    ingredienti: [
 *       {
 *          id: str
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

// i diversi counter che possono anche fungere da id per l'UI
const counter = {};

window.addEventListener("load", () => {
  aggiungiIngrediente();
});

// appena la pagina è caricata, aggiungi una riga

function aggiornaIngredienti(ingredienti, ricetta) {}

function ottieniRigaIngredienteUI(idIngrediente) {
  //   const htmlTable = document.getElementById("table-ricetta");
  //   const htmlBody = htmlTable.querySelectorAll("tbody")[0];
  //   console.log(htmlTable)
  //   console.log(htmlBody)
  return `
    <tr id="${idIngrediente.idRigaUI}">
        <td><input type="text" onkeyup="" id="${idIngrediente.idNome}" /></td>
        <td><input type="number" onkeyup="" value="1" min="1" id="${idIngrediente.idQuantita}" /></td>
        <td><button onclick="rimuoviIngrediente('${idIngrediente.id}')">Rimuovi</button></td>
    </tr>
  `;
}

// AGGIUNGI INGREDIENTE

function aggiungiIngrediente() {
  const idIngrediente = generaIdIngrediente();
  aggiungiIngredienteInUI(idIngrediente);
  //   aggiungiIngredienteInDato();

  //   console.log(htmlTable)
  //   console.log(htmlBody)
}

function aggiungiIngredienteInUI(idIngrediente) {
  const rigaIngrediente = ottieniRigaIngredienteUI(idIngrediente);
  ottieniTabellaHtml().body.innerHTML += rigaIngrediente;
}

function aggiungiIngredienteInDato() {}

// RIMUOVI INGREDIENTE

function rimuoviIngrediente(idIngrediente) {
  rimuoviIngredienteInUI(idIngrediente);
  rimuoviIngredienteInDato(idIngrediente);
}

function rimuoviIngredienteInUI(idIngrediente) {
  const rigaIngrediente = ottieniIdRigaUIIngrediente(idIngrediente);
  document.getElementById(rigaIngrediente).remove();
}

function rimuoviIngredienteInDato(idIngrediente) {
  for (let i = 0; i < ricettaUtente.ingredienti.length; i++) {
    const ingrediente = ricettaUtente.ingredienti[i];
    if (ingrediente.id == idIngrediente.id) {
      ricettaUtente.ingredienti.splice(i, 1);
    }
  }
}

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

// HELPER

function ottieniTabellaHtml() {
  const htmlTable = document.getElementById("table-ricetta");
  const htmlTableBody = htmlTable.querySelectorAll("tbody")[0];
  return {
    table: htmlTable,
    body: htmlTableBody,
  };
}

function generaNumeroRandom(limit = 10000000) {
  return Math.floor(Math.random() * limit);
}

function ottieniIdIngredienteNome(id) {
  return `ingrediente-nome-${id}`;
}

function ottieniIdIngredienteQuantita(id) {
  return `ingrediente-quantita-${id}`;
}

function ottieniIdRigaUIIngrediente(id) {
  return `riga-ingrediente-${id}`;
}

function generaIdIngrediente() {
  const id = `${generaNumeroRandom()}`;
  const idNome = ottieniIdIngredienteNome(id);
  const idQuantita = ottieniIdIngredienteQuantita(id);
  const idRigaUI = ottieniIdRigaUIIngrediente(id);
  return {
    id,
    idNome,
    idQuantita,
    idRigaUI,
  };
}
