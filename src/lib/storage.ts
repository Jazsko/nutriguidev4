
// Local storage utility for storing and retrieving food log data
import { FoodLogEntry } from "@/types/food";

const FOOD_LOG_KEY = 'food-vision-log';

export const saveFoodLog = (foodLog: FoodLogEntry[]): void => {
  try {
    localStorage.setItem(FOOD_LOG_KEY, JSON.stringify(foodLog));
  } catch (error) {
    console.error('Error saving food log to local storage:', error);
  }
};

export const loadFoodLog = (): FoodLogEntry[] => {
  try {
    const storedLog = localStorage.getItem(FOOD_LOG_KEY);
    if (!storedLog) return [];
    return JSON.parse(storedLog);
  } catch (error) {
    console.error('Error loading food log from local storage:', error);
    return [];
  }
};

export const addFoodToLog = (entry: FoodLogEntry): void => {
  try {
    const currentLog = loadFoodLog();
    saveFoodLog([...currentLog, entry]);
  } catch (error) {
    console.error('Error adding food to log:', error);
  }
};

export const removeFoodFromLog = (id: string): void => {
  try {
    const currentLog = loadFoodLog();
    saveFoodLog(currentLog.filter(entry => entry.id !== id));
  } catch (error) {
    console.error('Error removing food from log:', error);
  }
};

export const getFoodLogByDate = (date: string): FoodLogEntry[] => {
  try {
    const currentLog = loadFoodLog();
    return currentLog.filter(entry => entry.date === date);
  } catch (error) {
    console.error('Error getting food log by date:', error);
    return [];
  }
};
