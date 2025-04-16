
// OpenAI API service for food recognition and information
import { toast } from "sonner";

interface FoodRecognitionResponse {
  name: string;
  benefits: string[];
  nutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    vitamins: Record<string, string>;
    minerals: Record<string, string>;
  };
}

export const recognizeFood = async (imageBase64: string): Promise<FoodRecognitionResponse | null> => {
  // For now, this is a placeholder. In production, you would need to:
  // 1. Send the image to OpenAI API
  // 2. Process the response to extract food information
  
  try {
    // Simulated response for development (would be replaced with actual API call)
    // In production, uncomment and implement the API call below
    
    /*
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Identify this food item. Return a JSON object with name, health benefits, and nutritional information per 100g (vitamins, minerals, protein, fat, calories, carbohydrates)."
              },
              {
                type: "image_url",
                image_url: {
                  url: `data:image/jpeg;base64,${imageBase64}`
                }
              }
            ]
          }
        ]
      })
    });
    
    const data = await response.json();
    // Extract and process the response
    */
    
    // For development, return mock data based on a timer to simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock response - this would be replaced with actual API response parsing
    return {
      name: "Apple",
      benefits: [
        "Supports heart health",
        "Helps maintain good gut bacteria",
        "May lower risk of type 2 diabetes",
        "Supports weight management"
      ],
      nutrition: {
        calories: 52,
        protein: 0.3,
        carbs: 13.8,
        fat: 0.2,
        vitamins: {
          "Vitamin C": "4.6mg",
          "Vitamin A": "3μg",
          "Vitamin K": "2.2μg",
          "Vitamin E": "0.18mg",
          "Vitamin B6": "0.041mg"
        },
        minerals: {
          "Potassium": "107mg",
          "Calcium": "6mg",
          "Phosphorus": "11mg",
          "Magnesium": "5mg"
        }
      }
    };
  } catch (error) {
    console.error("Error recognizing food:", error);
    toast.error("Failed to recognize food. Please try again.");
    return null;
  }
};

