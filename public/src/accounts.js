function findAccountById(accounts, id) {
  return accounts.find(account => account.id === id);
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((a, b) => a.name.last < b.name.last ? -1 : 1);
}


function getTotalNumberOfBorrows(account, books) {
  const accountId = account.id;
  return books.reduce((acc, book) => {
    const borrows = book.borrows.filter(borrow => borrow.id === accountId);
    return acc + borrows.length;
  }, 0);
}


function getBooksPossessedByAccount(account, books, authors) {
  const accountId = account.id;
  return books
    .filter(book => {
      const borrows = book.borrows;
      return borrows[0].id === accountId && !borrows[0].returned;
    })
    .map(book => {
      const author = authors.find(author => author.id === book.authorId);
      return { ...book, author };
    });
}


module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
