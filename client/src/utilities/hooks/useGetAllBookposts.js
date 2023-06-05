import React, { useEffect, useState } from "react";
import userAxios from "../userAxios";

const useGetAllBookposts = () => {
const [allBookposts, setAllBookposts] = useState([])


  useEffect(() => {
    userAxios("/api/bookpost")
      .then((res) => {
        setAllBookposts((prev) => ({
            ...prev,
            bookposts: res.data,
        }));
      })
      .catch((err) => console.log(err.resposne.data.errMsg));
  }, []);

  return { allBookposts };
};

export default useGetAllBookposts;
