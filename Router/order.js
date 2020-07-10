const router = require("express").Router();
const db = require("../Config/postgre");
const Customers = require("../Models/Customers.js");
const moment = require("moment");

router.get("/orders", async (req, res) => {
  try {
    const queries = req.query;
    console.log(queries);
    let offset = queries.offset;
    let search = queries.search.length !== 0 ? `%${queries.search}%` : "%%";
    let start = queries.start.length !== 0 ? queries.start : "1900-01-01";
    let end =
      queries.end.length !== 0
        ? queries.end
        : moment(new Date()).format("YYYY/MM/DD");

    let result = await db.query(
      "SELECT * FROM orders o, order_items i, deliveries d" +
        " WHERE o.id = i.order_id and d.order_item_id = i.id and " +
        " (lower(i.product) like lower($2) or lower(o.order_name) like $2)" +
        " and o.created_at between $3 and $4 " +
        " LIMIT 5 OFFSET $1 ;",
      [offset, search, start, end]
    );
    res.json(result.rows);
  } catch (error) {
    res.json({ err: error });
  }
});

router.get("/customers", async (req, res) => {
  Customers.aggregate([
    {
      $match: {
        user_id: req.query.cid,
      },
    },
    {
      $lookup: {
        from: "companies",
        localField: "company_id",
        foreignField: "company_id",
        as: "company_info",
      },
    },
  ]).exec((err, result) => {
    if (err) return res.json({ err: err });
    res.json(result);
  });
});

module.exports = router;
