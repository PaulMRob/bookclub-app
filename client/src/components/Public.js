import { useContext, useState } from "react";
import BookpostList from "./BookpostList";
import BookpostForm from "./BookpostForm";
import Bookpost from "./Bookpost";
import useGetAllBookposts from "../utilities/hooks/useGetAllBookposts";
import Navbar from "./Navbar";
import { UserContext } from "../context/UserProvider";
import "../css/public.css"


const Public = () => {
  const { addBookpost, logout, token} = useContext(UserContext)
  const { allBookposts } = useGetAllBookposts();
  const [toggle, setToggle] = useState(false)

function toggleForm() {
    setToggle((prev) => !prev);
}

  return (
    <div className="public">
      <Navbar logout={logout} token={token} />
      {token && toggle && <BookpostForm addBookpost={addBookpost} />}
      {!toggle && (
        <button className="btn-new" onClick={toggleForm}>
          Start a new discussion
        </button>
      )}
      {toggle && (
        <button className="btn-discard" onClick={toggleForm}>
          Discard
        </button>
      )}
      <BookpostList
        comment="hi colin"
        bookposts={allBookposts.bookposts ? allBookposts.bookposts : []}
      />
    </div>
  );
};

export default Public;
