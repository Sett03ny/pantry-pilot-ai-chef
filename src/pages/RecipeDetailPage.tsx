
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MobileLayout } from "@/components/mobile-layout/MobileLayout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, Users, ChevronDown, ChevronUp, Bookmark } from "lucide-react";
import { recipeDatabase, Recipe } from "@/lib/food-data";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";

export default function RecipeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [showInstructions, setShowInstructions] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  
  useEffect(() => {
    if (id) {
      const foundRecipe = recipeDatabase.find(r => r.id === id);
      if (foundRecipe) {
        setRecipe(foundRecipe);
      } else {
        // Recipe not found, redirect to recipes page
        navigate("/recipes");
      }
    }
  }, [id, navigate]);
  
  const handleSaveRecipe = () => {
    setIsSaved(!isSaved);
    toast({
      title: isSaved ? "Recipe removed" : "Recipe saved",
      description: isSaved ? "This recipe has been removed from your saved recipes." : "This recipe has been saved to your collection.",
    });
  };
  
  const handleStartCooking = () => {
    toast({
      title: "Let's start cooking!",
      description: "Recipe instructions are ready to follow.",
    });
    // Scroll to instructions
    setShowInstructions(true);
    document.getElementById('instructions')?.scrollIntoView({ behavior: 'smooth' });
  };
  
  if (!recipe) {
    return (
      <MobileLayout title="Loading Recipe...">
        <div className="flex items-center justify-center h-full">
          <div className="animate-pulse">Loading recipe...</div>
        </div>
      </MobileLayout>
    );
  }
  
  return (
    <MobileLayout title="Recipe">
      <div className="pb-12">
        {/* Header with back button */}
        <div className="flex items-center p-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/recipes")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </div>
        
        {/* Recipe hero image */}
        <div className="relative w-full h-48">
          <img 
            src={recipe.imageUrl || "https://images.unsplash.com/photo-1635921191443-21a68f60e8ad?auto=format&fit=crop&q=80"} 
            alt={recipe.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Recipe information */}
        <div className="p-4">
          <h1 className="text-2xl font-bold">{recipe.name}</h1>
          
          <div className="flex items-center mt-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4 mr-1" />
            <span>{recipe.cookTime} minutes</span>
            <span className="mx-2">•</span>
            <Users className="h-4 w-4 mr-1" />
            <span>{recipe.servings} servings</span>
          </div>
          
          {/* Ingredients */}
          <div className="mt-6">
            <h2 className="text-lg font-medium mb-2">Ingredients</h2>
            <ul className="space-y-2">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                  <span className="capitalize">{ingredient}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <Separator className="my-6" />
          
          {/* Instructions */}
          <div id="instructions">
            <div 
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setShowInstructions(!showInstructions)}
            >
              <h2 className="text-lg font-medium">Instructions</h2>
              <Button variant="ghost" size="sm">
                {showInstructions ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            </div>
            
            {showInstructions && recipe.instructions && (
              <ol className="mt-4 space-y-4 pl-4">
                {recipe.instructions.map((instruction, index) => (
                  <li key={index} className="flex">
                    <span className="font-medium text-primary mr-2">{index + 1}.</span>
                    <span>{instruction}</span>
                  </li>
                ))}
              </ol>
            )}
          </div>
          
          {/* Action buttons */}
          <div className="fixed bottom-20 left-0 right-0 p-4 bg-background border-t">
            <div className="flex gap-3">
              <Button 
                variant={isSaved ? "default" : "outline"} 
                className={`flex-1 ${isSaved ? "bg-green-500" : ""}`}
                onClick={handleSaveRecipe}
              >
                <Bookmark className={`mr-2 h-4 w-4 ${isSaved ? "fill-white" : ""}`} />
                {isSaved ? "Saved" : "Save Recipe"}
              </Button>
              <Button className="flex-1" onClick={handleStartCooking}>Start Cooking</Button>
            </div>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
}
