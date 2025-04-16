
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { searchQuery } = await req.json();

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `Du er en ernæringsekspert som gir detaljert informasjon om matvarer. 
            Returner alltid data i følgende JSON-format:
            {
              "name": "Matvarens navn på norsk",
              "benefits": ["fordel1", "fordel2", ...],
              "nutrition": {
                "calories": tall,
                "protein": tall,
                "carbs": tall,
                "fat": tall,
                "vitamins": {"vitaminNavn": "mengde"},
                "minerals": {"mineralNavn": "mengde"}
              }
            }`
          },
          {
            role: 'user',
            content: `Gi meg detaljert næringsinformasjon om: ${searchQuery}`
          }
        ],
      }),
    });

    const data = await response.json();
    const foodInfo = JSON.parse(data.choices[0].message.content);

    return new Response(JSON.stringify(foodInfo), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in food-search function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
