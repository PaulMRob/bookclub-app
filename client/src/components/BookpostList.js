import React from "react";
import Bookpost from "./Bookpost";

const BookpostList = (props) => {
  
  const {bookposts} = props

  const savedArr = bookposts.sort((a, b) =>
    a.upvotes > b.upvotes ? -1 : 1
  );

  
  return (
    <div className="bookpost-list">
      {savedArr.map((bookpost) => (
        <Bookpost
          booktitle={bookpost.booktitle}
          quotation={bookpost.quotation}
          upvotes={bookpost.upvotes}
          downvotes={bookpost.downvotes}
          postID={bookpost._id}
          key={bookpost._id}
        />
      ))}
    </div>
  );
};

export default BookpostList;
