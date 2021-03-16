import React from 'react';

function TopRow(props) {
  return (
    <>
      <div>
        <h2 className="home__name">
          Wildcats
        </h2>

        <div className="home__score">
          {props.homeScore}
        </div>
      </div>

      <div>
        <h2 className="away__name">
          The Wildcats
        </h2>
        
        <div className="away__score">
          {props.awayScore}
        </div>
      </div>
    </>
  );
}

export default TopRow;