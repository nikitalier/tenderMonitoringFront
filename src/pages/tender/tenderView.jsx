import { Card, TextareaAutosize } from '@material-ui/core';
import React, {useState, useEffect} from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {useSimplePageStyles} from "../../styles/simplePageStyles";
import CardContent from "@material-ui/core/CardContent";
import { useFormik } from 'formik';
import AuthWrapper from "../../security/AuthWrapper";
import Paper from '@material-ui/core/Paper';
import TextField from "@material-ui/core/TextField";
import LinkIcon from '@material-ui/icons/Link';
import Button from "@material-ui/core/Button";
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import { useTenderStyles } from './tenderStyle'
import {useSnackbar} from "../../utils/snackbar";
import { IT_DEP, SALES_DEP, ADMIN } from '../../security/Authorities';

const TenderView = ({tender, isFav, onClickFav, comments, addNewComment, tenderStatus, updateSaleStatus, updateITStatus}) => {
    const simpleClasses = useSimplePageStyles();
    const classes = useTenderStyles();
    const snackbar = useSnackbar();

    const back = () => {
        window.history.back()
    }

    return (
        <Card>
            <CardContent>
                <Typography 
                    className={classes.pageTitle} 
                    // className={classes.text}
                    variant="h3"
                    >
                        Информация о тендере
                </Typography>
                <Grid 
                    className={classes.grid}
                    container
                    justify="space-between"
                >
                    <Button 
                        variant="contained"
                        color="primary"
                        fullWidth={false}
                        onClick={back}
                        className={classes.buttonBack}
                    >
                        <Typography>Вернуться</Typography>
                    </Button>
                    <Button 
                        className={classes.buttonBookmark}
                        onClick={onClickFav}
                    >
                        {
                            isFav ? 
                            <BookmarkIcon fontSize='large' /> :  <BookmarkBorderIcon fontSize='large' />
                        }
                    </Button>
                </Grid>
                <TenderInfo
                    tender={tender}
                    classes={classes}
                />
                <Decision
                    classes={classes}
                    tenderStatus={tenderStatus}
                    updateSaleStatus={updateSaleStatus}
                    updateITStatus={updateITStatus}
                />
                <Comments
                    classes={classes}
                    comments={comments}
                    snackbar={snackbar}
                    addNewComment={addNewComment}
                />
            </CardContent>
        </Card>
    )
}

const Decision = ({classes, tenderStatus, updateSaleStatus, updateITStatus}) => {
    return (
        <div>
            <Typography variant='h4'>
                Потверждения
            </Typography>
            <Card>
                <CardContent >
                    <Grid
                        container
                        justify='space-between'
                    >
                        <Grid item xs={3}>
                            {
                                tenderStatus.ITStatus ?
                                <Paper className={classes.paperDecTrue}>
                                    <b>Руководитель IT</b>
                                    <Typography variant='h5' style={{ color: "gold" }}>
                                        Потверждено
                                        <DoneOutlineIcon style={{ color: "dodgerblue" }}></DoneOutlineIcon>
                                    </Typography>
                                    <Typography>
                                        {tenderStatus.ITUserName}
                                    </Typography>
                                </Paper>
                            :
                                <Paper className={classes.paperDecFalse}>
                                    <b>Руководитель IT</b>
                                    <Typography variant='h5'>
                                        Не потверждено
                                    </Typography>
                                </Paper>
                            }
                        </Grid>
                        <Grid item xs={3}>
                            {
                                tenderStatus.SalesStatus ?
                                <Paper className={classes.paperDecTrue}>
                                    <b>Руководитель отдела продаж</b>
                                    <Typography variant='h5' style={{ color: "gold" }}>
                                        Потверждено
                                        <DoneOutlineIcon style={{ color: "dodgerblue" }}></DoneOutlineIcon>
                                    </Typography>
                                    <Typography>
                                        {tenderStatus.SalesUserName}
                                    </Typography>
                                </Paper>
                            :
                                <Paper className={classes.paperDecFalse}>
                                    <b>Руководитель отдела продаж</b>
                                    <Typography variant='h5'>
                                        Не потверждено
                                    </Typography>
                                </Paper>
                            }
                        </Grid>
                    </Grid>
                    <Grid container justify='space-between' className={classes.buttonAccept}>
                        <AuthWrapper authorities={[IT_DEP, ADMIN]}>
                            {
                                tenderStatus.ITStatus ?
                                <div></div> :
                                <Button variant="contained" color="primary" onClick={updateITStatus}>Потвердить</Button> 
                            }
                        </AuthWrapper>
                        <AuthWrapper authorities={[SALES_DEP, ADMIN]}>
                            {
                                tenderStatus.SalesStatus ?
                                <div></div> :
                                <Button variant="contained" color="primary" onClick={updateSaleStatus}>Потвердить</Button> 
                            }
                        </AuthWrapper>
                    </Grid>
                </CardContent>
            </Card>
        </div>
    )
}

