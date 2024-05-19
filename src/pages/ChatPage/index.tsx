import { useState, ChangeEvent, KeyboardEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from 'axios';

interface Message {
  sender: "user" | "bot";
  text: string;
}

const ChatPage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = { sender: "user", text: inputValue };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputValue("");
    setLoading(true);

    const botMessage: Message = {
      sender: "bot",
      text: await getBotResponse(inputValue),
    };
    setMessages((prevMessages) => [...prevMessages, botMessage]);
    setLoading(false);
  };

  const getBotResponse = async (message: string): Promise<string> => {
    try {
      const response = await axios.get(`http://erasmusalb-191086454.eu-north-1.elb.amazonaws.com/generate/${message}`);
      return response.data.message; // Adjust this according to the actual structure of your API response
    } catch (error) {
      console.error("Error fetching bot response:", error);
      return "Sorry, something went wrong.";
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-xl">
      <h1 className="text-2xl font-bold mb-4">Chat with ErasmusGPT</h1>
      <div className="border border-gray-300 p-4 rounded-lg h-96 overflow-y-auto">
        <div>
          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-2 p-2 rounded ${
                message.sender === "user"
                  ? "bg-blue-100 text-right"
                  : "bg-gray-100 text-left"
              }`}
            >
              <strong>{message.sender === "user" ? "You" : "ErasmusGPT"}:</strong>{" "}
              {message.text}
            </div>
          ))}
          {loading && (
            <div className="flex justify-center items-center rounded-full">
              <img className="rounded-full w-16 h-16" src="https://cdn.dribbble.com/userupload/10543014/file/original-4703d0ba72b72f87fa49a618a24a1f6d.gif" alt="Loading..."/>
            </div>
          )}
        </div>
      </div>  
      <div className="flex mt-4">
        <Input
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Type your message"
          className="flex-grow mr-2"
        />
        <Button onClick={handleSendMessage} className="bg-blue-500 text-white">
          Send
        </Button>
      </div>
    </div>
  );
};

export default ChatPage;
