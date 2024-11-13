import AuthForm from "@/components/AuthForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { FormEvent } from "react";

const Signup = () => {

  const handleSubmit = (e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    
  }


  return (
    <div>
      <AuthForm title="Criar Conta" handleSubmit={handleSubmit}>
        <>
          <Label>
            <span>Nome</span>
            <Input type="text" placeholder="Nome" />
          </Label>
          <Label>
            <span>Email</span>
            <Input type="email"placeholder="Email" />
          </Label>
          <Label>
            <span>Senha</span>
            <Input type="password" placeholder="Senha" />
          </Label>
          <Button type="submit">Cadastrar-se</Button>
        </>
      </AuthForm>
    </div>
  );
};

export default Signup;
