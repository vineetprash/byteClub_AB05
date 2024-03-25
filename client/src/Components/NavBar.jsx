import {
  Spacer,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";
import { Link } from "react-router-dom";
function NavBar() {
  return (
    <Navbar className="bg-black text-white opacity-60 h-12">
      <NavbarBrand>
        <p className="font-bold text-white">BYTE CLUB</p>
      </NavbarBrand>

      <NavbarContent justify="end" className="text-white">
        <NavbarItem>
          <Link to="/login">
            <Button variant="bordered" size="sm" className="text-white">
              Login
            </Button>
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link to="/signup">
            <Button variant="bordered" size="sm" className="text-white">
              Sign Up
            </Button>
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link to="/profile">
            <Button variant="bordered" size="sm" className="text-white">
              Profile
            </Button>
          </Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}

export default NavBar;
