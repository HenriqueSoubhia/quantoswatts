import IDevice from "@/interfaces/IDevice";
import useLocalStorage from "./useLocalStorage";
import IUser from "@/interfaces/IUser";

const useMenageStorage = () => {
  const { saveLocalStorage, getLocalStorage } = useLocalStorage();

  //   const setData = (data: object) => {
  //     const newValue = JSON.stringify(data);
  //     localStorage.setItem(key, newValue);
  //   };

  //   const getData = () => {
  //     const storedValue = localStorage.getItem(key);
  //     return storedValue ? JSON.parse(storedValue) : [];
  //   };

  //   const updateItem = (newData: { id: string }) => {
  //     const oldData = getData();

  //     const updatedData = oldData.map((item: { id: string }) =>
  //       item.id === newData.id ? newData : item
  //     );

  //     setData(updatedData);
  //   };

  //   const addData = (newData: object) => {
  //     const storedValue = localStorage.getItem(key);
  //     if (storedValue) {
  //       const newValue = JSON.stringify([...JSON.parse(storedValue), newData]);
  //       localStorage.setItem(key, newValue);
  //     } else {
  //       const newValue = JSON.stringify([newData]);
  //       localStorage.setItem(key, newValue);
  //     }
  //   };

  //   const removeData = (id: string) => {
  //     const storedValue = localStorage.getItem(key);
  //     if (storedValue) {
  //       const newValue = JSON.stringify(
  //         JSON.parse(storedValue).filter((item: { id: string }) => item.id !== id)
  //       );
  //       localStorage.setItem(key, newValue);
  //     }
  //   };

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
    addDevice,
    getDevices,
    addUser,
    deleteDevice,
    getUser,
    setUser,
    getUsers,
    updateDevice
  };
};

export default useMenageStorage;
