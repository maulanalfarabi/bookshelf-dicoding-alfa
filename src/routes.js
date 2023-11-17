/* eslint-disable indent*/

// pelajari lagi fungsi (fundamental) dan cara membuatnya (praktikal)

// eslint-disable-next-line no-unused-vars, object-curly-spacing
const {
    addBook,
    getAllBooks,
    getBookById,
    editBookById,
    deleteBookById,
} = require('./handler');

const routes = [
    {
        method: 'POST',
        path: '/books',
        handler: addBook,
    },

    {
        method: 'GET',
        path: '/books',
        handler: getAllBooks,
    },

    {
        method: 'GET',
        path: '/books/{bookId}',
        handler: getBookById,
    },

    {
        method: 'PUT',
        path: '/books/{bookId}',
        handler: editBookById,
    },

    {
        method: 'DELETE',
        path: '/books/{bookId}',
        handler: deleteBookById,
    },

    {
        method: '*',
        path: '/{any*}',
        handler: () => 'Halaman yang dituju tidak ditemukan.',
    },
];

module.exports = routes;
