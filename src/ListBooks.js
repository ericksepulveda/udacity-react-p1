import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Book from './Book';

const shelves = [
  { value: 'currentlyReading', display: 'Currently Reading' },
  { value: 'wantToRead',       display: 'Want to Read' },
  { value: 'read',             display: 'Read' }
];

class ListBooks extends Component {
  static propTypes = {
    books: PropTypes.array
  };

  render() {
    const { books, update } = this.props;

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            { shelves.map(shelve => (
              <Shelve
                key={shelve.value}
                books={books}
                shelve={shelve}
                updateFunction={update}
              />
            ))}
          </div>
        </div>
        <div className="open-search">
          <Link to='/search'>Add a book</Link>
        </div>
      </div>
    );
  }
}

function Shelve(props) {
  const { shelve, books, updateFunction } = props;
  return (
    <div key={shelve.value} className="bookshelf">
      <h2 className="bookshelf-title">{shelve.display}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {
            books
              .filter(hasValue(shelve.value))
              .map(toBookListItem.bind(null, updateFunction))
          }
        </ol>
      </div>
    </div>
  );
}


function hasValue(value) {
  return (book) => book.shelf === value;
}

export function toBookListItem(updateFunction, book) {
  return (
    <li key={book.id || book.title}>
      <Book book={book} update={updateFunction}/>
    </li>
  );
}

export default ListBooks;