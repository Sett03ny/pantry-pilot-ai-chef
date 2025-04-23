
import { MobileLayout } from "@/components/mobile-layout/MobileLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera, Clock, BookOpen } from "lucide-react";

export default function HomePage() {
  return (
    <MobileLayout>
      <div className="p-4 space-y-6">
        <section className="text-center mb-6">
          <h1 className="text-2xl font-bold text-primary mb-2">Welcome to SmartPantry</h1>
          <p className="text-muted-foreground">Reduce food waste and save money</p>
        </section>

        <section className="space-y-3">
          <Card className="bg-gradient-to-br from-primary to-secondary border-none shadow-lg">
            <CardContent className="p-6 text-white">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-lg">Quick Scan</h3>
                  <p className="text-sm opacity-90">Add items with receipt scanner</p>
                </div>
                <Button 
                  variant="secondary" 
                  size="sm" 
                  className="bg-white text-primary hover:bg-gray-100"
                  onClick={() => window.location.href = '/scan'}
                >
                  <Camera className="w-4 h-4 mr-2" /> Scan
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-lg">Expiring Soon</h3>
                  <p className="text-sm text-muted-foreground">3 items expiring this week</p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => window.location.href = '/inventory'}
                >
                  <Clock className="w-4 h-4 mr-2" /> View
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-lg">Recipe Suggestions</h3>
                  <p className="text-sm text-muted-foreground">5 recipes with your ingredients</p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => window.location.href = '/recipes'}
                >
                  <BookOpen className="w-4 h-4 mr-2" /> View
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="mt-6">
          <h2 className="text-lg font-medium mb-3">Food Waste Insights</h2>
          <div className="bg-white p-4 rounded-lg border">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">You've reduced waste by</p>
              <p className="text-3xl font-bold text-primary">32%</p>
              <p className="text-sm text-muted-foreground">compared to last month</p>
            </div>
          </div>
        </section>
      </div>
    </MobileLayout>
  );
}
