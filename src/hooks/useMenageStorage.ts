import IDevice from "@/interfaces/IDevice";
import useLocalStorage from "./useLocalStorage";
import IUser from "@/interfaces/IUser";
import { IRegistration } from "@/interfaces/IRegistration";

const useMenageStorage = () => {
  const { saveLocalStorage, getLocalStorage } = useLocalStorage();

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
  
  const getRegistrations = (userId: string) => {
    const users: IUser[] = getLocalStorage("users");

    const currentUser = users.find(
      (user: { id: string }) => user.id === userId);

    if (currentUser) {
      return currentUser.registrations;
    }

    return [];
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

  const getDevices = (userId: string) => {
    const users: IUser[] = getLocalStorage("users");

    const currentUser = users.find(
      (user: { id: string }) => user.id === userId
    );

    if (currentUser) {
      return currentUser.devices;
    }

    return [];
  };


  const getUsers = (): IUser[] => {
    const users: IUser[] = getLocalStorage("users") || [];
    return users;
  };

  const getUser = () => {
    const user: IUser = getLocalStorage("user");
    return user;
  };

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
    getDevices,
    addUser,
    deleteDevice,
    getUser,
    setUser,
    getUsers,
    updateDevice,
    getRegistrations
  };
};

export default useMenageStorage;
