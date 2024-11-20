import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import useAuth from '@/hooks/useAuth'

const Home = () => {
  const { getAuthUser } = useAuth()

  const user = getAuthUser()

  return (
    <div className=' flex flex-col items-center justify-center p-4'>
      <h1 className='text-4xl font-bold mb-6 text-center'>
        Bem-vindo ao Quantos Watts?
      </h1>
      <p className='text-lg mb-6 text-gray-600 max-w-lg text-center'>
        Descubra como você pode monitorar e reduzir o consumo de energia em sua
        casa. Cadastre-se para acessar a nossa plataforma e começar a
        economizar!
      </p>

      <div className='flex gap-4 mb-8'>
        {user ? (
          <Button asChild>
            <a href='/dashboard'>Entrar no sistema</a>
          </Button>
        ) : (
          <>
            <Button asChild>
              <a href='/cadastrar'>Criar Conta</a>
            </Button>
            <Button variant='outline' asChild>
              <a href='/entrar'>Entrar</a>
            </Button>
          </>
        )}
      </div>

      <Card className='max-w-md w-full shadow-lg'>
        <CardHeader>
          <CardTitle>Como Funciona?</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className='list-disc pl-6 text-gray-600'>
            <li>Adicione seus dispositivos e acompanhe o consumo.</li>
            <li>Receba alertas sobre o uso excessivo de energia.</li>
            <li>Veja gráficos detalhados sobre o consumo mensal.</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

export default Home
