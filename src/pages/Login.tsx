import AuthForm from "@/components/AuthForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useLocalStorage from "@/hooks/useLocalStorage";
import IUser from "@/interfaces/IUser";

import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [users] = useLocalStorage("users", []);
  const [_, setUser] = useLocalStorage("user", {});

  const navigate = useNavigate()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!password || !email) return;

    const currentUser: IUser = users.filter(
      (item: IUser) => item.email === email
    )[0];

    if (currentUser && currentUser.password === password) {
      console.log(currentUser.name, "logado");
      setUser(currentUser);
      navigate("/dashboard")
    }

  };

  return (
    <div>
      <AuthForm title="Entrar" handleSubmit={handleSubmit}>
        <>
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

          <Button type="submit">Entrar</Button>
        </>
      </AuthForm>
    </div>
  );
};

export default Login;
