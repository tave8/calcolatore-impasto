


function startTypewriteInteraction() {
  typeWriteMultipleElements([
    {elId: "p1", text: "il bicchiere mezzo pieno o mezzo intero"},
    {elId: "p2", text: "chi va piano va sano e va vicino"},
    {elId: "p3", text: "amore a primo olfatto"},
    {elId: "p4", text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta ex quidem repellat ullam ad, consectetur, labore facilis, nihil suscipit cum necessitatibus maiores consequatur alias fuga qui dolorem obcaecati corrupti sint."},

  ])
}

window.addEventListener("load", () => {
//   startTypewriteInteraction();

});



function typeWriteMultipleElements(elements) {
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    const elHtml = document.getElementById(element.elId)
    typeWrite(element.text, elHtml)
  }
}


function typeWrite(text, htmlEl, options = {}) {
  const nChars = text.length;
  let lastTimeout = 0;
  const timeoutStep = 10;
  const cursorExists = true;
  const promises = []

  for (let i = 0; i < nChars; i++) {
    const newText = cutText(text, i + 1);
    const randomTimeout = getRandomTimeout(10, 100);

    setTimeout(() => {
      updateText(newText, htmlEl, cursorExists);
    }, lastTimeout)

    lastTimeout += timeoutStep + randomTimeout;

  }

  setTimeout(() => {
    removeCursorIfExists(htmlEl, cursorExists);
  }, lastTimeout)
}

function updateText(text, htmlEl, addCursor = false) {
  const cursor = addCursor ? "|" : "";
  htmlEl.textContent = text + cursor;
}

function cutText(text, iUntil) {
  return text.slice(0, iUntil);
}


function removeCursorIfExists(htmlEl, cursorExists) {
  if (cursorExists) {
    htmlEl.textContent = htmlEl.textContent.slice(0, -1);
  }
}

function getRandomTimeout(start = 10, end = 50) {
  return Math.floor(Math.random() * (end - start + 1)) + start;
}




