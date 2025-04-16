
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Camera, ListFilter, Heart, Battery, Feather } from "lucide-react";
import { Link } from "react-router-dom";

const About: React.FC = () => {
  return (
    <div className="container max-w-md mx-auto p-4 min-h-screen">
      <header className="mb-8 flex items-center">
        <Button variant="ghost" size="sm" asChild>
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Link>
        </Button>
        <h1 className="text-2xl font-bold text-foodvision-leafDark ml-auto mr-auto pr-8">About</h1>
      </header>

      <div className="space-y-6">
        <div className="text-center mb-8">
          <div className="bg-foodvision-leaf/10 rounded-full h-24 w-24 flex items-center justify-center mx-auto mb-4">
            <Camera className="h-12 w-12 text-foodvision-leaf" />
          </div>
          <h2 className="text-xl font-bold text-foodvision-leafDark">Food Vision</h2>
          <p className="text-gray-500">Your personal food nutrition guide</p>
        </div>

        <section className="space-y-4">
          <div className="flex items-start">
            <div className="bg-foodvision-sky/10 rounded-full h-10 w-10 flex items-center justify-center mr-4">
              <Camera className="h-5 w-5 text-foodvision-sky" />
            </div>
            <div>
              <h3 className="font-medium">Food Identification</h3>
              <p className="text-gray-500 text-sm">
                Take a photo of any food and our app will identify it using advanced AI technology.
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="bg-foodvision-leaf/10 rounded-full h-10 w-10 flex items-center justify-center mr-4">
              <Heart className="h-5 w-5 text-foodvision-leaf" />
            </div>
            <div>
              <h3 className="font-medium">Health Benefits</h3>
              <p className="text-gray-500 text-sm">
                Learn about the health benefits of different foods and how they contribute to your wellbeing.
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="bg-foodvision-carrot/10 rounded-full h-10 w-10 flex items-center justify-center mr-4">
              <Feather className="h-5 w-5 text-foodvision-carrot" />
            </div>
            <div>
              <h3 className="font-medium">Nutritional Information</h3>
              <p className="text-gray-500 text-sm">
                Get detailed nutritional information including vitamins, minerals, protein, carbs, and fat content.
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="bg-foodvision-berry/10 rounded-full h-10 w-10 flex items-center justify-center mr-4">
              <ListFilter className="h-5 w-5 text-foodvision-berry" />
            </div>
            <div>
              <h3 className="font-medium">Food Logging</h3>
              <p className="text-gray-500 text-sm">
                Keep track of your daily food intake and monitor your nutritional goals.
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="bg-foodvision-sand/10 rounded-full h-10 w-10 flex items-center justify-center mr-4">
              <Battery className="h-5 w-5 text-foodvision-sand" />
            </div>
            <div>
              <h3 className="font-medium">Energy Tracking</h3>
              <p className="text-gray-500 text-sm">
                Monitor your calorie intake throughout the day to support your health and fitness goals.
              </p>
            </div>
          </div>
        </section>

        <div className="pt-6 text-center text-sm text-gray-400">
          <p>Version 1.0.0</p>
          <p>Powered by AI and nutritional science</p>
        </div>
      </div>
    </div>
  );
};

export default About;
