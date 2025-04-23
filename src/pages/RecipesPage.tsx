
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
import { recipeDatabase } from "@/lib/food-data";

export default function RecipesPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter recipes based on search query
  const filteredRecipes = recipeDatabase.filter(recipe => 
    recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    recipe.ingredients.some(ing => ing.toLowerCase().includes(searchQuery.toLowerCase()))
  );

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
          {filteredRecipes.map((recipe) => (
            <Card key={recipe.id} className="overflow-hidden">
              <div className="flex">
                <div className="w-1/3">
                  <img 
                    src={recipe.imageUrl || "https://images.unsplash.com/photo-1635921191443-21a68f60e8ad?auto=format&fit=crop&w=200&h=150"} 
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
                          {recipe.matchedIngredients !== undefined ? 
                            `${recipe.matchedIngredients}/${recipe.ingredients.length}` : 
                            `${recipe.ingredients.length}`} ingredients
                        </span>
                      </div>
                    </div>
                    
                    <div className="mt-2 flex items-center justify-between">
                      <Badge 
                        variant={recipe.matchedIngredients === recipe.ingredients.length ? "default" : "outline"}
                        className={recipe.matchedIngredients === recipe.ingredients.length ? "bg-green-500" : ""}
                      >
                        {recipe.matchedIngredients === recipe.ingredients.length 
                          ? "Ready to Cook" 
                          : `Missing ${recipe.ingredients.length - (recipe.matchedIngredients || 0)}`
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
