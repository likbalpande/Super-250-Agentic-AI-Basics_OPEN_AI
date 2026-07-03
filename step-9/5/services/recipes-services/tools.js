// All recipe tool schemas (wrappers over https://dummyjson.com/recipes).
export const recipeTools = [
    {
        type: "function",
        function: {
            name: "getAllRecipes",
            description:
                "List recipes with only basic fields (name, cuisine, difficulty, rating).",
            parameters: { type: "object", properties: {}, required: [] },
        },
    },
    {
        type: "function",
        function: {
            name: "getSingleRecipe",
            description:
                "Get the full details of one recipe by id (ingredients, instructions, times, calories, etc.).",
            parameters: {
                type: "object",
                properties: { id: { type: "number", description: "Recipe id." } },
                required: ["id"],
            },
        },
    },
    {
        type: "function",
        function: {
            name: "searchRecipes",
            description: "Search recipes by keyword; returns basic fields.",
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
            name: "getRecipeTags",
            description: "List all recipe tags.",
            parameters: { type: "object", properties: {}, required: [] },
        },
    },
    {
        type: "function",
        function: {
            name: "getRecipesByTag",
            description: "List recipes for a tag (e.g. 'Pizza').",
            parameters: {
                type: "object",
                properties: { tag: { type: "string", description: "Recipe tag." } },
                required: ["tag"],
            },
        },
    },
    {
        type: "function",
        function: {
            name: "getRecipesByMealType",
            description: "List recipes for a meal type (e.g. 'Dinner', 'Snack').",
            parameters: {
                type: "object",
                properties: {
                    mealType: { type: "string", description: "Meal type." },
                },
                required: ["mealType"],
            },
        },
    },
];
