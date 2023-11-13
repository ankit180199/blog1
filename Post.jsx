import React, { useContext, useEffect, useState } from "react";
import Edit from "../img/edit.png";
import Delete from "../img/delete.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
import axios from "axios";
import moment from "moment";
import { AuthContext } from "../context/authContext";
// import DOMPurify from "dompurify";

const Post = () => {
    const [post, setPost] = useState({});
    const loc = useLocation()
    const navigate = useNavigate();
    const postID = loc.pathname.split("/")[2];
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await axios.get(`/posts/${postID}`);
          setPost(res.data);
        } catch (err) {
          console.log(err);
        }
      };
      fetchData();
    }, [postID]);

    const handleDelete = async () => {
        try {
            await axios.delete(`/posts/${postID}`);
            navigate("/");
        } catch (err) {
            console.log(err);
        }
    }
    const getText = (html) =>{
        const doc = new DOMParser().parseFromString(html, "text/html")
        return doc.body.textContent
    }

    return (
        <div className="post">
            <div className="content">
                <img src={`../upload/${post?.img}`} alt="Broken img"/>
                <div className="user">
                    {post.userImg && <img src={post.userImg} alt="No profile pic"/>}
                    <div className="info">
                        <span>{post.username}</span>
                        <p>Posted {moment(post.date).fromNow()}</p>
                    </div>
                    {currentUser.username === post.username && (
                        <div className="edit">
                            <Link to={`/post?edit=2`} state={post}>
                                <img src={Edit} alt="" />
                            </Link>
                            <img onClick={handleDelete} src={Delete} alt="" />
                        </div>
                    )}
                </div>
                <h1>{post.title}</h1>
                {getText(post.desc)}
                {/* <p
                dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(post.desc),
                }}
                ></p>       */}
            </div>
            <Menu cat={post.cat}/>
        </div>
  );
};

export default Post