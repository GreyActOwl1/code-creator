// src/pages/ShowCreators.tsx

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface Creator {
  id: string;
  name: string;
  bio: string;
  // Add other relevant fields for your creators
}

const ShowCreators = () => {
  const [creators, setCreators] = useState<Creator[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch creators data from API or local data
  useEffect(() => {
    const fetchCreators = async () => {
      try {
        // Replace this URL with your actual API endpoint
        const response = await fetch('/api/creators');
        const data = await response.json();
        setCreators(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching creators:', error);
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
      <ul>
        {creators.map((creator) => (
          <li key={creator.id}>
            <h2>{creator.name}</h2>
            <p>{creator.bio}</p>
            <Link to={`/creators/${creator.id}`}>View Details</Link> |{' '}
            <Link to={`/creators/${creator.id}/edit`}>Edit Creator</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShowCreators;
