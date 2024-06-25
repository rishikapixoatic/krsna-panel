import { useState } from 'react';

const SendQueryReply = ({ onClose }) => {
  const [replyMessage, setReplyMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to handle submitting the reply message
    // For example, you can call a function to send the reply message to the server
    // and then close the pop-up window
    onClose();
  };

  return (
    <div className="fixed inset-0 overflow-y-auto flex justify-center items-center">
      <div className="fixed inset-0 transition-opacity" aria-hidden="true">
        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-xl p-6">
        <div className="flex justify-between mb-4">
          <h2 className="text-lg font-semibold">Send Reply</h2>
          <button onClick={onClose} type="button" className="text-gray-500 hover:text-gray-700">
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <textarea
          value={replyMessage}
          onChange={(e) => setReplyMessage(e.target.value)}
          className="w-full border rounded p-2 mb-4"
          placeholder="Type your reply here..."
          rows="4"
        ></textarea>
        <div className="flex justify-end">
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Send</button>
        </div>
      </form>
    </div>
  );
};

export default SendQueryReply;
