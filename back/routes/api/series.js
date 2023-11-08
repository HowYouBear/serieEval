const router = require("express").Router();

const connection = require("../../database");

router.get("/getSeries", (req, res) => {
  const sql = "SELECT * FROM seriesold";
  connection.query(sql, (err, result) => {
    if (err) throw err;
    console.log("Séries récupérées");
    res.json(result);
  });
});

router.patch("/likedThisOne", (req, res) => {
  const id = req.body.id;
  const like = req.body.like === true ? 0 : 1;
  const updateSql = "UPDATE series SET `like`=? WHERE id=?";
  connection.query(updateSql, [like, id], (err, results) => {
    if (err) throw err;
    console.log("Série modifiée en BDD");
    res.json(req.body);
  });
});

router.delete("/deleteSeries/:id", (req, res) => {
  const id = req.params.id;
  const deleteSql = "DELETE FROM series WHERE id= ?";
  connection.query(deleteSql, [id], (err, result) => {
    if (err) throw err;
  });
  res.sendStatus(200);
});

module.exports = router;
