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
 *
 * ## DATA STRUCTURE
 *
 * ### INGREDIENT: object
 *
 * ```js
 * {
 *    name: str
 *    proportion: float
 *    proportionRounded: float
 *    percentage: float
 *    percentageRounded: float
 * }
 * ```
 *
 * ### INGREDIENT INSTANCE: object
 *
 * ```js
 * {
 *    name: str
 *    quantity: float
 *    quantityRounded: float
 * }
 * ```
 *
 *
 * ### RECIPE: array of ingredients
 *
 * ```js
 * [
 *      <ingredient>,
 *      ...
 * ]
 * ```
 *
 * ### RECIPE INSTANCE: array of ingredient instances
 *
 *  * ```js
 * [
 *      <ingredient instance>,
 *      ...
 * ]
 *
 */
// class RecipeCalculator {
//   constructor(recipeName, recipeAsList) {
//     this.recipeName = recipeName;
//     this.recipe = new Recipe(recipeAsList);
//     this.recipeInstance = new RecipeInstance(recipeAsList);
//     // console.log(this);
//     this.calcProportions();
//   }

//   //   CORE

//   /**
//    *
//    */
//   calcProportions() {
//     // how many ingredients are there
//     const nIngredients = this.recipe.ingredients.length;
//     for (let i = 0; i < nIngredients; i++) {
//       const ingredient = this.recipe.ingredients[i];
//       const ingredientInstance = this.recipeInstance.ingredients[i];
//       // la proporzione del singolo ingrediente è data dalla sua quantita
//       // rispetto alla quantità totale
//       const proportion = ingredientInstance.quantity / this.recipeInstance.totIngredients;

//       ingredient._setProportion(proportion, ingredientInstance);
//       ingredient._setPercentage(proportion, ingredientInstance);
//     }
//     return this;
//   }

//   /**
//    *
//    */
//   calcFromIngredient({ name: ingredientKnown, quantity: quantityKnown }) {
//     const newRecipeAsList = [];
//     //   trova proporzione dell'ingrediente noto, dalle proporzioni personalizzate
//     const proportionKnown = this._findProportionOfIngredient(ingredientKnown);
//     // visto che il totale delle proporzioni sarà sempre 1, allora
//     // la proporzione rimanente si ottiene sottraendo  1 - proporzioneNota
//     const proportionKnownRemaining = 1 - proportionKnown;
//     // la quantita rimanente del totale
//     // si basa sulla seguente proporzione
//     // quantitaNota : quantitaRimanente = proporzioneNota : proporzioneNotaRimanente
//     // esempio:
//     // 10 g di sale stanno alla quantità di impasto che rimane, come la proporzione del sale (nel totale impasto)
//     // sta al totale delle proporzioni degli altri ingredienti
//     const quantityRemaining = (quantityKnown * proportionKnownRemaining) / proportionKnown;
//     // alla fine, dalla quantita nota di un ingrediente, e dalle proporzioni della ricetta,
//     // si ricava la quantità totale di questo (nuovo?) impasto, non di quello dato
//     // prima dall'utente come input
//     const totNewQuantity = quantityKnown + quantityRemaining;

//     const nIngredients = this.recipe.ingredients.length;
//     for (let i = 0; i < nIngredients; i++) {
//       // always refer to the real ingredient (so the proportion)
//       const ingredient = this.recipe.ingredients[i];
//       // moltiplicando la quantità totale con la proporzione del singolo ingrediente,
//       // ricavo finalmente la quantità di ogni altro ingrediente, oltre all'ingrediente dato
//       const quantityNewIngredient = totNewQuantity * ingredient.proportion;
//       const quantityRoundedNewIngredient = ingredient._roundQuantity(quantityNewIngredient);
//       // arrotondamenti e non

//       // console.log(ingredient)

//       const newIngredient = {
//         name: ingredient.name,
//         proportion: ingredient.proportion,
//         percentage: ingredient.percentage,
//         percentageRounded: ingredient.percentageRounded,
//         quantity: quantityNewIngredient,
//         quantityRounded: quantityRoundedNewIngredient,
//       };

//       console.log(newIngredient)
//       newRecipeAsList.push(newIngredient);
//     }
//     return new RecipeInstance(newRecipeAsList);
//   }

//   calcFromTot() {}

//   // HELPERS

//   _findProportionOfIngredient(ingredientName) {
//     for (let i = 0; i < this.recipe.ingredients.length; i++) {
//       const ingredient = this.recipe.ingredients[i];
//       // se trovo l'ingrediente che mi interessa
//       if (ingredient.name === ingredientName) {
//         return ingredient.proportion;
//       }
//     }
//     throw Error("Non è stato trovato nessuna proporzione per l'ingrediente dato.");
//   }

//   _roundNumber(x, nDigits) {
//     return parseFloat(x.toFixed(nDigits));
//   }

//   _roundProportion(x) {
//     return this._roundNumber(x, 4);
//   }

//   _roundPercentage(x) {
//     return this._roundNumber(x, 2);
//   }

//   _roundQuantity(x) {
//     return this._roundNumber(x, 2);
//   }
// }

// class Ingredient {
//   constructor(ingredient) {
//     this.name = ingredient.name;
//     this.proportion = ingredient.proportion;
//     this.proportionRounded = ingredient.proportion;
//     this.percentage = null;
//     this.percentageRounded = null;
//   }

//   /**
//    * Set the proportion for the ingredient as well as
//    * for the ingredient instance, so they are in sync.
//    */
//   _setProportion(proportion, ingredientInstance) {
//     const proportionRounded = this._roundProportion(proportion);
//     this.proportion = proportion;
//     this.proportionRounded = proportionRounded;
//     ingredientInstance.proportion = proportion;
//     ingredientInstance.proportionRounded = proportionRounded;
//   }

//   /**
//    * Set the percentage for the ingredient as well as
//    * for the ingredient instance, so they are in sync.
//    */
//   _setPercentage(proportion, ingredientInstance) {
//     const percentage = proportion * 100;
//     const percentageRounded = this._roundPercentage(percentage);
//     this.percentage = percentage;
//     this.percentageRounded = percentageRounded;
//     ingredientInstance.percentage = percentage;
//     ingredientInstance.percentageRounded = percentageRounded;
//   }

//   // HELPERS

//   _roundNumber(x, nDigits) {
//     return parseFloat(x.toFixed(nDigits));
//   }

//   _roundProportion(x) {
//     return this._roundNumber(x, 4);
//   }

//   _roundPercentage(x) {
//     return this._roundNumber(x, 2);
//   }

//   _roundQuantity(x) {
//     return this._roundNumber(x, 2);
//   }

//   genRandNum(limit = 10000000) {
//     return Math.floor(Math.random() * limit);
//   }
// }

// class IngredientInstance extends Ingredient {
//   constructor(ingredientInstance) {
//     super(ingredientInstance);
//     this.quantity = ingredientInstance.quantity;
//     this.quantityRounded = ingredientInstance.quantityRounded !== null ? ingredientInstance.quantityRounded : ingredientInstance.quantity;
//   }
// }

// class Recipe {
//   constructor(recipeAsList) {
//     this.ingredients = [];
//     // console.log(recipeAsList);
//     for (let i = 0; i < recipeAsList.length; i++) {
//       const ingredientObj = recipeAsList[i];
//       const ingredientInstance = new Ingredient(ingredientObj);
//       this.ingredients.push(ingredientInstance);
//     }
//   }
// }

// class RecipeInstance extends Recipe {
//   constructor(recipeAsList) {
//     super(recipeAsList);
//     this.ingredients = [];
//     this.totIngredients = 0;
//     for (let i = 0; i < recipeAsList.length; i++) {
//       const ingredientObj = recipeAsList[i];
//       const ingredientInstance = new IngredientInstance(ingredientObj);
//       this.ingredients.push(ingredientInstance);
//     }
//     this.calcTotIngredients();
//   }

//   calcTotIngredients() {
//     this.totIngredients = 0;
//     for (let i = 0; i < this.ingredients.length; i++) {
//       const ingredientInstance = this.ingredients[i];
//       this.totIngredients += ingredientInstance.quantity;
//     }
//     return this;
//   }
// }

class Recipe {
  constructor(recipeName, ingredientsList) {
    this.name = recipeName;
    this.ingredients = [];
    // this contains all recipe instances (industry term) that will be
    // generated by each recipe instances (programming term)
    this.addIngredients(ingredientsList);
    this.instances = [new RecipeInstance(ingredientsList, this)];
    this._calcProportions();
  }

  addIngredients(ingredientsList) {
    for (let i = 0; i < ingredientsList.length; i++) {
      const ingredientInfo = ingredientsList[i];
      this.addIngredient(ingredientInfo);
    }
  }

  addIngredient(ingredientInfo) {
    const ingredient = new Ingredient(ingredientInfo);
    this.ingredients.push(ingredient);
  }

  // addInstance(ingredientsList) {
  //   const recipeInstance = new RecipeInstance(ingredientsList);
  //   this.instances.push(recipeInstance);
  // }


  _calcProportions() {
    // to compute the proportions, the first recipe instance
    // is taken
    const recipeInstance = this.instances[0];
    // how many ingredients are there
    for (let i = 0; i < recipeInstance.ingredients.length; i++) {
      const ingredientInstance = recipeInstance.ingredients[i];
      const ingredient = ingredientInstance.ingredient;
      // la proporzione del singolo ingrediente è data dalla sua quantita
      // rispetto alla quantità totale
      const proportion = ingredientInstance.quantity / recipeInstance.totIngredients;

      ingredient._setProportion(proportion);
      ingredient._setPercentage(proportion);
    }
    return this;
  }
}

class RecipeInstance {
  constructor(ingredientsList, recipe) {
    this.ingredients = [];
    this.totIngredients = 0;
    this.addIngredients(ingredientsList, recipe);
    this.calcTotIngredients();
  }

  addIngredients(ingredientsList, recipe) {
    for (let i = 0; i < ingredientsList.length; i++) {
      const ingredientInfo = ingredientsList[i];
      const ingredient = recipe.ingredients[i];
      this.addIngredient(ingredientInfo, ingredient);
    }
  }

  addIngredient(ingredientInfo, ingredient) {
    const ingredientInstance = new IngredientInstance(ingredientInfo, ingredient);
    this.ingredients.push(ingredientInstance);
  }

  calcTotIngredients() {
    this.totIngredients = 0;
    for (let i = 0; i < this.ingredients.length; i++) {
      const ingredientInstance = this.ingredients[i];
      this.totIngredients += ingredientInstance.quantity;
    }
    return this;
  }
}

class Ingredient {
  constructor(info) {
    this.name = info.name;
    this.proportion = info.proportion;
  }

  getProportion() {
    return this.proportion;
  }

  getProportionRounded() {
    return this._roundProportion(this.proportion);
  }

  getPercentage() {
    return this.proportion * 100;
  }

  getPercentageRounded() {
    return this._roundPercentage(this.proportion * 100);
  }

  _setProportion(proportion) {
    this.proportion = proportion;
  }

  _setPercentage(proportion) {
    this.percentage = proportion * 100;
  }

  // HELPERS

  _roundNumber(x, nDigits) {
    return parseFloat(x.toFixed(nDigits));
  }

  _roundProportion(x) {
    return this._roundNumber(x, 4);
  }

  _roundPercentage(x) {
    return this._roundNumber(x, 2);
  }

  _roundQuantity(x) {
    return this._roundNumber(x, 2);
  }

  genRandNum(limit = 10000000) {
    return Math.floor(Math.random() * limit);
  }
}

class IngredientInstance {
  constructor(info, ingredient) {
    this.quantity = info.quantity;
    this.ingredient = ingredient;
  }
}

// USAGE

// const recipe = new RecipeCalculator(recipeName, recipeAsList);

// const recipeInstance = recipe.calcFromIngredient({
//   name: "farina v300",
//   quantity: 430,
// });

// USAGE

// the actual recipe
const recipeFatimasBread = new Recipe("Fatima's Bread", [
  { name: "farina v300", quantity: 430 },
  { name: "farina semola", quantity: 20 },
  { name: "acqua", quantity: 315 },
  { name: "olio", quantity: 15 },
  { name: "sale", quantity: 15 },
  { name: "malto", quantity: 6 },
  { name: "zucchero", quantity: 6 },
  { name: "lievito birra", quantity: 1 },
]);

// recipe instance
const recipeFatimasBreadFromXWheat = recipeFatimasBread.calcFromIngredient({
  name: "farina v300",
  quantity: 430,
});

// recipe instance
// const recipeFatimasBreadFromXTot = recipeFatimasBread.calcFromTot(1500);

console.log(recipeFatimasBread);
// console.log(recipeInstance)
