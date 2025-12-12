// FEATURE: add ingredient

// input: ingredient name

// input: ingredient quantity

// trigger: add ingredient button

// output: table

// FEATURE: calc from ingredient

// input: ingredient name

// input: ingredient quantity

// output: table

// FEATURE: calc from tot

// input: recipe total

// output: table

class RecipeUI {
  constructor({ outputTableRecipeId, outputTableHaveIngredientId, outputTableHaveTotalId }) {
    this.outputTableRecipeId = outputTableRecipeId;
    this.outputTableHaveIngredientId = outputTableHaveIngredientId;
    this.outputTableHaveTotalId = outputTableHaveTotalId;
  }

  refreshOutputTableRecipe(ingredientsList) {
    this.refreshOutputTable(ingredientsList, this.outputTableRecipeId);
  }

  refreshOutputTableHaveIngredient(ingredientsList) {
    this.refreshOutputTable(ingredientsList, this.outputTableHaveIngredientId);
  }

  refreshOutputTableHavetotal(ingredientsList) {
    this.refreshOutputTable(ingredientsList, this.outputTableHaveTotalId);
  }

  refreshOutputTable(ingredientsList, tableId) {
    const table = document.getElementById(tableId);
    const tableBody = table.querySelector("tbody");
    // empty the table
    tableBody.innerHTML = "";

    ingredientsList.forEach((ingredientInfo) => {
      this.addRowOutputTable(ingredientInfo, tableId);
    });
  }

  addRowOutputTableRecipe(ingredientInfo) {
    this.addRowOutputTable(ingredientInfo, this.outputTableRecipeId);
  }

  addRowOutputTableHaveIngredient(ingredientInfo) {
    this.addRowOutputTable(ingredientInfo, this.outputTableHaveIngredientId);
  }

  addRowOutputTableHaveTotal(ingredientInfo) {
    this.addRowOutputTable(ingredientInfo, this.outputTableHaveTotalId);
  }

  addRowOutputTable(ingredientInfo, tableId) {
    const table = document.getElementById(tableId);
    const tableBody = table.querySelector("tbody");
    const row = document.createElement("tr");

    const cellIngredientName = document.createElement("td");
    const cellIngredientQuantity = document.createElement("td");
    const cellIngredientProportion = document.createElement("td");

    cellIngredientName.innerText = ingredientInfo.name;
    cellIngredientQuantity.innerText = ingredientInfo.quantity;
    cellIngredientProportion.innerText = ingredientInfo.proportion;

    row.append(cellIngredientName, cellIngredientQuantity, cellIngredientProportion);
    tableBody.appendChild(row);
  }
}

const recipeUI = new RecipeUI({
  outputTableRecipeId: "table-ricetta",
  outputTableHaveIngredientId: "table-da-ingrediente",
  outputTableHaveTotalId: "table-da-tot-impasto",
});

console.log(recipeUI)

// recipeUI.
