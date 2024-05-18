import { Routes, Route } from "react-router-dom";
import HomePage from "@/pages/HomePage";
import ProfilePage from "@/pages/ProfilePage";
import BlogPage from "@/pages/BlogPage";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/profile/:id" element={<ProfilePage />} />
      <Route path="/blog" element={<BlogPage />} />
    </Routes>
  );
};
