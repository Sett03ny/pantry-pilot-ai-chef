
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MobileLayout } from "@/components/mobile-layout/MobileLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  Filter, 
  Clock, 
  Utensils
} from "lucide-react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Recipe {
  id: string;
  name: string;
  ingredients: string[];
  matchedIngredients: number;
  totalIngredients: number;
  cookTime: number;
  imageUrl: string;
}

export default function RecipesPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  
  // Mock data for recipes
  const mockRecipes: Recipe[] = [
    {
      id: '1',
      name: 'Vegetable Stir Fry',
      ingredients: ['broccoli', 'carrots', 'bell pepper', 'garlic', 'soy sauce'],
      matchedIngredients: 4,
      totalIngredients: 5,
      cookTime: 20,
      imageUrl: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=200&h=150',
    },
    {
      id: '2',
      name: 'Chicken Alfredo Pasta',
      ingredients: ['chicken breast', 'pasta', 'cream', 'parmesan cheese', 'garlic'],
      matchedIngredients: 3,
      totalIngredients: 5,
      cookTime: 30,
      imageUrl: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=200&h=150',
    },
    {
      id: '3',
      name: 'Veggie Omelette',
      ingredients: ['eggs', 'bell pepper', 'onion', 'cheese', 'spinach'],
      matchedIngredients: 5,
      totalIngredients: 5,
      cookTime: 15,
      imageUrl: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=200&h=150',
    },
    {
      id: '4',
      name: 'Apple Cinnamon Oatmeal',
      ingredients: ['oats', 'apples', 'cinnamon', 'maple syrup', 'milk'],
      matchedIngredients: 2,
      totalIngredients: 5,
      cookTime: 10,
      imageUrl: 'https://images.unsplash.com/photo-1635921191443-21a68f60e8ad?auto=format&fit=crop&w=200&h=150',
    },
  ];

  return (
    <MobileLayout title="Recipe Suggestions">
      <div className="p-4">
        <div className="flex items-center mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search recipes..."
              className="pl-9 pr-4"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon" className="ml-2">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="mb-4">
          <h2 className="text-lg font-medium mb-2">Recipes With Your Ingredients</h2>
          <p className="text-sm text-muted-foreground">
            Suggested recipes based on what's in your pantry
          </p>
        </div>
        
        <div className="space-y-4">
          {mockRecipes.map((recipe) => (
            <Card key={recipe.id} className="overflow-hidden">
              <div className="flex">
                <div className="w-1/3">
                  <img 
                    src={recipe.imageUrl} 
                    alt={recipe.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <CardContent className="p-3 w-2/3">
                  <div className="flex flex-col h-full justify-between">
                    <div>
                      <h3 className="font-medium">{recipe.name}</h3>
                      
                      <div className="flex items-center text-xs text-muted-foreground mt-1">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{recipe.cookTime} mins</span>
                        
                        <span className="mx-2">•</span>
                        
                        <Utensils className="h-3 w-3 mr-1" />
                        <span>
                          {recipe.matchedIngredients}/{recipe.totalIngredients} ingredients
                        </span>
                      </div>
                    </div>
                    
                    <div className="mt-2 flex items-center justify-between">
                      <Badge 
                        variant={recipe.matchedIngredients === recipe.totalIngredients ? "default" : "outline"}
                        className={recipe.matchedIngredients === recipe.totalIngredients ? "bg-green-500" : ""}
                      >
                        {recipe.matchedIngredients === recipe.totalIngredients 
                          ? "Ready to Cook" 
                          : `Missing ${recipe.totalIngredients - recipe.matchedIngredients}`
                        }
                      </Badge>
                      <Button variant="secondary" size="sm" onClick={() => navigate(`/recipes/${recipe.id}`)}>View</Button>
                    </div>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </MobileLayout>
  );
}
