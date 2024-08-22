import React, { useState } from 'react';

const AddCreator: React.FC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement the logic to add the creator
    console.log('Creator added:', { name, description });
    // Reset form fields
    setName('');
    setDescription('');
  };

  return (
    <div>
      <h1>Add Creator</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Creator</button>
      </form>
    </div>
  );
};

export default AddCreator;
