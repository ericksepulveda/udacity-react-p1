import React, { Component } from 'react'
import Book from './Book'

const shelves = [
  { value: 'currentlyReading', display: 'Currently Reading' },
  { value: 'wantToRead',       display: 'Want to Read' },
  { value: 'read',             display: 'Read' }
]

class ListBooks extends Component {
  render() {
    const { books } = this.props

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            { shelves.map(s => (
              <div key={s.value} className="bookshelf">
                <h2 className="bookshelf-title">{s.display}</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {books.filter(b => b.status === s.value).map((b) => (
                      <li key={b.title}>
                        <Book
                          title={b.title}
                          author={b.author}
                          imageURL={b.imageURL}
                          status={b.status}
                        />
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default ListBooks