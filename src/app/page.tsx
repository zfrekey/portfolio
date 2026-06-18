export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col justify-center px-6 py-16">
      <p className="mb-4 font-mono text-sm uppercase tracking-[0.2em] text-muted">
        Foundation
      </p>
      <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
        Portfolio and miniblog setup
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
        A minimal static Next.js foundation for a backend developer building in
        public. Feature pages, content, and final visual design will be added in
        later iterations.
      </p>
    </main>
  );
}
