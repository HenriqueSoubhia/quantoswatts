import { FormEvent } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface AuthFormProps {
  children: React.ReactNode;
  title: string;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

const AuthForm = ({ children, title, handleSubmit }: AuthFormProps) => {
  return (
    <Card className="max-w-96 mx-auto mt-20">
      <CardHeader>
        <CardTitle className="text-center">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">{children}</form>
      </CardContent>
    </Card>
  );
};

export default AuthForm;
