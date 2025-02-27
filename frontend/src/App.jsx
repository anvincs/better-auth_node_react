import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./components/HomePage";
import UserProfile from "./components/UserProfile";

import SignUpPage from "./components/auth/SignUpPage";
import SignInPage from "./components/auth/SignInPage";

import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<HomePage />}
        />

        <Route
          path="/sign-in"
          element={<SignInPage />}
        />
        <Route
          path="/sign-up"
          element={<SignUpPage />}
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};
export default App;
