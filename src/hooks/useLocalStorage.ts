
const useLocalStorage = () => {
  

  const saveLocalStorage = (key: string, data: object | null) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  const getLocalStorage = (key: string) => {
    const data = localStorage.getItem(key);
    if (!data) {
      return null;
    }
    return JSON.parse(data);
  };

  return {
    saveLocalStorage,
    getLocalStorage,
  };
};

export default useLocalStorage;
