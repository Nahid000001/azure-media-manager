// src/components/MediaList.js
import React, { useEffect, useState } from 'react';
import { fetchMedia, deleteMedia } from '../services/api';

const MediaList = ({ onRefresh }) => {
  const [mediaList, setMediaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchMedia();
      
      // Check if the response has the expected structure
      if (res.data && Array.isArray(res.data)) {
        setMediaList(res.data);
      } else {
        console.error('Unexpected API response format:', res);
        setError('The API returned unexpected data. Please check the console for details.');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Failed to load media';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    
    try {
      await deleteMedia(id);
      alert('Media deleted successfully!');
      getData();
      if (onRefresh) onRefresh();
    } catch (error) {
      console.error('Delete error:', error);
      alert('Failed to delete media: ' + (error.message || 'Unknown error'));
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const renderMediaPreview = (media) => {
    if (!media.url) return null;
    
    const isImage = media.url.match(/\.(jpeg|jpg|gif|png)$/i) || media.category === 'image';
    const isVideo = media.url.match(/\.(mp4|webm|ogg)$/i) || media.category === 'video';
    const isAudio = media.url.match(/\.(mp3|wav|ogg)$/i) || media.category === 'audio';
    
    if (isImage) {
      return (
        <img 
          src={media.url} 
          alt={media.name} 
          className="img-thumbnail mb-2" 
          style={{ maxHeight: "150px", maxWidth: "100%" }}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://via.placeholder.com/150?text=Error';
          }}
        />
      );
    } else if (isVideo) {
      return (
        <div className="ratio ratio-16x9 mb-2" style={{ maxHeight: "150px" }}>
          <iframe src={media.url} title={media.name} allowFullScreen></iframe>
        </div>
      );
    } else if (isAudio) {
      return (
        <audio controls className="w-100 mb-2">
          <source src={media.url} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      );
    } else {
      // Default document icon
      return (
        <div className="text-center mb-2">
          <i className="bi bi-file-earmark-text" style={{ fontSize: "3rem" }}></i>
        </div>
      );
    }
  };

  if (loading) {
    return (
      <div className="card">
        <div className="card-header bg-primary text-white">Media Library</div>
        <div className="card-body text-center py-5">
          <div className="spinner-border text-primary mb-2" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p>Loading media...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
        <span>Media Library</span>
        <button className="btn btn-sm btn-light" onClick={getData}>
          <i className="bi bi-arrow-clockwise me-1"></i> Refresh
        </button>
      </div>
      <div className="card-body">
        {error ? (
          <div className="alert alert-danger">
            <p>{error}</p>
            <button className="btn btn-sm btn-danger" onClick={getData}>
              Try Again
            </button>
          </div>
        ) : mediaList.length === 0 ? (
          <div className="alert alert-info">
            No media files found. Please upload some media.
          </div>
        ) : (
          <div className="row">
            {mediaList.map((media) => (
              <div key={media.id} className="col-md-6 col-lg-4 mb-3">
                <div className="card h-100">
                  <div className="card-body">
                    <h6 className="card-title">{media.name}</h6>
                    {renderMediaPreview(media)}
                    {media.description && (
                      <p className="card-text small text-muted">{media.description}</p>
                    )}
                    <p className="card-text small text-truncate">
                      <a href={media.url} target="_blank" rel="noreferrer">
                        {media.url}
                      </a>
                    </p>
                  </div>
                  <div className="card-footer bg-white d-flex justify-content-between">
                    <a 
                      href={media.url} 
                      target="_blank" 
                      rel="noreferrer"
                      className="btn btn-sm btn-outline-primary"
                    >
                      <i className="bi bi-box-arrow-up-right me-1"></i> View
                    </a>
                    <button 
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(media.id)}
                    >
                      <i className="bi bi-trash me-1"></i> Delete
                    </button>
                    // Add this to your MediaList component
<button 
  className="btn btn-sm btn-warning ms-2" 
  onClick={async () => {
    const result = await testApiConnection();
    console.log('API test result:', result);
    alert('API test completed. Check the console for details.');
  }}
>
  <i className="bi bi-wrench me-1"></i> Test API
</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaList;