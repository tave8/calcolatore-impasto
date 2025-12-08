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
class RecipeCalculator {
  constructor(recipeName, recipeAsList) {
    this.recipeName = recipeName;
    this.recipe = new Recipe(recipeAsList);
    this.recipeInstance = new RecipeInstance(recipeAsList);
    // console.log(this);
    this.calcProportions();
  }

  //   CORE

  /**
   *
   */
  calcProportions() {
    // how many ingredients are there
    const nIngredients = this.recipe.ingredients.length;
    for (let i = 0; i < nIngredients; i++) {
      const ingredient = this.recipe.ingredients[i];
      const ingredientInstance = this.recipeInstance.ingredients[i];
      // la proporzione del singolo ingrediente è data dalla sua quantita
      // rispetto alla quantità totale
      const proportion = ingredientInstance.quantity / this.recipeInstance.totIngredients;

      ingredient._setProportion(proportion, ingredientInstance);
      ingredient._setPercentage(proportion, ingredientInstance);
    }
    return this;
  }

  /**
   *
   */
  calcFromIngredient({ name: knownIngredient, quantity: knownQuantity }) {
    //   trova proporzione dell'ingrediente noto, dalle proporzioni personalizzate
    const proporzioneNota = this._findProportionOfIngredient(knownIngredient);
    // visto che il totale delle proporzioni sarà sempre 1, allora
    // la proporzione rimanente si ottiene sottraendo  1 - proporzioneNota
    const proporzioneNotaRimanente = 1 - proporzioneNota;
    // la quantita rimanente del totale
    // si basa sulla seguente proporzione
    // quantitaNota : quantitaRimanente = proporzioneNota : proporzioneNotaRimanente
    // esempio:
    // 10 g di sale stanno alla quantità di impasto che rimane, come la proporzione del sale (nel totale impasto)
    // sta al totale delle proporzioni degli altri ingredienti
    const quantitaRimanente = (quantitaNota * proporzioneNotaRimanente) / proporzioneNota;
    // alla fine, dalla quantita nota di un ingrediente, e dalle proporzioni della ricetta,
    // si ricava la quantità totale di quell'impasto
    const quantitaTot = quantitaNota + quantitaRimanente;
    for (ingrediente of proporzioni.items) {
      const nuovoIngrediente = Object.assign({}, ingrediente);
      // moltiplicando la quantità totale con la proporzione del singolo ingrediente,
      // ricavo finalmente la quantità di ogni altro ingrediente, oltre all'ingrediente dato
      const quantita = quantitaTot * ingrediente.proporzione;
      // arrotondamenti e non
      const quantitaArrotondata = arrotondaQuantita(quantita);
      nuovoIngrediente["quantita"] = quantita;
      nuovoIngrediente["quantitaArrotondata"] = quantitaArrotondata;
      ret.items.push(nuovoIngrediente);
    }
  }

  calcFromTot() {}

  // HELPERS

  _findProportionOfIngredient(ingredientName) {
    for (let i = 0; i < this.recipe.ingredients.length; i++) {
      const ingredient = this.recipe.ingredients[i];
      // se trovo l'ingrediente che mi interessa
      if (ingredient.name === ingredientName) {
        return ingredient.proportion;
      }
    }
    throw Error("Non è stato trovato nessuna proporzione per l'ingrediente dato.");
  }

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
}

class Ingredient {
  constructor(ingredient) {
    this.name = ingredient.name;
    this.proportion = ingredient.proportion;
    this.proportionRounded = ingredient.proportion;
    this.percentage = null;
    this.percentageRounded = null;
  }

  /**
   * Set the proportion for the ingredient as well as
   * for the ingredient instance, so they are in sync.
   */
  _setProportion(proportion, ingredientInstance) {
    const proportionRounded = this._roundProportion(proportion);
    this.proportion = proportion;
    this.proportionRounded = proportionRounded;
    ingredientInstance.proportion = proportion;
    ingredientInstance.proportionRounded = proportionRounded;
  }

  /**
   * Set the percentage for the ingredient as well as
   * for the ingredient instance, so they are in sync.
   */
  _setPercentage(proportion, ingredientInstance) {
    const percentage = proportion * 100;
    const percentageRounded = this._roundPercentage(percentage);
    this.percentage = percentage;
    this.percentageRounded = percentageRounded;
    ingredientInstance.percentage = percentage;
    ingredientInstance.percentageRounded = percentageRounded;
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
}

class IngredientInstance extends Ingredient {
  constructor(ingredientInstance) {
    super(ingredientInstance);
    this.quantity = ingredientInstance.quantity;
    this.quantityRounded = ingredientInstance.quantity;
  }
}

class Recipe {
  constructor(recipeAsList) {
    this.ingredients = [];
    // console.log(recipeAsList);
    for (let i = 0; i < recipeAsList.length; i++) {
      const ingredientObj = recipeAsList[i];
      const ingredientInstance = new Ingredient(ingredientObj);
      this.ingredients.push(ingredientInstance);
    }
  }
}

class RecipeInstance extends Recipe {
  constructor(recipeAsList) {
    super(recipeAsList);
    this.ingredients = [];
    this.totIngredients = 0;
    for (let i = 0; i < recipeAsList.length; i++) {
      const ingredientObj = recipeAsList[i];
      const ingredientInstance = new IngredientInstance(ingredientObj);
      this.ingredients.push(ingredientInstance);
    }
    this.calcTotIngredients();
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

// USAGE

const recipeName = "Pizza di Fatima";
const recipeAsList = [
  { name: "farina v300", quantity: 430 },
  { name: "farina semola", quantity: 20 },
  { name: "acqua", quantity: 315 },
  { name: "olio", quantity: 15 },
  { name: "sale", quantity: 15 },
  { name: "malto", quantity: 6 },
  { name: "zucchero", quantity: 6 },
  { name: "lievito birra", quantity: 1 },
];

const recipe = new RecipeCalculator(recipeName, recipeAsList);

recipe.calcFromIngredient({
  name: "farina v300",
  quantity: 700,
});
