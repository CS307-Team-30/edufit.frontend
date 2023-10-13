import { useRouter } from "next/router";

import "../../src/styles/colors.css"
import "../../src/styles/globals.css"

import ComponentsLayout from "@/app/components/layout";
import Sidebar from "@/app/components/Sidebar";

export default function DynamicCommunityPage() {

  const router = useRouter();
  return (
      <ComponentsLayout>
        <div className="flex flex-row justify-between">
          <Sidebar />
          <div className="md:mr-40 ml-20 pt-20 px-12 mt-12 bg-white w-full min-h-[500px] rounded-xl ">
            {router.pathname}
          </div>
        </div>
      </ComponentsLayout>

  );
}