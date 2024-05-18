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

const blogItems: BlogItemProps[] = [
  {
    id: 1,
    title: "My experience with Erasmus+ in Germany",
    text: "Participating in the Erasmus+ program in Germany was a life-changing experience. I had the opportunity to immerse myself in a new culture, improve my language skills, and make lifelong friends. The academic and social aspects of the program were incredibly enriching.",
    date: "20.12.2024",
    author: "Jane Doe",
    authorAvatar:
      "https://passport-photo.online/_optimized/prepare2.0498e1e2-opt-1920.WEBP",
    authorId: 1,
    likes: 21,
    isLiked: false,
  },
  {
    id: 2,
    title: "Exploring the Alps: A Hiking Adventure",
    text: "Hiking through the Alps was an exhilarating experience. The stunning landscapes, challenging trails, and fresh mountain air made for an unforgettable adventure. Whether you’re an experienced hiker or a beginner, the Alps offer something for everyone.",
    date: "15.07.2024",
    author: "John Smith",
    authorAvatar:
      "data:image/jpeg;base64,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",
    authorId: 2,
    likes: 34,
    isLiked: true,
  },
  {
    id: 3,
    title: "Cultural Insights from My Trip to Japan",
    text: "My trip to Japan was filled with cultural insights and unique experiences. From visiting ancient temples and shrines to participating in traditional tea ceremonies, I gained a deeper appreciation for Japanese culture and history. The hospitality and kindness of the people made the trip even more special.",
    date: "10.09.2024",
    author: "Emily Johnson",
    authorAvatar:
      "data:image/jpeg;base64,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",
    authorId: 3,
    likes: 47,
    isLiked: false,
  },
  {
    id: 4,
    title: "The Best Cafes in Paris",
    text: "Paris is known for its charming cafes, and during my visit, I made it my mission to find the best ones. From cozy, hidden gems to bustling, famous spots, each cafe offered its own unique atmosphere and delicious coffee. Here are my top picks for the best cafes in Paris.",
    date: "05.06.2024",
    author: "Michael Brown",
    authorAvatar:
      "https://img.freepik.com/free-photo/young-crazy-man-happy-expression_1194-5236.jpg",
    authorId: 4,
    likes: 12,
    isLiked: false,
  },
  {
    id: 5,
    title: "A Guide to Backpacking in South America",
    text: "Backpacking through South America was an adventure of a lifetime. The diverse landscapes, vibrant cultures, and friendly locals made each country a joy to explore. In this guide, I share tips and recommendations for anyone planning their own backpacking journey in South America.",
    date: "25.11.2024",
    author: "Sarah Williams",
    authorAvatar:
      "https://static.wikia.nocookie.net/b30b9ff3-a9f8-41a4-b620-87990cf3a233/scale-to-width/755",
    authorId: 5,
    likes: 56,
    isLiked: true,
  },
  {
    id: 6,
    title: "Top 10 Destinations for Digital Nomads",
    text: "As a digital nomad, finding the perfect destination to live and work remotely is crucial. Here are my top 10 picks for the best destinations for digital nomads, based on factors like internet speed, cost of living, community, and overall quality of life.",
    date: "03.03.2024",
    author: "David Jones",
    authorAvatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tJTIwcGVyc29ufGVufDB8fDB8fHww",
    authorId: 6,
    likes: 18,
    isLiked: false,
  },
  {
    id: 7,
    title: "The History and Beauty of Rome",
    text: "Rome is a city rich in history and beauty. Walking through its ancient streets and visiting iconic landmarks like the Colosseum and the Vatican was a mesmerizing experience. This blog post highlights the must-see attractions and hidden gems of Rome.",
    date: "30.04.2024",
    author: "Laura Davis",
    authorAvatar:
      "https://i.pinimg.com/236x/be/a3/49/bea3491915571d34a026753f4a872000.jpg",
    authorId: 7,
    likes: 39,
    isLiked: true,
  },
  {
    id: 8,
    title: "How to Travel on a Budget",
    text: "Traveling on a budget doesn’t mean you have to miss out on amazing experiences. In this post, I share my top tips for saving money while traveling, from finding affordable accommodation to eating like a local. With these tips, you can make the most of your trip without breaking the bank.",
    date: "18.08.2024",
    author: "Robert Garcia",
    authorAvatar:
      "https://thenationonlineng.net/wp-content/uploads/2021/05/Seun-Jimoh.jpg",
    authorId: 8,
    likes: 25,
    isLiked: false,
  },
  {
    id: 9,
    title: "Discovering the Wonders of Australia",
    text: "Australia is a land of incredible natural beauty and diverse wildlife. During my trip, I explored the Great Barrier Reef, visited the Outback, and enjoyed the vibrant cities. This post shares my favorite experiences and tips for traveling in Australia.",
    date: "12.02.2024",
    author: "Linda Martinez",
    authorAvatar:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww",
    authorId: 9,
    likes: 41,
    isLiked: true,
  },
  {
    id: 10,
    title: "Adventures in the Amazon Rainforest",
    text: "The Amazon Rainforest is one of the most biodiverse places on Earth. Exploring its dense jungles and encountering exotic wildlife was an unforgettable experience. This blog post details my adventures in the Amazon and the importance of preserving this vital ecosystem.",
    date: "22.10.2024",
    author: "James Wilson",
    authorAvatar:
      "https://pbs.twimg.com/profile_images/1249432648684109824/J0k1DN1T_400x400.jpg",
    authorId: 10,
    likes: 33,
    isLiked: false,
  },
];

const BlogPage = () => {
    const [blogList, setBlogList] = useState<BlogItemProps[]>(blogItems);
    const [search, setSearch] = useState('');
    const [sortOption, setSortOption] = useState('');
  
    useEffect(() => {
      let filteredItems = blogItems.filter(
        (item) =>
          item.author.trim().toLowerCase().includes(search.toLowerCase().trim()) ||
          item.text.trim().toLowerCase().includes(search.toLowerCase().trim()) ||
          item.title.trim().toLowerCase().includes(search.toLowerCase().trim())
      );
  
      if (sortOption) {
        filteredItems = filteredItems.sort((a, b) => {
          switch (sortOption) {
            case 'mostLiked':
              return Number(b.likes) - Number(a.likes);
            case 'lessLiked':
              return Number(a.likes) - Number(b.likes);
            case 'recent':
              return new Date(b.date).getTime() - new Date(a.date).getTime();
            case 'oldest':
              return new Date(a.date).getTime() - new Date(b.date).getTime();
            default:
              return 0;
          }
        });
      }
  
      setBlogList(filteredItems);
    }, [search, sortOption]);
  
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
          {blogList.map((item, id) => (
            <BlogItem {...item} key={id} />
          ))}
        </div>
      </div>
    );
  };
  
export default BlogPage;
