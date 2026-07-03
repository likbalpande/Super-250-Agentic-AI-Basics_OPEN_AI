// All product tool schemas (wrappers over https://dummyjson.com/products).
export const productTools = [
    {
        type: "function",
        function: {
            name: "getAllProducts",
            description:
                "List products with only basic fields (title, price, category, rating).",
            parameters: { type: "object", properties: {}, required: [] },
        },
    },
    {
        type: "function",
        function: {
            name: "getSingleProduct",
            description: "Get the full details of one product by id.",
            parameters: {
                type: "object",
                properties: { id: { type: "number", description: "Product id." } },
                required: ["id"],
            },
        },
    },
    {
        type: "function",
        function: {
            name: "searchProducts",
            description: "Search products by keyword; returns basic fields.",
            parameters: {
                type: "object",
                properties: { query: { type: "string", description: "Search text." } },
                required: ["query"],
            },
        },
    },
    {
        type: "function",
        function: {
            name: "getProductCategories",
            description: "List all product categories (slug, name, url).",
            parameters: { type: "object", properties: {}, required: [] },
        },
    },
    {
        type: "function",
        function: {
            name: "getProductsByCategory",
            description: "List products in a category slug (e.g. 'smartphones').",
            parameters: {
                type: "object",
                properties: {
                    category: { type: "string", description: "Category slug." },
                },
                required: ["category"],
            },
        },
    },
    {
        type: "function",
        function: {
            name: "addProduct",
            description: "Create a new product (simulated by dummyjson).",
            parameters: {
                type: "object",
                properties: {
                    title: { type: "string" },
                    price: { type: "number" },
                    category: { type: "string" },
                    description: { type: "string" },
                },
                required: ["title"],
            },
        },
    },
    {
        type: "function",
        function: {
            name: "updateProduct",
            description: "Update a product by id (simulated by dummyjson).",
            parameters: {
                type: "object",
                properties: {
                    id: { type: "number" },
                    title: { type: "string" },
                    price: { type: "number" },
                },
                required: ["id"],
            },
        },
    },
    {
        type: "function",
        function: {
            name: "deleteProduct",
            description: "Delete a product by id (simulated by dummyjson).",
            parameters: {
                type: "object",
                properties: { id: { type: "number" } },
                required: ["id"],
            },
        },
    },
];
