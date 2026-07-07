import { HashRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import { TweetsProvider } from "./context/TweetsContext";
import { AuthProvider } from "./context/AuthContext";
import {
  getUsernameFromStorage,
  saveUsernameToStorage,
} from "./lib/userStorage";

function App() {
  const [userName, setUserName] = useState(() => getUsernameFromStorage());

  function handleChangeUserName(newUserName) {
    setUserName(newUserName);
    saveUsernameToStorage(newUserName);
  }

  return (
    <HashRouter>
      <AuthProvider>
        <Navbar />

        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <TweetsProvider userName={userName}>
                  <HomePage />
                </TweetsProvider>
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage
                  userName={userName}
                  onChangeUserName={handleChangeUserName}
                />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </HashRouter>
  );
}

export default App;
