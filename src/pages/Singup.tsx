import AuthForm from '@/components/AuthForm'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ChangeEvent, FormEvent, useState } from 'react'
import IUser from '@/interfaces/IUser'
import { useNavigate } from 'react-router-dom'
import { useToast } from '@/hooks/use-toast'
import uniqid from 'uniqid'
import useMenageUser from '@/hooks/useMenageUser'
import useAuth from '@/hooks/useAuth'

const Signup = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const { getUsers, addUser } = useMenageUser()

  const { setAuthUser } = useAuth()

  const navigate = useNavigate()

  const { toast } = useToast()

  const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const users = await getUsers()

    //caso tenha inputs em branco
    if (!password || !name || !email || !confirmPassword) {
      toast({
        title: 'Campos não preenchidos',
        description: 'Por favor, preencha todos os campos',
        variant: 'destructive'
      })
      return
    }

    //caso senhas nao coincidem
    if (password !== confirmPassword) {
      toast({
        title: 'Senhas não coincidem',
        description: 'As senhas informadas são diferentes',
        variant: 'destructive'
      })
      return
    }

    const currentUser: IUser[] = users.filter(
      (item: IUser) => item.email === email
    )

    if (currentUser.length > 0) {
      toast({
        title: 'Email já cadastrado',
        description: 'O email informado já está cadastrado',
        variant: 'destructive'
      })
      return
    }

    const user = {
      name,
      email,
      password,
      id: uniqid(),
      devices: [],
      registrations: []
    }

    addUser(user)
    setAuthUser({name: user.name, id: user.id})
    navigate('/dashboard')
  }

  return (
    <div>
      <AuthForm title='Criar Conta' handleSubmit={handleSubmit}>
        <>
          <Input
            type='text'
            placeholder='Nome'
            value={name}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
          />

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

          <Input
            type='password'
            placeholder='Confirmar Senha'
            value={confirmPassword}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setConfirmPassword(e.target.value)
            }
          />
          <Button type='submit'>Cadastrar-se</Button>
        </>
      </AuthForm>
    </div>
  )
}

export default Signup
