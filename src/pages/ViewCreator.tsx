import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../supaBaseclient';
import ImageWithFallback from '../components/ImageWithFallback';

interface Creator {
  id: string;
  name: string;
  url: string;
  description: string;
  imageUrl: string;
}

const ViewCreator = () => {
  const { id } = useParams<{ id: string }>();
  const [creator, setCreator] = useState<Creator | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCreator = async () => {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from<Creator>('creators')
        .select('*')
        .eq('id', id)
        .single(); // fetch a single record

      console.log(creator?.imageUrl)
      if (error) {
        console.error('Error fetching creator:', error);
        setError('Could not fetch creator data. Please try again later.');
        setLoading(false);
      } else {
        setCreator(data);
        setLoading(false);
      }
    };

    fetchCreator();
  }, [id]);

  if (loading) {
    return <div>Loading creator data...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!creator) {
    return <div>No creator found.</div>;
  }

  return (
    <div>
      <h1>{creator.name}</h1>
      <ImageWithFallback
        src={creator.imageUrl}
        alt={`${creator.name}'s profile`}
        fallbackSrc="/path/to/fallback/image.jpg"
        className="creator-image-large"
      />
      <p>{creator.description}</p>
      <a href={creator.url} target="_blank" rel="noopener noreferrer">
        Visit Website
      </a>
      <div>
        <Link to="/creators">
          <button>View All Creators</button>
        </Link>
      </div>
    </div>
  );
};

export default ViewCreator;