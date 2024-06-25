import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getQueries } from '../../services/QueryService';
import QueryDetail from './QueryDetail';

const QueryList = () => {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedQueryId, setSelectedQueryId] = useState(null);

  useEffect(() => {
    const fetchQueries = async () => {
      try {
        const { success, queries: fetchedQueries } = await getQueries();
        if (success) {
          setQueries(fetchedQueries);
        } else {
          console.error('Failed to fetch queries');
        }
      } catch (error) {
        console.error('Error fetching queries:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchQueries();
  }, []);

  const handleViewClick = (queryId) => {
    setSelectedQueryId(queryId);
  };

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="flex p-4">
      <div className="flex-1">
        <h2 className="text-xl font-semibold mb-4">Queries</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action 1</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action 2</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {queries.map(query => (
              <tr key={query.id} className="hover:bg-gray-100">
                <td className="px-6 py-4 whitespace-nowrap">{query.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link to={`/queries/${query.id}`} className="text-blue-500 hover:underline">{query.subject}</Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <button onClick={() => handleViewClick(query.id)} className="text-blue-500 hover:underline">View</button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <button className="text-blue-500 hover:underline">Reply</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedQueryId && <QueryDetail queryId={selectedQueryId} />}
    </div>
  );
};

export default QueryList;
