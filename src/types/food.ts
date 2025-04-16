
// Type definitions for food-related data

export interface FoodItem {
  id?: string; // Generated ID for stored items
  name: string;
  benefits: string[];
  nutrition: NutritionInfo;
  timestamp?: Date; // When was this food added to the log
  amount?: number; // Amount in grams
}

export interface NutritionInfo {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  vitamins: Record<string, string>;
  minerals: Record<string, string>;
}

export interface FoodLogEntry {
  id: string;
  foodItem: FoodItem;
  date: string; // ISO string format (YYYY-MM-DD)
  amount: number; // Amount in grams
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  timestamp: number; // Unix timestamp for sorting
}

export interface DailyNutrition {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}
