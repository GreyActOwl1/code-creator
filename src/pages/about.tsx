import { title, subtitle } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";

export default function About() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title()}>About CodeCreators</h1>
          <h2 className={subtitle({ class: "mt-4" })}>
            Discover and Connect with Tech Influencers
          </h2>
        </div>

        <div className="max-w-2xl text-center">
          <p className="mb-4">
            CodeCreators is a platform dedicated to showcasing influential figures in the world of technology and programming. Our mission is to connect aspiring developers with inspiring creators who share their knowledge and experiences online.
          </p>
          <p className="mb-4">
            Whether you're looking for tutorial creators, tech reviewers, or coding streamers, CodeCreators helps you discover new voices in the tech community.
          </p>
          <p className="mb-8">
            Join us in celebrating the diverse and talented individuals who are shaping the future of technology!
          </p>
        </div>

        <div className="max-w-2xl">
          <h3 className={subtitle({ class: "mb-4 text-center" })}>Our Features</h3>
          <ul className="list-disc list-inside space-y-2 mb-8">
            <li>Curated list of top tech creators and influencers</li>
            <li>Easy-to-use interface for browsing and discovering new content</li>
            <li>Direct links to creators' websites and social media profiles</li>
            <li>Community-driven platform with user submissions</li>
            <li>Regular updates to keep you informed about rising stars in tech</li>
          </ul>
        </div>

        <div className="max-w-2xl text-center">
          <h3 className={subtitle({ class: "mb-4" })}>Get Involved</h3>
          <p className="mb-4">
            We're always looking for ways to improve CodeCreators and expand our community. If you have suggestions, feedback, or want to contribute, please reach out to us!
          </p>
          
        </div>
      </section>
    </DefaultLayout>
  );
}
