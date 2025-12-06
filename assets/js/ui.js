

function avviaEsempioUI() {
    const elementoTestoEsempio = document.getElementById("esempio-testo")
    // console.log(elementoTestoEsempio)
    const testo = generaStoriaEsempio()
    typeWrite(testo, elementoTestoEsempio)

    // elementoTestoEsempio.textContent = testo
}


