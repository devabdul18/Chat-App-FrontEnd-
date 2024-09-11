import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "./redux/slice/ProfileSlice";
import { AppDispatch } from "./redux/store";
import Login from "./component/login/Login";
import Signup from "./component/signup/Signup";
import Chats from "./component/sidebar/navbar/all-Chats/Chats";
import Contacts from "./component/sidebar/navbar/contacts/Contacts";
import Edit from "./component/sidebar/navbar/edit/Edit";
import Profile from "./component/sidebar/navbar/profile/Profile";
import Homepage from "./component/homepage/HomePage";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { AuthLoading, AuthData } = useSelector((state: any) => state.profile);
  console.log("auth", AuthData);

  useEffect(() => {
    dispatch(fetchProfile());
  }, []);

  // useEffect(() => {
  //     if (AuthError) {
  //         toast.error(AuthError);
  //     }
  // }, [AuthError]);

  if (AuthLoading) return null;
  return (
    <Router>
      <ThemeProvider>
        <Routes>
          {/* <Route path="/" element={AuthData ? <Homepage /> : <Navigate to="login" />} />
          <Route path="/login" element={!AuthData ? <Login /> : <Navigate to="/" />} />
          <Route path="/signup" element={!AuthData ? <Signup /> : <Navigate to="/" />} /> */}
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/chats" element={<Chats />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/friends" element={<Contacts />} />
          <Route path="/edit" element={<Edit />} />
        </Routes>
      </ThemeProvider>
    </Router>
  );
}

export default App;
