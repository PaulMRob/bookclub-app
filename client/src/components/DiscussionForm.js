import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserProvider";

const DiscussionForm = (props) => {
  const [value, setValue] = useState("");

  const { postID, setDiscussion } = props;
  const { userAxios } = useContext(UserContext);

  function handleChange(e) {
    setValue(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    addDiscussion(postID, { discussion: value });
    setValue("");
  }

  function addDiscussion(id, newDiscussion) {
    userAxios
      .post(`api/discussion/${id}`, newDiscussion)
      .then((res) => {
        setDiscussion((prev) => [...prev, res.data]);
      })
      .catch((err) => console.log(err.resposne.data.errMsg));
  }
  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Submit</button>
      <input
        type="text"
        value={value}
        name="discussion"
        onChange={handleChange}
        placeholder="Write your thoughts here..."
      />
    </form>
  );
};

export default DiscussionForm;
