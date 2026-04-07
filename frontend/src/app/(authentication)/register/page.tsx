import { SigninForm } from "./_component/SigninForm";

export default function Signin() {
  return (
    <div className="relative flex min-h-svh w-full items-center justify-center px-6 py-16 bg-white overflow-hidden">

      {/* Grid texture */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 w-full max-w-md">

        {/* Heading */}
        <div className="mb-10 text-center">
          <p className="text-xs tracking-[0.2em] uppercase text-black/30 mb-3">
            Join MediVault
          </p>
          <h1
            className="text-4xl font-black text-black leading-tight"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            Create Your Account
          </h1>
          <p className="text-sm text-black/50 mt-3">
            Start ordering medicines in seconds.
          </p>
        </div>

        <SigninForm />
      </div>
    </div>
  );
}
