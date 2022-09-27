import React, { useState, useMemo } from 'react';
// import debounce from 'lodash.debounce';
import Book from './Book';
import './style.css';

const debounce = (func, timeout = 500) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), timeout);
  };
};

const search = async (query) => {
  const response = await fetch(
    'https://raw.githubusercontent.com/benoitvallon/100-best-books/master/books.json'
  );
  const data = await response.json();
  return data.filter((book) => book.title.toLowerCase().includes(query));
};

export default function App() {
  const [books, setBooks] = useState([]);
  // const [selectedOption, setSelectedOption] = useState('');
  const [query, setQuery] = useState('');
  // useEffect(() => {
  //   const fetchBooks = async () => {
  //     const response = await fetch(
  //       'https://raw.githubusercontent.com/benoitvallon/100-best-books/master/books.json'
  //     );
  //     const data = await response.json();
  //     setBooks(data);
  //   };
  //   fetchBooks().catch(console.error);
  //   console.log('data');
  //   return () => console.log('Cleanup..');
  // }, []);

  const onQueryChange = async (event) => {
    setQuery(event.target.value);
    const response = await search(event.target.value);
    setBooks(response);
    // search(e.target.value).then((response) => {
    //   setBooks(response);
    // });
  };

  const debouncedChangeHandler = useMemo(() => {
    return debounce(onQueryChange, 300);
  }, []);

  // const onSelectionChange = (e) => {
  //   setSelectedOption(e.target.value);
  // };
  // const options = books.map((item, index) => (
  //   <option key={index} value={item.title}>
  //     {item.title}
  //   </option>
  // ));

  const booksContainers = books.map((item) => <Book {...item} />);
  return (
    <div>
      <h1>Hello StackBlitz!</h1>
      <p>Start editing to see some magic happen :)</p>
      {/* <select value={selectedOption} onChange={onSelectionChange}>
        {options}
      </select> */}
      <input onChange={debouncedChangeHandler} />
      <div className="books-container">{booksContainers}</div>
    </div>
  );
}
