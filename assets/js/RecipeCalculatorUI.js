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
    this.recipe = recipe;

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
    // prevents wrong "this" binding when dealing with event handlers
    const self = this
    // when user clicks or types Enter, to add an ingredient
    document.getElementById(this.buttonAddIngredientId).addEventListener("click", this.handleClickAddIngredient.bind(this));
    document.getElementById(this.inputAddIngredientQuantityId).addEventListener("keyup", (ev) => {
      const keyTyped = ev.key
      const isEnter = keyTyped === "Enter"
      if(isEnter) {
        self.handleClickAddIngredient.bind(self)(ev)
      }
    });
    // when user types in "have ingredient" inputs
    document.getElementById(this.inputHaveIngredientNameId).addEventListener("keyup", this.handleTypingHaveIngredient.bind(this));
    document.getElementById(this.inputHaveIngredientQuantityId).addEventListener("keyup", this.handleTypingHaveIngredient.bind(this));
    // when user types in "have total" input
    document.getElementById(this.inputHaveTotalId).addEventListener("keyup", this.handleTypingHaveTotal.bind(this));
  }

  handleClickAddIngredient(ev) {
    // get the values of ingredient name and quantity
    const inputIngredientNameEl = document.getElementById(this.inputAddIngredientNameId);
    const inputIngredientQuantityEl = document.getElementById(this.inputAddIngredientQuantityId);

    const ingredientName = inputIngredientNameEl.value;
    const ingredientQuantity = inputIngredientQuantityEl.value;

    // checks
    // if () {

    // }

    // empty both inputs
    inputIngredientNameEl.value = "";
    inputIngredientQuantityEl.value = "";

    const ingredientInfo = {
      name: ingredientName,
      quantity: ingredientQuantity,
    };

    // add to the data structure
    this.recipe.addIngredient(ingredientInfo);

    this.refreshOutputTableRecipe(this.recipe.getIngredients());

    // refocus the input to the ingredient name input
    document.getElementById(this.inputAddIngredientNameId).focus()
  }

  handleClickRemoveIngredient(ev) {
    const button = ev.currentTarget;
    // go back to the table row, so you can remove it
    const row = button.closest("tr");
    const ingredientId = button.dataset.ingredientId;
    // remove the ingredient from the data
    this.recipe.removeIngredientById(ingredientId);
    // remove ingredient from DOM
    // row.remove()
    // refresh recipe table
    this.refreshOutputTableRecipe(this.recipe.getIngredients());
  }

  handleTypingHaveIngredient(ev) {
    // CONTINUE HERE.
    //     // get the values of ingredient name and quantity
    const inputIngredientNameEl = document.getElementById(this.inputHaveIngredientNameId);
    const inputIngredientQuantityEl = document.getElementById(this.inputHaveIngredientQuantityId);

    const ingredientName = inputIngredientNameEl.value;
    const ingredientQuantity = inputIngredientQuantityEl.value;

    // // checks
    // // if () {

    // // }

    const res = this.recipe.calcFromIngredient({
      name: ingredientName,
      quantity: ingredientQuantity,
    });

    console.log(res);
  }

  handleTypingHaveTotal(ev) {}

  refreshOutputTableRecipe(ingredientsData) {
    const { ingredients: ingredientsList, totIngredients } = ingredientsData;

    const table = document.getElementById(this.outputTableRecipeId);
    const tableBody = table.querySelector("tbody");
    const tableFoot = table.querySelector("tfoot");

    // empty the table
    tableBody.innerHTML = "";
    tableFoot.innerHTML = "";

    // add ingredients
    ingredientsList.forEach((ingredientInfo) => {
      const row = document.createElement("tr");

      const cellIngredientName = document.createElement("td");
      const cellIngredientQuantity = document.createElement("td");
      const cellIngredientPercentage = document.createElement("td");
      const cellIngredientActions = document.createElement("td");

      // row.setAttribute("id", `row-ingredient-${ingredientInfo.id}`)

      cellIngredientName.innerText = ingredientInfo.name;
      cellIngredientQuantity.innerText = `${ingredientInfo.quantityRounded}g`;
      cellIngredientPercentage.innerText = `${ingredientInfo.percentageRounded}%`;

      // create the remove button and the trash icon in it
      const removeButton = document.createElement("button");
      const removeIcon = document.createElement("i");
      removeButton.setAttribute("data-ingredient-id", ingredientInfo.id);
      removeIcon.className = "fa-solid fa-trash";

      removeButton.addEventListener("click", this.handleClickRemoveIngredient.bind(this));

      removeButton.appendChild(removeIcon);
      cellIngredientActions.appendChild(removeButton);

      row.append(cellIngredientName, cellIngredientQuantity, cellIngredientPercentage, cellIngredientActions);
      tableBody.appendChild(row);
    });

    // the table footer

    const rowTotal = document.createElement("tr");
    const cellTotalText = document.createElement("td");
    const cellTotalNum = document.createElement("td");

    cellTotalText.innerText = "TOTALE:";
    cellTotalNum.innerText = `${totIngredients}g`;
    cellTotalNum.setAttribute("colspan", "3");

    rowTotal.append(cellTotalText, cellTotalNum);

    // add total
    tableFoot.appendChild(rowTotal);
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
    const cellIngredientPercentage = document.createElement("td");

    cellIngredientName.innerText = ingredientInfo.name;
    cellIngredientQuantity.innerText = ingredientInfo.quantityRounded;
    cellIngredientPercentage.innerText = ingredientInfo.percentageRounded;

    row.append(cellIngredientName, cellIngredientQuantity, cellIngredientPercentage);
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
