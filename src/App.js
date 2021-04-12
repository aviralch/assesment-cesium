import React from "react"
import './App.css'
import Home from "./Component/Home";
import {ThemeProvider} from '@material-ui/core/styles';
import {purple} from '@material-ui/core/colors';
import {createMuiTheme} from '@material-ui/core';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: purple[500]
        }
    }
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Home/>
        </ThemeProvider>
    );
}

export default App;
