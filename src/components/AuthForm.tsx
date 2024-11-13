import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

const AuthForm = ({ children }: React.ReactElement) => {
    return (
        <Card className="max-w-96 m-auto">
            <CardHeader>
                <CardTitle>Entrar na conta</CardTitle>
            </CardHeader>
            <CardContent>
                <form className="flex flex-col gap-4">
                    {children}
                </form>
            </CardContent>
        </Card>
    )
}

export default AuthForm
