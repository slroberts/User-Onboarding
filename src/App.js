import React from "react";
import UserForm from "./components/Form";
import {Container, Grid, Header, Icon} from "semantic-ui-react";

function App() {
  return (
    <Container text>
      <Grid stackable columns={2} padded>
        <Grid.Row>
          <Grid.Column>
            <Header as="h1" color="blue">
              <Icon color="blue" name="users" />
              User Onboarding
            </Header>
          </Grid.Column>
          <Grid.Column>
            <UserForm />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
}

export default App;
