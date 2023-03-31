function getTotalBooksCount(books) {
  const totalBooks = books.length;
  return totalBooks;
}

function getTotalAccountsCount(accounts) {
  const totalAccounts = accounts.length;
  return totalAccounts;
}

function getBooksBorrowedCount(books) {
  return books.reduce((acc, book) => {
    const borrowed = book.borrows.some(borrow => borrow.returned === false);
    return borrowed ? acc + 1 : acc;
  }, 0);
}

function getTopFiveGenres(genreObj){
  const genres = [];
  for (let genre in genreObj) {
    genres.push({ name: genre, count: genreObj[genre] });
  }
  genres.sort((genreA, genreB) => genreB.count - genreA.count);  
  return genres.slice(0, 5);
}


function getMostCommonGenres(books) {
  const genreObj = {};
  books.forEach(book => {
    if (genreObj[book.genre]) {
      genreObj[book.genre]++;
    } else {
      genreObj[book.genre] = 1;
    }
  });
  return getTopFiveGenres(genreObj);
}



function getMostPopularBooks(books) {
  const borrowsByBook = books.map((book) => {
    return {
      name: book.title,
      count: book.borrows.length,
    };
  });
  borrowsByBook.sort((book1, book2) => book2.count - book1.count);
  return borrowsByBook.slice(0, 5);
}


function getMostPopularAuthors(books, authors) {
  // create an array of author objects with their name and the number of times their books were borrowed
  const authorStats = authors.map(author => {
    const booksByAuthor = books.filter(book => book.authorId === author.id);
    const borrowCount = booksByAuthor.reduce((acc, book) => {
      return acc + book.borrows.length;
    }, 0);
    return {
      name: `${author.name.first} ${author.name.last}`,
      count: borrowCount,
    };
  });

  // sort the authorStats array in descending order by the borrow count
  const sortedStats = authorStats.sort((a, b) => b.count - a.count);

  // return the top five authors in the sortedStats array
  return sortedStats.slice(0, 5);
}



module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
