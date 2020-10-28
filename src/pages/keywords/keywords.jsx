import React, {useContext, useEffect, useState} from "react";
import {AppContext} from "../../AppContext";
import KeywordsView from "./keywordsView";
import {getAllKeywords, deleteKeywords, addKeyword} from "../../api/keywordApi"
import {useSnackbar} from "../../utils/snackbar";
import {ADMIN, IT_DEP, SALES_DEP} from "../../security/Authorities";  

const Keywords = ({history}) =>  {
    const [context] = useContext(AppContext);
    const currentUser = context.currentUser;
    const [keywords, setKeywords] = useState([]);
    const {showError, showSuccess} = useSnackbar();
    useEffect(() => {
        loadAllKeywords(setKeywords, history, showError)
    }, [setKeywords, history, showError]);

    const addNewKeyword = onAddNewKeyword(currentUser.id, showSuccess)

    var mode = 'none'
    for (let i = 0; i < currentUser.authorities.length; i++) {
        if (currentUser.authorities[i] === ADMIN || currentUser.authorities[i] === IT_DEP || currentUser.authorities[i] === SALES_DEP) {
            mode = 'checkbox'
        }
    }
    
    return (
        <KeywordsView
            keywordsTable={keywords}
            onAddKeyword={addNewKeyword}
            auth={mode}
        />
    )
}

const loadAllKeywords = (setKeywords, history, showError) => {
    getAllKeywords(history)
        .then(keywrods => setKeywords(keywrods))
        .catch(() => showError("Ошибка при загрузке ключевых слов"))
}

const onAddNewKeyword = (UserID) => (values) => {
    var dateNow = new Date()
    var dateString = formatDate(dateNow)
    // console.log(dateString)
    addKeyword(UserID, values.keyword, dateString)
    // .then(data => {
    //     showSuccess("Ключевое слово добавлено")
    //     // console.log(data)
    // })

}

function formatDate(date) {
    var dd = date.getDate();
    if (dd < 10) dd = '0' + dd;
  
    var mm = date.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;
  
    var yy = date.getFullYear();
  
    return dd + '.' + mm + '.' + yy;
}

export default Keywords;