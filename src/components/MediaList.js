import React, { useEffect, useState } from 'react';
import { fetchMedia, deleteMedia } from '../services/api';

const MediaList = () => {
  const [mediaList, setMediaList] = useState([]);

  const getData = async () => {
    try {
      const res = await fetchMedia();
      setMediaList(res.data);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteMedia(id);
      alert('Deleted!');
      getData();
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="p-3">
      <h4>Media Library</h4>
      {mediaList.map((media) => (
        <div key={media.id} className="border p-2 my-2">
          <p><strong>{media.name}</strong></p>
          <p><a href={media.url} target="_blank" rel="noreferrer">{media.url}</a></p>
          <button className="btn btn-danger" onClick={() => handleDelete(media.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default MediaList;
