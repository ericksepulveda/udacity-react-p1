import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI';
import PropTypes from 'prop-types';
import { assoc } from 'ramda'

class Book extends Component {
  static propTypes = {
    book: PropTypes.object,
    update: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedVal: props.book.shelf || 'none'
    };
  }

  changeSelected = ({ target: { value: selectedVal } }) => {
    // For better UX, update UI as soon as possible
    const prevState = this.state.selectedVal;
    this.setState({ selectedVal })
    if ( this.props.update ) {
      this.props.update(assoc('shelf', selectedVal, this.props.book))
    }
    BooksAPI.update(this.props.book, selectedVal).then(b => {
      // Politically correct
      // this.setState({ selectedVal })
      // if ( this.props.update ) {
      //   this.props.update(assoc('shelf', selectedVal, this.props.book))
      // }
    }).catch(() => {
      this.setState({ selectedVal: prevState })
      if ( this.props.update ) {
        this.props.update(assoc('shelf', prevState, this.props.book))
      }
    });
  }

  render() {
    const { book } = this.props;
    const { title, author } = book;
    const status = this.state.selectedVal;
    const imageURL = book.imageURL || ( book.imageLinks && book.imageLinks.thumbnail );

    const styles = {
      width: 128,
      height: 193,
      backgroundImage: `url(${imageURL})`
    };

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={styles}></div>
          <div className="book-shelf-changer">
            <select value={status} onChange={this.changeSelected}>
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none" default>None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">{author}</div>
      </div>
    );
  }
}


export default Book;