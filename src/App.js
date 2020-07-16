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

async function getAPOD (setApodData, date = undefined) {
  const baseURL = 'https://api.nasa.gov/planetary/apod?',
        additional = ['api_key=SrKOhrnWciCIqOHkKCsbQNBEXvjI51TD7a18iRjX',
                      'hd=True'];
  // If no date provided, default to today
  if (!date)
    date = new Date();

  // add date to GET
  additional.push(
    `date=${date.getFullYear()}-${date.getMonth() + 1}-` +
      `${date.getDate()}`);

  const id = requester.createUniqueID();
  await requester.get(baseURL + additional.join('&'), id);
  const response = requester.response(id).data;
  if (response.media_type === 'video') {
    getAPOD(setApodData, addDays(date, -1));
  }
  else {
    console.log(response);
    setApodData(response);
  }
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
