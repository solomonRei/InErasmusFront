import { Mail, MapPin, Send } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { FC } from "react";

export type ActivityCardProps = {
  img: string;
  title: string;
  description: string;
};

const activities = [
  {
    img: "https://ru.kra.lv/wp-content/uploads/sites/3/2013/07/eu_flag_erasmus_vect_pos.jpg",
    title: "Orientation Week",
    description:
      "Get to know the campus, meet fellow students, and learn about the local culture during the orientation week.",
  },
  {
    img: "https://ru.kra.lv/wp-content/uploads/sites/3/2013/07/eu_flag_erasmus_vect_pos.jpg",
    title: "Cultural Exchange Program",
    description:
      "Participate in cultural exchange activities to learn about different cultures and traditions.",
  },
  {
    img: "https://ru.kra.lv/wp-content/uploads/sites/3/2013/07/eu_flag_erasmus_vect_pos.jpg",
    title: "Language Workshops",
    description:
      "Improve your language skills by attending workshops organized by the language center.",
  },
  {
    img: "https://ru.kra.lv/wp-content/uploads/sites/3/2013/07/eu_flag_erasmus_vect_pos.jpg",
    title: "City Tours",
    description:
      "Explore the city with guided tours and discover historical landmarks and hidden gems.",
  },
];

export const ActivityCard: FC<ActivityCardProps> = ({
  img,
  title,
  description,
}) => {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <img src={img} alt={title} className="w-full h-auto" />
      </CardContent>
    </Card>
  );
};

type ProfilePageProps = {
  username: string;
  email: string;
  location: string;
  timezone: string;
  university: string;
  faculty: string;
  dateStart: string;
  dateEnd: string;
  universityImg: string;
  userImg: string;
};

const ProfilePage = () => {
  return (
    <div className="w-full flex">
      <div className="w-1/3">
        <div className="border-gray-200 rounded max-w-[300px]">
          <img className="rounded" width={300} src={userImg} />
          {/* achievments section */}
          <div></div>
          {/* user details section */}
          <div className=" flex-col">
            <h2 className="mt-2 text-xl">{username}</h2>
            <div className="flex gap-1 items-center mt-2">
              <Mail />
              {email}
            </div>
          </div>
        </div>
        <div className="mt-5 max-w-[300px] flex items-center gasp-2">
          <MapPin />
          <div>{location}</div>
        </div>
        <div className="ml-6">{timezone}</div>

        <Dialog>
          <DialogTrigger>
            {" "}
            <Button className="mt-5 flex items-center gap-2" size="lg">
              <Send />
              Contact
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Ask question.</DialogTitle>
              <DialogDescription>Please be polite.</DialogDescription>
            </DialogHeader>
            <Textarea />
            <DialogFooter>
              <Button className="mt-5 flex items-center gap-2" size="lg">
                <Send />
                Send
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="w-2/3">
        <div className="flex items-center gap-2">
          <img
            width={50}
            className="rounded-full"
            // src="https://media.licdn.com/dms/image/C560BAQGtoQjJJE10Pw/company-logo_100_100/0/1631363419314?e=1724284800&v=beta&t=8urEwxpWPMEv8OToNYOsgaFb0rWxqs9kSN6j5izpFcI"
            src={universityImg}
            alt=""
          />
          <div>
            <h2 className="text-lg">{university}</h2>
            <span className="text-sm">{faculty}</span>
            <br />
            <span>{dateStart}</span>-<span>{dateEnd}</span>
          </div>
        </div>

        <div className="mt-10 flex gap-2">
          {activities.map((item: ActivityCardProps, index: number) => {
            return <ActivityCard {...item} key={index} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
