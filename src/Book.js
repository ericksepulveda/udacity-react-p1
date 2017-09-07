import React from 'react'

function Book(props) {
  const { title, author, imageURL, status } = props

  const styles = {
    width: 128,
    height: 193,
    backgroundImage: `url(${imageURL})`
  }

  return (
    <div className="book">
      <div className="book-top">
        <div className="book-cover" style={styles}></div>
        <div className="book-shelf-changer">
          <select value={status} readOnly>
            <option value="none" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{title}</div>
      <div className="book-authors">{author}</div>
    </div>
  )
}


export default Book