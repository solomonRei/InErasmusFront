import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ActivityCard } from "../ProfilePage";

const activities = [
  {
    title: "OCEANS Network Board Meeting in Warsaw",
    description:
      "The OCEANS Board Meeting was attended by members of the board from the 3rd to the 6th of November 2023, at Mercure Warszawa Grand Hotel, Warsaw.",
    img: "https://www.oceans-network.eu/fileadmin/_processed_/a/c/csm_img_2402_e73c8da15a.jpg",
  },
  {
    title: "Join the Upcoming Erasmus+ Info Sessions!",
    description:
      "Attend the upcoming info sessions organised by the European Education and Culture Executive Agency (EACEA).",
    img: "https://www.oceans-network.eu/fileadmin/_processed_/9/d/csm_img-20231126-wa0026_fe58b5b46a.jpg",
  },
  {
    title: "OCEANS Network Board Meeting in Warsaw",
    description:
      "Attend the upcoming info sessions organised by the European Education and Culture Executive Agency (EACEA).",
    img: "https://www.oceans-network.eu/fileadmin/_processed_/8/d/csm_whatsapp_image_2023-11-10_at_10.36.25_fa49712484.jpeg",
  },
  {
    title: "OCEANS Network Board Meeting in Warsaw",
    description:
      "The OCEANS Board Meeting was attended by members of the board from the 3rd to the 6th of November 2023, at Mercure Warszawa Grand Hotel, Warsaw.",
    img: "https://www.oceans-network.eu/fileadmin/_processed_/a/c/csm_img_2402_e73c8da15a.jpg",
  },
];

const HomePage = () => {
  return (
    <>
      <div className="min-h-full flex flex-col items-center justify-center p-5 mt-10">
        <h1 className="text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-green-200 via-blue-500 to-purple-600 animate-gradient">
          Cooperation, Exchange and Networking: Student & Alumni network of
          international exchange programmes
        </h1>
        <div className="bg-white p-10 rounded-lg shadow-lg max-w-4xl text-center my-10">
          <p className="text-lg text-gray-700 mb-4">
            Our mission is to foster cooperation, exchange, and networking among
            participants of international exchange programmes, helping them to
            build meaningful connections and gain valuable insights from each
            other.
          </p>
          <Link to="/blog">
            <Button>Browse feedback</Button>
          </Link>
        </div>
      </div>
      <div className="flex  justify-between gap-2">
        {activities.map((item) => (
          <ActivityCard {...item} />
        ))}
      </div>
    </>
  );
};

export default HomePage;
