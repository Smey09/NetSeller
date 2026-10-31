import Link from "next/link";

export default function RootNotFound() {
  return (
    <html lang="en">
      <body className="min-h-screen flex items-center justify-center p-4 bg-slate-50 font-sans">
        <div className="text-center space-y-4 max-w-md">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-50 text-primary-600 border border-primary-200">
            <span className="text-2xl font-black">404</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Page Not Found</h1>
          <p className="text-sm text-slate-600">
            The page you are looking for does not exist or has moved.
          </p>
          <div className="pt-2">
            <Link
              href="/en"
              className="inline-block bg-primary-500 hover:bg-primary-600 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors shadow-sm shadow-primary-500/25"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}

