import React from 'react';

const WeddingDetail = ({ wedding }) => {
  return (
    <div className="p-4 border rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-4">{wedding.name}</h2>
      <p className="mb-2"><span className="font-semibold">Hashtag:</span> {wedding.hashtag}</p>
      {/* Add more wedding details here */}
    </div>
  );
};

export default WeddingDetail;
