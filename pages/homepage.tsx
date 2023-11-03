import axios from "axios";

import "../src/styles/colors.css"
import "../src/styles/globals.css"

// import 'bootstrap/dist/css/bootstrap.min.css';
import ComponentsLayout from "@/app/components/layout";
import PostBox from "@/app/components/PostBox";
import PostComponent from "@/app/components/PostComponent";
import Sidebar from "@/app/components/Sidebar";
import { useGlobalStore } from "@/app/stores/UserStore";

import { Community } from "@/types/Community";

type HomePageProps = {
  communities: Array<Community>
}

export default function Homepage({ communities }: HomePageProps) {

  


  const user = useGlobalStore((state) => state.user) 


  const updateCommunities = useGlobalStore(state => state.update)
  const posts = useGlobalStore((state) => state.homepagePosts)

  updateCommunities(communities)


  


  if (user.exp != -1)
  {

  return (


      <ComponentsLayout>
        <div className="flex flex-row justify-between">
          <Sidebar />
          <div id="threads" className="w-full ml-8 bg-pink-300 flex-col justify-center mr-32 relative">
            {posts.map((item, index) => (
                <div className="pt-6 pb-10 px-12 mt-12 bg-white w-full min-h-[200px] rounded-xl" key={index}>
                  <PostComponent author={item.author.username} title={item.title} community={item.community} content={item.content} />
                </div>
              ))
              }

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