import { Link } from "react-router-dom";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { CircleUser, LogOut, X, Menu } from "lucide-react";

import { useEffect, useState } from "react";
import axios from "axios";

export interface Profile {
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
}

export function AvatarComponent() {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get<any>("http://51.20.109.17:8080/api/main/students/1");
        setAvatarUrl(response.data.avatarUrl);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  if (!avatarUrl) {
    return <div>Loading...</div>;
  }

  return (
    <Avatar>
      <AvatarImage
        src={avatarUrl}
        alt="Profile Picture"
      />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}


export function AvatarDropdownMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <AvatarComponent />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link
              to="profile/1"
              className="flex items-center gap-2 w-full h-full"
            >
              <CircleUser />
              <div>Profile</div>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild className="bg-red-500">
            <Link
              to="profile/1"
              className="flex items-center gap-2 w-full h-full"
            >
              <LogOut color="#fff" />
              <div className="text-white">Logout</div>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to="/">
                <img width={130} className="block" src="/logo.png" alt="Logo" />
              </Link>
            </div>
            <div className="hidden md:block ml-10 flex items-baseline space-x-4">
              <Link
                to="/blog"
                className="text-gray-900 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                Search feedback
              </Link>
              <Link
                to="/chat"
                className="text-gray-900 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                ErasmusGPT
              </Link>
            </div>
          </div>
          <div className="hidden md:block">
            <AvatarDropdownMenu />
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleMobileMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-900 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      <div className={`md:hidden ${isMobileMenuOpen ? "block" : "hidden"}`} id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            to="/blog"
            className="text-gray-900 hover:text-gray-700 block px-3 py-2 rounded-md text-base font-medium"
            onClick={toggleMobileMenu}
          >
            Search feedback
          </Link>
          <Link
            to="/chat"
            className="text-gray-900 hover:text-gray-700 block px-3 py-2 rounded-md text-base font-medium"
            onClick={toggleMobileMenu}
          >
            ErasmusGPT
          </Link>
          <div className="pt-4 border-t border-gray-200">
            <div className="flex items-center px-5">
              <AvatarComponent />
              <div className="ml-3">
                <div className="text-base font-medium text-gray-900">Profile</div>
              </div>
            </div>
            <div className="mt-3 px-2 space-y-1">
              <Link
                to="profile/1"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-gray-700"
                onClick={toggleMobileMenu}
              >
                Profile
              </Link>
              <Link
                to="profile/1"
                className="block px-3 py-2 rounded-md text-base font-medium text-red-600 hover:text-red-500"
                onClick={toggleMobileMenu}
              >
                Logout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
