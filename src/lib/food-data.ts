
// This file contains food data and utility functions for the SmartPantry app

export interface FoodItem {
  id: string;
  name: string;
  category: string;
  expiryDays: number;
  preferredLocation: 'fridge' | 'freezer' | 'pantry';
}

// A database of common food items with their default expiry information
export const foodDatabase: FoodItem[] = [
  { id: '1', name: 'Milk', category: 'Dairy', expiryDays: 7, preferredLocation: 'fridge' },
  { id: '2', name: 'Eggs', category: 'Dairy', expiryDays: 21, preferredLocation: 'fridge' },
  { id: '3', name: 'Bread', category: 'Bakery', expiryDays: 5, preferredLocation: 'pantry' },
  { id: '4', name: 'Apples', category: 'Fruit', expiryDays: 14, preferredLocation: 'fridge' },
  { id: '5', name: 'Chicken Breast', category: 'Meat', expiryDays: 2, preferredLocation: 'fridge' },
  { id: '6', name: 'Frozen Chicken', category: 'Meat', expiryDays: 180, preferredLocation: 'freezer' },
  { id: '7', name: 'Spinach', category: 'Vegetable', expiryDays: 5, preferredLocation: 'fridge' },
  { id: '8', name: 'Pasta', category: 'Dry Goods', expiryDays: 365, preferredLocation: 'pantry' },
  { id: '9', name: 'Rice', category: 'Dry Goods', expiryDays: 730, preferredLocation: 'pantry' },
  { id: '10', name: 'Canned Beans', category: 'Canned Goods', expiryDays: 1095, preferredLocation: 'pantry' },
  { id: '11', name: 'Ground Beef', category: 'Meat', expiryDays: 2, preferredLocation: 'fridge' },
  { id: '12', name: 'Yogurt', category: 'Dairy', expiryDays: 14, preferredLocation: 'fridge' },
  { id: '13', name: 'Cheese', category: 'Dairy', expiryDays: 21, preferredLocation: 'fridge' },
  { id: '14', name: 'Bananas', category: 'Fruit', expiryDays: 5, preferredLocation: 'pantry' },
  { id: '15', name: 'Onions', category: 'Vegetable', expiryDays: 30, preferredLocation: 'pantry' },
  { id: '16', name: 'Potatoes', category: 'Vegetable', expiryDays: 21, preferredLocation: 'pantry' },
  { id: '17', name: 'Tomatoes', category: 'Vegetable', expiryDays: 7, preferredLocation: 'fridge' },
];

// Find a food item in the database by name
export function findFoodItem(name: string): FoodItem | undefined {
  const normalizedName = name.toLowerCase().trim();
  
  return foodDatabase.find(item => 
    item.name.toLowerCase().includes(normalizedName) || 
    normalizedName.includes(item.name.toLowerCase())
  );
}

// Calculate an expiry date based on a food item and purchase date
export function calculateExpiryDate(foodItem: FoodItem, purchaseDate: Date = new Date()): Date {
  const expiryDate = new Date(purchaseDate);
  expiryDate.setDate(expiryDate.getDate() + foodItem.expiryDays);
  return expiryDate;
}

// Generate a list of recipes based on available ingredients
export function suggestRecipes(availableIngredients: string[]): Recipe[] {
  // In a real app, this would be more sophisticated, possibly using an API
  // For now, we'll use a simple matching algorithm with our recipe database
  
  return recipeDatabase.map(recipe => {
    const matchedIngredients = recipe.ingredients.filter(ingredient => 
      availableIngredients.some(available => 
        available.toLowerCase().includes(ingredient.toLowerCase()) ||
        ingredient.toLowerCase().includes(available.toLowerCase())
      )
    );
    
    return {
      ...recipe,
      matchedIngredients: matchedIngredients.length,
    };
  }).sort((a, b) => {
    // Sort by match percentage (descending)
    const aPercent = a.matchedIngredients / a.ingredients.length;
    const bPercent = b.matchedIngredients / b.ingredients.length;
    return bPercent - aPercent;
  });
}

// Recipe interface
export interface Recipe {
  id: string;
  name: string;
  ingredients: string[];
  matchedIngredients?: number;
  instructions?: string[];
  cookTime: number; // in minutes
  servings: number;
  imageUrl?: string;
}

// A database of recipes
export const recipeDatabase: Recipe[] = [
  {
    id: '1',
    name: 'Vegetable Stir Fry',
    ingredients: ['broccoli', 'carrots', 'bell pepper', 'garlic', 'soy sauce', 'vegetable oil'],
    instructions: [
      'Chop all vegetables into bite-sized pieces',
      'Heat oil in a wok or large frying pan',
      'Add garlic and stir for 30 seconds',
      'Add vegetables and stir fry for 5-7 minutes',
      'Add soy sauce and continue cooking for 2 minutes',
      'Serve hot over rice or noodles'
    ],
    cookTime: 20,
    servings: 2,
    imageUrl: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=200&h=150'
  },
  {
    id: '2',
    name: 'Chicken Alfredo Pasta',
    ingredients: ['chicken breast', 'pasta', 'heavy cream', 'parmesan cheese', 'garlic', 'butter'],
    instructions: [
      'Cook pasta according to package instructions',
      'Season chicken with salt and pepper',
      'Cook chicken in a pan until no longer pink, then slice',
      'In the same pan, melt butter and add garlic',
      'Pour in heavy cream and bring to a simmer',
      'Add parmesan cheese and stir until melted',
      'Combine sauce with pasta and chicken'
    ],
    cookTime: 30,
    servings: 4,
    imageUrl: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=200&h=150'
  },
  // Add more recipes...
];

// Food waste categories for analytics
export const wasteCategories = [
  { name: 'Expired', color: '#FF5252' },
  { name: 'Spoiled', color: '#FF8A80' },
  { name: 'Overcooked', color: '#FFCDD2' },
  { name: 'Not Tasty', color: '#FFEBEE' }
];

// Food categories for analytics
export const foodCategories = [
  { name: 'Vegetables', color: '#4CAF50' },
  { name: 'Fruits', color: '#81C784' },
  { name: 'Dairy', color: '#C8E6C9' },
  { name: 'Meat', color: '#E8F5E9' },
  { name: 'Dry Goods', color: '#F1F8E9' }
];
