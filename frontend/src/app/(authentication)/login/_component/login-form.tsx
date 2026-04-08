"use client";
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useActionState, useContext, useEffect } from "react";
import { loginServer } from "./login-server";
import { toast } from "sonner";
import { AuthContext } from "@/utils/AuthContext";
import { useRouter } from "next/navigation";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [state, action, pending] = useActionState(loginServer, null);
  const { user, setUser } = useContext(AuthContext);
  const router = useRouter();
  useEffect(() => {
    if(!state) return;
    setUser(state.data);
    if(state.success) {
      toast.success(state.message);
      router.push("/")
    } else {
      toast.error(state.message);
    }
  }, [state]);
  
  return (
    <Card className="border border-black/10 bg-white/80 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.06)] rounded-2xl">
  <CardHeader className="space-y-2 pb-4">
    <CardTitle className="text-xl font-black text-black" style={{ fontFamily: "'Georgia', serif" }}>
      Login to your account
    </CardTitle>
    <CardDescription className="text-black/50 text-sm">
      Enter your credentials to continue
    </CardDescription>
  </CardHeader>

  <CardContent>
    <form action={action}>
      <FieldGroup className="space-y-5">

        <Field>
          <FieldLabel className="text-xs font-bold text-black/50 uppercase tracking-wide">
            Email
          </FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            name="email"
            required
            className="h-11 rounded-lg border-black/10 focus-visible:ring-black/20"
          />
        </Field>

        <Field>
          <FieldLabel className="text-xs font-bold text-black/50 uppercase tracking-wide">
            Password
          </FieldLabel>
          <Input
            id="password"
            name="password"
            type="password"
            required
            className="h-11 rounded-lg border-black/10 focus-visible:ring-black/20"
          />
        </Field>

        <Field className="pt-2">
          <Button
            type="submit"
            className="w-full h-11 rounded-full font-bold bg-black text-white hover:opacity-80 transition"
          >
            {pending ? "Signing in..." : "Login"}
          </Button>

          <FieldDescription className="text-center text-black/50 mt-4">
            Don&apos;t have an account?{" "}
            <a href="/register" className="underline underline-offset-2 text-black/70 hover:text-black">
              Sign up
            </a>
          </FieldDescription>
        </Field>

      </FieldGroup>
    </form>
  </CardContent>
</Card>
  )
}
