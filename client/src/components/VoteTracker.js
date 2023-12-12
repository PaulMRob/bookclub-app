import { useState, useContext } from "react";
import { UserContext } from "../context/UserProvider";

export default function VoteTracker(props) {
  const { _id, upvotes, downvotes, upVote, downVote } = props;
  const { userAxios } = useContext(UserContext);

  const handleUpvote = () => {
    upVote(_id);
  };

  const handleDownvotes = () => {
    downVote(_id);
  };

  return (
    <div id="vote-tracker">
      <p>Upvotes: {upvotes.length}</p>
      <button onClick={handleUpvote}>UP</button>
      <p>Downvotes: {downvotes.length}</p>
      <button onClick={handleDownvotes}>DOWN</button>
    </div>
  );
}
