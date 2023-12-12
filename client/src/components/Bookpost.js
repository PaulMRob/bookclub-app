import React, { useState, useContext } from "react";
import { UserContext } from "../context/UserProvider";
import DiscussionForm from "./DiscussionForm";
import VoteTracker from "./VoteTracker";

const Bookpost = (props) => {
  const { userAxios, upVote, downVote } = useContext(UserContext);

  const { booktitle, quotation, postID, upvotes, downvotes } = props;

  const [displayDiscussion, setDisplayDiscussion] = useState(false);
  const [discussion, setDiscussion] = useState([]);

  function toggleDiscussion() {
    setDisplayDiscussion((prev) => !prev);
    getPostDiscussion(postID);
  }

  function getPostDiscussion(id) {
    userAxios
      .get(`/api/discussion/${id}`)
      .then((res) => {
        setDiscussion(res.data);
      })
      .catch((err) => console.log(err.response.data.errMsg));
  }

  function deleteDiscussion(discussionId) {
    userAxios
      .delete(`/api/discussion/${discussionId}`)
      .then((res) => {
        setDiscussion((prevDiscussion) =>
          prevDiscussion.filter((discussion) => discussion._id !== discussionId)
        );
      })
      .catch((err) => console.log(err.response.data.errMsg));
  }
  return (
    <div className="bookpost" style={{ background: "#12121240", padding: "40px", margin: '20px', borderRadius: "4px" }}>
      <h1>{booktitle}</h1>
      <p>{quotation}</p>
      <VoteTracker
        _id={postID}
        upvotes={upvotes}
        downvotes={downvotes}
        downVote={downVote}
        upVote={upVote}
      />
      <p onClick={toggleDiscussion}>Read Discussion</p>
      {displayDiscussion && (
        <>
          <div>
            {discussion.map((discussion) => (
              <div className="discussion" key={discussion._id}>
                <p>{`${discussion.username}: ${discussion.discussion}`}</p>
                <button onClick={() => deleteDiscussion(discussion._id)}>
                  Delete
                </button>
                <button>Edit</button>
              </div>
            ))}
          </div>
          <DiscussionForm
            postID={postID}
            discussion={discussion}
            setDiscussion={setDiscussion}
          />
        </>
      )}
    </div>
  );
};

export default Bookpost;
