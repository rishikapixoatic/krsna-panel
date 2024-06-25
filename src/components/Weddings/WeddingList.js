import React from 'react';
import WeddingDetail from './WeddingDetail';

const WeddingList = ({ weddings }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {weddings.map(wedding => (
        <WeddingDetail key={wedding.id} wedding={wedding} />
      ))}
    </div>
  );
};

export default WeddingList;
