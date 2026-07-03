// Product service wrappers around https://dummyjson.com/products
import { getAllProductsTool, getSingleProductTool } from "./tools.js";

const BASE = "https://dummyjson.com/products";

// Basic list only (name + a few fields) — cheap context for the model.
export async function getAllProducts() {
    const res = await fetch(`${BASE}?limit=50&select=title,price,category,rating`);
    const data = await res.json();
    return data.products;
}

// Full detail for one product by id.
export async function getSingleProduct({ id }) {
    const res = await fetch(`${BASE}/${id}`);
    return await res.json();
}

export const productTools = [getAllProductsTool, getSingleProductTool];
export const productFns = { getAllProducts, getSingleProduct };
