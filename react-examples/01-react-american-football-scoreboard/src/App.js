import React, { useState } from "react";
import TopRow from "./TopRow";

function App() {
  const [homeScore, setHomeScore] = useState(0)
  const [awayScore, setAwayScore] = useState(0)

  const touchdown = e => {
    if(e.target.textContent === 'Home Touchdown'){
      setHomeScore(homeScore + 7)
    }
    else if(e.target.textContent === 'Away Touchdown'){
      setAwayScore(awayScore + 7)
    }
  }

  const fieldGoal = e => {
    if(e.target.textContent === 'Home Field Goal'){
      setHomeScore(homeScore + 3)
    }
    else if(e.target.textContent === 'Away Field Goal'){
      setAwayScore(awayScore + 3)
    }
  }

  return (
    <div className="container">
      <TopRow homeScore={homeScore} awayScore={awayScore} />
      
      <div className="homeButtons">
        <button className="homeButtons__touchdown" onClick={touchdown}>
          Home Touchdown
        </button>
        <button className="homeButtons__fieldGoal" onClick={fieldGoal}>
          Home Field Goal
        </button>
      </div>

      <div className="awayButtons">
        <button className="awayButtons__touchdown" onClick={touchdown}>
          Away Touchdown
        </button>
        <button className="awayButtons__fieldGoal" onClick={fieldGoal}>
          Away Field Goal
        </button>
      </div>
    </div>
  );
}

export default App;