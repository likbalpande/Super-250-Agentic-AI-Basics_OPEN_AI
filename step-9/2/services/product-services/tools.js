// Tool (function) definition for the product service — the boilerplate/schema
// the LLM sees. Kept separate from the wrapper logic; imported by services.js.
export const getAllProductsTool = {
    type: "function",
    function: {
        name: "getAllProducts",
        description:
            "Get a list of products with only basic fields (title, price, category, rating). Use when the user wants to browse or list products.",
        parameters: { type: "object", properties: {}, required: [] },
    },
};
