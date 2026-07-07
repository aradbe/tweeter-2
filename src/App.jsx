import { HashRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import Navbar from "./components/Navbar";
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
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage userName={userName} />} />

        <Route
          path="/profile"
          element={
            <ProfilePage
              userName={userName}
              onChangeUserName={handleChangeUserName}
            />
          }
        />
      </Routes>
    </HashRouter>
  );
}

export default App;
