import React, { useState } from 'react';
import { createMedia, updateMedia } from '../services/api';

const MediaForm = ({ isUpdate = false }) => {
  const [mediaData, setMediaData] = useState({ id: '', name: '', url: '' });

  const handleChange = (e) => {
    setMediaData({ ...mediaData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isUpdate) {
        await updateMedia(mediaData);
      } else {
        await createMedia(mediaData);
      }
      alert('Success!');
      setMediaData({ id: '', name: '', url: '' });
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-3">
      {isUpdate && (
        <input
          className="form-control mb-2"
          name="id"
          value={mediaData.id}
          onChange={handleChange}
          placeholder="Media ID"
          required
        />
      )}
      <input
        className="form-control mb-2"
        name="name"
        value={mediaData.name}
        onChange={handleChange}
        placeholder="Media Name"
        required
      />
      <input
        className="form-control mb-2"
        name="url"
        value={mediaData.url}
        onChange={handleChange}
        placeholder="Media URL"
        required
      />
      <button className="btn btn-primary" type="submit">
        {isUpdate ? 'Update Media' : 'Upload Media'}
      </button>
    </form>
  );
};

export default MediaForm;