export const getFoodInfo = async (foodName: string): Promise<FoodRecognitionResponse | null> => {
  // Similar to recognizeFood, but using text query instead of image
  try {
    // Simulated response for development
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // This would be replaced with an actual API call in production
    // For now, return mock data for demonstration
    const mockFoods: Record<string, FoodRecognitionResponse> = {
      "apple": {
        name: "Eple",
        benefits: [
          "Støtter hjertehelse",
          "Hjelper med å opprettholde gode tarmbakterier",
          "Kan redusere risiko for diabetes type 2",
          "Støtter vektstyring"
        ],
        nutrition: {
          calories: 52,
          protein: 0.3,
          carbs: 13.8,
          fat: 0.2,
          vitamins: {
            "Vitamin C": "4.6mg",
            "Vitamin A": "3μg",
            "Vitamin K": "2.2μg",
            "Vitamin E": "0.18mg",
            "Vitamin B6": "0.041mg"
          },
          minerals: {
            "Kalium": "107mg",
            "Kalsium": "6mg",
            "Fosfor": "11mg",
            "Magnesium": "5mg"
          }
        }
      },
      "banana": {
        name: "Banan",
        benefits: [
          "Rik på kalium for hjertehelse",
          "Inneholder antioksidanter som beskytter mot frie radikaler",
          "Støtter fordøyelseshelse med fiber",
          "Kan bidra til å moderere blodsukkernivåer"
        ],
        nutrition: {
          calories: 89,
          protein: 1.1,
          carbs: 22.8,
          fat: 0.3,
          vitamins: {
            "Vitamin C": "8.7mg",
            "Vitamin B6": "0.4mg",
            "Vitamin A": "3μg",
            "Folat": "20μg"
          },
          minerals: {
            "Kalium": "358mg",
            "Magnesium": "27mg",
            "Fosfor": "22mg",
            "Kalsium": "5mg"
          }
        }
      },
      "egg": {
        name: "Egg",
        benefits: [
          "Komplett proteinkilde med alle essensielle aminosyrer",
          "Inneholder kolin som er viktig for hjernefunksjonen",
          "Rik på antioksidanter som lutein og zeaxanthin for øyehelse",
          "Inneholder vitamin D som er viktig for skjelett og immunforsvar"
        ],
        nutrition: {
          calories: 143,
          protein: 12.6,
          carbs: 0.7,
          fat: 9.5,
          vitamins: {
            "Vitamin A": "149μg",
            "Vitamin D": "2.0μg",
            "Vitamin E": "1.05mg",
            "Vitamin B12": "0.89μg",
            "Folat": "47μg"
          },
          minerals: {
            "Jern": "1.75mg",
            "Sink": "1.29mg",
            "Selen": "30.7μg",
            "Fosfor": "198mg",
            "Kalsium": "56mg"
          }
        }
      },
      "mango": {
        name: "Mango",
        benefits: [
          "Rik på antioksidanter som kan beskytte mot kreft",
          "Inneholder fordøyelsesenzymer som kan forbedre fordøyelsen",
          "Bidrar til å styrke immunforsvaret med vitamin A og C",
          "Kan bidra til bedre hudhelse med betakaroten"
        ],
        nutrition: {
          calories: 60,
          protein: 0.8,
          carbs: 15,
          fat: 0.4,
          vitamins: {
            "Vitamin C": "36mg",
            "Vitamin A": "54μg",
            "Vitamin E": "0.9mg",
            "Vitamin K": "4.2μg",
            "Folat": "43μg"
          },
          minerals: {
            "Kalium": "168mg",
            "Magnesium": "10mg",
            "Kalsium": "11mg",
            "Fosfor": "14mg",
            "Jern": "0.16mg"
          }
        }
      },
      "broccoli": {
        name: "Brokkoli",
        benefits: [
          "Inneholder sterke krefthemmende forbindelser",
          "Rik på antioksidanter som beskytter mot frie radikaler",
          "Bidrar til å senke kolesterol og forbedre hjertehelsen",
          "Støtter avgiftning i kroppen"
        ],
        nutrition: {
          calories: 34,
          protein: 2.8,
          carbs: 6.6,
          fat: 0.4,
          vitamins: {
            "Vitamin C": "89.2mg",
            "Vitamin K": "101.6μg",
            "Vitamin A": "31μg",
            "Folat": "63μg",
            "Vitamin B6": "0.175mg"
          },
          minerals: {
            "Kalium": "316mg",
            "Kalsium": "47mg",
            "Magnesium": "21mg",
            "Fosfor": "66mg",
            "Jern": "0.73mg"
          }
        }
      },
      "laks": {
        name: "Laks",
        benefits: [
          "Rik kilde til omega-3 fettsyrer for hjerte- og hjernehelse",
          "Høyverdig protein for muskelbygging og vedlikehold",
          "Inneholder astaxanthin, en kraftig antioksidant",
          "Bidrar til å redusere betennelse i kroppen"
        ],
        nutrition: {
          calories: 208,
          protein: 20.4,
          carbs: 0,
          fat: 13.4,
          vitamins: {
            "Vitamin D": "13.1μg",
            "Vitamin B12": "2.8μg",
            "Niacin": "7.9mg",
            "Vitamin B6": "0.8mg",
            "Pantotensyre": "1.5mg"
          },
          minerals: {
            "Selen": "41.4μg",
            "Fosfor": "250mg",
            "Kalium": "363mg",
            "Magnesium": "29mg",
            "Jod": "12μg"
          }
        }
      },
      "tomat": {
        name: "Tomat",
        benefits: [
          "Rik på lykopen, en antioksidant som beskytter mot flere kreftformer",
          "Støtter hjertehelse og kan bidra til å senke blodtrykk",
          "Fremmer hudhelse og beskytter mot UV-skader",
          "Reduserer betennelse i kroppen"
        ],
        nutrition: {
          calories: 18,
          protein: 0.9,
          carbs: 3.9,
          fat: 0.2,
          vitamins: {
            "Vitamin C": "13.7mg",
            "Vitamin A": "42μg",
            "Vitamin K": "7.9μg",
            "Folat": "15μg",
            "Vitamin E": "0.54mg"
          },
          minerals: {
            "Kalium": "237mg",
            "Kalsium": "10mg",
            "Magnesium": "11mg",
            "Fosfor": "24mg",
            "Jern": "0.27mg"
          }
        }
      },
      "avokado": {
        name: "Avokado",
        benefits: [
          "Inneholder sunne enumettede fettsyrer som støtter hjertehelsen",
          "Rik på fiber som fremmer god fordøyelse",
          "Inneholder antioksidanter som lutein og zeaxanthin for øyehelse",
          "Kan bidra til å senke kolesterol og triglyserider"
        ],
        nutrition: {
          calories: 160,
          protein: 2,
          carbs: 8.5,
          fat: 14.7,
          vitamins: {
            "Vitamin K": "21μg",
            "Folat": "81μg",
            "Vitamin C": "10mg",
            "Vitamin E": "2.07mg",
            "Vitamin B6": "0.257mg"
          },
          minerals: {
            "Kalium": "485mg",
            "Magnesium": "29mg",
            "Kalsium": "12mg",
            "Fosfor": "52mg",
            "Jern": "0.55mg"
          }
        }
      },
      "blåbær": {
        name: "Blåbær",
        benefits: [
          "En av de mest antioksidantrike matvarene som bekjemper aldring",
          "Forbedrer hjernefunksjon og hukommelse",
          "Kan bidra til senket blodtrykk",
          "Støtter urinveishelse og bekjemper infeksjoner"
        ],
        nutrition: {
          calories: 57,
          protein: 0.7,
          carbs: 14.5,
          fat: 0.3,
          vitamins: {
            "Vitamin C": "9.7mg",
            "Vitamin K": "19.3μg",
            "Vitamin E": "0.57mg",
            "Vitamin A": "3μg",
            "Folat": "6μg"
          },
          minerals: {
            "Mangan": "0.336mg",
            "Kalium": "77mg",
            "Kalsium": "6mg",
            "Magnesium": "6mg",
            "Jern": "0.28mg"
          }
        }
      },
      "eple": {
        name: "Eple",
        benefits: [
          "Støtter hjertehelse",
          "Hjelper med å opprettholde gode tarmbakterier",
          "Kan redusere risiko for diabetes type 2",
          "Støtter vektstyring"
        ],
        nutrition: {
          calories: 52,
          protein: 0.3,
          carbs: 13.8,
          fat: 0.2,
          vitamins: {
            "Vitamin C": "4.6mg",
            "Vitamin A": "3μg",
            "Vitamin K": "2.2μg",
            "Vitamin E": "0.18mg",
            "Vitamin B6": "0.041mg"
          },
          minerals: {
            "Kalium": "107mg",
            "Kalsium": "6mg",
            "Fosfor": "11mg",
            "Magnesium": "5mg"
          }
        }
      },
      "banan": {
        name: "Banan",
        benefits: [
          "Rik på kalium for hjertehelse",
          "Inneholder antioksidanter som beskytter mot frie radikaler",
          "Støtter fordøyelseshelse med fiber",
          "Kan bidra til å moderere blodsukkernivåer"
        ],
        nutrition: {
          calories: 89,
          protein: 1.1,
          carbs: 22.8,
          fat: 0.3,
          vitamins: {
            "Vitamin C": "8.7mg",
            "Vitamin B6": "0.4mg",
            "Vitamin A": "3μg",
            "Folat": "20μg"
          },
          minerals: {
            "Kalium": "358mg",
            "Magnesium": "27mg",
            "Fosfor": "22mg",
            "Kalsium": "5mg"
          }
        }
      }
    };
    
    const searchKey = foodName.toLowerCase();
    // Return the matching food or null
    return mockFoods[searchKey] || null;
  } catch (error) {
    console.error("Error getting food info:", error);
    toast.error("Kunne ikke finne matvarinformasjon. Vennligst prøv igjen.");
    return null;
  }
};
