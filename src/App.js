import React from 'react'
import { Route } from 'react-router-dom'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './ListBooks'
import Search from './Search'

class BooksApp extends React.Component {
  state = {
    books: require('../books.json')
  }

  componentDidMount() {
    // BooksAPI.getAll().then((books) => {
    //   this.setState({ books })
    // })
  }

  render() {
    const { books } = this.state
    return (
      <div className="app">
        <Route
          exact path='/' render={() => (
            <ListBooks books={books}/>
        )}/>
        <Route
          path='/search'
          component={Search}
        />
      </div>
    )
  }
}

export default BooksApp