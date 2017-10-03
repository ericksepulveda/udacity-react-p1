import React from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './style/App.css';
import ListBooks from './ListBooks';
import Search from './Search';
import { append, propEq, complement } from 'ramda';

class BooksApp extends React.Component {
  state = {
    books: []
  };

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books });
    });
  }

  update = (book) => {
    if ( ! book ) return;
    const books = this.state.books;
    if ( book.shelf === 'none' ) {
      this.setState({
        books: books.filter(complement(propEq('id', book.id)))
      })
    } else {
      this.setState({
        books: append(book, books.filter(complement(propEq('id', book.id))))
      })
    }
  }

  render() {
    const { books } = this.state;
    return (
      <div className="app">
        <Route
          exact path='/' render={() => (
            <ListBooks
              books={books}
              update={this.update}
            />
        )}/>
        <Route
          path='/search'
          render={() => (
            <Search
              books={books}
              update={this.update}
            />
        )}/>
      </div>
    );
  }
}

export default BooksApp;