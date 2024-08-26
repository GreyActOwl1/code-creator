import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../supaBaseclient';

interface Creator {
  id: string;
  name: string;
  url: string;
  description: string;
  imageUrl: string;
}

const EditCreator: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [creator, setCreator] = useState<Creator | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState('');


  useEffect(() => {
    const fetchCreator = async () => {
      const { data, error } = await supabase
        .from('creators')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        setError('Failed to fetch creator');
        setLoading(false);
      } else {
        setCreator(data);
        setLoading(false);
      }
    };

    fetchCreator();
  }, [id]);


  const handleDelete = async () => {
    const { error } = await supabase
      .from('creators')
      .delete()
      .eq('id', id);

    if (error) {
      setDeleteMessage('Failed to delete creator. Please try again.');
    } else {
      setDeleteMessage('Creator deleted successfully!');
      setTimeout(() => {
        navigate('/creators');
      }, 2000);
    }
    setShowModal(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCreator(prev => prev ? { ...prev, [name]: value } : null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!creator) return;

    const { error } = await supabase
      .from('creators')
      .update(creator)
      .eq('id', id);

    if (error) {
      setError('Failed to update creator');
    } else {
      navigate(`/creators/${id}`);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!creator) return <div>Creator not found</div>;

  return (
    <div>
      <h1>Edit Creator</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={creator.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="url">URL:</label>
          <input
            type="url"
            id="url"
            name="url"
            value={creator.url}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={creator.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="imageUrl">Image URL:</label>
          <input
            type="url"
            id="imageUrl"
            name="imageUrl"
            value={creator.imageUrl}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Update Creator</button>
      </form>
      <button onClick={() => setShowModal(true)}>Delete Creator</button>
      {showModal && (
        <div className="modal">
          <p>Are you sure you want to delete this creator?</p>
          <button onClick={handleDelete}>Yes, delete</button>
          <button onClick={() => setShowModal(false)}>Cancel</button>
        </div>
      )}
      {deleteMessage && <p>{deleteMessage}</p>}
    </div>
  );
};

export default EditCreator;
