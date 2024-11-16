import useLocalStorage from "./useLocalStorage";
import IUser from "@/interfaces/IUser";
import { useNavigate } from "react-router-dom";

const useMenageStorage = () => {
  const { saveLocalStorage, getLocalStorage } = useLocalStorage();

  const navigate = useNavigate()


  const getUsers = (): IUser[] => {
    const users: IUser[] = getLocalStorage("users") || [];
    return users;
  };

  const getCurrentUserData = () => {
    const user = getLocalStorage("user");
    const currentUser = getUsers().find(item => item.id === user.id)

    return currentUser!;
  };

  const logoff = ()=>{
    saveLocalStorage("user", null);
    navigate('/')
  }

  const setUser = (user: IUser) => {
    saveLocalStorage("user", user);
  };

  const addUser = (newUser: IUser) => {
    const users: IUser[] = getLocalStorage("users");

    if (users) {
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));
    } else {
      localStorage.setItem("users", JSON.stringify([newUser]));
    }
  };



  return {
    addUser,
    getCurrentUserData,
    setUser,
    getUsers,
    logoff
  };
};

export default useMenageStorage;
