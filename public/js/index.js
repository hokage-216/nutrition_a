
// import and initialize MVC components
import { recipeModel } from './recipemodel.js';
import { recipeView } from './recipeviews.js';
import { recipecontroller } from './recipecontroller.js';

const recipe = new recipecontroller(
  new recipeModel({}),
  new recipeView()
);