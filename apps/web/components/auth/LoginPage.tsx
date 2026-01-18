import { TopNav } from "../layouts/TopNav";
import { DotGridBackground } from "../ui/DotGridBackground";
import { LoginCard } from "./LoginCard";

export function LoginPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-hidden">
      <DotGridBackground />

      <TopNav />

      <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 py-10">
        <div className="w-full max-w-105">
          <LoginCard />
        </div>
      </main>
    </div>
  );
}
