import axios from 'axios';
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

import { useGlobalStore } from '@/app/stores/UserStore';

const socket = io('http://localhost:8000'); // Replace with your server URL

const MessageModal = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const chatbox = useGlobalStore(state => state.chatbox);
  const user = useGlobalStore(state => state.user);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/messages/${chatbox.chatbox_id}`);
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };


    fetchMessages()
    const intervalId = setInterval(fetchMessages, 1000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);

  }, [chatbox.chatbox_id])

  useEffect(() => {

    // Set up socket listener for new messages
    const handleNewMessage = (message) => {
      if (message.chatbox_id === chatbox.chatbox_id) {
        setMessages(prevMessages => [...prevMessages, message]);
      }
    };

    socket.on('new_message', handleNewMessage);

  }, [messages.length]);

  const sendMessage = () => {
    setMessages([...messages, {content: user.username + ': ' +  newMessage}])
    if (newMessage.trim()) {
      socket.emit('send_message', {
        user_id: user.id,
        chatbox_id: chatbox.chatbox_id,
        message: user.username + ": " + newMessage,
      });

      setNewMessage('');
    }
  };

  return (
    <div className='z-30 h-full min-h-[300px] w-full rounded-lg bg-pink-50 px-6 pb-8 py-4 text-pink-500'>
      <div className='mb-4 font-bold'>{chatbox.other_user_username}</div>

      <div className='flex items-center justify-between mt-4'>
        <input
          type='text'
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder='Type a message...'
          className='w-full rounded px-4 py-2 mr-4'
        />
        <button onClick={sendMessage} className='bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded'>
          Send
        </button>

      </div>

      <div className='h-3/4 max-h-[500px] overflow-y-auto'>
        {messages.map((message, index) => (
          <div key={index} className='p-2 my-2 rounded bg-pink-200'>
            {message.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessageModal;
