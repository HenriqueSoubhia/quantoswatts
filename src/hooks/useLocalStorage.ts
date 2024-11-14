import IUser from "@/interfaces/IUser";

const useLocalStorage = (key: string) => {
  
  const getUser = () => {
    const stringUser = localStorage.getItem("user");
    if (stringUser) {
      const user: IUser = JSON.parse(stringUser);
      return stringUser ? user : null;
    }
  };

  const setData = (data: object) => {
    const newValue = JSON.stringify(data);
    localStorage.setItem(key, newValue);
  };

  const getData = () => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : [];
  };

  const updateItem = (newData: { id: string }) => {
    const oldData = getData();

    const updatedData = oldData.map((item: { id: string }) =>
      item.id === newData.id ? newData : item
    );

    setData(updatedData);
  };

  const addData = (newData: object) => {
    const storedValue = localStorage.getItem(key);
    if (storedValue) {
      const newValue = JSON.stringify([...JSON.parse(storedValue), newData]);
      localStorage.setItem(key, newValue);
    } else {
      const newValue = JSON.stringify([newData]);
      localStorage.setItem(key, newValue);
    }
  };

  const removeData = (id: string) => {
    const storedValue = localStorage.getItem(key);
    if (storedValue) {
      const newValue = JSON.stringify(
        JSON.parse(storedValue).filter((item: { id: string }) => item.id !== id)
      );
      localStorage.setItem(key, newValue);
    }
  };

  const saveLocalStorage = (key: string, data: object) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  const getLocalStorage = (key: string) => {
    return JSON.parse(localStorage.getItem(key) || "");
  };

  return {
    saveLocalStorage,
    getLocalStorage,
    addData,
    getData,
    setData,
    removeData,
    updateItem,
    getUser,
  };
};

export default useLocalStorage;
