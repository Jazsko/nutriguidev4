import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getFoodLogByDate, removeFoodFromLog } from "@/lib/storage";
import { FoodLogEntry, DailyNutrition } from "@/types/food";
import { Trash2, Coffee, UtensilsCrossed, Pizza, Cookie, Info, PieChart, BarChart3 } from "lucide-react";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  PieChart as RechartsChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend
} from "recharts";

const COLORS = ['#9b87f5', '#7E69AB', '#6E59A5', '#D6BCFA'];

const mealIcons = {
  breakfast: <Coffee className="h-4 w-4 text-foodvision-sky" />,
  lunch: <UtensilsCrossed className="h-4 w-4 text-foodvision-leaf" />,
  dinner: <Pizza className="h-4 w-4 text-foodvision-carrot" />,
  snack: <Cookie className="h-4 w-4 text-foodvision-berry" />
};

const FoodLog: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [foodLog, setFoodLog] = useState<FoodLogEntry[]>([]);
  const [dailyNutrition, setDailyNutrition] = useState<DailyNutrition>({
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0
  });
  const [activeMetricsTab, setActiveMetricsTab] = useState("distribution");

  useEffect(() => {
    const loadLog = () => {
      const entries = getFoodLogByDate(selectedDate);
      setFoodLog(entries);
      calculateDailyNutrition(entries);
    };

    loadLog();
    const intervalId = setInterval(loadLog, 5000);
    
    return () => clearInterval(intervalId);
  }, [selectedDate]);

  const calculateDailyNutrition = (entries: FoodLogEntry[]) => {
    const dailyTotal = entries.reduce(
      (acc, entry) => {
        const { nutrition } = entry.foodItem;
        const multiplier = entry.amount / 100; // Calculate based on amount

        acc.calories += nutrition.calories * multiplier;
        acc.protein += nutrition.protein * multiplier;
        acc.carbs += nutrition.carbs * multiplier;
        acc.fat += nutrition.fat * multiplier;
        
        return acc;
      },
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );

    setDailyNutrition({
      calories: Math.round(dailyTotal.calories),
      protein: parseFloat(dailyTotal.protein.toFixed(1)),
      carbs: parseFloat(dailyTotal.carbs.toFixed(1)),
      fat: parseFloat(dailyTotal.fat.toFixed(1))
    });
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  const handleRemoveEntry = (id: string) => {
    removeFoodFromLog(id);
    toast.success("Item removed from food log");
    const updatedLog = foodLog.filter(entry => entry.id !== id);
    setFoodLog(updatedLog);
    calculateDailyNutrition(updatedLog);
  };

  const mealTypeEntries = (mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack') => {
    return foodLog.filter(entry => entry.mealType === mealType);
  };

  const getMealDistributionData = () => {
    const mealData = foodLog.reduce((acc, entry) => {
      const calories = (entry.foodItem.nutrition.calories * entry.amount) / 100;
      acc[entry.mealType] = (acc[entry.mealType] || 0) + calories;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(mealData).map(([name, value]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      value: Math.round(value)
    }));
  };

  const getNutrientDistributionData = () => {
    return [
      { name: 'Protein', value: dailyNutrition.protein },
      { name: 'Karbohydrater', value: dailyNutrition.carbs },
      { name: 'Fett', value: dailyNutrition.fat }
    ];
  };

  return (
    <div className="space-y-4 w-full max-w-md mx-auto">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Matlogg</h2>
        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          className="border rounded px-2 py-1 text-sm"
        />
      </div>

      <Card className="bg-gray-50">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Daglig Næringssammendrag</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-2 text-center">
            <div className="bg-white p-2 rounded shadow-sm">
              <div className="text-xs text-gray-500">Kalorier</div>
              <div className="font-bold">{dailyNutrition.calories}</div>
            </div>
            <div className="bg-white p-2 rounded shadow-sm">
              <div className="text-xs text-gray-500">Protein</div>
              <div className="font-bold">{dailyNutrition.protein}g</div>
            </div>
            <div className="bg-white p-2 rounded shadow-sm">
              <div className="text-xs text-gray-500">Karbo</div>
              <div className="font-bold">{dailyNutrition.carbs}g</div>
            </div>
            <div className="bg-white p-2 rounded shadow-sm">
              <div className="text-xs text-gray-500">Fett</div>
              <div className="font-bold">{dailyNutrition.fat}g</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeMetricsTab} onValueChange={setActiveMetricsTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="distribution">
                <PieChart className="h-4 w-4 mr-2" />
                Måltidsfordeling
              </TabsTrigger>
              <TabsTrigger value="nutrients">
                <BarChart3 className="h-4 w-4 mr-2" />
                Næringsstoffer
              </TabsTrigger>
            </TabsList>
            <TabsContent value="distribution" className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsChart>
                  <Pie
                    data={getMealDistributionData()}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label={({ name, value }) => `${name}: ${value} kcal`}
                  >
                    {getMealDistributionData().map((entry, index) => (
                      <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend />
                  <RechartsTooltip />
                </RechartsChart>
              </ResponsiveContainer>
            </TabsContent>
            <TabsContent value="nutrients" className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={getNutrientDistributionData()}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <RechartsTooltip />
                  <Legend />
                  <Bar dataKey="value" name="Gram" fill="#9b87f5" />
                </BarChart>
              </ResponsiveContainer>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {['breakfast', 'lunch', 'dinner', 'snack'].map((meal) => {
        const entries = mealTypeEntries(meal as any);
        if (entries.length === 0) return null;
        
        return (
          <Card key={meal} className="overflow-hidden">
            <CardHeader className="py-2 px-4 bg-gray-100 flex flex-row items-center">
              <div className="flex items-center">
                {mealIcons[meal as keyof typeof mealIcons]}
                <CardTitle className="text-base ml-2 capitalize">{meal}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <ul className="divide-y divide-gray-100">
                {entries.map((entry) => (
                  <li key={entry.id} className="p-3 hover:bg-gray-50">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">{entry.foodItem.name}</div>
                        <div className="text-sm text-gray-500">
                          {entry.amount}g • {Math.round((entry.foodItem.nutrition.calories * entry.amount) / 100)} kcal
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-8 w-8 p-0"
                                onClick={() => handleRemoveEntry(entry.id)}
                              >
                                <Trash2 className="h-4 w-4 text-gray-400" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Remove from log</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        );
      })}

      {foodLog.length === 0 && (
        <div className="text-center p-6">
          <Info className="h-8 w-8 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-500">Ingen matvarer registrert for denne dagen.</p>
          <p className="text-sm text-gray-400 mt-1">Søk etter mat for å legge til i loggen.</p>
        </div>
      )}
    </div>
  );
};

export default FoodLog;
