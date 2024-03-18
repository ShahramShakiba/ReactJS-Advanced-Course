import { useRef } from 'react';
import classes from './AddMovie.module.css';

export default function AddMovie({ onAddMovie }) {
  const titleRef = useRef('');
  const openingTextRef = useRef('');
  const releaseDateRef = useRef('');

  function submitHandler(e) {
    e.preventDefault();

    // could add validation here...

    const movie = {
      title: titleRef.current.value,
      openingText: openingTextRef.current.value,
      releaseDate: releaseDateRef.current.value,
    };

    onAddMovie(movie);
  }

  return (
    <form onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="title"> Title </label>
        <input type="text" id="title" ref={titleRef} />
      </div>

      <div className={classes.control}>
        <label htmlFor="opening-text"> Opening Text </label>
        <textarea rows="5" id="opening-text" ref={openingTextRef}></textarea>
      </div>

      <div className={classes.control}>
        <label htmlFor="date"> Release Date </label>
        <input type="text" id="date" ref={releaseDateRef} />
      </div>

      <button className="add-btn"> Add Movie </button>
    </form>
  );
}
