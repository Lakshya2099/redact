import React from 'react';

const Download = ({ file }) => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = `https://ipfs.infura.io/ipfs/${file.ipfsHash}`;
    link.download = file.filePath.split('/').pop();
    link.click();
  };

  return (
    <div>
      <button onClick={handleDownload}>Download Redacted File</button>
    </div>
  );
};

export default Download;
