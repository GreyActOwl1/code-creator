import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supaBaseclient';
interface Creator {
  id: string;
  name: string;
  url: string;
  description: string;
  imageURL: string;
}

const ShowCreators = () => {
  const [creators, setCreators] = useState<Creator[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCreators = async () => {
      setLoading(true);
      const { data, error } = await supabase.from<Creator>('creators').select('*');

      if (error) {
        console.error('Error fetching creators:', error);
        setLoading(false);
      } else {
        setCreators(data || []);
        setLoading(false);
      }
    };

    fetchCreators();
  }, []);

  if (loading) {
    return <div>Loading creators...</div>;
  }

  return (
    <div>
      <h1>All Creators</h1>
      <Link to="/creators/add">Add New Creator</Link>
      <div className="creators-list">
        {creators.map((creator) => (
          <div key={creator.id} className="creator-card">
            <img src={creator.imageURL} alt={`${creator.name}'s profile`} />
            <h2>{creator.name}</h2>
            <p>{creator.description}</p>
            <a href={creator.url} target="_blank" rel="noopener noreferrer">
              Visit Website
            </a>
            <div>
              <Link to={`/creators/${creator.id}`}>View Details</Link> |{' '}
              <Link to={`/creators/${creator.id}/edit`}>Edit Creator</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowCreators;
