
import { useState } from "react";
import { MobileLayout } from "@/components/mobile-layout/MobileLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, Plus, MapPin, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { AddItemModal } from "@/components/inventory/AddItemModal";

interface FoodItem {
  id: string;
  name: string;
  expiry: Date;
  location: 'fridge' | 'freezer' | 'pantry';
  quantity: number;
  unit: string;
}

// Mock data for inventory
const mockInventory: FoodItem[] = [
  {
    id: '1',
    name: 'Milk',
    expiry: new Date(2023, 4, 25),
    location: 'fridge',
    quantity: 1,
    unit: 'gallon',
  },
  {
    id: '2',
    name: 'Eggs',
    expiry: new Date(2023, 4, 30),
    location: 'fridge',
    quantity: 12,
    unit: 'count',
  },
  {
    id: '3',
    name: 'Bread',
    expiry: new Date(2023, 4, 20),
    location: 'pantry',
    quantity: 1,
    unit: 'loaf',
  },
  {
    id: '4',
    name: 'Chicken Breast',
    expiry: new Date(2023, 4, 18),
    location: 'freezer',
    quantity: 2,
    unit: 'lbs',
  },
  {
    id: '5',
    name: 'Apples',
    expiry: new Date(2023, 4, 25),
    location: 'fridge',
    quantity: 6,
    unit: 'count',
  },
];

export default function InventoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [inventory, setInventory] = useState<FoodItem[]>(mockInventory);
  
  // Use the inventory state
  
  const getExpiryStatus = (date: Date) => {
    const now = new Date();
    const diffDays = Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return { label: 'Expired', color: 'bg-red-500' };
    if (diffDays <= 3) return { label: `${diffDays} days left`, color: 'bg-orange-500' };
    if (diffDays <= 7) return { label: `${diffDays} days left`, color: 'bg-yellow-500' };
    return { label: 'Good', color: 'bg-green-500' };
  };
  
  const getLocationIcon = (location: string) => {
    switch (location) {
      case 'fridge':
        return '🧊';
      case 'freezer':
        return '❄️';
      case 'pantry':
        return '🥫';
      default:
        return '📦';
    }
  };
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <MobileLayout title="Inventory">
      <div className="p-4">
        <div className="flex items-center mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search inventory..."
              className="pl-9 pr-4"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon" className="ml-2">
            <Filter className="h-4 w-4" />
          </Button>
          <Button size="icon" className="ml-2" onClick={() => setIsAddModalOpen(true)}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <Tabs defaultValue="all">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="fridge">Fridge</TabsTrigger>
            <TabsTrigger value="freezer">Freezer</TabsTrigger>
            <TabsTrigger value="pantry">Pantry</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-3">
            {inventory.map((item) => {
              const expiry = getExpiryStatus(item.expiry);
              
              return (
                <Card key={item.id}>
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                          <span className="text-lg">{getLocationIcon(item.location)}</span>
                        </div>
                        <div>
                          <h3 className="font-medium">{item.name}</h3>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <MapPin className="h-3 w-3 mr-1" /> 
                            <span className="capitalize">{item.location}</span>
                            <span className="mx-2">•</span>
                            <Clock className="h-3 w-3 mr-1" />
                            <span>Exp: {formatDate(item.expiry)}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-end">
                        <span className="text-sm font-medium">
                          {item.quantity} {item.unit}
                        </span>
                        <Badge variant="secondary" className={`${expiry.color} text-white mt-1`}>
                          {expiry.label}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </TabsContent>
          
          {['fridge', 'freezer', 'pantry'].map((location) => (
            <TabsContent key={location} value={location} className="space-y-3">
              {inventory
                .filter(item => item.location === location)
                .map((item) => {
                  const expiry = getExpiryStatus(item.expiry);
                  
                  return (
                    <Card key={item.id}>
                      <CardContent className="p-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                              <span className="text-lg">{getLocationIcon(item.location)}</span>
                            </div>
                            <div>
                              <h3 className="font-medium">{item.name}</h3>
                              <div className="flex items-center text-xs text-muted-foreground">
                                <Clock className="h-3 w-3 mr-1" />
                                <span>Exp: {formatDate(item.expiry)}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex flex-col items-end">
                            <span className="text-sm font-medium">
                              {item.quantity} {item.unit}
                            </span>
                            <Badge variant="secondary" className={`${expiry.color} text-white mt-1`}>
                              {expiry.label}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
            </TabsContent>
          ))}
        </Tabs>
      </div>

      <AddItemModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={(newItem) => {
          setInventory(prev => [...prev, newItem]);
        }}
      />
    </MobileLayout>
  );
}
