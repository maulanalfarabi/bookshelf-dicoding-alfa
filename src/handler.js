/* eslint-disable max-len */
/* eslint-disable object-curly-spacing */
/* eslint-disable indent */

const items = require('./items');
// eslint-disable-next-line object-curly-spacing
const { nanoid } = require('nanoid');


const addBook = (request, h) => {
    const {
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
    } = request.payload; // request.payload u/ ubah payload JSON ke objek JaScri


    const id = nanoid(17);
    const finished = pageCount === readPage;
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;

    const newBook = {
        id,
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        finished,
        reading,
        insertedAt,
        updatedAt,
    };

    items.push(newBook);


    // status gagal code 400

    if (!name) {
        const response = h
            .response({
                status: 'fail',
                message: 'Gagal menambahkan buku. Mohon isi nama buku',
            }).code(400);
        return response;
    }

    if (readPage > pageCount) {
        const response = h
            .response({
                status: 'fail',
                message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
            }).code(400);
        return response;
    }


    // status success code 201

    const isSuccess = items.filter((book) => book.id === id).length > 0;

    if (isSuccess) {
        const response = h
            .response({
                status: 'success',
                message: 'Buku berhasil ditambahkan',
                data: {
                    bookId: id,
                },
            }).code(201);
        return response;
    }

    const response = h
        .response({
            status: 'fail',
            message: 'Buku gagal ditambahkan',
        }).code(500);
    return response;
};

const getAllBooks = (request, h) => {
    const { name, reading, finished } = request.query;

    // query name
    if (name) {
        const filteredBooks = items.filter((book) => {
            const nameRegex = new RegExp(name, 'gi');
            return nameRegex.test(book.name);
        });

        const response = h
            .response({
                status: 'success',
                data: {
                    books: filteredBooks.map((book) => ({
                        id: book.id,
                        name: book.name,
                        publisher: book.publisher,
                    })),
                },
            }).code(200);
        return response;
    };

    // query reading
    if (reading) {
        const filteredBooksReading = items.filter(
            (book) => Number(book.reading) === Number(reading),
        );

        const response = h
            .response({
                status: 'success',
                data: {
                    books: filteredBooksReading.map((book) => ({
                        id: book.id,
                        name: book.name,
                        publisher: book.publisher,
                    })),
                },
            }).code(200);
        return response;
    }

    // query finished
    if (finished) {
        const filteredBookFinished = items.filter(
            (book) => Number(book.finished) === Number(finished),
        );

        const response = h
            .response({
                status: 'success',
                data: {
                    books: filteredBookFinished.map((book) => ({
                        id: book.id,
                        name: book.name,
                        publisher: book.publisher,
                    })),
                },
            }).code(200);
        return response;
    }

    //
    const response = h
        .response({
            status: 'success',
            data: {
                books: items.map((book) => ({
                    id: book.id,
                    name: book.name,
                    publisher: book.publisher,
                })),
            },
        }).code(200);
    return response;
};


const getBookById = (request, h) => {
    const { bookId } = request.params;
    const book = items.filter((book) => book.id === bookId)[0];

    // ditemukan
    if (book !== undefined) {
        const response = h
            .response({
                status: 'success',
                data: {
                    book,
                },
            }).code(200);
        return response;
    }

    // kalau tidak ditemukan
    const response = h
        .response({
            status: 'fail',
            message: 'Buku tidak ditemukan',
        }).code(404);
    return response;
};

const editBookById = (request, h) => {
    const { bookId } = request.params;

    const {
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
    } = request.payload;

    // Tidak ada name
    if (!name) {
        const response = h
            .response({
                status: 'fail',
                message: 'Gagal memperbarui buku. Mohon isi nama buku',
            }).code(400);
        return response;
    }

    // readPage > pageCount
    if (readPage > pageCount) {
        const response = h
            .response({
                status: 'fail',
                message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
            }).code(400);
        return response;
    }

    const finished = pageCount === readPage;
    const updatedAt = new Date().toISOString();
    const index = items.findIndex((book) => book.id === bookId);

    // jika id book ditemukan
    if (index !== -1) {
        items[index] = {
            ...items[index],
            name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            reading,
            finished,
            updatedAt,
        };

        const response = h
            .response({
                status: 'success',
                message: 'Buku berhasil diperbarui',
            }).code(200);
        return response;
    }

    // jika book id tidak ditemukan
    const response = h
        .response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Id tidak ditemukan',
        }).code(404);
    return response;
};

const deleteBookById = (request, h) => {
    const { bookId } = request.params;

    const book = items.findIndex((book) => book.id === bookId);

    // book id ditemukan
    if (book !== -1) {
        items.splice(book, 1);

        const response = h
            .response({
                status: 'success',
                message: 'Buku berhasil dihapus',
            }).code(200);
        return response;
    }

    // book id tidak ditemukan
    const response = h
        .response({
            status: 'fail',
            message: 'Buku gagal dihapus. Id tidak ditemukan',
        }).code(404);
    return response;
};


// eslint-disable-next-line object-curly-spacing
module.exports = {
    addBook,
    getAllBooks,
    getBookById,
    editBookById,
    deleteBookById,
};
