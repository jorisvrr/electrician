import Link from "next/link";
import { siteConfig } from "@/config/site";
import { telHref } from "@/lib/contact";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="label-mono text-accent-dark">404</p>
      <h1 className="mt-3 text-[1.75rem] md:text-[2.25rem]">
        Deze pagina bestaat niet
      </h1>
      <p className="mt-3 max-w-md text-muted">
        Mogelijk is de link verouderd. Ga terug naar de homepage of bel ons even.
      </p>
      <div className="mt-7 flex flex-col gap-2.5 sm:flex-row">
        <Link href="/" className="btn btn-primary">
          Naar de homepage
        </Link>
        <a href={telHref} className="btn btn-call">
          {siteConfig.business.phone.display}
        </a>
      </div>
    </main>
  );
}
