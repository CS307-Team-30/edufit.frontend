import "../src/styles/colors.css"
import "../src/styles/globals.css"

import ComponentsLayout from "@/app/components/layout";
import PostBox from "@/app/components/PostBox";
import Sidebar from "@/app/components/Sidebar";

import { Community } from "@/types/Community";
import { Thread } from "@/types/Thread";


// Dummy Communities
const communities: Community[] = [
  { communityId: 1, name: "Programming" },
  { communityId: 2, name: "Gaming" },
  { communityId: 3, name: "Travel" },
];

// Dummy Comments
const comments: Comment[] = [
  { commentId: 1, content: "Great post!", author: 1, timestamp: new Date() },
  { commentId: 2, content: "I agree!", author: 2, timestamp: new Date() },
  { commentId: 3, content: "Interesting discussion.", author: 3, timestamp: new Date() },
];

// Dummy Threads
const threads: Thread[] = [
  {
    threadId: 1,
    title: "Introduction to JavaScript",
    content: "This is a thread about JavaScript.",
    author: { userId: 1, username: "john_doe" },
    comments: [comments[0], comments[1]],
    community: communities[0],
  },
  {
    threadId: 2,
    title: "Best Games of 2023",
    content: "Let's discuss the best games released in 2023.",
    author: { userId: 2, username: "gamer123" },
    comments: [comments[2]],
    community: communities[1],
  },
  {
    threadId: 3,
    title: "Travel Tips",
    content: "Share your travel tips and experiences here.",
    author: { userId: 3, username: "traveler77" },
    comments: [],
    community: communities[2],
  },
];


export default function Homepage() {
  return (


      <ComponentsLayout>
        <div className="flex flex-row justify-between">
          <Sidebar />
          <div id="threads" className="w-full bg-pink-300 flex-col justify-center mr-32 relative">
            <div className="bg-white rounded-lg mt-8 mx-16 px-10 py-8">
              <div className="flex flex-row justify-between">
                <h1>Arch Linux's Supremacy</h1>
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
}