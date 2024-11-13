import AuthForm from "@/components/AuthForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const navigate = useNavigate()

  const handleSubmit = (e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault()

    navigate("/")
  }

  return (
    <div>
      <AuthForm title="Entrar" handleSubmit={handleSubmit}>
        <>
          <Label>
            <span>Email</span>
            <Input type="email" placeholder="Email" />
          </Label>
          <Label>
            <span>Senha</span>
            <Input type="password" placeholder="Senha" />
          </Label>
          <Button type="submit">Entrar</Button>
        </>
      </AuthForm>
    </div>
  );
};

export default Login;
