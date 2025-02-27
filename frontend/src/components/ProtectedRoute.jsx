import { useNavigate } from "react-router-dom";
import { authClient } from "../lib/auth-client";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  const {
    data: session,
    isPending, //loading state
    error, //error object
  } = authClient.useSession();

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (!session || error) {
    navigate("/sign-in");
  }
  return children;
};
export default ProtectedRoute;
