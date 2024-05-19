import { Mail, MapPin, Send } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FC } from "react";

// Define types
interface Program {
  img: string;
  name?: string;
  title?:string
  description: string;
}

interface Profile {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl: string;
  dateOfBirth: string;
  isGraduated: boolean;
  universityId: number;
  facultyId: number;
  facultyResponse: {
    id: number;
    name: string;
    abbreviation: string;
    studyField: string;
  };
  universityResponse: {
    id: number;
    name: string;
  };
  achievements: {
    id: number;
    name: string;
    description: string;
  }[];
  programs: Program[];
}

export const ActivityCard: FC<Program> = ({ img, name, description }) => {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {img &&

          <img src={img} alt={name} className="w-full h-auto" />
        }
      </CardContent>
    </Card>
  );
};

const ProfilePage: FC = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const location = useLocation();

  useEffect(() => {
    const fetchProfile = async () => {
      const studentId = location.pathname.split('/').pop();
      try {
        const response = await axios.get<Profile>(`http://51.20.109.17:8080/api/main/students/${studentId}`);
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, [location]);

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col sm:flex-col md:flex-row w-full">
      <div className="md:w-1/3 w-full p-2">
        <div className="border-gray-200 rounded max-w-[300px] mx-auto md:mx-0">
          <img className="rounded" width={300} src={profile.avatarUrl} alt={`${profile.firstName} ${profile.lastName}`} />
          <div className="mt-2 text-xl">{`${profile.firstName} ${profile.lastName}`}</div>
          <div className="flex gap-1 items-center mt-2">
            <Mail />
            {profile.email}
          </div>
          <div className="mt-5 max-w-[300px] flex items-center gap-2">
            <MapPin />
            <div>{profile.universityResponse.name}</div>
          </div>
          <div className="ml-6">{profile.facultyResponse.name}</div>
          <div className="ml-6">{profile.facultyResponse.studyField}</div>

          <Dialog>
            <DialogTrigger>
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
                <DialogClose asChild>
                  <Button className="mt-5 flex items-center gap-2" size="lg">
                    <Send />
                    Send
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <div className="mt-5">
            <h3 className="text-lg font-semibold">Achievements</h3>
            <ul className="list-disc pl-5">
              {profile.achievements.map((achievement) => (
                <li key={achievement.id}>
                  <strong>{achievement.name}:</strong> {achievement.description}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="md:w-2/3 w-full p-2">
        <div className="flex items-center gap-2">
          <img
            width={50}
            className="rounded-full"
            src={profile.universityResponse.name}
            alt=""
          />
          <div>
            <h2 className="text-lg">{profile.universityResponse.name}</h2>
            <span className="text-sm">{profile.facultyResponse.name}</span>
            <br />
            <span>{profile.dateOfBirth}</span> - Now
          </div>
        </div>

        <div className="flex flex-wrap md:mt-10 gap-2">
          {profile?.programs?.map((program, index) => {
            return <ActivityCard {...program} key={index} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
