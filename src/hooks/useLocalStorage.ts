
const useLocalStorage = (key: string) => {

    const setData = (data: object) => {
        const newValue = JSON.stringify(data)
        localStorage.setItem(key, newValue);
    }

    const getData = () => {
        const storedValue = localStorage.getItem(key);
        return storedValue ? JSON.parse(storedValue) : [];
    }



    const addData = (newData: object) => {
        const storedValue = localStorage.getItem(key);
        if (storedValue) {
            const newValue = JSON.stringify([...JSON.parse(storedValue), newData])
            localStorage.setItem(key, newValue);
        } else {
            const newValue = JSON.stringify([newData])
            console.log(newValue)
            localStorage.setItem(key, newValue);
        }

    }

    const removeData = (id: string) => {
        const storedValue = localStorage.getItem(key);
        if (storedValue) {
            const newValue = JSON.stringify(JSON.parse(storedValue).filter((item: any) => item.id !== id))
            localStorage.setItem(key, newValue);
        }
    }

    return { addData, getData, setData, removeData }
};

export default useLocalStorage;