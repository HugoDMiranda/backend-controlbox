import { db } from "../db.js";

export const getReviews = (req, res) => {
  const q = req.query.Categoria
    ? "SELECT * FROM books_reviews WHERE booksCategoria = ?;"
    : req.query.type
    ? "SELECT * FROM books_reviews WHERE booksTitulo = ?;"
    : req.query.status
    ? "SELECT * FROM books_reviews WHERE booksAutor = ?;"
    : "SELECT * FROM books_reviews;";

  const query =
    q === "SELECT * FROM books_reviews WHERE booksCategoria = ?;"
      ? req.query.Categoria
      : q === "SELECT * FROM books_reviews WHERE booksTitulo = ?;"
      ? req.query.type
      : q === "SELECT * FROM books_reviews WHERE booksAutor = ?;"
      ? req.query.status
      : null;

  db.query(q, [query], (err, data) => {
    if (err) return res.send(err);

    return res.status(200).json(data);
  });
};

export const getReview = (req, res) => {
  const id = req.params.id;
  const sqlGet = "SELECT * FROM books_reviews WHERE id = ?";

  db.query(sqlGet, id, (err, data) => {
    if (err) return res.send(err);

    return res.status(200).json(data);
  });
};

export const addReview = (req, res) => {
  const booksAutor = req.body.booksAutor;
  const booksResumen = req.body.booksResumen;
  const booksTitulo = req.body.booksTitulo;
  const booksImg = req.body.booksImg;
  const booksCategoria = req.body.booksCategoria;

  const sqlInsert =
    "INSERT INTO books_reviews (booksAutor, booksResumen, booksTitulo,booksImg, booksCategoria) VALUES (?,?,?,?,?);";

  db.query(
    sqlInsert,
    [booksAutor, booksResumen, booksTitulo, booksImg, booksCategoria],
    (err, data) => {
      if (err) return res.send(err);

      return res.status(200).json(data);
    }
  );
};

export const deleteReview = (req, res) => {
  const id = req.params.id;
  const sqlDelete = "DELETE FROM books_reviews WHERE id = ?";

  db.query(sqlDelete, id, (err, data) => {
    if (err) return res.send(err);

    return res.status(200).json(data);
  });
};

export const updateReview = (req, res) => {
  const id = req.body.id;
  const newResumen = req.body.newResumen;
  const newAutor = req.body.newAutor;
  const newImg = req.body.newImg;
  const newTitulo = req.body.newTitulo;
  const newCategoia = req.body.newCategoria;
  const sqlUpdate =
    "UPDATE books_reviews SET booksResumen = ?, booksAutor = ?, booksImg = ?, booksTitulo = ?,  booksCategoria = ?  WHERE id = ?";

  db.query(
    sqlUpdate,
    [newResumen, newAutor, newImg, newTitulo, newCategoia, id],
    (err, data) => {
      if (err) return res.send(err);

      return res.status(200).json(data);
    }
  );
};
