import {makeStyles} from "@material-ui/core/styles";

export const summaryStyle = theme => ({
    root: {
        flexGrow: 1,
      },
    gridInfo: {
        marginTop: 30,
        padding: theme.spacing(2),
        // border: '1px solid grey',
        color: theme.palette.text.secondary,
        borderRadius: 10,
    },
    paperInfo: {
        padding: theme.spacing(2),
        border: '1px solid grey',
        color: theme.palette.text.secondary,
    },
    
    
});

export const useSummaryStyle = makeStyles(summaryStyle, {name: "Summary"});
