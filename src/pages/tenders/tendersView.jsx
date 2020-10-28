import React, { Component } from 'react';
import {Route} from "react-router-dom";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import {useSimplePageStyles} from "../../styles/simplePageStyles";
import CardContent from "@material-ui/core/CardContent";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import LinkIcon from '@material-ui/icons/Link';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import { Redirect } from 'react-router';

const { SearchBar } = Search;

const TendersView = ({tendersTable, history}) => {
    const classes = useSimplePageStyles();
    
    const rowEvents = {
        onClick: (e, row, rowIndex) => {
            // console.log(row);
            history.push("/tenders/" + row.ID)
        }
    };

    return (
        <Card>
            <CardContent>
                <Typography 
                className={classes.pageTitle} 
                variant="h3"
                >
                    Тендеры
                </Typography>
                <ToolkitProvider
                    keyField="ID"
                    data={ tendersTable }
                    columns={ columns }
                    search
                >
                    {
                        props => (
                            <div>
                                <SearchBar { ...props.searchProps } />
                                <BootstrapTable
                                    { ...props.baseProps }
                                    hover
                                    pagination={ paginationFactory() }
                                    rowEvents={ rowEvents }
                                    // rowStyle={ rowStyle }
                                    // rowStyle={ { backgroundColor: 'red' } }
                                    // bordered={true}
                                />
                            </div>
                    )
                    }
                </ToolkitProvider>
            </CardContent>
        </Card>
                    )
}

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
    
const columns = [{
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
}];

export default TendersView