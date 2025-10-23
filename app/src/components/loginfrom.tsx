import { useAppForm } from "@/hooks/demo.form";
import { authClient } from "@/lib/auth-client";
import z from "zod";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function LoginForm() {
  const form = useAppForm({
    defaultValues: {
      email: '',
      password: ''
    },
    validators: {
      onChange: z.object({
        email: z.string().email('Invalid email address'),
        password: z.string().min(6, 'Password must be at least 6 characters long')
      })
    },
    onSubmit: (value) => {
      authClient.signIn.email({
        email: value.value.email,
        password: value.value.password
      });
    }
  });

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      form.handleSubmit();
    }} className="space-y-4">
      <form.Field name="email">
        {(field) => (
          <div className="space-y-2">
            <Label htmlFor={field.name}>Email</Label>
            <Input
              id={field.name}
              type="email"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Enter your email"
            />
            
          </div>
        )}
      </form.Field>

      <form.Field name="password">
        {(field) => (
          <div className="space-y-2">
            <Label htmlFor={field.name}>Password</Label>
            <Input
              id={field.name}
              type="password"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Enter your password"
            />
           
          </div>
        )}
      </form.Field>

      <Button type="submit" className="w-full">
        Login
      </Button>
    </form>
  );
}