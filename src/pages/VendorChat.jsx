import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import EventIcon from '@mui/icons-material/Event';
import PeopleIcon from '@mui/icons-material/People';
import MoreVertIcon from '@mui/icons-material/MoreVert';

// Fetch chat messages from project backend
const fetchChatMessages = async (chatId) => {
  try {
    const response = await fetch(`http://localhost:8080/vendor/chats/${chatId}/messages`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch messages");
    }

    const result = await response.json();
    return result.data || result || [];
  } catch (error) {
    console.error("Error fetching chat messages:", error);
    return [];
  }
};

const VendorChat = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const messagesEndRef = useRef(null);
  
  const { 
    chatId, 
    customerName, 
    customerImage, 
    eventType, 
    eventDate, 
    guestCount
  } = location.state || {};

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const messagesData = await fetchChatMessages(chatId);
        setMessages(messagesData);
      } catch (error) {
        console.error('Error loading messages:', error);
      } finally {
        setLoading(false);
      }
    };

    if (chatId) {
      loadMessages();
    }
  }, [chatId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message = {
      id: Date.now(),
      text: newMessage,
      sender: "vendor",
      timestamp: new Date().toISOString(),
      type: "text"
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
    setIsTyping(true);

    // Simulate customer response
    setTimeout(() => {
      const customerResponse = {
        id: Date.now() + 1,
        text: "Thank you for the information! I'll discuss this with my family and get back to you soon.",
        sender: "customer",
        timestamp: new Date().toISOString(),
        type: "text"
      };
      setMessages(prev => [...prev, customerResponse]);
      setIsTyping(false);
    }, 3000);
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl font-semibold text-gray-600">Loading chat...</div>
      </div>
    );
  }

  if (!chatId || !customerName) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-semibold text-gray-600 mb-4">Chat not found</div>
          <button
            onClick={() => navigate("/vendor/chats")}
            className="px-6 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors"
          >
            Back to Chats
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => navigate("/vendor/chats")}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowBackIcon className="text-gray-600" />
            </button>
            
            <div className="flex items-center space-x-3">
              <img
                src={customerImage}
                alt={customerName}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h2 className="font-semibold text-gray-800">{customerName}</h2>
                <div className="flex items-center space-x-2 text-xs text-gray-500">
                  <span className="bg-green-500 w-2 h-2 rounded-full"></span>
                  <span>Online</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <PhoneIcon className="text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <EmailIcon className="text-gray-600" />
            </button>
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <MoreVertIcon className="text-gray-600" />
              </button>
              {showMenu && (
                <div className="absolute right-0 top-12 w-48 bg-white rounded-xl shadow-lg py-2 z-50">
                  <div className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">
                    Mark as resolved
                  </div>
                  <div className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">
                    Archive chat
                  </div>
                  <div className="px-4 py-2 text-sm text-red-600 hover:bg-gray-50 cursor-pointer">
                    Block customer
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Event Details */}
        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <EventIcon className="text-orange-500" fontSize="small" />
              <span>{eventType}</span>
            </div>
            <div className="flex items-center space-x-1">
              <PeopleIcon className="text-orange-500" fontSize="small" />
              <span>{guestCount} guests</span>
            </div>
            <span>{eventDate}</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => {
          const isVendor = message.sender === "vendor";
          const showDate = index === 0 || 
            formatDate(messages[index - 1]?.timestamp) !== formatDate(message.timestamp);

          return (
            <div key={message.id}>
              {showDate && (
                <div className="text-center mb-4">
                  <span className="bg-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full">
                    {formatDate(message.timestamp)}
                  </span>
                </div>
              )}
              
              <div className={`flex ${isVendor ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs lg:max-w-md ${
                  isVendor 
                    ? 'bg-orange-500 text-white' 
                    : 'bg-white text-gray-800 border border-gray-200'
                  } rounded-2xl px-4 py-3 shadow-sm`}
                >
                  <p className="text-sm whitespace-pre-line">{message.text}</p>
                  <p className={`text-xs mt-2 ${
                    isVendor ? 'text-orange-100' : 'text-gray-500'
                  }`}>
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <span className="text-xs text-gray-500 ml-2">Customer is typing...</span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="bg-white border-t border-gray-200 p-4">
        <form onSubmit={handleSendMessage} className="flex items-center space-x-3">
          <button
            type="button"
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <AttachFileIcon />
          </button>
          
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
          
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className={`p-3 rounded-full transition-colors ${
              newMessage.trim()
                ? 'bg-orange-500 text-white hover:bg-orange-600'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <SendIcon />
          </button>
        </form>
      </div>
    </div>
  );
};

export default VendorChat; 