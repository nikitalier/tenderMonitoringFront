import React, {useState, useEffect} from "react";
import SummaryView from "./SummaryView";
import {useSnackbar} from "../../utils/snackbar";
import {getSummary} from "../../api/tenderApi"

const Summary = (props) => {
  const {history} = props;
  const {showError} = useSnackbar();
  const [summary, setSummary] = useState({CountTenders:0, CountKeywords:0, CountTendersByKeywords: [], BestTenders: [], ApprovedTenders: []})

  useEffect(() => {
    getSummary()
    .then(data => {
      return setSummary(data)
    })
  }, [setSummary])

  // console.log(summary)

  return (
    <SummaryView
      summary={summary}
      history={history}
    />
  );
};

export default Summary;