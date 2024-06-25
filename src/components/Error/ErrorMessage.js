import React from 'react';

const ErrorMessage = ({ message }) => {
  return (
    <div className="text-red-600">{message}</div>
  );
};

export default ErrorMessage;
