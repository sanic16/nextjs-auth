import { logout } from "@/actions/auth";

const LogoutHeader = () => {
  return (
    <form action={logout}>
      <button className="btn">Logout</button>
    </form>
  );
};

export default LogoutHeader;
