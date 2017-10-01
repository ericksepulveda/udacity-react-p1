import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { toBookListItem } from './ListBooks';
import * as BooksAPI from './BooksAPI';
import debounce from 'debounce';

class Search extends Component {
  state = {
    query: '',
    books: []
  };

  delayedSearch = debounce(({ target: { value: query } }) => {
    if ( ! query ) return;
    BooksAPI.search(query).then(books => {
      if ( books && books.length )
        this.setState({ books })
    });
  }, 300);

  search = (e) => {
    e.persist();
    this.setState({ query: e.target.value });
    this.delayedSearch(e);
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/' className='close-search'>Close</Link>
          <div className="search-books-input-wrapper">
          <input type="text" value={this.state.query} onChange={this.search} placeholder="Search by title or author"/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.books.map(toBookListItem.bind(null, this.props.update))}
          </ol>
        </div>
      </div>
    );
  }
}

export default Search;