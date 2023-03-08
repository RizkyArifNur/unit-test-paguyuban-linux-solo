
const DataStore = require('nedb-promises')
const {  join } = require('path')

const db = DataStore.create({
  filename: join(process.cwd(), "src/db/books.db"),
});

async function findAll() {
  const books = await db.find({});
  return books;
}

async function findById(id) {
  const book = await db.findOne({ _id: id });
  return book;
}

async function create(book) {
  const insertResult = await db.insert(book);
  return insertResult._id;
}

async function update(id, updateableProps) {
  await db.updateOne({ _id: id }, updateableProps);
}

async function deleteById(id) {
    await db.removeOne({ _id: id })
}

const bookRepository = {
  findById,
  findAll,
  create,
  update,
  deleteById,
};

module.exports = {
  bookRepository
}
