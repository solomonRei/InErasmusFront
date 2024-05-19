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
import { CircleUser, LogOut } from "lucide-react";

export function AvatarComponent() {
  return (
    <Avatar>
      <AvatarImage
        src="https://i.seadn.io/s/raw/files/8c8784d64b65d81993a2d86308114f78.jpg?auto=format&dpr=1&w=1000"
        alt="@shadcn"
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
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to="/">
                <img width={130} className="block" src="/logo.png" alt="" />
              </Link>
            </div>
            <div className="ml-10 flex items-baseline space-x-4">
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
          <AvatarDropdownMenu />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
