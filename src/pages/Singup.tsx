import AuthForm from "@/components/AuthForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { ChangeEvent, FormEvent, useState } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <div>
      <AuthForm title="Criar Conta" handleSubmit={handleSubmit}>
        <>
          <Label>
            <span>Nome</span>
            <Input
              type="text"
              placeholder="Nome"
              value={name}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setName(e.target.value)
              }
            />
          </Label>
          <Label>
            <span>Email</span>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
            />
          </Label>
          <Label>
            <span>Senha</span>
            <Input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
            />
          </Label>
          <Button type="submit">Cadastrar-se</Button>
        </>
      </AuthForm>
    </div>
  );
};

export default Signup;
