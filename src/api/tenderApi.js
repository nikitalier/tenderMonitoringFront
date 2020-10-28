import {throwHttpErrors} from "../common";

export const getAllTenders = (history) =>
    fetch(`http://localhost:3001/tenders/all`, {
        method: "GET"
    })
    .then(response => throwHttpErrors(response, history))
    .then(response => {
        let j = response.json()
        return j
    })
    .then(tenders => {
        // console.log(tenders)
        return tenders || []
    })

export const getTender = (history, id) =>
    fetch(`http://localhost:3001/tenders?id=${id}`, {
        method: 'GET'
    })
        .then(response => throwHttpErrors(response, history))
        .then(response => response.json())


export const getIsFavorite = (UserID, TenderID) => 
    fetch(`http://localhost:3001/favorite`, {
        method: 'POST',
        body: JSON.stringify({UserID, TenderID})
    })
        .then(response => response.json())
        .then(data => {
            // console.log(data)
            return data.Status
        })

export const updateFavorite = (UserID, TenderID, Status) => 
    fetch(`http://localhost:3001/favorite/update`, {
        method: 'POST',
        body: JSON.stringify({UserID, TenderID, Status})
    })

export const getAllComments = (history, tenderID) =>
    fetch(`http://localhost:3001/comments/all?tenderid=${tenderID}`, {
        method: "GET"
    })
    .then(response => throwHttpErrors(response, history))
    .then(response => {
        let j = response.json()
        return j
    })
    .then(commetns => {
        // console.log(tenders)
        return commetns || []
    })

export const addNewComment = (UserID, TenderID, Text) => 
    fetch(`http://localhost:3001/comments/add`, {
        method: 'POST',
        body: JSON.stringify({UserID, TenderID, Text})
    })
    .then(response => {
        // console.log(response.ok)
        return response
    })

export const getTenderStatus = (tenderID) => 
    fetch(`http://localhost:3001/tenderstatus?id=${tenderID}`, {
        method: 'GET',
    })
        .then(response => response.json())
        .then(data => data)

export const createTender = (tenderID) =>
    fetch(`http://localhost:3001/tenderstatus/create?id=${tenderID}`, {
        method: 'GET',
    })

export const updateStatus = (TenderID, ITUserID, SalesUserID, SalesStatus, ITStatus) =>
    fetch(`http://localhost:3001/tenderstatus/update`, {
        method: 'POST',
        body: JSON.stringify({TenderID, ITUserID, SalesUserID, SalesStatus, ITStatus})
    })
    .then(response => response)

export const getSummary = () =>
    fetch(`http://localhost:3001/summary`, {
        method: 'GET',
    })
    .then(response => response.json())
    .then(data => data)