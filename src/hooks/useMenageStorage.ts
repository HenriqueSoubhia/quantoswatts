import IDevice from "@/interfaces/IDevice";
import useLocalStorage from "./useLocalStorage";
import IUser from "@/interfaces/IUser";
import { IRegistration } from "@/interfaces/IRegistration";
import { useNavigate } from "react-router-dom";

const useMenageStorage = () => {
  const { saveLocalStorage, getLocalStorage } = useLocalStorage();

  const navigate = useNavigate()

  const addRegistration = (userId: string, newRegistration: IRegistration) => {
    const users: IUser[] = getLocalStorage("users");

    const currentUser = users.find(
      (user: { id: string }) => user.id === userId);

    if (currentUser) {
      currentUser.registrations.push(newRegistration);

      const updatedUsers = users.map((user: { id: string }) =>
        user.id === userId ? currentUser : user
      );

      saveLocalStorage("users", updatedUsers);
    }
  }
  
  const addDevice = (userId: string, newDevice: IDevice) => {
    const users: IUser[] = getLocalStorage("users");

    const currentUser = users.find(
      (user: { id: string }) => user.id === userId
    );

    if (currentUser) {
      currentUser.devices.push(newDevice);
      const updatedUsers = users.map((user: { id: string }) =>
        user.id === userId ? currentUser : user
      );
      saveLocalStorage("users", updatedUsers);
    }
  };



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

  const updateDevice = (userId: string, updatedDevice: IDevice) => {
    const users: IUser[] = getLocalStorage("users");

    const currentUser = users.find(
      (user: { id: string }) => user.id === userId
    );

    if (currentUser) {
      currentUser.devices = currentUser.devices.map(
        (device: IDevice) =>
          device.id === updatedDevice.id ? updatedDevice : device
      );

      const updatedUsers = users.map((user: IUser) =>
        user.id === userId ? currentUser : user
      );

      saveLocalStorage("users", updatedUsers);
    }
  }

  const deleteDevice = (userId: string, deviceId: string) => {
    const users: IUser[] = getLocalStorage("users");

    const currentUser = users.find(
      (user: { id: string }) => user.id === userId
    );

    if (currentUser) {
      currentUser.devices = currentUser.devices.filter(
        (device: { id: string }) => device.id !== deviceId
      );

      const updatedUsers = users.map((user: { id: string }) =>
        user.id === userId ? currentUser : user
      );

      saveLocalStorage("users", updatedUsers);
    }
  };

  return {
    addRegistration,
    addDevice,
    addUser,
    deleteDevice,
    getCurrentUserData,
    setUser,
    getUsers,
    updateDevice,
    logoff
  };
};

export default useMenageStorage;
