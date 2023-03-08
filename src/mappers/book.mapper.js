function mapOne(book) {
    return {
        id: book._id,
        name: book.name,
        page: 120
    }
}

function mapMany(books) {
    return books.map(mapOne)
}

const bookResponseMapper = {
    mapOne,
    mapMany
}

module.exports = {
    bookResponseMapper
}