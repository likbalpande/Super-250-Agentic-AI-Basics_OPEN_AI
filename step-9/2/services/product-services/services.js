import { getAllProductsTool } from "./tools.js";

const BASE = "https://dummyjson.com/products";

export async function getAllProducts() {
    const res = await fetch(`${BASE}?limit=50&select=title,price,category,rating`);
    const data = await res.json();
    return data.products;
}

export const productTools = [getAllProductsTool];
export const productFns = { "getAllProducts" : getAllProducts };
