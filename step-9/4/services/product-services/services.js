// Full product service — wrappers over every https://dummyjson.com/products API.
// Tool schemas live in ./tools.js; re-exported here for the server to register.
import { productTools } from "./tools.js";

const BASE = "https://dummyjson.com/products";
const BASIC = "title,price,category,rating";

export async function getAllProducts() {
    const res = await fetch(`${BASE}?limit=50&select=${BASIC}`);
    return (await res.json()).products;
}

export async function getSingleProduct({ id }) {
    const res = await fetch(`${BASE}/${id}`);
    return await res.json();
}

export async function searchProducts({ query }) {
    const res = await fetch(
        `${BASE}/search?q=${encodeURIComponent(query)}&limit=50&select=${BASIC}`
    );
    return (await res.json()).products;
}

export async function getProductCategories() {
    const res = await fetch(`${BASE}/categories`);
    return await res.json();
}

export async function getProductsByCategory({ category }) {
    const res = await fetch(
        `${BASE}/category/${encodeURIComponent(category)}?limit=50&select=${BASIC}`
    );
    return (await res.json()).products;
}

export async function addProduct(body) {
    const res = await fetch(`${BASE}/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });
    return await res.json();
}

export async function updateProduct({ id, ...body }) {
    const res = await fetch(`${BASE}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });
    return await res.json();
}

export async function deleteProduct({ id }) {
    const res = await fetch(`${BASE}/${id}`, { method: "DELETE" });
    return await res.json();
}

export { productTools };
export const productFns = {
    getAllProducts,
    getSingleProduct,
    searchProducts,
    getProductCategories,
    getProductsByCategory,
    addProduct,
    updateProduct,
    deleteProduct,
};
