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
    <Navbar className="bg-black text-slate-100">
      <NavbarBrand>
        <p className="font-bold text-inherit">BYTE CLUB</p>
      </NavbarBrand>

      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link to="/login">
            <Button>Login</Button>
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link to="/signup">
            <Button>Sign Up</Button>
          </Link>
        </NavbarItem>
        <Link color="foreground" to="/profile">
          <NavbarItem>
            <div className="rounded-lg bg-slate-100 aspect-square w-8"></div>
          </NavbarItem>
        </Link>
      </NavbarContent>
    </Navbar>
  );
}

export default NavBar;
