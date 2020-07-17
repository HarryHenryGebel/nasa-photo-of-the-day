import React from "react";
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

export default function Header(props) {
  const {displayDate, setDisplayDate} = props;

  return (
    <header>
      <h2>NASA Astronomy Photo of the Day</h2>
      <DayPicker onDayClick={(selectedDay) => setDisplayDate(selectedDay)}
                 selectedDays={displayDate}
                 disabledDays={{after: new Date()}}/>
    </header>
  );
}
