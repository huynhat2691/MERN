import Button from "react-bootstrap/Button";
import playIcon from "../../assets/circle-play-solid.svg";
import editIcon from "../../assets/pen-to-square-solid.svg";
import deleteIcon from "../../assets/trash-can.svg";
import { useContext } from "react";
import { PostContext } from "../../contexts/PostContext";

const ActionButtons = ({ url, _id }) => {
  const { deletePost, findPost, setShowUpdatePostModal } =
    useContext(PostContext);

  const choosePost = (postId) => {
    findPost(postId);
    setShowUpdatePostModal(true);
  };

  return (
    <>
      <Button className="post-button" href={url} target="_blank">
        <img src={playIcon} alt="play" width="24" height="24" />
      </Button>
      <Button className="post-button" onClick={() => choosePost(_id)}>
        <img src={editIcon} alt="edit" width="24" height="24" />
      </Button>
      <Button
        className="post-button"
        onClick={() => deletePost(_id)}
        style={{ borderRight: "none" }}
      >
        <img src={deleteIcon} alt="delete" width="24" height="24" />
      </Button>
    </>
  );
};

export default ActionButtons;
