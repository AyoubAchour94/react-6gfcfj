import React from 'react';

export default (props) => {
  const { title, author } = props;
  return (
    <div className="card">
      <h3>{title}</h3>
      <h4>{author}</h4>
    </div>
  );
};
