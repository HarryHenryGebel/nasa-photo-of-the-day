import React, {useState, useEffect} from "react";
import "./App.css";
import requester from "easier-requests";
import Header from "./Header";
import {addDays} from "./helpers";

function getAPOD (setApodData, date, setDisplayDate) {
  // passing async function as useEffect handler results in warning
  // from React to only pass in a synchronous function.
  async function _getAPOD (setApodData, data, setDisplayDate) {
    console.log(date);
    const url = 'https://api.nasa.gov/planetary/apod';

    requester.setOptions({throwOnFailure: true});
    const id = requester.createUniqueID();
    await requester.get(url, id,
                        'api_key', 'SrKOhrnWciCIqOHkKCsbQNBEXvjI51TD7a18iRjX',
                        'hd', 'True',
                        'date', `${date.getFullYear()}-${date.getMonth() + 1}-`
                        + `${date.getDate()}`);
    const response = requester.response(id).data;

    // if not an image, keep going back until we find an image
    if (response.media_type === 'video')
      setDisplayDate(addDays(date, -1));
    else {
      // if there is no HD image, use normal as HD
      if (!('hdurl' in response))
        response.hdurl = response.url;

      setApodData(response);
    }
  }

  _getAPOD(setApodData, date, setDisplayDate);
}

function App() {
  const [apodData, setApodData] = useState(),
        [displayDate, setDisplayDate] = useState(new Date());

  useEffect(() => getAPOD(setApodData,
                          displayDate,
                          setDisplayDate), [displayDate]);

  return (
    <div className="App">
      <Header displayDate={displayDate} setDisplayDate={setDisplayDate}/>
      <APODHolder apodData = {apodData}/>
    </div>
  );
}

function APODHolder(props) {
  const {apodData} = props;
  if (!apodData)
    return (
      <h2>Retrieving data</h2>
    );

  const {title, explanation, url, copyright} = apodData;
  return (
    <div>
      <h3>{title}</h3>
      <img alt={title} src={url}/>
      <p>{explanation}</p>
      <p>Copyright: {copyright}</p>
    </div>
  );
}

export default App;

//  LocalWords:  hdurl useEffect hd
