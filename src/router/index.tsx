import { Routes, Route } from "react-router-dom";
import HomePage from "@/pages/HomePage";
import ProfilePage from "@/pages/ProfilePage";
import BlogPage from "@/pages/BlogPage";
import ChatPage from "@/pages/ChatPage";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/profile/:id" element={<ProfilePage />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/chat" element={<ChatPage />} />
    </Routes>
  );
};
