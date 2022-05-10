import React from 'react';

function InProgress(props) {
  const { history } = props;
  const { location: { pathname } } = history;
  console.log(history);
  console.log(pathname);

  return (
    <div>In Progress</div>
  );
}

InProgress.propTypes = {}.isRequired;

export default InProgress;
