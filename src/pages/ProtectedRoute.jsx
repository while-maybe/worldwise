import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/FakeAuthContext";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (!isAuthenticated) navigate("/");
    },
    [isAuthenticated, navigate]
  );

  // conditional return is needed here: useEffect runs only AFTER the component has rendered - perhaps useLayoutEffect() alternatively?
  return isAuthenticated ? children : null;
}

export default ProtectedRoute;
