import IDevice from "@/interfaces/IDevice";
import useLocalStorage from "./useLocalStorage";
import IUser from "@/interfaces/IUser";

const useMenageStorage = () => {
  const { saveLocalStorage, getLocalStorage } = useLocalStorage("");

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

  const getUser = () => {
    const user: IUser = getLocalStorage("user");
    return user;
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

  return { addDevice, getDevices, addUser, deleteDevice, getUser };
};

export default useMenageStorage;
