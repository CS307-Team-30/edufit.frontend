import "../src/styles/colors.css"
import "../src/styles/globals.css"

import ComponentsLayout from "@/app/components/layout";
import NutritionInput from "@/app/components/NutritionInput";  

// pages/about.tsx
export default function NutritionPage() {
  return (


      <ComponentsLayout>
        <div className="md:mx-40 pt-20 px-12 mt-12 bg-white min-h-[500px]">
        <h1 className="text-2xl mb-4">Nutrition Tracker</h1>  {/* Added a heading */}
        <NutritionInput />  {/* Added the NutritionInput component */}
      </div>
      </ComponentsLayout>

  );
}