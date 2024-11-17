import useLocalStorage from "./useLocalStorage";
import IUser from "@/interfaces/IUser";
import IRegistration  from "@/interfaces/IRegistration";

const useMenageRegistration = () => {
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


  return {
    addRegistration,

  };
};

export default useMenageRegistration;
