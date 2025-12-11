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
    this.instances = [];
    this.addIngredients(ingredientsAsList);
  }

  getTotIngredients() {
    return this.ingredients.reduce((acc, ingredient) => acc + ingredient.quantity, 0);
  }

  addIngredients(ingredientsAsList) {
    ingredientsAsList.forEach((ingredientInfo) => this.addIngredient(ingredientInfo));
  }

  addIngredient(ingredientInfo) {
    // add ingredient to recipe
    const ingredient = new Ingredient({
      name: ingredientInfo.name,
      quantity: ingredientInfo.quantity,
      recipe: this,
    });
    this.ingredients.push(ingredient);

    // add ingredient to all instances
    this.instances.forEach((instance) => instance.ingredients.push(ingredient));

    this.refreshInstances(ingredient);

    return ingredient;
  }

  editIngredient() {}

  removeIngredient(ingredientName) {
    // const ingredientExists = this._ingredientExists(ingredientName);
    // if (!ingredientExists) {
    //   throw Error(`No ingredient '${ingredientName}' was found.`);
    // }

    // remove ingredient from the ingredients
    this.ingredients.forEach((ingredient, i) => {
      if (ingredientName === ingredient.name) {
        this.ingredients.splice(i, 1);
      }
    });

    // remove ingredient from the instances
    this.instances.forEach((instance, i) => {
      // a recipe instance has ingredients, so remove the given
      // ingredient from the recipe instance ingredients
      instance.ingredients.forEach((ingredient, j) => {
        if (ingredientName === ingredient.name) {
          instance.ingredients.splice(j, 1);
        }
      });
    });

    this.refreshInstances();
  }

  refreshInstances() {
    this.instances.forEach((instance) => {
      instance.refresh();
    });
  }
}

class Ingredient {
  constructor({ name, recipe, quantity }) {
    this.name = name;
    this.quantity = quantity;
    this.recipe = recipe;
  }

  getProportion() {
    return this.getQuantity() / this.recipe.getTotIngredients();
  }

  getQuantity() {
    return this.quantity;
  }

  setProportion(proportion) {
    this.proportion = proportion;
  }
  setPercentage(proportion) {
    this.percentage = proportion * 100;
  }
}

class RecipeInstance {
  constructor({ recipe }) {
    this.recipe = recipe;
    this.ingredients = [];
    // this.user
  }
  /**
   * Re-compute the recipe instance based on
   * the state of the recipe.
   */
  refresh() {
    // if this recipe instance is "from one ingredient, derive the others"
    // if this recipe instance is "from the recipe total, derive every ingredient"
  }
}

// USAGE

const myRecipe = new Recipe("My Recipe", [
  { name: "water", quantity: 90 },
  { name: "salt", quantity: 10 },
]);

console.log(myRecipe);

myRecipe.addIngredient({
  name: "oik",
  quantity: 20,
});

myRecipe.removeIngredient("salt");

// myRecipe.calcFromIngredient({
//   name: "water",
//   quantity: 90,
// });

console.log("cuai");
