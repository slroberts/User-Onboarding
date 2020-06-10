import React from "react";
import UserForm from "./components/Form";
import {Container, Grid, Header, Icon} from "semantic-ui-react";

function App() {
  return (
    <Container
      text
      style={{
        marginTop: 160,
      }}
    >
      <Grid stackable columns={2}>
        <Grid.Row>
          <Grid.Column>
            <Header as="h1" color="blue">
              <Icon color="blue" name="users" />
              User Onboarding
            </Header>
            <p>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
              commodo ligula eget dolor. Aenean massa strong.
            </p>
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
