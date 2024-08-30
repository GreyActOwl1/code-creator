import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../supaBaseclient';
import { Card, CardBody, CardHeader, Image } from "@nextui-org/react";
import DefaultLayout from "@/layouts/default";

interface Creator {
  id: number;
  name: string;
  imageUrl: string;
  description: string;
}

export default function ViewCreator() {
  const { id } = useParams<{ id: string }>();
  const [creator, setCreator] = useState<Creator | null>(null);

  useEffect(() => {
    const fetchCreator = async () => {
      const { data, error } = await supabase
        .from('creators')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching creator:', error);
      } else {
        setCreator(data as Creator);
      }
    };

    fetchCreator();
  }, [id]);

  if (!creator) {
    return <div>Loading...</div>;
  }

  return (
    <DefaultLayout>
      <Card className="max-w-[600px] mx-auto">
        <CardHeader className="flex gap-3">
          <Image
            alt={creator.name}
            height={40}
            radius="sm"
            src={creator.imageUrl}
            width={40}
          />
          <div className="flex flex-col">
            <p className="text-md">{creator.name}</p>
            <p className="text-small text-default-500">Creator</p>
          </div>
        </CardHeader>
        <CardBody>
          <Image
            alt={creator.name}
            className="object-cover rounded-xl"
            src={creator.imageUrl}
            width="100%"
          />
          <p className="py-4">{creator.description}</p>
        </CardBody>
      </Card>
    </DefaultLayout>
  );
}
