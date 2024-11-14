
const useLocalStorage = () => {
  

  const saveLocalStorage = (key: string, data: object) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  const getLocalStorage = (key: string) => {
    return JSON.parse(localStorage.getItem(key) || "");
  };

  return {
    saveLocalStorage,
    getLocalStorage,
  };
};

export default useLocalStorage;
