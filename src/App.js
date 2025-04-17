// src/App.js
import React, { useState } from 'react';
import MediaForm from './components/MediaForm';
import MediaList from './components/MediaList';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

function App() {
  const [refreshKey, setRefreshKey] = useState(0);
  
  const handleSuccess = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="container py-4">
      <div className="mb-4 border-bottom pb-3">
        <h1 className="display-6 text-primary">
          <i className="bi bi-cloud-upload me-2"></i>
          Azure Media Manager
        </h1>
      </div>
      
      <div className="alert alert-info mb-4">
        <i className="bi bi-info-circle-fill me-2"></i>
        This application allows you to upload, manage, and view media files stored in Azure.
      </div>
      
      <div className="row mb-4">
        <div className="col-md-6 mb-3 mb-md-0">
          <MediaForm onSuccess={handleSuccess} />
        </div>
        <div className="col-md-6">
          <MediaForm isUpdate={true} onSuccess={handleSuccess} />
        </div>
      </div>
      
      <MediaList key={refreshKey} onRefresh={handleSuccess} />
      
      <footer className="mt-5 text-center text-muted border-top pt-3">
        <p className="small">
          Powered by Azure Cloud Services &copy; {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}

export default App;