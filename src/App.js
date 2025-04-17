import React from 'react';
import MediaForm from './components/MediaForm';
import MediaList from './components/MediaList';

function App() {
  return (
    <div className="container">
      <h2 className="my-3">Azure Media Manager</h2>
      <MediaForm />
      <hr />
      <MediaForm isUpdate={true} />
      <hr />
      <MediaList />
    </div>
  );
}

export default App;
