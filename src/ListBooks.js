import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Book from './Book'

const shelves = [
  { value: 'currentlyReading', display: 'Currently Reading' },
  { value: 'wantToRead',       display: 'Want to Read' },
  { value: 'read',             display: 'Read' }
]

class ListBooks extends Component {
  static propTypes = {
    books: PropTypes.array
  }

  render() {
    const { books } = this.props

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            { shelves.map(shelve => (
              <Shelve
                books={books}
                shelve={shelve}
              />
            ))}
          </div>
        </div>
        <div className="open-search">
          <Link to='/search'>Add a book</Link>
        </div>
      </div>
    )
  }
}

function Shelve(props) {
  const { shelve, books } = props
  return (
    <div key={shelve.value} className="bookshelf">
      <h2 className="bookshelf-title">{shelve.display}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {
            books
              .filter(hasValue(shelve.value))
              .map(toBookListItem)
          }
        </ol>
      </div>
    </div>
  )
}


function hasValue(value) {
  return (book) => book.status === value
}

export function toBookListItem(book) {
  return (
    <li key={book.title}>
      {toBook(book)}
    </li>
  )
}

function toBook(book) {
  return (
    <Book
      title={book.title}
      author={book.author}
      imageURL={book.imageURL}
      status={book.status}
    />
  )
}

export default ListBooks