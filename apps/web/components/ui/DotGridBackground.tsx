export function DotGridBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 opacity-20">
      <div
        className="absolute left-0 top-0 h-full w-full"
        style={{
          backgroundImage:
            "radial-gradient(circle at 2px 2px, #007a6c 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
        aria-hidden="true"
      ></div>
    </div>
  );
}
