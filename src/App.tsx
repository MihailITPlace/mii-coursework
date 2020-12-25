import React, {useEffect} from 'react';
import 'semantic-ui-css/semantic.min.css'
import {Grid, Header} from "semantic-ui-react";
import Search from "./components/Search";
import {Font} from "@react-pdf/renderer";

function App() {
    useEffect(() => {
        Font.register({
            family: "OpenSans",
            src:
                "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf"
        });
    }, []);

    return (
        <Grid>
            <Grid.Row>
                <Grid.Column width={4}>
                </Grid.Column>
                <Grid.Column width={8}>
                    <Header style={{marginTop: "0.2em"}} as='h1'>Coursework</Header>
                    <Search/>
                </Grid.Column>
                <Grid.Column width={4}>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
}

export default App;
