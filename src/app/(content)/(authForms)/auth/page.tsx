import Login from "@/components/forms/Login";
import SignUp from "@/components/forms/SignUp";

const SignUpPage = ({
  searchParams,
}: {
  searchParams: {
    mode: string;
  };
}) => {
  const mode = searchParams.mode || "login";
  return <>{mode === "login" ? <Login /> : <SignUp />}</>;
};

export default SignUpPage;
