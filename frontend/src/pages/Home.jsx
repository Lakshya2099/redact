import React from 'react';
import Upload from '../components/Upload';
import RedactionLevel from '../components/RedactionLevel';
import Download from '../components/Download';

const Home = () => {
  // Use state or context to manage file data
  const file = { filePath: 'uploads/example.txt', ipfsHash: 'Qm...' };

  return (
    <div>
      <h1>Welcome to RE-DACT</h1>
      <Upload />
      <RedactionLevel fileId="some-file-id" />
      <Download file={file} />
    </div>
  );
};

export default Home;
