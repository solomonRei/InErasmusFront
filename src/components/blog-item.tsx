import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { Button } from "./ui/button";
import { FC } from "react";
import { BlogItemProps } from "@/pages/BlogPage/types";

const BlogItem: FC<BlogItemProps> = ({
  title,
  text,
  author,
  date,
  authorAvatar,
  likes,
  isLiked,
  authorId,
}) => {
  return (
    <Link to={`/profile/${authorId}`}>
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{date}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{text}</p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={authorAvatar} alt="" />
            </Avatar>
            <p>{author}</p>
          </div>
          <div className="flex items-center gap-2">
            <h2 className="text-destructive">{likes}</h2>
            <Button
              size="icon"
              variant="destructive"
              onClick={(e) => e.stopPropagation()}
            >
              <Heart fill={isLiked ? "#fff" : "transparent"} />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default BlogItem;
