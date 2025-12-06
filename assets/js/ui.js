/**
 * 
 * 
 * SCHEMA CONCRETO

 * {
 *    nomeRicetta: str
 *    ingredienti: [
 *       {
 *          id: str
 *          ingrediente: str
 *          quantita: float
 *       },
 *       ...
 *    ]  
 * }
 * 
 */
const ricettaUtente = {
  nome: null,
  ingredienti: [],
};

// appena la pagina è caricata, aggiungi una riga
window.addEventListener("load", () => {
  aggiungiIngrediente();
});

function quandoCambiaIngredienteNome(id) {
  const nomeIngrediente = ottieniIngredienteNomeDaUI(id);
  aggiornaIngredienteNomeInDato(id, nomeIngrediente);
}

function quandoCambiaIngredienteQuantita(id) {
  const quantita = ottieniIngredienteQuantitaDaUI(id);
  aggiornaIngredienteQuantitaInDato(id, quantita);
  //   funzione (probabilmente presente nell'altro script) solo per fare i calcoli
  const proporzioni = calcolaProporzioni(ricettaUtente.ingredienti);
  
  console.log(proporzioni);
}

function aggiornaIngredienteNomeInDato(id, nomeIngrediente) {
  const ingrediente = trovaIngredienteComeDato(id);
  //   aggiorna il nome ingrediente sull'oggetto reale/dato reale
  ingrediente.ingrediente = nomeIngrediente;
}

function aggiornaIngredienteQuantitaInDato(id, quantita) {
  const ingrediente = trovaIngredienteComeDato(id);
  //   aggiorna il nome ingrediente sull'oggetto reale/dato reale
  ingrediente.quantita = quantita;
}

function generaRigaIngredienteUI(idIngrediente) {
  return `
    <tr id="${idIngrediente.idRigaUI}">
        <!-- nome ingrediente -->
        <td>
            <input type="text" onkeyup="quandoCambiaIngredienteNome('${idIngrediente.id}')" id="${idIngrediente.idNome}" />
        </td>

        <!-- quantità ingrediente -->
        <td>
            <input type="number" 
            onchange="quandoCambiaIngredienteQuantita('${idIngrediente.id}')"  
            onkeyup="quandoCambiaIngredienteQuantita('${idIngrediente.id}')" 
            value="1" min="1" 
            id="${idIngrediente.idQuantita}" />
        </td>
        <!-- azioni sull'ingrediente -->
        <td>
            <button onclick="rimuoviIngrediente('${idIngrediente.id}')">Rimuovi</button>
        </td>
    </tr>
  `;
}

// AGGIUNGI INGREDIENTE

function aggiungiIngrediente() {
  const idIngrediente = generaIdIngrediente();
  aggiungiIngredienteInUI(idIngrediente);
  aggiungiIngredienteInDato(idIngrediente);
}

function aggiungiIngredienteInUI(idIngrediente) {
  const rigaIngrediente = generaRigaIngredienteUI(idIngrediente);
  ottieniTabellaHtml().body.insertAdjacentHTML("beforeend", rigaIngrediente);
}

function aggiungiIngredienteInDato(idIngrediente) {
  const ingrediente = generaIngredienteComeDato(idIngrediente);
  ricettaUtente.ingredienti.push(ingrediente);
}

function generaIngredienteComeDato(idIngrediente) {
  return {
    id: `${idIngrediente.id}`,
    ingrediente: "[ingrediente senza nome]",
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

function ottieniIngredienteNomeDaUI(id) {
  return ottieniInputHtmlIngredienteNome(id).value;
}

/**
 * NOTA: viene assunto che il valore sia convertibile in float, quindi
 * rivedi questa assunzione TODO
 */
function ottieniIngredienteQuantitaDaUI(id) {
  return parseFloat(ottieniInputHtmlIngredienteQuantita(id).value);
}

function ottieniInputHtmlIngredienteNome(id) {
  return document.getElementById(ottieniIdIngredienteNome(id));
}

function ottieniInputHtmlIngredienteQuantita(id) {
  return document.getElementById(ottieniIdIngredienteQuantita(id));
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
