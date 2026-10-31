export default function Loading() {
  return (
    <div className="w-full animate-pulse py-12 px-4">
      <div className="container mx-auto max-w-5xl space-y-8">
        {/* Hero banner skeleton */}
        <div className="rounded-3xl bg-slate-100 h-64 sm:h-80 w-full" />

        {/* Section title skeleton */}
        <div className="space-y-3 max-w-md mx-auto text-center flex flex-col items-center">
          <div className="h-4 w-24 bg-slate-200 rounded-full" />
          <div className="h-8 w-64 bg-slate-200 rounded-xl" />
          <div className="h-4 w-48 bg-slate-100 rounded-full" />
        </div>

        {/* Package cards grid skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-3xl border border-slate-100 bg-white p-6 space-y-4 shadow-xs"
            >
              <div className="h-6 w-28 bg-slate-100 rounded-full" />
              <div className="h-8 w-40 bg-slate-200 rounded-xl" />
              <div className="h-4 w-full bg-slate-100 rounded-full" />
              <div className="h-10 w-24 bg-slate-200 rounded-xl mt-4" />
              <div className="space-y-2 pt-4">
                <div className="h-4 w-full bg-slate-50 rounded" />
                <div className="h-4 w-5/6 bg-slate-50 rounded" />
                <div className="h-4 w-4/6 bg-slate-50 rounded" />
              </div>
              <div className="h-12 w-full bg-slate-200 rounded-2xl mt-6" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

