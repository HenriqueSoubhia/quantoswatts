const useLocalStorage = (key: string) => {
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

  return { addData, getData, setData, removeData, updateItem };
};

export default useLocalStorage;
