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
    outputTableHaveRecipeTotalId,

    inputAddIngredientNameId,
    inputAddIngredientQuantityId,
    buttonAddIngredientId,
    selectRecipeMultiplyOperationId,
    inputRecipeMultiplyTimesId,

    inputHaveIngredientNameId,
    inputHaveIngredientQuantityId,

    inputHaveRecipeTotalId,
  }) {
    this.recipe = recipe;

    this.outputTableRecipeId = outputTableRecipeId;
    this.outputTableHaveIngredientId = outputTableHaveIngredientId;
    this.outputTableHaveRecipeTotalId = outputTableHaveRecipeTotalId;

    this.inputAddIngredientNameId = inputAddIngredientNameId;
    this.inputAddIngredientQuantityId = inputAddIngredientQuantityId;
    this.buttonAddIngredientId = buttonAddIngredientId;
    this.selectRecipeMultiplyOperationId = selectRecipeMultiplyOperationId;
    this.inputRecipeMultiplyTimesId = inputRecipeMultiplyTimesId;

    this.inputHaveIngredientNameId = inputHaveIngredientNameId;
    this.inputHaveIngredientQuantityId = inputHaveIngredientQuantityId;

    this.inputHaveRecipeTotalId = inputHaveRecipeTotalId;

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
    const self = this;

    // when user clicks or types Enter, to add an ingredient
    document.getElementById(this.buttonAddIngredientId).addEventListener("click", this.handleClickAddIngredient.bind(this));
    document.getElementById(this.inputAddIngredientQuantityId).addEventListener("keyup", (ev) => {
      const keyTyped = ev.key;
      const isEnter = keyTyped === "Enter";
      if (isEnter) {
        self.handleClickAddIngredient.bind(self)(ev);
      }
    });

    // when user changes recipe multiply operation, or types in multiply by input field
    document.getElementById(this.selectRecipeMultiplyOperationId).addEventListener("change", this.handleMultiplyRecipe.bind(this));
    document.getElementById(this.inputRecipeMultiplyTimesId).addEventListener("keyup", this.handleMultiplyRecipe.bind(this));
    document.getElementById(this.inputRecipeMultiplyTimesId).addEventListener("change", this.handleMultiplyRecipe.bind(this));

    // when user types in "have ingredient" inputs
    document.getElementById(this.inputHaveIngredientNameId).addEventListener("keyup", this.handleTypingHaveIngredient.bind(this));
    document.getElementById(this.inputHaveIngredientQuantityId).addEventListener("keyup", this.handleTypingHaveIngredient.bind(this));

    // when user types in "have total" input
    document.getElementById(this.inputHaveRecipeTotalId).addEventListener("keyup", this.handleTypingHaveRecipeTotal.bind(this));
  }

  handleClickAddIngredient(ev) {
    // get the values of ingredient name and quantity
    const inputIngredientNameEl = document.getElementById(this.inputAddIngredientNameId);
    const inputIngredientQuantityEl = document.getElementById(this.inputAddIngredientQuantityId);
    const inputRecipeMultiplyTimesId = document.getElementById(this.inputRecipeMultiplyTimesId);

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

    // every time the user adds an ingredient, reset the multiplier
    this.recipe.resetMultiplier();

    // add to the data structure
    this.recipe.addIngredient(ingredientInfo);

    // reset multiplier in UI
    inputRecipeMultiplyTimesId.value = 1;

    this.refreshOutputTableRecipe(this.recipe.getIngredients());

    this.refreshAutomaticAllTableButRecipe();

    // refocus the input to the ingredient name input
    document.getElementById(this.inputAddIngredientNameId).focus();
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

    this.refreshAutomaticAllTableButRecipe();
  }

  handleTypingHaveIngredient(ev) {
    const inputIngredientNameEl = document.getElementById(this.inputHaveIngredientNameId);
    const inputIngredientQuantityEl = document.getElementById(this.inputHaveIngredientQuantityId);

    const ingredientName = inputIngredientNameEl.value;
    const ingredientQuantity = parseFloat(inputIngredientQuantityEl.value);

    // // checks
    // // if () {

    // // }

    const ingredientsData = this.recipe.calcFromIngredient({
      name: ingredientName,
      quantity: ingredientQuantity,
    });

    // console.log(res);

    this.refreshOutputTableHaveIngredient(ingredientsData);
  }

  handleTypingHaveRecipeTotal(ev) {
    const inputRecipeTotalEl = document.getElementById(this.inputHaveRecipeTotalId);

    const recipeQuantity = parseFloat(inputRecipeTotalEl.value);

    // console.log(recipeQuantity)

    // // checks
    // // if () {

    // // }

    const ingredientsData = this.recipe.calcFromTot(recipeQuantity);
    console.log(ingredientsData)

    // console.log(res);

    this.refreshOutputTableHaveRecipeTotal(ingredientsData);
  }

  handleMultiplyRecipe(ev) {
    // get the fields
    const selectRecipeMultiplyOperationEl = document.getElementById(this.selectRecipeMultiplyOperationId);
    const inputRecipeMultiplyTimesEl = document.getElementById(this.inputRecipeMultiplyTimesId);

    const recipeOperation = selectRecipeMultiplyOperationEl.value;
    let initialMultiplier = inputRecipeMultiplyTimesEl.value;

    // checks
    // check that multiplier is a valid number

    initialMultiplier = parseFloat(initialMultiplier);
    // assume that the multiplier is the final number to multiply with
    let finalMultiplier = initialMultiplier;

    // if the operation is divide, then the multiplier will go at the denominator
    if (recipeOperation === "divide") {
      finalMultiplier = 1 / initialMultiplier;
    }

    this.recipe.multiplyIngredients(finalMultiplier);

    this.refreshOutputTableRecipe(this.recipe.getIngredients());
  }

  refreshAutomaticAllTableButRecipe() {
    // try {

    // } catch {

    // }

    // REFRESH TABLE: HAVE INGREDIENT

    const ingredientNameKnown = document.getElementById(this.inputHaveIngredientNameId).value
    const ingredientQuantityKnown = parseFloat(document.getElementById(this.inputHaveIngredientQuantityId).value)

    const ingredientsDataWhenHaveIngredient = this.recipe.calcFromIngredient({
      name: ingredientNameKnown,
      quantity: ingredientQuantityKnown,
    });

    // refresh the "from ingredient" table
    this.refreshOutputTableHaveIngredient(ingredientsDataWhenHaveIngredient);

    // REFRESH TABLE: HAVE RECIPE TOTAL
    const recipeQuantityKnown = parseFloat(document.getElementById(this.inputHaveRecipeTotalId).value)
    const ingredientsDataWhenHaveRecipeTotal = this.recipe.calcFromTot(recipeQuantityKnown)

    this.refreshOutputTableHaveRecipeTotal(ingredientsDataWhenHaveRecipeTotal)
  }

  /**
   * Refreshes the UI of a given table.
   * This method is used for standard tables (ingredient, quantity, proportion),
   * not for tables that implement custom logic (like the recipe table)
   */
  // refreshOutputTable(ingredientsData, tableId) {}

  refreshOutputTableHaveIngredient(ingredientsData) {
    const { ingredients: ingredientsList, totIngredientsRounded } = ingredientsData;

    const table = document.getElementById(this.outputTableHaveIngredientId);
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

      cellIngredientName.innerText = ingredientInfo.name;
      cellIngredientQuantity.innerText = `${ingredientInfo.quantityRounded}g`;
      cellIngredientPercentage.innerText = `${ingredientInfo.percentageRounded}%`;

      row.append(cellIngredientName, cellIngredientQuantity, cellIngredientPercentage);
      tableBody.appendChild(row);
    });

    // the table footer

    const rowTotal = document.createElement("tr");
    const cellTotalText = document.createElement("td");
    const cellTotalNum = document.createElement("td");

    cellTotalText.innerText = "TOTALE:";
    cellTotalNum.innerText = `${totIngredientsRounded}g`;
    cellTotalNum.setAttribute("colspan", "2");

    rowTotal.append(cellTotalText, cellTotalNum);

    // add total
    tableFoot.appendChild(rowTotal);
  }

    refreshOutputTableHaveRecipeTotal(ingredientsData) {
    const { ingredients: ingredientsList, totIngredientsRounded } = ingredientsData;

    const table = document.getElementById(this.outputTableHaveRecipeTotalId);
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

      cellIngredientName.innerText = ingredientInfo.name;
      cellIngredientQuantity.innerText = `${ingredientInfo.quantityRounded}g`;
      cellIngredientPercentage.innerText = `${ingredientInfo.percentageRounded}%`;

      row.append(cellIngredientName, cellIngredientQuantity, cellIngredientPercentage);
      tableBody.appendChild(row);
    });

    // the table footer

    const rowTotal = document.createElement("tr");
    const cellTotalText = document.createElement("td");
    const cellTotalNum = document.createElement("td");

    cellTotalText.innerText = "TOTALE:";
    cellTotalNum.innerText = `${totIngredientsRounded}g`;
    cellTotalNum.setAttribute("colspan", "2");

    rowTotal.append(cellTotalText, cellTotalNum);

    // add total
    tableFoot.appendChild(rowTotal);
  }

  // refreshOutputTableHavetotal(ingredientsList) {
  //   this.refreshOutputTable(ingredientsList, this.outputTableHaveTotalId);
  // }

  refreshOutputTableRecipe(ingredientsData) {
    const { ingredients: ingredientsList, totIngredientsRounded } = ingredientsData;

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
      cellIngredientQuantity.innerText = `${ingredientInfo.quantityMultipliedRounded}g`;
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
    cellTotalNum.innerText = `${totIngredientsRounded}g`;
    cellTotalNum.setAttribute("colspan", "3");

    rowTotal.append(cellTotalText, cellTotalNum);

    // add total
    tableFoot.appendChild(rowTotal);
  }

  // addRowOutputTableRecipe(ingredientInfo) {
  //   this.addRowOutputTable(ingredientInfo, this.outputTableRecipeId);
  // }

  // addRowOutputTableHaveIngredient(ingredientInfo) {
  //   this.addRowOutputTable(ingredientInfo, this.outputTableHaveIngredientId);
  // }

  // addRowOutputTableHaveTotal(ingredientInfo) {
  //   this.addRowOutputTable(ingredientInfo, this.outputTableHaveTotalId);
  // }

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
  outputTableHaveRecipeTotalId: "table-da-tot-impasto",

  inputAddIngredientNameId: "input-add-ingredient-name",
  inputAddIngredientQuantityId: "input-add-ingredient-quantity",
  buttonAddIngredientId: "button-add-ingredient",
  selectRecipeMultiplyOperationId: "select-recipe-multiply-operation",
  inputRecipeMultiplyTimesId: "input-recipe-multiply-operation",

  inputHaveIngredientNameId: "input-have-ingredient-name",
  inputHaveIngredientQuantityId: "input-have-ingredient-quantity",

  inputHaveRecipeTotalId: "input-have-recipe-total",
});

console.log(recipeUI);

// recipeUI.
