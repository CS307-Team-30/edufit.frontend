import axios from "axios";
import { useEffect, useState } from "react";

import "../../src/styles/colors.css"
import "../../src/styles/globals.css"

import ComponentsLayout from "@/app/components/layout";
import PostComponent from "@/app/components/PostComponent";
import Sidebar from "@/app/components/Sidebar";

import { Community } from "@/types/Community";
import { Post } from "@/types/Post";


type CommunityPageProps = {
  data: Array<Post>
}

export default function DynamicCommunityPage({data}: CommunityPageProps) {

  console.log(data)
  const [dataState, setDataState] = useState(false)

  useEffect(() => {
    //
    if (data != undefined) {
      setDataState(true)
    }
  }, [data])

  if (dataState == false) {
    return <div>Loading</div>
  } else 



  return (
      <ComponentsLayout>
        <div className="flex flex-row justify-between">
          <Sidebar />
          <div className="md:mr-40 ml-20 pt-20 px-12 mt-12 bg-white w-full min-h-[500px] rounded-xl ">
            {data.map((item, index) => (
                <div key={index}>
                  <PostComponent author={item.author.username} title={item.title} community={item.community.id} content={item.content} />
                </div>
              ))
              }
          </div>
        </div>
      </ComponentsLayout>

  );
}


export async function getStaticProps({ params }: { params: {slug: string}}) {
  console.log(params)
  const resData = await axios.get("http://127.0.0.1:8000/community/" + params.slug) 
  // console.log(params.slug)
  const data: Array<Post> = resData.data
  console.log(data)
  return {
    props: {
      data
    }
  }
}

export async function getStaticPaths() {

  if (process.env.SKIP_BUILD_STATIC_GENERATION) {
    return {
      paths: [],
      fallback: 'blocking',
    }
  }
   // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const resData = await axios.get("http://127.0.0.1:8000/all-communities")
  const communities: Array<Community> = resData.data

  const paths = communities.map(community => ({
    params: {slug: "http://127.0.0.1:8000/community/" + community.id}
  }))
  // console.log(paths)
  return {
    paths,
    fallback: true
  }

}