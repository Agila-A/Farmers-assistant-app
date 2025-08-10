import React, { useState, useRef, useEffect } from 'react';
import '../Styles/Chatbot.css';

const Chatbot = () => {
  // Load messages from local storage on initial render, or use a default message
  const initialMessages = JSON.parse(localStorage.getItem('chat_history')) || [
    { sender: 'bot', text: "Hello! I am your Farmer's Assistant. How can I help you with your farm today?" }
  ];

  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const chatHistoryRef = useRef(null);

  // This function simulates the bot's response logic, which is now farmer-focused
  const getBotResponse = (question) => {
    const lowerCaseQuestion = question.toLowerCase();

    // Basic greetings
    if (lowerCaseQuestion.includes('hello') || lowerCaseQuestion.includes('hi')) {
      return 'Hello! I am your Farmer\'s Assistant. How can I help you with your farm today?';
    }
    
    // Farming-related questions
    else if (lowerCaseQuestion.includes('pesticide') || lowerCaseQuestion.includes('pest control')) {
      return 'Pesticides are chemicals used to kill or control pests. Always follow the label instructions carefully and wear protective gear.';
    } else if (lowerCaseQuestion.includes('fertilizer') || lowerCaseQuestion.includes('soil health')) {
      return 'Fertilizers are materials added to soil to supply essential nutrients for plant growth. Regular soil testing can help you determine the right type and amount to use.';
    } else if (lowerCaseQuestion.includes('irrigation')) {
      return 'Irrigation is the controlled application of water to crops. Drip irrigation and sprinklers are common methods used to conserve water.';
    } else if (lowerCaseQuestion.includes('crop rotation')) {
      return 'Crop rotation is the practice of planting different crops sequentially on the same land. It helps improve soil health, optimize nutrients, and combat pests and weeds.';
    } else if (lowerCaseQuestion.includes('when to plant') || lowerCaseQuestion.includes('planting season')) {
      return 'The best time to plant depends on your specific crop and local climate. Generally, spring is for warm-weather crops and fall for cool-weather ones.';
    } else if (lowerCaseQuestion.includes('what is compost')) {
      return 'Compost is a mixture of decomposed organic matter, like leaves and food scraps, used as a natural fertilizer and soil conditioner.';
    } else if (lowerCaseQuestion.includes('organic farming')) {
      return 'Organic farming is a method of crop and livestock production that involves abstaining from synthetic fertilizers, pesticides, and genetically modified organisms.';
    }
    else {
      return "I'm sorry, I don't have an answer for that specific question. I'm a simple bot, but I'm always learning!";
    }
  };

  const handleSendMessage = async () => {
    if (input.trim() === '') return;

    const userMessage = { sender: 'user', text: input };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInput('');

    // Simulate bot thinking time before responding
    setTimeout(() => {
      const botResponseText = getBotResponse(input);
      const botMessage = { sender: 'bot', text: botResponseText };
      setMessages(prevMessages => [...prevMessages, botMessage]);
    }, 500); // 500ms delay
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  // Auto-scroll to the bottom of the chat history whenever messages update
  useEffect(() => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  }, [messages]);

  // Use a second useEffect hook to save the messages array to local storage
  // whenever the 'messages' state changes.
  useEffect(() => {
      localStorage.setItem('chat_history', JSON.stringify(messages));
  }, [messages]);

  return (
    <div className="chatbot-container">
      <div className="chat-header">
        <h3>Farmer's Assistant</h3>
      </div>
      <div className="chat-history" ref={chatHistoryRef}>
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}-message`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="chat-input-area">
        <input
          type="text"
          id="user-input"
          placeholder="Type your question here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button id="send-button" onClick={handleSendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;