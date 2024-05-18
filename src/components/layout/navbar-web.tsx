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
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
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
              {/* <img
                className="h-8 w-8"
                src="/path-to-your-logo.png"
                alt="Logo"
              /> */}
              <h1>InErasmus</h1>
            </div>
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                to="/"
                className="text-gray-900 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                Home
              </Link>
              <Link
                to="/products"
                className="text-gray-900 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                Search feedback
              </Link>
              <Link
                to="/about"
                className="text-gray-900 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-gray-900 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                Contact
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
