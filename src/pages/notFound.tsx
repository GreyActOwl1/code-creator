import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <h1>404 - Page Not Found</h1>
        <p>Sorry, the page you are looking for does not exist.</p>
        <Link className="text-blue-500 hover:text-blue-600" to="/">Go back to Home</Link>
      </section>
    </DefaultLayout>
  );
}
