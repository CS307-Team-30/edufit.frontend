import "../src/styles/colors.css"
import "../src/styles/globals.css"


import ComponentsLayout from "@/app/components/layout";
import UserForm from "@/app/components/UserForm";

export default function UserPage() {

  return (


      <ComponentsLayout>
        <div className="md:mx-40 pt-20 px-12 mt-12 bg-white min-h-[500px] rounded-lg">
          <UserForm />
        </div>
      </ComponentsLayout>

  );
}