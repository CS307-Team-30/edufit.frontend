"use client"

import axios from "axios";
import { useEffect,useState } from "react";

import '../src/styles/colors.css';
import '../src/styles/globals.css';

import ComponentsLayout from "@/app/components/layout";
import { useGlobalStore } from "@/app/stores/UserStore";

import { Chatbox } from "@/types/Chatbox";




export default function MessagesPage() {

  const [chatboxes, setChatboxes] = useState<Chatbox[]>([])

  const user = useGlobalStore(state => state.user)

  useEffect(() => {
    const fetchChatboxes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/user-chatboxes/${user.id}`
        );
        console.log(response.data);
        setChatboxes(response.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error('Post failed', error.response?.data);
        } else {
          console.error('An unexpected error occurred:', error);
        }
      }
    };

    // Call the async function
    fetchChatboxes();

  }, [])

  /* TODO:

    1. Create a chathistory that is sorted by lastupdated on the bcakend
    2. 
  
  */
  const updateChatbox = useGlobalStore(state => state.updateChatbox)


  return (
    <ComponentsLayout>
      <div className="px-40 pt-20 bg-pink-300 min-h-[800px]">
        <h2 className="w-full flex flex-row justify-center text-pink-700">Message history</h2>
        
        {chatboxes.length > 0 &&
          chatboxes.map((box,index) => (
            <div onClick={() => updateChatbox(box)} className="w-full cursor-pointer bg-white hover:scale-105 px-12 py-4 mt-8 duration-300 transition-transform rounded-lg" key={index}>
              <h3 className="text-pink-400">{box.other_user_username}</h3>
              <p className="text-pink-700">{box.last_message == null ? 'Empty chatbox' : box.last_message}</p>
            </div>
          ))}

      </div>
    </ComponentsLayout>
  );
};