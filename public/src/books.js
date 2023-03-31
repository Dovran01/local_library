function findAuthorById(authors, id) {
  return authors.find(author => author.id === id);
}

function findBookById(books, id) {
  return books.find(book => book.id === id);

}

function partitionBooksByBorrowedStatus(books) {
  return books.reduce(
    (acc, book) => {
      const [borrowed, returned] = acc;
      const { borrows } = book;
      const mostRecent = borrows[0];
      if (!mostRecent.returned) {
        borrowed.push(book);
      } else {
        returned.push(book);
      }
      return [borrowed, returned];
    },
    [[], []]
  );
}


function getBorrowersForBook(book, accounts) {
  const MAX_RESULTS = 10;
  const { borrows } = book;
  const result = [];

  for (let i = 0; i < borrows.length && result.length < MAX_RESULTS; i++) {
    const borrow = borrows[i];
    const account = accounts.find(acc => acc.id === borrow.id);
    const transaction = { ...borrow, ...account };
    result.push(transaction);
  }

  return result;
}


module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
