import {makeStyles} from "@material-ui/core/styles";

export const tenderStyle = theme => ({
    root: {
        flexGrow: 1,
      },
    paperKeyword: {
        width: '150%',
        // height: 100,
        padding: theme.spacing(2),
        marginTop: '20px',
        marginBottom: '20px',
        marginRight: '20px',
        border: '1px solid grey',
        color: theme.palette.text.secondary,
    },
    paperLink: {
        // width: 250,
        padding: theme.spacing(2),
        marginTop: '20px',
        marginBottom: '20px',
        marginLeft: '20px',
        border: '1px solid grey',
        color: theme.palette.text.secondary,
    },
    paperDesc: {
        padding: theme.spacing(2),
        marginTop: '20px',
        marginBottom: '20px',
        marginRight: '20px',
        border: '1px solid grey',
        color: theme.palette.text.secondary,
    },
    paperCost: {
        padding: theme.spacing(2),
        marginTop: '20px',
        marginBottom: '20px',
        marginLeft: '20px',
        border: '1px solid grey',
        color: theme.palette.text.secondary,
    },
    paperOrg: {
        padding: theme.spacing(2),
        marginTop: '20px',
        marginBottom: '20px',
        marginRight: '20px',
        border: '1px solid grey',
        color: theme.palette.text.secondary,
    },
    buttonBack: {
        width: '7%',
        marginLeft: '20px',
        marginTop: '20px'
    },
    paperAddDate: {
        padding: theme.spacing(2),
        marginTop: '20px',
        marginBottom: '20px',
        marginLeft: '20px',
        border: '1px solid grey',
        color: theme.palette.text.secondary,
    },
    buttonBookmark: {
        marginRight: '20px'
    },
    comment: {
        padding: theme.spacing(3),
        color: theme.palette.text.secondary,
        border: '2px solid gold',
    },
    commentLogin: {
        color: theme.palette.text.secondary,
        margin: '20px',
    },
    gridComments: {
        marginLeft: 50,
        
    },
    cardContentComment: {
        border: '1px solid gold',
    },
    textarea: {
        border: '2px solid grey',
        width: '25%',
        marginLeft: 60,
        resize: 'none',
        borderRadius: 10,
        marginTop: 50,
    },
    gridAddComment: {
        marginTop: 50,
        marginLeft: 60
    },
    buttonAddComment: {
        width: 100,
        marginLeft: 60,
        marginTop: 10
    },
    paperDecTrue: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
        border: '3px solid gold'
    },
    paperDecFalse: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
        border: '3px solid grey'
    },
    buttonAccept: {
        marginTop: 25
    }

});

export const useTenderStyles = makeStyles(tenderStyle, {name: "Tender"});
