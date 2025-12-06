function main() {
    // testPane()
    testPizza()
    // testMioPane()
}

main()


function testPane() {
    const proporzioni = calcolaProporzioni([
      { ingrediente: "lievito madre", quantita: 160 },
      { ingrediente: "farina", quantita: 1000 },
      { ingrediente: "acqua", quantita: 750 },
      { ingrediente: "sale", quantita: 20 },
      { ingrediente: "malto", quantita: 10 },
    ]);
    
    const proporzioniDaIngrediente = calcolaDaIngrediente({
      ingrediente: "malto",
      quantita: 10,
      proporzioni: proporzioni,
    });
    
    const quantitaDaTotaleImpasto = calcolaDaTot(1940, proporzioni);
    
    console.log(proporzioni);
    console.log(proporzioniDaIngrediente);
    console.log(quantitaDaTotaleImpasto);
}


// pizza
function testPizza() {
    const proporzioni = calcolaProporzioni([
      { ingrediente: "farina v300", quantita: 430 },
      { ingrediente: "farina semola", quantita: 20 },
      { ingrediente: "acqua", quantita: 315 },
      { ingrediente: "olio", quantita: 15 },
      { ingrediente: "sale", quantita: 15 },
      { ingrediente: "malto", quantita: 6 },
      { ingrediente: "zucchero", quantita: 6 },
      { ingrediente: "lievito birra", quantita: 1 },
    ]);
    
    const proporzioniDaIngrediente = calcolaDaIngrediente({
      ingrediente: "farina v300",
      quantita: 660,
      proporzioni: proporzioni,
    });
    
    const quantitaTot = calcolaTotDaUnita(8, 350)

    const quantitaDaTotaleImpasto = calcolaDaTot(quantitaTot, proporzioni);
    
    console.log(proporzioni);
    console.log(proporzioniDaIngrediente);
    console.log(quantitaDaTotaleImpasto);
}


function testMioPane() {
    const proporzioni = calcolaProporzioni([
      { ingrediente: "farina XY", quantita: 100 },
      { ingrediente: "H2O", quantita: 20 },
      { ingrediente: "acqua", quantita: 3 },
      { ingrediente: "olio", quantita: 30 },
    ]);
    
    const proporzioniDaIngrediente = calcolaDaIngrediente({
      ingrediente: "farina XY",
      quantita: 600,
      proporzioni: proporzioni,
    });
    
    const quantitaTot = 1000 //calcolaTotDaUnita(8, 350)

    const quantitaDaTotaleImpasto = calcolaDaTot(quantitaTot, proporzioni);
    
    console.log(proporzioni);
    console.log(proporzioniDaIngrediente);
    console.log(quantitaDaTotaleImpasto);
}




