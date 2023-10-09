import "../src/styles/colors.css"
import "../src/styles/globals.css"

import ComponentsLayout from "@/app/components/layout";

// pages/about.tsx
export default function About() {
  return (


      <ComponentsLayout>
        <div className="md:mx-40 pt-20 px-12 mt-12 bg-white">
            <h1 className="text-2xl font-bold">Home Page</h1>
            <p className=" mt-16 text-gray-600">This is the home page.</p>

        </div>
      </ComponentsLayout>

  );
}