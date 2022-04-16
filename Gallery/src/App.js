import logo from './logo.svg';
import { useNavigate } from 'react-router-dom';
import { GetComments } from './Services/APIService'
import { PostComment } from './Services/APIService';
import { useState, useEffect } from 'react';
import './App.css';

function App() {

  const token = window.localStorage.getItem("token");
  const navigate = useNavigate();
  const [comments, setComments] = useState();
  const [newComment, setNewComment] = useState();

  useEffect(() => {
    const fetchComments = async () => {
      const newComments = await GetComments();

      if(newComments !== null)
      {
        setComments(newComments)
      }
    }

    fetchComments();
  },[comments])

  const CommentHandler = async (e) => {
    e.preventDefault();

    const comment = {
      content: newComment,
      username: token !== undefined ? token.tokenIdClaims.name : "Anonymous"
    }

    await PostComment(comment);
  }


  const loginlogout = ( token === null
    ? <button className="btn btn-primary my-3" onClick={() => navigate("/login")}>Login</button>
    : (
    <>
      <div>
        <button style={{color: 'white'}} className="btn btn-link btn-lg my-3" onClick={() => navigate("/secure")} >Main Content</button>
      </div>
      <button className="btn btn-primary my-3" onClick={() => navigate("/logout")}>Logout</button>
    </>)
  )

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        {loginlogout}
        <div className="container py-5">
          <form className="py-5" onSubmit={CommentHandler}>
            <div className="input-group">
              <textarea className="form-control" placeholder="Enter Comment Here...(Max Length 500 words)" onChange={(e) => setNewComment(e.target.value)}></textarea>
            </div>

            <button type="submit" className="btn btn-primary my-3">Submit</button>
          </form>        
          <table className="table table-dark table-striped">
              <thead>
                  <tr>
                      <th scope="col-8">Comment</th>
                      <th scope="col-4">Username</th>
                  </tr>
              </thead>
              <tbody>
                {comments == null ?<></> : comments.map(c =>{
                  return (
                    <tr>
                      <td>{c.content}</td>
                      <td>{c.username}</td>
                    </tr>
                  )
                })}
              </tbody>
          </table>
        </div>
      </header>
    </div>
  );
}

export default App;
