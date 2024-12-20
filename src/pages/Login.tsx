import AuthForm from '@/components/AuthForm'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import useAuth from '@/hooks/useAuth'
import useMenageUser from '@/hooks/useMenageUser'
import IUser from '@/interfaces/IUser'

import { ChangeEvent, FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { getUsers } = useMenageUser()

  const { setAuthUser } = useAuth()

  const navigate = useNavigate()

  const { toast } = useToast()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!password || !email) {
      toast({
        title: 'Campos não preenchidas',
        description: 'Por favor, preencha os campos de senha e email',
        variant: 'destructive'
      })

      return
    }

    const users: IUser[] = getUsers()

    if (users.length === 0) {
      toast({
        title: 'Nenhum usuario cadastrado',
        description: 'Por favor, cadastre um usuario antes de fazer login',
        variant: 'destructive'
      })

      return
    }

    const currentUser: IUser | undefined = users.find(
      (user: IUser) => user.email === email
    )

    if (!currentUser || currentUser.password !== password) {
      toast({
        title: 'Usuario ou Senha incorretos',
        description: 'O usuario ou senha informados estão incorretos',
        variant: 'destructive'
      })

      return
    }

    if (currentUser && currentUser.password === password) {
      setAuthUser({ name: currentUser.name, id: currentUser.id })
      navigate('/dashboard')
    }
  }

  return (
    <div>
      <AuthForm title='Entrar' handleSubmit={handleSubmit}>
        <>
          <Input
            type='email'
            placeholder='Email'
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />

          <Input
            type='password'
            placeholder='Senha'
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          />

          <Button type='submit'>Entrar</Button>
        </>
      </AuthForm>
    </div>
  )
}

export default Login
