import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import {Typography} from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: "#17171A",
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "#565664",
        color: "#FFFFFF",
        height: 284,
        width: "100%",
        overflow: "auto"
    },
    primaryTypography: {
        color: "#FFFFFF",
        fontSize: "14px"
    },
    secondaryTypography: {
        color: "#FFFFFF",
        fontSize: "11px"
    },
    selected: {
        backgroundColor: "#000344 !important",
        border: 1,
        borderLeft: 0,
        borderRight: 0,
        borderStyle: "solid",
        borderColor: "#565664",
    }

}));

export default function Lists({dataList, selectedData, onSelectItem}) {
    const classes = useStyles();

    return (
        <List className={classes.root}>
            {dataList !== undefined && dataList !== null && dataList.length > 0 ? dataList.map((item, index) => (
                <ListItem button onClick={() => onSelectItem(item.id)} key={index}
                          selected={selectedData != null ? selectedData.id === item.id : false}
                          classes={{selected: classes.selected}}>
                    <ListItemAvatar>
                        <Avatar style={{
                            backgroundColor: item.color ? item.color : "#F7B500",
                            color: item.color ? item.color : "#F7B500"
                        }}/>
                    </ListItemAvatar>
                    <ListItemText primary={<Typography className={classes.primaryTypography}>{item.name}</Typography>}
                                  secondary={<Typography className={classes.secondaryTypography}>{item.volume}
                                      m3</Typography>}
                    />
                </ListItem>
            )) : ""}
        </List>
    );
}
