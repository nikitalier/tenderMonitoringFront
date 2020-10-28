import React from "react";
import {useSimplePageStyles} from "../../styles/simplePageStyles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import { useSummaryStyle } from './summaryStyle'
import CardContent from "@material-ui/core/CardContent";
import { Grid, Paper } from "@material-ui/core";
import LinkIcon from '@material-ui/icons/Link';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import BootstrapTable from 'react-bootstrap-table-next';

const SummaryView = ({summary, history}) => {
  const classes = useSummaryStyle();
  const keywordsByTenders = summary.CountTendersByKeywords
  const bestTendersArray = summary.BestTenders
  const approvedTenders = summary.ApprovedTenders

  // console.log(approvedTenders)

  const rowEvents = {
    onClick: (e, row, rowIndex) => {
        // console.log(row);
        history.push("/tenders/" + row.ID)
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography className={classes.pageTitle} variant="h3">Сводка</Typography>
        <Grid container 
        className={classes.gridInfo}
        >
          <Grid item xs={12} >
            <Grid container 
            // justify='space-evenly'
            spacing={3}
            >
              <Grid item xs={3}>
                <Paper className={classes.paperInfo}>
                  <Typography variant='subtitle1'>
                    Количество тендеров: 
                    <b>
                      {summary.CountTenders}
                    </b>
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={3}>
                <Paper className={classes.paperInfo}>
                  <Typography variant='subtitle1'>
                    Количество ключевых слов: 
                    <b>
                      {summary.CountKeywords}
                    </b>
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid style={{marginTop: 30}}>
          <Typography variant='h4'>
            Количество тендров по ключевым словам
          </Typography>
          <BootstrapTable
            hover
            // rowEvents={ rowEvents }
            columns={columnsKeywordsByTenders}
            keyField="Keyword"
            data={keywordsByTenders}
          />
        </Grid>
        <Grid style={{marginTop: 30}}>
          <Typography variant='h4'>
            Лучшие тенедры
          </Typography>
          <BootstrapTable
            hover
            // rowEvents={ rowEvents }
            columns={bestTenders}
            keyField="ID"
            data={bestTendersArray}
            rowEvents={ rowEvents }
          />
        </Grid>
        <Grid style={{marginTop: 30}}>
          <Typography variant='h4'>
            Потвержденные тендеры
          </Typography>
          <BootstrapTable
            hover
            // rowEvents={ rowEvents }
            columns={bestTenders}
            keyField="ID"
            data={approvedTenders}
            rowEvents={ rowEvents }
          />
        </Grid>
      </CardContent>
    </Card>
  );
};

const linkFormatter = (cell) => {
  return (
      <a href={cell}  target="_blank">
          <LinkIcon fontSize='large'/>
      </a>
  )
}

const dateFormatter = (cell) => {
  var date = new Date(cell);
  var dateString = date.toLocaleDateString()
  return (
      <span>
              {dateString}
      </span>
      )
}

const bestTenders = [{
  dataField: 'ID',
    text: 'Product ID',
    hidden: true
}, {
    dataField: 'Description',
    text: 'Описание',
    style: { width: '30%' }
}, {
    dataField: 'Keyword',
    text: 'Ключевое слово'
}, {
    dataField: 'Link',
    text: 'Ссылка',
    formatter: linkFormatter,
    align: 'center',
    }, {
    dataField: 'AddDate',
    text: 'Дата',
    formatter: dateFormatter
}, {
    dataField: 'Organizer',
    text: 'Организатор',
    // style: { width: '25%' }
}, {
    dataField: 'Price',
    text: 'Стоимость'
}]

const columnsKeywordsByTenders = [{
  dataField: 'Keyword',
  text: 'Ключевое слово'
}, {
  dataField: 'CountTenders',
  text: 'Колчество тендеров'
}
]



export default SummaryView;
