import React, {useEffect, useState, useContext} from 'react';
import TenderView from './tenderView'
import {useSnackbar} from "../../utils/snackbar"
import {AppContext} from "../../AppContext";
import {getTender, getIsFavorite, updateFavorite, getAllComments, updateStatus, addNewComment, createTender, getTenderStatus} from "../../api/tenderApi"
import { CollectionsOutlined, ShowChart } from '@material-ui/icons';
import { set } from 'date-fns/esm';

const Tender = (props) => {
    const tenderID = props.match.params.id;
    var idInt = parseInt(tenderID)
    const {history} = props;
    const [tender, setTender] = useState({});
    const {showError, showSuccess, showInfo} = useSnackbar();
    const [context] = useContext(AppContext);
    const user = context.currentUser;
    const [isFav, setIsFav] = useState(false);
    const [comments, setComments] = useState([{}])
    const [status, setStatus] = useState({})

    createTender(idInt)

    useEffect(() => {
        loadStatus(setStatus, idInt)
    }, [setStatus])

    useEffect(() => {
        loadAllComments(setComments, history, showError, tenderID)
    }, [setComments, history, showError]);

    useEffect(() => {
        getIsFavorite(user.id, parseInt(tenderID))
            .then(status => {
                return setIsFav(status)
            })
    }, [setIsFav])

    const updateSaleStatus = () => {
        if (window.confirm("Потвердите согласие")) {
            updateStatus(idInt, 0, user.id, true, false)
            .then(response => {
                if (response.ok) {
                    loadStatus(setStatus, idInt)
                }
            })
        }
    }

    const updateITStatus = () => {
        if (window.confirm("Потвердите согласие")) {
            updateStatus(idInt, user.id, 0, false, true)
            .then(response => {
                if (response.ok) {
                    loadStatus(setStatus, idInt)
                    showSuccess("Потверждение сохранено")
                }
            })
        }
    }

    const addComment = (commentText) => {
        addNewComment(user.id, idInt, commentText)
        .then(response => {
            if(response.ok) {
                loadAllComments(setComments, history, showError, tenderID)
                showSuccess("Потверждение сохранено")
            }
        })
    }

    const onCliclFav = () => {
        updateFavorite(user.id, parseInt(tenderID), !isFav)
        if (isFav) {
            showInfo("Удалено из избранного")
            setIsFav(false)
        } else {
            showSuccess("Добавлено в избранное")
            setIsFav(true)
        }
    }

    useEffect(() => {
        getTender(history, parseInt(tenderID)).then(tender => {
            return setTender(tender)
        })
        .catch(() => showError("Произошла ошибка при загрузке тендера"))
    }, [setTender, history, showError]);
    
    return (
        <TenderView
            tender={tender}
            isFav={isFav}
            onClickFav={onCliclFav}
            comments={comments}
            addNewComment={addComment}
            tenderStatus={status}
            updateSaleStatus={updateSaleStatus}
            updateITStatus={updateITStatus}
        />
    )
}

const loadAllComments = (setComments, history, showError, tenderID) => {
    getAllComments(history, tenderID)
        .then(comments => setComments(comments))
        .catch(() => showError("Ошибка при загрузке комментариев"))
}

const loadStatus = (setStatus, tenderID) => {
    getTenderStatus(tenderID)
        .then(tenderStatus => setStatus(tenderStatus))
}

export default Tender