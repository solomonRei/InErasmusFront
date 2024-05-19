import { useState, ChangeEvent, KeyboardEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Message {
  sender: "user" | "bot";
  text: string;
}

const ChatPage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = { sender: "user", text: inputValue };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    const botMessage: Message = {
      sender: "bot",
      text: await getBotResponse(inputValue),
    };
    setMessages((prevMessages) => [...prevMessages, botMessage]);

    setInputValue("");
  };

  const getBotResponse = async (message: string): Promise<string> => {
    // Replace with actual API call to your bot service if available
    return `Bot says: ${message}`;
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
              <strong>{message.sender === "user" ? "You" : "Bot"}:</strong>{" "}
              {message.text}
            </div>
          ))}
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
