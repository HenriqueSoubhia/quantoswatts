import AuthForm from "@/components/AuthForm"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@radix-ui/react-label"

const Login = () => {
  return (
    <div className="h-full">
      <AuthForm>
        <>
          <Label htmlFor="email">Email</Label>
          <Input type="email" id="email" placeholder="Email" />

          <Label htmlFor="password">Senha</Label>
          <Input type="password" id="password" placeholder="Senha" />

          <Button type="submit">Entrar</Button>
        </>
      </AuthForm>
    </div>
  )
}

export default Login
