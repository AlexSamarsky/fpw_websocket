import React from "react";
import { Col, Row } from "react-bootstrap";
import NewPost from "./components/NewPost";
import Posts from "./components/Posts";

function App() {
  return (
    <>
      <Row>
        <Col>
          <Posts />
        </Col>
        <Col>
          <NewPost />
        </Col>
      </Row>
    </>
  );
}

export default App;
