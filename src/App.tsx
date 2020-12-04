import React from 'react';
import 'semantic-ui-css/semantic.min.css'
import {Grid, Header, Image} from "semantic-ui-react";
import Search from "./components/Search";

function App() {
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
