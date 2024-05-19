import BlogItem from "@/components/blog-item";
import { Input } from "@/components/ui/input";
import { BlogItemProps } from "./types";
import { ChangeEvent, useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";

const BlogPage = () => {
  const [blogList, setBlogList] = useState<BlogItemProps[]>([]);
  const [filteredBlogList, setFilteredBlogList] = useState<BlogItemProps[]>([]);
  const [search, setSearch] = useState('');
  const [sortOption, setSortOption] = useState('');

  useEffect(() => {
    const fetchBlogList = async () => {
      try {
        const response = await axios.get("http://51.20.109.17:8080/api/main/programs/feedbacks");
        setBlogList(response.data);
        setFilteredBlogList(response.data);
      } catch (error) {
        console.error("Error fetching blog list:", error);
      }
    };

    fetchBlogList();
  }, []);

  useEffect(() => {
    let filteredItems = blogList.filter(
      (item) =>
        `${item.student.firstName} ${item.student.lastName}`.toLowerCase().includes(search.toLowerCase().trim()) ||
        item.text.toLowerCase().includes(search.toLowerCase().trim()) ||
        item.title.toLowerCase().includes(search.toLowerCase().trim())
    );

    if (sortOption) {
      filteredItems = filteredItems.sort((a, b) => {
        switch (sortOption) {
          case 'mostLiked':
            return b.likes - a.likes;
          case 'lessLiked':
            return a.likes - b.likes;
          case 'recent':
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          case 'oldest':
            return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          default:
            return 0;
        }
      });
    }

    setFilteredBlogList(filteredItems);
  }, [search, sortOption, blogList]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSortChange = (value: string) => {
    setSortOption(value);
  };

  return (
    <div>
      <h1 className="text-3xl mb-5">
        Discover other people's experience with Erasmus
      </h1>
      <div className="mb-5 flex gap-4">
        <Input
          placeholder="Search by keywords"
          onChange={handleSearchChange}
        />
        <Select onValueChange={handleSortChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="mostLiked">Most Liked</SelectItem>
            <SelectItem value="lessLiked">Less Liked</SelectItem>
            <SelectItem value="recent">Recent</SelectItem>
            <SelectItem value="oldest">Oldest</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-5">
        {filteredBlogList && filteredBlogList.map((item) => (
          <BlogItem {...item} key={item.id} />
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
