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
  constructor({
    recipe,

    outputTableRecipeId,
    outputTableHaveIngredientId,
    outputTableHaveTotalId,

    inputAddIngredientNameId,
    inputAddIngredientQuantityId,
    buttonAddIngredientId,

    inputHaveIngredientNameId,
    inputHaveIngredientQuantityId,

    inputHaveTotalId,
  }) {
    this.recipe = recipe

    this.outputTableRecipeId = outputTableRecipeId;
    this.outputTableHaveIngredientId = outputTableHaveIngredientId;
    this.outputTableHaveTotalId = outputTableHaveTotalId;

    this.inputAddIngredientNameId = inputAddIngredientNameId;
    this.inputAddIngredientQuantityId = inputAddIngredientQuantityId;
    this.buttonAddIngredientId = buttonAddIngredientId;

    this.inputHaveIngredientNameId = inputHaveIngredientNameId;
    this.inputHaveIngredientQuantityId = inputHaveIngredientQuantityId;

    this.inputHaveTotalId = inputHaveTotalId;

    // add the event handlers
    const pageLoaded = document.readyState === "complete";
    // if page was loaded, run now
    if (pageLoaded) {
      this.addEventHandlers();
    }
    // if page is not loaded, run when page is loaded
    else {
      window.addEventListener("load", () => {
        this.addEventHandlers();
      });
    }
  }

  addEventHandlers() {
    // when user clicks add ingredient
    document.getElementById(this.buttonAddIngredientId).addEventListener("click", this.handleClickAddIngredient.bind(this));
    // when user types in "have ingredient" inputs
    document.getElementById(this.inputHaveIngredientNameId).addEventListener("keyup", this.handleTypingHaveIngredient.bind(this));
    document.getElementById(this.inputHaveIngredientQuantityId).addEventListener("keyup", this.handleTypingHaveIngredient.bind(this));
    // when user types in "have total" input
    document.getElementById(this.inputHaveTotalId).addEventListener("keyup", this.handleTypingHaveTotal.bind(this));
  }

  handleClickAddIngredient(ev) {
    // get the values of ingredient name and quantity
    const inputIngredientNameEl = document.getElementById(this.inputAddIngredientNameId)
    const inputIngredientQuantityEl = document.getElementById(this.inputAddIngredientQuantityId)
    
    const ingredientName = inputIngredientNameEl.value
    const ingredientQuantity = inputIngredientQuantityEl.value

    // checks
    // if () {

    // }

    // empty both inputs
    inputIngredientNameEl.value = ""
    inputIngredientQuantityEl.value = ""

    const ingredientInfo = {
        name: ingredientName,
        quantity: ingredientQuantity,
        proportion: null
    }

    // add to the data structure
    this.recipe.addIngredient(ingredientInfo)

    this.refreshOutputTableRecipe()
    // add to UI
    // this.addRowOutputTableRecipe(ingredientInfo)
  }

  handleTypingHaveIngredient(ev) {
    // console.log(ev);
  }

  handleTypingHaveTotal(ev) {

  }

  refreshOutputTableRecipe() {
    this.refreshOutputTable(this.recipe.getIngredients(), this.outputTableRecipeId);
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
  recipe: new Recipe(),

  outputTableRecipeId: "table-ricetta",
  outputTableHaveIngredientId: "table-da-ingrediente",
  outputTableHaveTotalId: "table-da-tot-impasto",

  inputAddIngredientNameId: "input-add-ingredient-name",
  inputAddIngredientQuantityId: "input-add-ingredient-quantity",
  buttonAddIngredientId: "button-add-ingredient",

  inputHaveIngredientNameId: "input-have-ingredient-name",
  inputHaveIngredientQuantityId: "input-have-ingredient-quantity",

  inputHaveTotalId: "input-have-total",
});

console.log(recipeUI);

// recipeUI.
