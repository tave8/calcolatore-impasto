// RECIPE SCHEMA

// {
//     name: str
//     ingredients: [Ingredient]
//     instances: [RecipeInstance]
// }

// // INGREDIENT SCHEMA

// {
//     name: str
//     proportion: float
//     quantity: float
//     recipe: Recipe
// }

// // RECIPE INSTANCE

// {
//     recipe: Recipe
//     ingredients: [Ingredient]
//     user: {
//         data: {}
//         request: {}
//     }
// }

// NOTE: return primitive values from functions, this way they can be dynamic

class Recipe {
  constructor(name, ingredientsAsList) {
    this.name = name;
    this.ingredients = [];
    this.requests = [];
    this.addIngredients(ingredientsAsList);
  }

  calcFromIngredient({ name: ingredientName, quantity: ingredientQuantity }) {
    const ret = [];

    const recipeQuantityTotal = this.getRecipeQuantityFromIngredientInfo({
      name: ingredientName,
      quantity: ingredientQuantity,
    });

    // console.log(this);
    // add a new recipe instance, because every time we run this method,
    // the user is creating a new recipe instance/computation
    const newRequest = {
      data: {
        ingredientName: ingredientName,
        ingredientQuantity: ingredientQuantity,
      },
      request: {
        haveOneIngredient: true,
      },
    };

    this.requests.push(newRequest);

    // create the result
    this.ingredients.forEach((ingredient, i) => {
      // moltiplicando la quantità totale con la proporzione del singolo ingrediente,
      // ricavo finalmente la quantità di ogni altro ingrediente, oltre all'ingrediente dato
      const proportion = ingredient.getProportion();
      const newQuantity = recipeQuantityTotal * proportion;
      ret.push({
        name: ingredient.name,
        proportion,
        quantity: newQuantity,
      });
      // console.log(newQuantity)
    });

    return ret;
  }

  calcFromTot() {}

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
    return this.getIngredientByName(ingredientName).getProportion();
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

    if(newIngredientName !== undefined) {
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

  refreshInstances() {
    // this.instances.forEach((instance) => {
    //   instance.refresh();
    // });
    // this.instances.forEach((instance, i) => {
    //   // if this recipe instance is "from one ingredient, derive the others"
    //   if (instance.user.request.haveOneIngredient) {
    //     instance.recipe.calcFromIngredient({
    //       name: instance.user.data.ingredientName,
    //       quantity: instance.user.data.ingredientQuantity,
    //     });
    //   }
    //   // if this recipe instance is "from the recipe total, derive every ingredient"
    //   else if (instance.user.request.haveRecipeTotal) {
    //   }
    // });
  }
}

class Ingredient {
  constructor({ name, recipe, quantity }) {
    this.name = name;
    this.quantity = quantity;
    // this.recipe = recipe;
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

const myRecipe = new Recipe("My Recipe", [
  { name: "water", quantity: 90 },
  { name: "salt", quantity: 10 },
]);


myRecipe.addIngredient({
  name: "oik",
  quantity: 20,
});

myRecipe.editIngredient("salt", {
  quantity: 20
});

myRecipe.removeIngredient("salt");
// console.log(myRecipe);

// myRecipe.calcFromIngredient({
//   name: "water",
//   quantity: 45,
// });

console.log(myRecipe)
