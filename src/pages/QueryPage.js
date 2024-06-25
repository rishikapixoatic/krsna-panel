import { useState } from 'react';
import QueryList from '../components/Queries/QueryList';
import QueryDetail from '../components/Queries/QueryDetail';
import Footer from '../components/Common/Footer';

const QueryPage = () => {
  const [selectedQueryId, setSelectedQueryId] = useState(null);

  const handleQueryClick = (queryId) => {
    setSelectedQueryId(queryId);
  };

  const handleBackToQueryList = () => {
    setSelectedQueryId(null);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
              {selectedQueryId ? (
                <QueryDetail queryId={selectedQueryId} onBack={handleBackToQueryList} />
              ) : (
                <QueryList onQueryClick={handleQueryClick} />
              )}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default QueryPage;
