import React from "react";
import MomentUtils from '@date-io/moment';
import {DatePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';

export default function Header(props) {
  const {displayDate, setDisplayDate} = props;

  return (
    <header>
      <h2>NASA Astronomy Photo of the Day</h2>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <DatePicker value={displayDate}
                    autoOk
                    onChange={
                      (momentDate) => setDisplayDate(momentDate.toDate())} />
      </MuiPickersUtilsProvider>
    </header>
  );
}
