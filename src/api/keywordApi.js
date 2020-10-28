import {throwHttpErrors} from "../common";

export const getAllKeywords = (history) => 
    fetch(`http://localhost:3001/keywords/all`, {
        method: "GET"
    })
    .then(response => throwHttpErrors(response, history))
    .then(response => {
        let j = response.json()
        return j
    })
    .then(keywords => {
        return keywords || []
    })

export const deleteKeywords = (ids) =>
    // console.log(ids)
    fetch(`http://localhost:3001/keywords/remove`, {
        method: "POST", 
        body: ids
    })

export const addKeyword = (userID, keyword, addDateString) => {
    // console.log(JSON.stringify({userID, keyword, addDateString}))
    fetch(`http://localhost:3001/keywords/add`, {
            method: "POST",
            body: JSON.stringify({userID, keyword, addDateString})
        })
        .then(response => {
            var j = response.json()
            // console.log(j)
            return j
        })
        .then(data => {
            // console.log(data)
            return data
        })
    }