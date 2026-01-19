import { LoginCard } from "@/components/auth/LoginCard";

export default async function LoginPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-hidden">
      <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 py-10">
        <div className="w-full max-w-105">
          <LoginCard />
        </div>
      </main>
    </div>
  );
}
