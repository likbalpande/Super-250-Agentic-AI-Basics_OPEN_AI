// Full recipe service — wrappers over every https://dummyjson.com/recipes API.
import { recipeTools } from "./tools.js";

const BASE = "https://dummyjson.com/recipes";
const BASIC = "name,cuisine,difficulty,rating";

export async function getAllRecipes() {
    const res = await fetch(`${BASE}?limit=50&select=${BASIC}`);
    return (await res.json()).recipes;
}

export async function getSingleRecipe({ id }) {
    const res = await fetch(`${BASE}/${id}`);
    return await res.json();
}

export async function searchRecipes({ query }) {
    const res = await fetch(
        `${BASE}/search?q=${encodeURIComponent(query)}&limit=50&select=${BASIC}`
    );
    return (await res.json()).recipes;
}

export async function getRecipeTags() {
    const res = await fetch(`${BASE}/tags`);
    return await res.json();
}

export async function getRecipesByTag({ tag }) {
    const res = await fetch(
        `${BASE}/tag/${encodeURIComponent(tag)}?limit=50&select=${BASIC}`
    );
    return (await res.json()).recipes;
}

export async function getRecipesByMealType({ mealType }) {
    const res = await fetch(
        `${BASE}/meal-type/${encodeURIComponent(mealType)}?limit=50&select=${BASIC}`
    );
    return (await res.json()).recipes;
}

export { recipeTools };
export const recipeFns = {
    getAllRecipes,
    getSingleRecipe,
    searchRecipes,
    getRecipeTags,
    getRecipesByTag,
    getRecipesByMealType,
};
