import {makeStyles} from "@material-ui/core/styles";

const keywordsStyles = () => ({
    buttonDelete: {
        width: '100%',
        margin: 10,
    },
    buttonInsert: {
        width: '7%',
        margin: 10
        // height: "",
    },
    divAddRows: {
        marginTop: 15
    }
});

export const useKeywordsStyles = makeStyles(keywordsStyles, {name: "Keywords"});