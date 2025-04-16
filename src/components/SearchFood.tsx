
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Loader2 } from "lucide-react";
import { FoodItem } from "@/types/food";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface SearchFoodProps {
  onFoodSelected: (food: FoodItem) => void;
}

const SearchFood: React.FC<SearchFoodProps> = ({ onFoodSelected }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('food-search', {
        body: { searchQuery: searchQuery }
      });

      if (error) throw error;
      
      if (data) {
        onFoodSelected(data);
      } else {
        toast.error(`Fant ikke informasjon om "${searchQuery}". Prøv en annen matvare.`);
      }
    } catch (error) {
      console.error("Error searching for food:", error);
      toast.error("Det oppstod en feil under søket. Vennligst prøv igjen.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex space-x-2 w-full max-w-md mx-auto">
      <Input
        type="text"
        placeholder="Søk etter matvare (f.eks. eple, egg, avokado)"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="flex-grow"
        disabled={isLoading}
      />
      <Button 
        type="submit" 
        disabled={isLoading || !searchQuery.trim()}
        className="bg-foodvision-leaf hover:bg-foodvision-leafDark"
      >
        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
      </Button>
    </form>
  );
};

export default SearchFood;
