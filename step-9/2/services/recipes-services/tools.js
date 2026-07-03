// Tool (function) definition for the recipe service.
export const getAllRecipesTool = {
    type: "function",
    function: {
        name: "getAllRecipes",
        description:
            "Get a list of recipes with only basic fields (name, cuisine, difficulty, rating). Use when the user wants to browse or list recipes.",
        parameters: { type: "object", properties: {}, required: [] },
    },
};
