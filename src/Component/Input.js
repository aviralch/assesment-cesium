import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {FormControl, Grid, InputBase, Typography, withStyles} from "@material-ui/core";
import ColorPicker from "./ColorPicker";


const BootstrapInput = withStyles((theme) => ({
    root: {
        'label + &': {
            marginTop: theme.spacing(3),
        },
    },
    input: {
        borderRadius: 5,
        position: 'relative',
        backgroundColor: "#363640",
        border: 'none',
        fontSize: 14,
        width: 220,
        padding: '10px 12px',
        lineHeight: 14,
        color: "#FFFFFF",
    },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
        },
    },
    margin: {
        margin: theme.spacing(1),
    },
    backGround: {
        // marginTop: 10,
        backgroundColor: "#1D1D21",
        height: 302,
        width: 600,
        borderRadius: 5
    },
    inputLabelTypography: {
        color: "#FFFFFF",
        fontSize: 14
    },
    inputRightAlign: {
        textAlign: "right"
    }

}));

/*** 
 * @return 
 * renders the input area for adding in new materials 
 */

export default function Form({selectedData, onChangeFieldValue}) {
    const classes = useStyles();
    return (
        <div className={classes.backGround}>
            {selectedData !== null ? (
                <form className={classes.root} noValidate autoComplete="off">
                    <Grid container direction={"row"}>
                        <Grid item xs={6}>
                            <div>
                                <FormControl className={classes.margin}>
                                    <Typography className={classes.inputLabelTypography}
                                                variant="h6">Name</Typography>
                                    <BootstrapInput name={"name"}
                                                    style={{marginTop: 5}}
                                                    value={selectedData.name}
                                                    onChange={(event) => onChangeFieldValue(event.target.name, event.target.value)}/>
                                </FormControl>

                                <FormControl className={classes.margin}>
                                    <Typography className={classes.inputLabelTypography} variant="h6">Volume
                                        (m3)</Typography>
                                    <BootstrapInput name={"volume"}
                                                    style={{marginTop: 5}}
                                                    classes={{input: classes.inputRightAlign}}
                                                    value={selectedData.volume}
                                                    onChange={(event) => onChangeFieldValue(event.target.name, event.target.value)}
                                    />
                                </FormControl>

                                <FormControl className={classes.margin}>
                                    <Typography className={classes.inputLabelTypography} variant="h6">Delivery
                                        Date</Typography>
                                    <BootstrapInput name={"deliveryDate"} type={"date"}
                                                    style={{marginTop: 5}}
                                                    value={selectedData.deliveryDate}
                                                    onChange={(event) => onChangeFieldValue(event.target.name, event.target.value)}
                                    />
                                </FormControl>
                            </div>

                        </Grid>

                        <Grid item xs={6}>
                            <div>
                                <FormControl className={classes.margin}>
                                    <Typography className={classes.inputLabelTypography} style={{marginTop: 3}}
                                                variant="h6">Color</Typography>
                                    <ColorPicker value={selectedData.color}
                                                 onChange={(colorCode) => onChangeFieldValue("color", colorCode)}
                                    />
                                </FormControl>

                                <FormControl className={classes.margin}>
                                    <Typography className={classes.inputLabelTypography} style={{marginTop: 4}}
                                                variant="h6">Cost (USD per m3)</Typography>
                                    <BootstrapInput name={"cost"}
                                                    style={{marginTop: 5}}
                                                    classes={{input: classes.inputRightAlign}}
                                                    value={selectedData.cost}
                                                    onChange={(event) => onChangeFieldValue(event.target.name, event.target.value)}
                                    />
                                </FormControl>
                            </div>
                        </Grid>
                    </Grid>
                </form>
            ) : ""}
        </div>
    );
}
