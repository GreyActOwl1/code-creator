import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supaBaseclient';
import { Button, Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

interface Creator {
  id: string;
  name: string;
  url: string;
  description: string;
  imageUrl: string;
}

const ShowCreators = () => {
  const [creators, setCreators] = useState<Creator[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCreators = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('creators')
        .select('*')
        .returns<Creator[]>();

      if (error) {
        console.error('Error fetching creators:', error);
      } else {
        setCreators(data || []);
      }
      setLoading(false);
    };

    fetchCreators();
  }, []);

  if (loading) {
    return <div>Loading creators...</div>;
  }

  return (
    <DefaultLayout>
      <h1 className={title()}>All Creators</h1>
      <Button
        as={Link}
        to="/creators/add"
        isIconOnly
        color="primary"
        aria-label="Add New Creator"
        className="fixed bottom-4 right-4 z-10"
      >
        <FontAwesomeIcon icon={faPlus} />
      </Button>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {creators.map((creator) => (
          <Card key={creator.id} className="max-w-[400px]">
            <CardBody className="overflow-visible p-0">
              <Image
                shadow="sm"
                radius="lg"
                width="100%"
                alt={`${creator.name}'s profile`}
                className="w-full object-cover h-[280px] z-9"
                src={creator.imageUrl}
              />
            </CardBody>
            <CardFooter className="text-small flex-col items-start">
              <h4 className="font-bold text-large">{creator.name}</h4>
              <p className="text-default-500">{creator.description}</p>
              <div className="flex justify-between w-full mt-2">
                <Link to={`/creators/${creator.id}`} className="text-primary">
                  View Details
                </Link>
                <Link to={`/creators/${creator.id}/edit`} className="text-primary">
                  Edit Creator
                </Link>
              </div>
              <a
                href={creator.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary mt-2"
              >
                Visit Website
              </a>
            </CardFooter>
          </Card>
        ))}
      </div>
    </DefaultLayout>
  );
};

export default ShowCreators;