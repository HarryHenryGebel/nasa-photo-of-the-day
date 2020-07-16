import React from "react";
import "./App.css";
import {requester} from "easier-requests";

function addDays(date, days) {
  // 1000 milliseconds in a second, 60 seconds in a minute, 60 minutes
  // in and hour, 24 hours in a day.
  const lengthOfDay = 1000 * 60 * 60 * 24;

  // get numeric value of date, then create new Date object after
  // performing addition.
  const dateNumber = date.getTime();
  const newDate = new Date();
  newDate.setTime(dateNumber + days * lengthOfDay);
  return newDate;
}

function App() {
  return (
    <div className="App">
      <p>
        Read through the instructions in the README.md file to build your NASA
        app! Have fun <span role="img" aria-label='go!'>🚀</span>!
      </p>
    </div>
  );
}

export default App;
