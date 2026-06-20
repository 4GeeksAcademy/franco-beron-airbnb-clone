export default function RootLoading() {
  return (
    <div className="flex min-h-[100dvh] flex-col bg-neutral-50">
      <div className="sticky top-0 z-40 border-b border-black/5 bg-white/90 px-4 py-4 backdrop-blur md:px-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between">
          <Skeleton className="h-10 w-10 rounded-2xl" />
          <Skeleton className="hidden h-10 w-80 rounded-full md:block" />
          <Skeleton className="h-10 w-28 rounded-full" />
        </div>
      </div>

      <main className="mx-auto flex w-full max-w-[1400px] flex-1 flex-col gap-8 px-4 py-6 md:px-6 lg:px-8">
        <section className="space-y-4 rounded-[32px] border border-black/5 bg-white p-5 shadow-[0_20px_70px_rgba(15,23,42,0.05)] md:p-6">
          <Skeleton className="h-6 w-56 rounded-full" />
          <Skeleton className="h-14 w-full rounded-3xl md:h-16" />
          <div className="flex gap-3 overflow-hidden">
            <Skeleton className="h-11 w-36 rounded-full" />
            <Skeleton className="h-11 w-44 rounded-full" />
            <Skeleton className="h-11 w-40 rounded-full" />
          </div>
        </section>

        <section className="grid gap-8 xl:grid-cols-[minmax(0,1.2fr)_380px]">
          <div className="space-y-5">
            <Skeleton className="h-9 w-80 rounded-2xl" />
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <article
                  key={index}
                  className="overflow-hidden rounded-[28px] border border-black/5 bg-white p-3 shadow-[0_14px_40px_rgba(15,23,42,0.05)]"
                >
                  <Skeleton className="h-48 w-full rounded-3xl" />
                  <div className="space-y-3 px-2 pb-2 pt-4">
                    <Skeleton className="h-4 w-4/5 rounded-full" />
                    <Skeleton className="h-4 w-2/3 rounded-full" />
                    <Skeleton className="h-4 w-1/2 rounded-full" />
                  </div>
                </article>
              ))}
            </div>
          </div>

          <aside className="hidden xl:block">
            <Skeleton className="h-[520px] w-full rounded-[32px]" />
          </aside>
        </section>
      </main>

      <footer className="border-t border-black/5 bg-[#f4f1ea] px-4 py-8 md:px-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-4">
          <Skeleton className="h-6 w-72 rounded-full" />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} className="h-12 w-full rounded-2xl" />
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

interface SkeletonProps {
  className?: string;
}

function Skeleton({ className = "" }: SkeletonProps) {
  return (
    <div
      className={[
        "animate-pulse bg-[linear-gradient(100deg,#f1f5f9_0%,#e2e8f0_45%,#f1f5f9_100%)] bg-[length:220%_100%]",
        className,
      ].join(" ")}
    />
  );
}
