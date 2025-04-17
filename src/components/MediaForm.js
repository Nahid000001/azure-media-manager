import React, { useState, useEffect } from 'react';
import { createMedia, updateMedia } from '../services/api';

const MediaForm = ({ isUpdate = false, onSuccess }) => {
  const [mediaData, setMediaData] = useState({ id: '', name: '', url: '', description: '', category: 'image' });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filePreview, setFilePreview] = useState(null);

  const handleChange = (e) => {
    setMediaData({ ...mediaData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    
    setFile(selectedFile);
    
    // Auto-extract information from file
    const fileName = selectedFile.name.split('.')[0];
    setMediaData(prev => ({
      ...prev,
      name: fileName || prev.name
    }));
    
    // Create preview for images
    if (selectedFile.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFilePreview(e.target.result);
      };
      reader.readAsDataURL(selectedFile);
      
      // Auto-set category
      setMediaData(prev => ({
        ...prev,
        category: 'image'
      }));
    } else if (selectedFile.type.startsWith('video/')) {
      setMediaData(prev => ({
        ...prev,
        category: 'video'
      }));
    } else if (selectedFile.type.startsWith('audio/')) {
      setMediaData(prev => ({
        ...prev,
        category: 'audio'
      }));
    } else {
      setMediaData(prev => ({
        ...prev,
        category: 'document'
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const formData = new FormData();
      
      // Add file if present
      if (file) {
        formData.append('file', file);
      }
      
      // Add metadata
      Object.keys(mediaData).forEach(key => {
        if (mediaData[key]) formData.append(key, mediaData[key]);
      });
      
      if (isUpdate) {
        await updateMedia(mediaData); // Keep using JSON for updates
      } else {
        await createMedia(formData); // Use FormData for creation with file
      }
      
      alert('Media ' + (isUpdate ? 'updated' : 'uploaded') + ' successfully!');
      setMediaData({ id: '', name: '', url: '', description: '', category: 'image' });
      setFile(null);
      setFilePreview(null);
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error('Error:', error);
      setError(error.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card mb-4">
      <div className="card-header bg-primary text-white">
        {isUpdate ? 'Update Media' : 'Upload New Media'}
      </div>
      <div className="card-body">
        {error && (
          <div className="alert alert-danger">{error}</div>
        )}
        
        <form onSubmit={handleSubmit}>
          {isUpdate && (
            <div className="mb-3">
              <label htmlFor="id" className="form-label">Media ID</label>
              <input
                id="id"
                type="text"
                className="form-control"
                name="id"
                value={mediaData.id}
                onChange={handleChange}
                placeholder="Enter Media ID"
                required={isUpdate}
              />
            </div>
          )}
          
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Media Name</label>
            <input
              id="name"
              type="text"
              className="form-control"
              name="name"
              value={mediaData.name}
              onChange={handleChange}
              placeholder="Enter Media Name"
              required
            />
          </div>
          
          {!isUpdate && (
            <div className="mb-3">
              <label htmlFor="file" className="form-label">Media File</label>
              <input
                id="file"
                type="file"
                className="form-control"
                onChange={handleFileChange}
                required={!isUpdate && !mediaData.url}
              />
              {filePreview && (
                <div className="mt-2">
                  <img 
                    src={filePreview} 
                    alt="Preview" 
                    className="img-thumbnail" 
                    style={{ maxHeight: "150px" }} 
                  />
                </div>
              )}
            </div>
          )}
          
          {(isUpdate || !file) && (
            <div className="mb-3">
              <label htmlFor="url" className="form-label">Media URL</label>
              <input
                id="url"
                type="text"
                className="form-control"
                name="url"
                value={mediaData.url}
                onChange={handleChange}
                placeholder="Enter Media URL"
                required={isUpdate || !file}
              />
            </div>
          )}
          
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea
              id="description"
              className="form-control"
              name="description"
              value={mediaData.description}
              onChange={handleChange}
              placeholder="Enter Media Description"
              rows="2"
            />
          </div>
          
          <div className="mb-3">
            <label htmlFor="category" className="form-label">Category</label>
            <select
              id="category"
              className="form-select"
              name="category"
              value={mediaData.category}
              onChange={handleChange}
            >
              <option value="image">Image</option>
              <option value="video">Video</option>
              <option value="document">Document</option>
              <option value="audio">Audio</option>
            </select>
          </div>
          
          <button 
            className="btn btn-primary" 
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Processing...
              </>
            ) : (
              isUpdate ? 'Update Media' : 'Upload Media'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default MediaForm;