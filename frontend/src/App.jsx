import { Routes, Route, BrowserRouter } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { UserData } from "./context/UserContext";
import { Loading } from "./components/Loading";
import NavBar from "./components/Navbar";
import PinPage from "./pages/PinPage";
import Create from "./pages/Create";
import Account from "./pages/Account";
import UserProfile from "./pages/UserProfile";

const App = () => {
  const { loading, isAuth, user } = UserData();
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <BrowserRouter>
          {isAuth && <NavBar user={user}/>}
          <Routes>
            <Route path="/" element={isAuth ? <Home /> : <Login />} />
            <Route path="/create" element={isAuth ? <Create /> : <Login />} />
            <Route path="/account" element={isAuth ? <Account user={user} /> : <Login />} />
            <Route path="/user/:id" element={isAuth ? <UserProfile user={user} /> : <Login />} />
            <Route path="/pin/:id" element={isAuth?<PinPage user={user}/>:<Login/>}/>
            <Route path="/login" element={isAuth ? <Home /> : <Login />} />
            <Route
              path="/register"
              element={isAuth ? <Home /> : <Register />}
            />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
};

export default App;
