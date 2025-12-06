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

// appena la pagina è caricata, aggiungi una riga
window.addEventListener("load", () => {
  aggiungiIngrediente();
});

function aggiornaIngredienteNome(id) {
  const ingrediente = trovaIngredienteComeDato(id);
  const htmlInput = ottieniInputHtmlIngredienteNome(id);
  const nomeIngrediente = htmlInput.value;
  //   aggiorna il nome ingrediente sull'oggetto reale/dato reale
  ingrediente.nome = nomeIngrediente;

  //   console.log(nomeIngrediente)

  // ingrediente.nome =
}

function generaRigaIngredienteUI(idIngrediente) {
  return `
    <tr id="${idIngrediente.idRigaUI}">
        <td><input type="text" onkeyup="aggiornaIngredienteNome('${idIngrediente.id}')" id="${idIngrediente.idNome}" /></td>
        <td><input type="number" onkeyup="" value="1" min="1" id="${idIngrediente.idQuantita}" /></td>
        <td><button onclick="rimuoviIngrediente('${idIngrediente.id}')">Rimuovi</button></td>
    </tr>
  `;
}

// AGGIUNGI INGREDIENTE

function aggiungiIngrediente() {
  const idIngrediente = generaIdIngrediente();
  aggiungiIngredienteInUI(idIngrediente);
  aggiungiIngredienteInDato(idIngrediente);

  //   console.log(htmlTable)
  //   console.log(htmlBody)
}

function aggiungiIngredienteInUI(idIngrediente) {
  const rigaIngrediente = generaRigaIngredienteUI(idIngrediente);
  ottieniTabellaHtml().body.innerHTML += rigaIngrediente;
}

function aggiungiIngredienteInDato(idIngrediente) {
  const ingrediente = generaIngredienteComeDato(idIngrediente);
  ricettaUtente.ingredienti.push(ingrediente);
}

function generaIngredienteComeDato(idIngrediente) {
  return {
    id: `${idIngrediente.id}`,
    nome: "[ingrediente senza nome]",
    quantita: 1,
  };
}

// RIMUOVI INGREDIENTE

function rimuoviIngrediente(id) {
  rimuoviIngredienteInUI(id);
  rimuoviIngredienteInDato(id);
}

function rimuoviIngredienteInUI(id) {
  const rigaIngrediente = ottieniIdRigaUIIngrediente(id);
  document.getElementById(rigaIngrediente).remove();
}

function rimuoviIngredienteInDato(id) {
  for (let i = 0; i < ricettaUtente.ingredienti.length; i++) {
    const ingrediente = ricettaUtente.ingredienti[i];
    if (ingrediente.id == id) {
      ricettaUtente.ingredienti.splice(i, 1);
    }
  }
}

// TROVA INGREDIENTE

/**
 * Itera per ogni ingrediente, e ritorna il riferimeento all'oggetto rappresentato
 * dall'ingrediente.
 */
function trovaIngredienteComeDato(id) {
  for (ingrediente of ricettaUtente.ingredienti) {
    if (ingrediente.id == id) {
      return ingrediente;
    }
  }
  throw Error(`Non è stato trovato nessun ingrediente con id '${id}'`);
}

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

function ottieniInputHtmlIngredienteNome(id) {
  return document.getElementById(ottieniIdIngredienteNome(id));
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
