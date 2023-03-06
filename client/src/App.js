import './App.css';
import Axios from 'axios';
import React, {useState, useEffect} from 'react';

function App() {

  const [movieName, setMovieName] = useState('');
  const [review, setReview] = useState('');
  const [movieReviewList, setMovieList] = useState([]);
  const [newReview, setNewReview] = useState("");

  useEffect(() => {
    Axios.get('http://localhost:3001/api/get').then((response) => {
      setMovieList(response.data);  
    })
  },   )

  const submitReview = () => {
    Axios.post('http://localhost:3001/api/insert', {
      movieName: movieName, 
      movieReview: review
    });

    setMovieList([
      ...movieReviewList,
      { movieName: movieName, movieReview: review},
    ]);
  };

  const updateReview = (movie) => {
    Axios.put('http://localhost:3001/api/update', {
      movieName: movie,
      movieReview: review,
    });
    setNewReview("");
  };


  const deleteReview = (movie) => {
    Axios.delete(`http://localhost:3001/api/delete/${movie}`, movieName); 
  }

  return (
    <div className="App">
      <h1>CRUD APP</h1>

      <div className="form" >
        <label>Movie Name:</label>
        <input type="text" name="movieName" onChange={ (e) => {
          setMovieName(e.target.value)
        }}/>
        <label>Review:</label>
        <input type="text" name="review" onChange={ (e) => {
          setReview(e.target.value)
        }}/>

        <button onClick={submitReview}>Submit</button>

        {movieReviewList.map((value) => {
          return (
            <div className="card">
              <h1>{value.movieName} </h1>
              <p>{value.movieReview}</p>

              <button onClick={ () => {deleteReview(value.movieName )}}>Delete</button>

              <input type="text" id="updateInput"  onChange={(e) => {
                setReview(e.target.value)
              }}/>
              <button onClick={() => {updateReview(value.movieName)}}>Update</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
