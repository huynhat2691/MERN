import React, { useContext, useEffect } from "react";
import { PostContext } from "../contexts/PostContext";
import { AuthContext } from "../contexts/AuthContext";
import Spinner from "react-bootstrap/Spinner";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Card } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SinglePost from "../components/posts/SinglePost";
import AddPostModal from "../components/posts/AddPostModal";
import UpdatePostModal from "../components/posts/UpdatePostModal";
import addIcon from "../assets/plus-circle-fill.svg";
import Toast from "react-bootstrap/Toast";

const Dashboard = () => {
  //Context
  const { authState } = useContext(AuthContext);
  const username = authState?.user?.username;

  const {
    postState: { post, posts, postsLoading },
    getPosts,
    setShowAddPostModal,
    showToast: { show, message, type },
    setShowToast,
  } = useContext(PostContext);

  //Start: Get all posts
  useEffect(() => {
    getPosts();
  }, []);

  let body = null;

  if (postsLoading) {
    body = (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    );
  } else if (posts.length === 0) {
    body = (
      <>
        <Card className="text-center mx-5 my-5">
          <Card.Header as="h1">Hi {username}</Card.Header>
          <Card.Body>
            <Card.Title>Welcome to LearnCourse</Card.Title>
            <Card.Text>
              Click the button below to track your first skill to learn
            </Card.Text>
            <Button variant="primary" onClick={() => setShowAddPostModal(true)}>
              Get Started
            </Button>
          </Card.Body>
        </Card>
      </>
    );
  } else {
    body = (
      <>
        <Row className="row-cols-1 row-cols-md-3 g-4 mx-auto mt-3">
          {posts.map((post) => (
            <Col key={post.id} className="my-2">
              <SinglePost post={post} />
            </Col>
          ))}
        </Row>
        {/* Open add post modal */}

        <OverlayTrigger
          placement="left"
          overlay={
            <Tooltip style={{ color: "white" }}>
              Add a new thing to learn
            </Tooltip>
          }
        >
          <Button
            className="btn-floating"
            onClick={() => setShowAddPostModal(true)}
          >
            <img src={addIcon} alt="add-post" width="60" height="60" />
          </Button>
        </OverlayTrigger>
      </>
    );
  }

  return (
    <>
      {body}
      <AddPostModal />
      {post !== null && <UpdatePostModal />}

      {/* After post is added, show toast */}
      <Toast
        show={show}
        style={{ position: "fixed", top: "20%", right: "10px" }}
        className={`bg-${type} text-white`}
        onClose={() => setShowToast({ show: false, message: "", type: null })}
        delay={3000}
        autohide
        animation={false}
      >
        <Toast.Body>
          <strong>{message}</strong>
        </Toast.Body>
      </Toast>
    </>
  );
};

export default Dashboard;
