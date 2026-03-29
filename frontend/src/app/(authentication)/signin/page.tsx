import { SigninForm } from "./_component/SigninForm";

export default function Signin() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <h1 className="text-3xl">Create an Account to MedVault</h1>
        <SigninForm />
      </div>
    </div>
  )
}
