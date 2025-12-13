function main() {
    whenPageLoads()
}
main() 

// EVENT HANDLERS

function handleAddRecipe() {
    hideRecipeOptionsUI()
    showAllRecipeUI()
    showAllCalculationsUI()
}

function hideRecipeOptionsUI() {
    getRecipeOptionsUI().classList.add("invisible")
}

function showAllRecipeUI() {
    getRecipeInputUI().classList.remove("invisible")
    getRecipeOutputUI().classList.remove("invisible")
    getRecipeSaveAsPdfUI().classList.remove("invisible")
}
 
function showAllCalculationsUI() {
    getHaveIngredientUI().classList.remove("invisible")
    getHaveTotUI().classList.remove("invisible")
    getLegendUI().classList.remove("invisible")
}

// UI 

function getBtnAddRecipeUI() {
    return document.querySelector("main > .row-ricetta > .body > .row-options-recipe > .box-add button")
}

function getRecipeOptionsUI() {
    return document.querySelector("main > .row-ricetta > .body > .row-options-recipe")
}

function getRecipeInputUI() {
    return document.querySelector("main > .row-ricetta > .body > .row-input")
}

function getRecipeOutputUI() {
    return document.querySelector("main > .row-ricetta > .body > .row-output")
}

function getRecipeSaveAsPdfUI() {
    return document.querySelector("main > .row-ricetta > .body > .row-save-as-pdf")
}


function getHaveIngredientUI() {
    return document.querySelector("main > .row-ho-ingrediente")
}

function getHaveTotUI() {
    return document.querySelector("main > .row-ho-tot")
}

function getLegendUI() {
    return document.querySelector("main > .row-legend")
}



function whenPageLoads() {
    window.addEventListener("load", () => {
    // getBtnAddRecipeUI().addEventListener("click", handleAddRecipe)
    })
}
