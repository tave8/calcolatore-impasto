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
    this.calcProportions();
  }

  calcProportions() {
    // to compute the proportions, you need to get every ingredient
    // from the core recipe instance, because proportions are nothing but the ratio
    // of a part quantity against the total quantity.
    this.ingredients.forEach((ingredient) => {
      // the proportion of the single ingredient is given by the
      // quantity against the total quantity
      const proportion = ingredient.getQuantity() / this.getTotIngredients();
      // proportion computed
      ingredient.setProportion(proportion);
      ingredient.setPercentage(proportion);
    });
    return this;
  }

  getTotIngredients() {
    return this.ingredients.reduce((acc, ingredient) => acc + ingredient.quantity, 0);
  }

  addIngredients(ingredientsAsList) {
    ingredientsAsList.forEach((ingredientInfo) => {
      this.addIngredient(ingredientInfo);
    });
  }

  addIngredient(ingredientInfo) {
    const ingredient = new Ingredient({
      name: ingredientInfo.name,
      recipe: this,
      proportion: null,
      quantity: ingredientInfo.quantity,
    });
    this.ingredients.push(ingredient);
    return ingredient;
  }
}

class Ingredient {
  constructor({ name, recipe, proportion, quantity }) {
    this.name = name;
    this.proportion = proportion;
    this.percentage = null;
    this.quantity = quantity;
    this.recipe = recipe;
  }
  getQuantity() {
    return this.quantity;
  }
  
  setProportion(proportion) {
    this.proportion = proportion
  }
  setPercentage(proportion) {
    this.percentage = proportion * 100
  }
}

class RecipeInstance {
  constructor() {
    this.recipe;
    this.ingredients;
    // this.user
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
  quantity: 10,
});

// myRecipe.removeIngredient("salt")

// myRecipe.calcFromIngredient({
//   name: "water",
//   quantity: 90,
// });
