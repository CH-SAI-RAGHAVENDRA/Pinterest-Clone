import { createContext, useContext, useState,useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [isAuth, setIsAuth] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [loading,setLoading]=useState(true);
  async function registerUser(name,email, password, navigate,fetchPins) {
    setBtnLoading(true);
    try {
      const { data } = await axios.post("/api/user/register", { name,email,password });
      toast.success(data.message);
      setUser(data.user);
      setIsAuth(true);
      setBtnLoading(false);
      navigate("/");
      fetchPins();
    } catch (err) {
      toast.error(err.response.data.message);
      setBtnLoading(false);
    }
  }

  async function logoutUser(navigate){
    try{
            const {data}=await axios.get("/api/user/logout");
            toast.success(data.message);
            navigate("/login");
            setIsAuth(false);
            setUser([]);
        }
        catch(err)
        {
            toast.error(err.response.data.message);
        }
  }

  async function loginUser(email, password, navigate,fetchPins) {
    setBtnLoading(true);
    try {
      const { data } = await axios.post("/api/user/login", { email, password });
      toast.success(data.message);
      setUser(data.user);
      setIsAuth(true);
      setBtnLoading(false);
      navigate("/");
      fetchPins();
    } catch (err) {
      toast.error(err.response.data.message);
      setBtnLoading(false);
    }
  }

  
  async function fetchUser(){
    try{
      const {data}=await axios.get("/api/user/me");
      setUser(data);
      setIsAuth(true);
      setLoading(false);
    }
    catch(err){
      console.log(err);
      setLoading(false);
    }
  }

  async function followUser(id,fetchCurrUser)
  {
    try{
      const {data}=await axios.post("/api/user/follow/"+id);
      toast.success(data.message);
      fetchCurrUser();
    }
    catch(error)
    {
      toast.error(error.response.data.message);
    }
  }
  useEffect(()=>{
    fetchUser();
  },[]);
  return (
    <UserContext.Provider value={{ loginUser,registerUser, btnLoading, isAuth, user, loading,logoutUser,followUser }}>
      {children}
      <Toaster />
    </UserContext.Provider>
  );
};

export const UserData = () => useContext(UserContext);
