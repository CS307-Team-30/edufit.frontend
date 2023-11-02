import axios from "axios";

import "../src/styles/colors.css"
import "../src/styles/globals.css"

// import 'bootstrap/dist/css/bootstrap.min.css';
import ComponentsLayout from "@/app/components/layout";
import PostBox from "@/app/components/PostBox";
import Sidebar from "@/app/components/Sidebar";
import { useGlobalStore } from "@/app/stores/UserStore";

import { Community } from "@/types/Community";

type HomePageProps = {
  communities: Array<Community>
}

export default function Homepage({ communities }: HomePageProps) {

  


  const user = useGlobalStore((state) => state.user) 

  const updateCommunities = useGlobalStore(state => state.update)

  updateCommunities(communities)


  


  if (user.exp != -1)
  {

  return (


      <ComponentsLayout>
        <div className="flex flex-row justify-between">
          <Sidebar />
          <div id="threads" className="w-full bg-pink-300 flex-col justify-center mr-32 relative">
            <div className="bg-white rounded-lg mt-8 mx-16 px-10 py-8">
              <div className="flex flex-row justify-between">
                <h1>Arch Linux Supremacy</h1>
                <div className="flex flex-row space-x-4">
                  <h4>Author: Arnob</h4>
                  <h4>Community: CS307</h4>
                </div>
              </div>
              <p className="mt-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
            <div className="bg-white rounded-lg mt-8 mx-16 px-10 py-8">
            <div className="flex flex-row justify-between">
                <h1>Shell Project</h1>
                <div className="flex flex-row space-x-4">
                  <h4>Author: Kareem</h4>
                  <h4>Community: CS252</h4>
                </div>
              </div>
              <p className="pt-4 pb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
              <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</p>
            </div>
            <div className="bg-white rounded-lg mt-8 mx-16 px-10 py-8">
            <div className="flex flex-row justify-between">
                <h1>Thread 3</h1>
                <div className="flex flex-row space-x-4">
                  <h4>Author: Jack</h4>
                  <h4>Community: CS348</h4>
                </div>
              </div>
              <p className="mt-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>

          </div>
          
        <PostBox />
        </div>
      </ComponentsLayout>

  );
  } else {
    return (
      <div className="w-full h-full text-black">
        Loading...
      </div>
    )
  }

}




 
export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const resData = await axios.get("http://127.0.0.1:8000/all-communities")
  const communities: Array<Community> = resData.data
  return {
    props: {
      communities
    },
  }
}