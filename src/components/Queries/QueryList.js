import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import closeIcon from './../../assests/xmark-solid.svg';
import { getQueries, postUserQueriesReply } from '../../services/QueryService';
import useQueriesColumns from './useQueriesColumns';
import QueryDetail from './QueryDetail';
import Table from '../Common/Table';

const QueryList = ({ queryList, accessToken }) => {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedQueryId, setSelectedQueryId] = useState(null);
  const [selectedQueryMessageId, setSelectedQueryMessageId] = useState(null);
  const [selectedQueryReplyId, setSelectedQueryReplyId] = useState(null);
  const [selectedQueryDetails, setSelectedQueryDetails] = useState(null);
  const [selectedQueryName, setSelectedQueryReplyName] = useState(null);
  const [queryReplyMessage, setQueryReplyMessage] = useState('');
  const handleAction1Click = (e, rowMessageId, rowDetails) => {
    setSelectedQueryMessageId(rowMessageId)
    setSelectedQueryDetails(rowDetails);
  }

  const handleAction2Click = (e, rowMessageId, rowDetails) => {
    setSelectedQueryReplyId(rowMessageId);
    setSelectedQueryReplyName(rowDetails.message);
  }

  const queryListColumns = useQueriesColumns({ handleAction1Click, handleAction2Click });

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await postUserQueriesReply({ messageId: selectedQueryReplyId, reply: queryReplyMessage }, accessToken)
  }

  const replyPopup = () => {
    return (
      <>
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full h-64 max-w-md mx-4">
            <div className="flex justify-between">
              <h2 className="text-lg font-semibold mb-3">Reply to Users Query</h2>
              <img className="h-8 w-8 text-black mb-3" src={closeIcon} onClick={() => {
                setSelectedQueryReplyId(null);
                setQueryReplyMessage(null)
              }} />
            </div>
            <p className="text-sm text-black font-medium py-2">{selectedQueryName}?</p>
            <p className="text-sm text-gray-600 mt-2">Message</p>
            <form onSubmit={handleSubmit}>
              <textarea
                className="w-full h-16 p-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                placeholder="Type your reply here..."
                value={queryReplyMessage}
                onChange={(e) => setQueryReplyMessage(e.target.value)}
              />
              <div className='flex justify-end'>
                <button type="submit" className='text-sm font-medium h-8 w-16 rounded-md text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'>Send</button>
              </div>
            </form>
          </div>
        </div>
      </>
    )
  }

  return (
    <div className="flex p-4">
      <div className="flex-1">
        <h2 className="text-xl font-semibold mb-4">Queries</h2>
        {/* <table className="min-w-full divide-y divide-gray-200">
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
        </table> */}
        <div className='flex'>
          <Table columns={queryListColumns} data={queryList?.messages || []} />
          {selectedQueryMessageId && <div className='flex my-10 ml-12 bg-white h-56 w-72'>
            <div className='m-2'>
              <h3 className='font-semibold'>Query details</h3>
              <p className='m-2'>{selectedQueryDetails.name}</p>
              <p className='m-2'>{selectedQueryDetails.email}</p>
              <p className='m-2'>{selectedQueryDetails.message}</p>
            </div>
          </div>
          }
          {selectedQueryReplyId && replyPopup()}
        </div>

      </div>
      {selectedQueryId && <QueryDetail queryId={selectedQueryId} />}
    </div>
  );
};

export default QueryList;
