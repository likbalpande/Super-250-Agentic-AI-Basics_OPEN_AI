// Recipe service wrappers around https://dummyjson.com/recipes
import { getAllRecipesTool } from "./tools.js";

const BASE = "https://dummyjson.com/recipes";

export async function getAllRecipes() {
    const res = await fetch(`${BASE}?limit=50&select=name,cuisine,difficulty,rating`);
    const data = await res.json();
    return data.recipes;
}

export const recipeTools = [getAllRecipesTool];
export const recipeFns = { getAllRecipes };
