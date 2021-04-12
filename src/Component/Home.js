import React, {useEffect, useState} from "react";
import {Container, Grid, Typography} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import Lists from "./List";
import Form from "./Input";


const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
        marginTop: "20px",
    },
    addButton: {
        height: 32,
        width: 81,
        textTransform: "capitalize",
        borderRadius: 26,
    },
    deleteButton: {
        height: 32,
        width: 97,
        textTransform: "capitalize",
        borderRadius: 26,
    },
    gridRoot: {
        marginTop: 15,
        flexGrow: 1,
    },
    marginLeft: {
        marginLeft: 20,
    },
    totalCostContainer: {
        marginTop: 16,
        display: 'flex',
        justifyContent: 'space-between',
    },
    totalCost: {
        fontWeight: 400,
        color: "white",
        fontSize: 16
    }

}));

/***
 * @summary
 * main component of the app. Uses redux to track state management for materials added to the list
 * with different functions handling the addition, deletion, and edit materials part of the logic
 * 
 * @return 
 * renders the HTML and CSS wrt to the Redux state. Renders the root page of the application 
 */
export default function Home() {
    const classes = useStyles();
    const [reload, setReload] = useState(false);
    const [dataList, setDataList] = useState([]);
    const [selectedData, setSelectedData] = useState(null)
    var amount = 0;

    /***
     * @summary
     *  updates the redux local storage every time, which is keeping track of the the
     *  state or the items currently added in 
     */   
    useEffect(() => {
        if (localStorage.getItem('data') !== undefined || localStorage.getItem('data') !== null) {
            const data = JSON.parse(localStorage.getItem('data'))
            setDataList(data)
        }
    }, [reload])

    /***
     * @summary
     *  handles the logic of deleting an item form the list.
     */      
     const deleteItem = () => {
        if ((localStorage.getItem('data') !== undefined || localStorage.getItem('data') !== null) && selectedData !== null) {
            const existing = localStorage.getItem('data');
            const existingJson = JSON.parse(existing)
            const array = [...existingJson];
            const itemIndex = array.findIndex((item) => item.id === selectedData.id)
            array.splice(itemIndex, 1)
            localStorage.setItem('data', JSON.stringify(array))
            setSelectedData(null)
            setReload(!reload)
        }
    }

    /***
     * @summary
     *  handles the logic of whenever we edit an exisiting field in the redux state
     */       
    const onChangeFieldValue = (name, value) => {
        const editedData = {...selectedData, [name]: value}
        setSelectedData(editedData)
        const data = JSON.parse(localStorage.getItem('data'))
        const itemIndex = data.findIndex((item) => item.id === editedData.id)
        const array = [...data]
        array[itemIndex] = editedData
        localStorage.setItem('data', JSON.stringify(array))
        setReload(!reload)
    }

    /***
     * @summary
     *  handles the logic of selecting an item for the redux state
     */   
    const onSelectItem = (id) => {
        if (id !== undefined || id !== null) {
            if (localStorage.getItem('data') !== undefined || localStorage.getItem('data') !== null) {
                const data = JSON.parse(localStorage.getItem('data'))
                const itemIndex = data.findIndex((item) => item.id === id)
                const item = data[itemIndex]
                setSelectedData(item)
            }
        }
    }

    /***
     * @summary
     * handles the logic of adding a new item to the redux state
     */
    const handleAddNewData = () => {
        if (localStorage.getItem('data') === undefined || localStorage.getItem('data') == null) {
            const array = [];
            const item = {
                id: array.length + 1,
                name: "",
                color: "",
                volume: "",
                deliveryDate: "",
                cost: "",
            }
            array.push(item)
            localStorage.setItem('data', JSON.stringify(array))
            setReload(!reload)
        } else {
            const existing = localStorage.getItem('data');
            const existingJson = JSON.parse(existing)
            const array = [...existingJson];
            const item = {
                id: array.length + 1,
                name: "",
                color: "",
                volume: "",
                deliveryDate: "",
                cost: "",
            }
            array.push(item)
            localStorage.setItem('data', JSON.stringify(array))
            setSelectedData(item)
            setReload(!reload)
        }
    }

    
    return (
        <Container maxWidth="lg" style={{marginTop: "44px"}}>
            <div>
                <Typography variant="h4" component="h2" style={{color: "#FFFFFF", fontSize: 28, fontWeight: 700}}>
                    Materials
                </Typography>
            </div>
            <div className={classes.root}>
                <Button variant="contained" color="primary" className={classes.addButton}
                        onClick={() => handleAddNewData()}>
                    <AddIcon fontSize="small" style={{marginRight: "3px"}}/> Add
                </Button>
                <Button variant="contained" color="secondary" className={classes.deleteButton}
                        onClick={() => deleteItem()}>
                    <DeleteIcon fontSize="small" style={{marginRight: "3px"}}/>Delete
                </Button>
            </div>

            <div className={classes.gridRoot}>
                <Grid container direction={"row"} spacing={3}>
                    <Grid item lg={3} md={12} sm={12} xs={12}>
                        <Lists dataList={dataList} selectedData={selectedData} onSelectItem={onSelectItem}/>
                        <div className={classes.totalCostContainer}>
                            <Typography className={classes.totalCost}
                                        variant="h6">Total cost:</Typography>

                            <Typography className={classes.totalCost}
                                        variant="h6">$0</Typography>
                        </div>
                    </Grid>
                    <Grid item lg={9} md={12} sm={12} xs={12}>
                        <Form selectedData={selectedData} onChangeFieldValue={onChangeFieldValue}/>
                    </Grid>
                </Grid>
            </div>
        </Container>
    )
}
