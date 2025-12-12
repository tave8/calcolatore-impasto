/**
 * This class must accomodate the following use cases:
 *
 * # Recipe Calculator
 *
 * ## USE CASES
 *
 * ### RECIPE -> INGREDIENT PROPORTIONS (calcProportions)
 *
 * I have the recipe, I want the ingredient proportions
 *
 * ### 1 INGREDIENT -> OTHER INGREDIENTS (calcFromIngredient)
 *
 * I have one ingredient and its quantity, I want the quantity of other ingredients
 *
 * ### TOTAL RECIPE -> ALL INGREDIENTS (calcFromTot)
 *
 * I have the total quantity of the recipe, I want the quantity of all ingredients
 *
 */

class Recipe {
  constructor() {
    this.name = null;
    this.ingredients = [];
    this.useCases = {
      haveOneIngredient: {
        isUseCaseActive: false,
        ingredientName: null,
        ingredientQuantity: null,
      },
      haveRecipeTotal: {
        isUseCaseActive: false,
        recipeQuantity: null,
      },
    };
  }

  calcFromIngredient({ name: ingredientName, quantity: ingredientQuantity }) {
    const ingredientsList = [];

    const recipeQuantityTotal = this.getRecipeQuantityFromIngredientInfo({
      name: ingredientName,
      quantity: ingredientQuantity,
    });

    // update the current use case
    this.useCases.haveOneIngredient.isUseCaseActive = true;
    this.useCases.haveOneIngredient.ingredientName = ingredientName;
    this.useCases.haveOneIngredient.ingredientQuantity = ingredientQuantity;

    // create the result
    this.ingredients.forEach((ingredient, i) => {
      // moltiplicando la quantità totale con la proporzione del singolo ingrediente,
      // ricavo finalmente la quantità di ogni altro ingrediente, oltre all'ingrediente dato
      const proportion = ingredient.getProportion();
      const newQuantity = recipeQuantityTotal * proportion;
      ingredientsList.push({
        name: ingredient.name,
        proportion,
        quantity: newQuantity,
      });
    });

    return {
      ingredients: ingredientsList,
    };
  }

  calcFromTot(recipeQuantity) {
    const ingredientsList = [];

    // update the current use case
    this.useCases.haveRecipeTotal.isUseCaseActive = true;
    this.useCases.haveRecipeTotal.recipeQuantity = recipeQuantity;

    this.ingredients.forEach((ingredient, i) => {
      const proportion = ingredient.getProportion();
      const newIngredientQuantity = recipeQuantity * proportion;

      ingredientsList.push({
        name: ingredient.name,
        proportion,
        quantity: newIngredientQuantity,
      });
    });

    return {
      ingredients: ingredientsList,
    };
  }

  /**
   * The pre-requisite to calculating the ingredient quantities from one ingredient,
   * is knowing the recipe total quantity.
   */
  getRecipeQuantityFromIngredientInfo({ name: ingredientName, quantity: ingredientQuantity }) {
    //   trova proporzione dell'ingrediente noto, dalle proporzioni personalizzate
    const proportionKnown = this.getIngredientProportionByName(ingredientName);
    // visto che il totale delle proporzioni sarà sempre 1, allora
    // la proporzione rimanente si ottiene sottraendo  1 - proporzioneNota
    const proportionRemainingKnown = 1 - proportionKnown;
    // la quantita rimanente del totale
    // si basa sulla seguente proporzione
    // quantitaNota : quantitaRimanente = proporzioneNota : proporzioneNotaRimanente
    // esempio:
    // 10 g di sale stanno alla quantità di impasto che rimane, come la proporzione del sale (nel totale impasto)
    // sta al totale delle proporzioni degli altri ingredienti
    const recipeQuantityRemaining = (ingredientQuantity * proportionRemainingKnown) / proportionKnown;
    // alla fine, dalla quantita nota di un ingrediente, e dalle proporzioni della ricetta,
    // si ricava la quantità totale di questo (nuovo?) impasto, non di quello dato
    // prima dall'utente come input
    const recipeQuantityTotal = ingredientQuantity + recipeQuantityRemaining;

    return recipeQuantityTotal;
  }

