import { LoginForm } from "@/app/(authentication)/login/_component/login-form"

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <h1 className="text-3xl">Welcome back to MedVault</h1>
        <LoginForm />
      </div>
    </div>
  )
}
