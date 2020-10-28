import React, {useEffect, useState} from "react";
import TendersView from "./tendersView"
import {getAllTenders} from "../../api/tenderApi"
import {useSnackbar} from "../../utils/snackbar"

const Tenders = ({history}) => {
    const [tenders, setTenders] = useState([]);
    const {showError} = useSnackbar();
   
    useEffect(() => {
        loadAllTenders(setTenders, history, showError)
    }, [setTenders, history, showError]);
   
    return (
        <TendersView
            tendersTable={tenders}
            history={history}
        />
    )
}

const loadAllTenders = (setTenders, history, showError) => {
    getAllTenders(history)
        .then(tenders => setTenders(tenders))
        .catch(() => showError("Ошибка при загрузке тендеров"))
}

export default Tenders