  getIngredientProportionByName(ingredientName) {
    const ingredient = this.getIngredientByName(ingredientName);
    if (!ingredient) {
      throw Error(`The ingredient ${ingredientName} has not been found`);
    }
    return ingredient.getProportion();
  }

  getIngredientByName(ingredientName) {
    return this.ingredients.find((ingredient) => ingredientName === ingredient.name);
  }

  getTotIngredients() {
    return this.ingredients.reduce((acc, ingredient) => acc + ingredient.quantity, 0);
  }

  addIngredients(ingredientsAsList) {
    ingredientsAsList.forEach((ingredientInfo) => this.addIngredient(ingredientInfo));
  }

  addIngredient(ingredientInfo) {
    if (this.existsIngredientByName(ingredientInfo.name)) {
      throw Error(`The ingredient '${ingredientInfo.name}' you are trying to add is already present.`);
    }
    // console.log(this.existsIngredientByName(ingredientInfo.name))

    // add ingredient to recipe
    const ingredient = new Ingredient({
      name: ingredientInfo.name,
      quantity: ingredientInfo.quantity,
      recipe: this,
    });
    this.ingredients.push(ingredient);

    return ingredient;
  }

  existsIngredientByName(ingredientName) {
    const item = this.getIngredientByName(ingredientName);
    const exists = item !== undefined && item.constructor.name === "Ingredient";
    return exists;
  }

  editIngredient(currIngredientName, { name: newIngredientName, quantity: newIngredientQuantity }) {
    // check
    if (!this.existsIngredientByName(currIngredientName)) {
      throw Error(`The ingredient '${currIngredientName}' has not been found.`);
    }
    // check that the new name of the ingredient is not already taken
    if (this.existsIngredientByName(newIngredientName)) {
      throw Error(`Cannot rename current ingredient '${currIngredientName}' ` + `to '${newIngredientName}' because the latter exists already`);
    }

    const ingredient = this.getIngredientByName(currIngredientName);
    // console.log(ingredient)

    if (newIngredientName !== undefined) {
      ingredient.setName(newIngredientName);
    }
    if (newIngredientQuantity !== undefined) {
      ingredient.setQuantity(newIngredientQuantity);
    }

    // console.log(ingredient)
  }

  removeIngredient(ingredientName) {
    if (!this.existsIngredientByName(ingredientName)) {
      throw Error(`No ingredient '${ingredientName}' was found.`);
    }

    // remove ingredient from the ingredients
    this.ingredients.forEach((ingredient, i) => {
      if (ingredientName === ingredient.name) {
        this.ingredients.splice(i, 1);
      }
    });
  }

  setName(recipeName) {
    this.name = recipeName;
  }
}

class Ingredient {
  constructor({ name, recipe, quantity }) {
    this.name = name;
    this.quantity = quantity;
    this.recipe = recipe;
  }

  getName() {
    return this.name;
  }

  setName(name) {
    this.name = name;
  }

  getProportion() {
    return this.getQuantity() / this.recipe.getTotIngredients();
  }

  getQuantity() {
    return this.quantity;
  }

  setQuantity(quantity) {
    this.quantity = quantity;
  }
}

// USAGE

const myRecipe = new Recipe();

// myRecipe.setName("My recipe")

myRecipe.addIngredient({
  name: "water",
  quantity: 100,
});

// myRecipe.editIngredient("salt", {
//   quantity: 40,
// });

// // myRecipe.removeIngredient("salt");
// // console.log(myRecipe);

// console.log(
myRecipe.calcFromIngredient({
  name: "water",
  quantity: 45,
});
// );

// console.log(myRecipe.calcFromTot(150));

console.log(myRecipe);
