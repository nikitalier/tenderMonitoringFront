// import React from "react";
import React, { Component } from 'react';
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import {useKeywordsStyles} from "./keywrodsStyles";
// import keywrodsStyles from "./keywrodsStyles";
import {BootstrapTable, TableHeaderColumn, DeleteButton, InsertButton} from 'react-bootstrap-table';
import AuthWrapper from "../../security/AuthWrapper";
import {deleteKeywords} from "../../api/keywordApi"
import {ADMIN, ALL, IT_DEP, OBSERVER, SALES_DEP} from "../../security/Authorities";  
import {useSnackbar} from "../../utils/snackbar";
import { useFormik } from 'formik';
import {required} from "../../forms/formik/formikValidationRules";
import {formikValidate} from "../../forms";

const validate = formikValidate({
    keyword: [required()],
});


const KeywordsView = ({keywordsTable, onAddKeyword, auth}) => {
    const classes = useKeywordsStyles();
    const snackbar = useSnackbar();

    // console.log(keywordsTable)

    const {values, errors, handleSubmit, handleChange} = useFormik({
        initialValues: {
          keyword: '',
        },
        onSubmit: values => {
            for (var i = 0; i < keywordsTable.length; i++) {
                // console.log("kekw")
                if (keywordsTable[i].keyword === values.keyword) {
                    snackbar.showError("Такое ключевое слово уже существует!")
                    return
                }
            }
            snackbar.showSuccess("Ключевое слово добавлено!")
            onAddKeyword(values)
            window.location.reload(false);
        },
        validate
    });

    function onDeleteRow(rowKeys) {
        deleteKeywords(rowKeys)
        snackbar.showSuccess(`Ключевые слова были удалены!`);
    }
    const createDeleteButton = (onClick) => {
        return (
            <AuthWrapper authorities={[SALES_DEP, IT_DEP, ADMIN]}>
                   <DeleteButton
                    onClick={() => handleDeleteButtonClick(onClick)}
                    className={classes.buttonDelete}
                   >
                        Удалить
                    </DeleteButton>
            </AuthWrapper>
    
        );
    };

    const options = {
        deleteBtn: createDeleteButton,
        afterDeleteRow: onDeleteRow
    };
    
    const selectRowProp = {
        mode: auth,
    }

    return (
        <Card>
            <CardContent>
            <Typography 
            className={classes.pageTitle} 
            variant="h3"
            >
                Ключевые слова
            </Typography>
            <AuthWrapper authorities={[SALES_DEP, IT_DEP, ADMIN]}>
                <form 
                    className={classes.divAddRows}
                    onSubmit={handleSubmit}
                    >
                    <input
                        required
                        type={'text'}
                        error={errors.keyword}
                        onChange={handleChange}
                        value={values.keyword}
                        id="keyword"
                        name="keyword"
                        >
                    </input>
                    <InsertButton 
                        className={classes.buttonInsert}
                        type="submit" 
                        >
                        Добавить
                    </InsertButton>
                </form>
            </AuthWrapper>
            <BootstrapTable
                data={keywordsTable}
                selectRow={selectRowProp}
                deleteRow={true}
                options={options}
                search={ true }
                >
                <TableHeaderColumn isKey dataField='ID' width='5%' hidden={true}>
                    ID
                </TableHeaderColumn>
                <TableHeaderColumn dataField='keyword' width='50%'>
                    Ключевое слово
                </TableHeaderColumn>
                <TableHeaderColumn dataField='Login' width='30%'>
                    Добавлено
                </TableHeaderColumn>
                <TableHeaderColumn dataField='addDateString' width='20%'>
                    Дата
                </TableHeaderColumn>
            </BootstrapTable>
            </CardContent>
        </Card>
    )
};


const handleDeleteButtonClick = (onClick) => {
    onClick();
}

export default KeywordsView;