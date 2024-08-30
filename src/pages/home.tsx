import { useEffect, useState } from "react";
import { Link, Button, Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { title, subtitle } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, faSearch, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { supabase } from '../supaBaseclient';

interface Creator {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
  url: string;
}

export default function HomePage() {

  const [featuredCreators, setFeaturedCreators] = useState<Creator[]>([]);

  useEffect(() => {
    const fetchFeaturedCreators = async () => {
      const { data, error } = await supabase
        .from('creators')
        .select('*')
        .limit(6);

      if (error) {
        console.error('Error fetching featured creators:', error);
      } else {
        setFeaturedCreators(data || []);
      }
    };

    fetchFeaturedCreators();
  }, []);

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title()}>Welcome to CodeCreators</h1>
          <h2 className={subtitle({ class: "mt-4" })}>
            Discover, Connect, and Learn from Tech Influencers
          </h2>
        <div className="mt-8 mb-8">
          <img
            src="https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg"
            alt="CodeCreators Hero"
            className="rounded-lg shadow-lg max-w-full h-auto"
            width={600}
            height={400}
          />
        </div>
        </div>

        <div className="max-w-3xl text-center mt-8">
          <p className="text-lg mb-8">
            CodeCreators is your gateway to the world of technology influencers. Find inspiration, tutorials, and insights from the best minds in coding and tech.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Button
              as={Link}
              href="/creators"
              color="primary"
              endContent={<FontAwesomeIcon icon={faSearch} />}
            >
              Explore Creators
            </Button>
            <Button
              as={Link}
              href="/creators/add"
              color="secondary"
              endContent={<FontAwesomeIcon icon={faUserPlus} />}
            >
              Add a Creator
            </Button>
          </div>
        </div>
        <div className="max-w-4xl w-full mt-12">
          <h3 className={subtitle({ class: "mb-6 text-center" })}>Featured Creators</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {featuredCreators.map((creator) => (
              <Link key={creator.id} href={creator.url} isExternal>
                <Card className="w-[400px] cursor-pointer hover:opacity-80 transition-opacity h-[240px]">
                  <CardBody className="overflow-visible p-0">
                    <Image
                      shadow="sm"
                      radius="lg"
                      width="100%"
                      alt={`${creator.name}'s profile`}
                      className="w-full object-cover h-[140px]"
                      src={creator.imageUrl}
                    />
                  </CardBody>
                  <CardFooter className="text-small flex-col items-start">
                    <h4 className="font-bold text-large">{creator.name}</h4>
                    <p className="text-default-500 line-clamp-2">{creator.description}</p>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        <div className="max-w-4xl">
          <h3 className={subtitle({ class: "mb-6 text-center" })}>Why CodeCreators?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <FontAwesomeIcon icon={faCode} size="3x" className="text-primary mb-4" />
              <h4 className="text-xl font-semibold mb-2">Learn from the Best</h4>
              <p>Access tutorials and insights from top tech influencers across various domains.</p>
            </div>
            <div className="text-center">
              <FontAwesomeIcon icon={faSearch} size="3x" className="text-primary mb-4" />
              <h4 className="text-xl font-semibold mb-2">Discover New Voices</h4>
              <p>Find up-and-coming creators and fresh perspectives in the tech world.</p>
            </div>
            <div className="text-center">
              <FontAwesomeIcon icon={faUserPlus} size="3x" className="text-primary mb-4" />
              <h4 className="text-xl font-semibold mb-2">Contribute to the Community</h4>
              <p>Add your favorite creators and help others discover great content.</p>
            </div>
          </div>
        </div>

        <div className="max-w-2xl text-center mt-12">
          <h3 className={subtitle({ class: "mb-4" })}>Ready to dive in?</h3>
          <p className="mb-6">
            Start exploring our curated list of tech creators and find your next source of inspiration!
          </p>
          <Button
            as={Link}
            href="/creators"
            color="primary"
            size="lg"
          >
            Get Started
          </Button>
        </div>
      </section>
    </DefaultLayout>
  );
}
