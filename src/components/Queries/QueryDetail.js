import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getQueries } from '../../services/QueryService';

const QueryDetail = () => {
  const { queryId } = useParams();
  const [query, setQuery] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuery = async () => {
      try {
        const queryData = await getQueries(queryId);
        setQuery(queryData);
      } catch (error) {
        console.error('Error fetching query:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuery();
  }, [queryId]);

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (!query) {
    return <div className="p-4">Query not found.</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">{query.subject}</h2>
      <p className="mb-4">{query.message}</p>
      {/* Render other query details here */}
    </div>
  );
};

export default QueryDetail;
