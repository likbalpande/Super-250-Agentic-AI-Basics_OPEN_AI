// Product tool schemas. getAllProducts returns only basic fields, so the model
// must call getSingleProduct to get details — this is what forces a tool-call loop.
export const getAllProductsTool = {
    type: "function",
    function: {
        name: "getAllProducts",
        description:
            "Get a list of products with only basic fields (title, price, category, rating). Use to browse or find a product's id.",
        parameters: { type: "object", properties: {}, required: [] },
    },
};

export const getSingleProductTool = {
    type: "function",
    function: {
        name: "getSingleProduct",
        description:
            "Get the FULL details of ONE product by id (description, brand, stock, discount, tags, dimensions, warranty, reviews, etc.). Use after getAllProducts when the user wants details about a specific product.",
        parameters: {
            type: "object",
            properties: {
                id: { type: "number", description: "The product id to fetch." },
            },
            required: ["id"],
        },
    },
};
