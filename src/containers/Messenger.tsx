import React from 'react';
import { withStore } from 'Store';
import ChatList from './ChatList';
import ChatBox from './ChatBox';
import Login from './Login';
import { Drawer, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(theme => ({
    drawer: {
        width: "400px",
        padding: theme.spacing(4)
    }
}));
export default withStore(function ({ openDrawer, setOpenDrawer,activeUser }: any) {
    const classes = useStyles();
    return (
        <Drawer
            onClose={() => setOpenDrawer(false)}
            anchor="right"
            open={openDrawer}>
            <Grid container justify="center" className={classes.drawer} spacing={3}>
                {activeUser ?activeUser.admin?<ChatList/>:activeUser.verified?
                    <ChatBox />:"Vérifiez votre email"
                    : <Login />}
            </Grid>
        </Drawer>
    );
})