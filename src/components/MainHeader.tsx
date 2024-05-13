import Link from "next/link";
import NavLink from "./NavLink";
import { verifyAuth } from "@/utils/auth";
import LogoutHeader from "./LogoutHeader";

const MainHeader = async () => {
  const user = await verifyAuth();

  return (
    <header id="main-header">
      <div id="logo">
        <Link href={"/"}>NextNews</Link>
      </div>
      <nav>
        <ul>
          <NavLink href="/">Home</NavLink>
          <NavLink href={"/news"}>News</NavLink>
          <NavLink href={"/archive"}>Archive</NavLink>
          {user.user?.id && <LogoutHeader />}
        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;
