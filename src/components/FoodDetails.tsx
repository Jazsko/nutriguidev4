
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FoodItem } from "@/types/food";
import { addFoodToLog } from "@/lib/storage";
import { v4 as uuidv4 } from 'uuid';
import { toast } from "sonner";
import { Apple, BookOpen, ListChecks, Heart, CircleSlash2 } from "lucide-react";

interface FoodDetailsProps {
  food: FoodItem;
  onClose: () => void;
}

const FoodDetails: React.FC<FoodDetailsProps> = ({ food, onClose }) => {
  const [amount, setAmount] = useState<number>(100);
  const [mealType, setMealType] = useState<'breakfast' | 'lunch' | 'dinner' | 'snack'>('breakfast');
  
  const calculateNutrition = (value: number): number => {
    return parseFloat(((value * amount) / 100).toFixed(1));
  };

  const handleAddToLog = () => {
    const today = new Date().toISOString().split('T')[0];
    
    addFoodToLog({
      id: uuidv4(),
      foodItem: {
        ...food,
        amount,
      },
      date: today,
      amount,
      mealType,
      timestamp: Date.now(),
    });
    
    toast.success(`Added ${food.name} to your food log`);
    onClose();
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold text-foodvision-leafDark">{food.name}</CardTitle>
          <Apple className="h-8 w-8 text-foodvision-carrot" />
        </div>
        <CardDescription>Nutrition facts per {amount}g serving</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="nutrition">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="nutrition"><ListChecks className="h-4 w-4 mr-2" /> Nutrition</TabsTrigger>
            <TabsTrigger value="benefits"><Heart className="h-4 w-4 mr-2" /> Benefits</TabsTrigger>
            <TabsTrigger value="details"><BookOpen className="h-4 w-4 mr-2" /> Details</TabsTrigger>
          </TabsList>
          
          <TabsContent value="nutrition" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-foodvision-sky/10 p-3 rounded-lg">
                <div className="text-sm text-gray-500">Calories</div>
                <div className="text-xl font-semibold">{calculateNutrition(food.nutrition.calories)} kcal</div>
              </div>
              <div className="bg-foodvision-leaf/10 p-3 rounded-lg">
                <div className="text-sm text-gray-500">Protein</div>
                <div className="text-xl font-semibold">{calculateNutrition(food.nutrition.protein)} g</div>
              </div>
              <div className="bg-foodvision-carrot/10 p-3 rounded-lg">
                <div className="text-sm text-gray-500">Carbs</div>
                <div className="text-xl font-semibold">{calculateNutrition(food.nutrition.carbs)} g</div>
              </div>
              <div className="bg-foodvision-berry/10 p-3 rounded-lg">
                <div className="text-sm text-gray-500">Fat</div>
                <div className="text-xl font-semibold">{calculateNutrition(food.nutrition.fat)} g</div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-medium">Vitamins</h3>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(food.nutrition.vitamins).map(([name, amount]) => (
                  <div key={name} className="text-sm flex justify-between">
                    <span>{name}:</span>
                    <span className="font-medium">{amount}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-medium">Minerals</h3>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(food.nutrition.minerals).map(([name, amount]) => (
                  <div key={name} className="text-sm flex justify-between">
                    <span>{name}:</span>
                    <span className="font-medium">{amount}</span>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="benefits" className="space-y-4">
            <ul className="space-y-2">
              {food.benefits.map((benefit, idx) => (
                <li key={idx} className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-foodvision-leaf/10 flex items-center justify-center mr-2 mt-0.5">
                    <span className="text-foodvision-leaf text-sm">✓</span>
                  </div>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </TabsContent>
          
          <TabsContent value="details" className="space-y-4">
            <div className="text-sm">
              <p>This information is based on average nutritional values for {food.name}. Values may vary based on variety, ripeness, and preparation method.</p>
              <p className="mt-2">Data sourced from nutritional databases and may be approximate.</p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <div className="grid grid-cols-2 gap-4 w-full">
          <div className="space-y-2">
            <Label htmlFor="amount">Amount (g)</Label>
            <Input 
              id="amount" 
              type="number" 
              value={amount} 
              onChange={e => setAmount(Math.max(1, parseInt(e.target.value) || 0))} 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="meal-type">Meal Type</Label>
            <Select value={mealType} onValueChange={(value: any) => setMealType(value)}>
              <SelectTrigger id="meal-type">
                <SelectValue placeholder="Select meal" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="breakfast">Breakfast</SelectItem>
                <SelectItem value="lunch">Lunch</SelectItem>
                <SelectItem value="dinner">Dinner</SelectItem>
                <SelectItem value="snack">Snack</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex justify-between w-full">
          <Button variant="outline" onClick={onClose}>
            <CircleSlash2 className="mr-2 h-4 w-4" /> Cancel
          </Button>
          <Button className="bg-foodvision-leaf hover:bg-foodvision-leafDark" onClick={handleAddToLog}>
            Add to Food Log
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default FoodDetails;
