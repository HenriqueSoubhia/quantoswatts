import AuthForm from "@/components/AuthForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChangeEvent, FormEvent, useState } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";
import IUser from "@/interfaces/IUser";

const Signup = () => {
  const [name, setName] = useState("henrique");
  const [email, setEmail] = useState("henrique@gmail.com");
  const [password, setPassword] = useState("123");
  const [confirmPassword, setConfirmPassword] = useState("123");
  const [users, setUsers] = useLocalStorage("users", []);
  const [_, setUser] = useLocalStorage("user", {});

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //caso tenha inputs em branco
    if (!password || !name || !email || !confirmPassword) return;

    //caso senhas nao coincidem
    if (password !== confirmPassword) return;

    const currentUser: IUser[] = users.filter(
      (item: IUser) => item.email === email
    );

    if (currentUser.length > 0) {
      console.log("Email ja cadastrado");
      return;
    }

    const user = { name, email, password };

    const updatedUsers = [...users, user];

    setUsers(updatedUsers);
    setUser(user);
  };

  return (
    <div>
      <AuthForm title="Criar Conta" handleSubmit={handleSubmit}>
        <>
          <Input
            type="text"
            placeholder="Nome"
            value={name}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
          />

          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />

          <Input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          />

          <Input
            type="password"
            placeholder="Confirmar Senha"
            value={confirmPassword}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setConfirmPassword(e.target.value)
            }
          />
          <Button type="submit">Cadastrar-se</Button>
        </>
      </AuthForm>
    </div>
  );
};

export default Signup;