const Comments = ({classes, comments, snackbar, addNewComment}) => {
    const {values, errors, handleSubmit, handleChange} = useFormik({
        initialValues: {
          comment: '',
        },
        onSubmit: values => {
            addNewComment(values.comment)
            snackbar.showSuccess("Комментарий добавлен!")
            values.comment = ''
        },
    });

    return (
        <div style={{ marginTop:50 }}>
            <Typography variant='h4'>
                Комментарии
            </Typography>
            <Card>
                <CardContent>
                    
                    <Grid
                        container 
                        className={classes.gridComments}
                        direction="column"
                        spacing={3}
                    >
                            {comments.map((value) => (
                                <Grid item xs={4} key={value.ID} > 
                                    <Typography variant="h6"
                                        classesName={classes.commentLogin}
                                    >
                                        {value.UserFullName}
                                    </Typography>
                                    <Paper 
                                        className={classes.comment}
                                    >
                                        {value.Text}
                                    </Paper>
                                </Grid>
                            ))}
                    </Grid>
                    <form
                        onSubmit={handleSubmit}
                    >
                        <Grid
                            container
                            direction="column"
                            classesName={classes.gridAddComment}
                            >
                            {/* <Typography variant='h6' className={classes.tComment}>
                                Добавить
                            </Typography> */}
                            <TextareaAutosize
                                type={'text'}
                                required
                                value={values.comment}
                                id="comment"
                                name="comment"
                                onChange={handleChange}
                                rowsMin={3}
                                rowsMax={3} 
                                className={classes.textarea}
                                placeholder="Ваш комментарий"
                            />
                            <Button 
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth={false}
                                className={classes.buttonAddComment}
                            >
                                Добавить
                            </Button>
                        </Grid>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

const TenderInfo = ({tender, classes}) => {
    const date = new Date(tender.AddDate);
    const dateString = date.toLocaleDateString()

    return (
        <CardContent>
            <Grid 
                container 
                spacing={3}
                className={classes.root}
                direction="row"
                justify="space-between"
                alignItems="center"
            >
                <Grid item xs={2}>
                    <Paper className={classes.paperKeyword}>
                        <Typography
                            variant="h5"
                        >
                            Ключевое слово
                        </Typography>
                        <Typography
                            variant="h6"
                        >
                            <b>
                                {tender.Keyword}
                            </b>
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={2}>
                    <Paper 
                        className={classes.paperLink}
                    >
                        <Typography
                            variant="h5"
                        >
                            Ссылка на тендер
                        </Typography>
                        <a href={tender.Link}  target="_blank">
                            <LinkIcon fontSize='large'/>
                        </a>
                    </Paper>
                </Grid>
            </Grid>
            <Grid 
                container
                spacing={3}
                className={classes.root}
                justify="space-between"
            >
                <Grid item xs={8}>
                    <Paper className={classes.paperDesc}>
                        <Typography
                            variant="h5"
                        >
                            Описание тендера
                        </Typography>
                        <Typography
                            variant="h6"
                        >
                            <b>
                                {tender.Description}
                            </b>
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper className={classes.paperCost}>
                        <Typography
                            variant="h5"
                        >
                            Стоимость
                        </Typography>
                        <Typography
                            variant="h6"
                        >
                            <b>
                                {tender.Price}
                            </b>
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
            <Grid 
                container
                spacing={3}
                className={classes.root}
                justify="space-between"
            >
                <Grid item xs={6}>
                    <Paper className={classes.paperOrg}>
                        <Typography
                            variant="h5"
                        >
                            Огранизатор
                        </Typography>
                        <Typography
                            variant="h6"
                        >
                            <b>
                                {tender.Organizer}
                            </b>
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper className={classes.paperCost}>
                        <Typography
                            variant="h5"
                        >
                            Дата добавления
                        </Typography>
                        <Typography
                            variant="h6"
                        >
                            <b>
                                {dateString}
                            </b>
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </CardContent>
    )
}

export default TenderView