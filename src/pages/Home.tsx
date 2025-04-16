
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, ListFilter, Info } from "lucide-react";
import FoodDetails from "@/components/FoodDetails";
import SearchFood from "@/components/SearchFood";
import FoodLog from "@/components/FoodLog";
import { FoodItem } from "@/types/food";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  const [activeTab, setActiveTab] = useState("search");
  const [detectedFood, setDetectedFood] = useState<FoodItem | null>(null);

  const handleFoodSelected = (food: FoodItem) => {
    setDetectedFood(food);
  };

  const handleCloseDetails = () => {
    setDetectedFood(null);
  };

  return (
    <div className="container max-w-md mx-auto p-4 min-h-screen flex flex-col">
      <header className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foodvision-leafDark">Food Vision</h1>
          <p className="text-gray-500">Din guide til mat og ernæring</p>
        </div>
        <Link to="/about">
          <Info className="h-5 w-5 text-gray-400 hover:text-foodvision-leafDark" />
        </Link>
      </header>

      {detectedFood ? (
        <FoodDetails food={detectedFood} onClose={handleCloseDetails} />
      ) : (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="search">
              <Search className="mr-2 h-4 w-4" />
              Søk
            </TabsTrigger>
            <TabsTrigger value="log">
              <ListFilter className="mr-2 h-4 w-4" />
              Matlogg
            </TabsTrigger>
          </TabsList>

          <TabsContent value="search" className="py-4">
            <div className="space-y-4">
              <SearchFood onFoodSelected={handleFoodSelected} />
              <div className="text-center p-4 text-gray-500 text-sm">
                <p>Søk etter matvarer for å se næringsinnhold</p>
                <p className="mt-2">Prøv: "eple", "banan", osv.</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="log" className="flex-1">
            <FoodLog />
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default Home;
