import React, { useState, useEffect } from "react";
import { TextField, Button } from "@material-ui/core";
import Table from "./Table";

const Orders = () => {
  const [searchValue, setsearchValue] = useState("");
  const [startDate, setstartDate] = useState("");
  const [endDate, setendDate] = useState("");
  const [items, setitems] = useState([]);
  const [offSet, setoffSet] = useState(0);
  const [total, settotal] = useState(null);

  useEffect(() => {
    fetchItems();
  }, [offSet]);

  const sortItems = () => {
    let sorted_items = [...items];

    sorted_items = sorted_items
      .sort((a, b) => {
        return (
          new Date(a["created_at"]).getTime() -
          new Date(b["created_at"]).getTime()
        );
      })
      .reverse();
    console.log(sorted_items);
    setitems(sorted_items);
  };
  const fetchItems = async () => {
    const queries = [
      `offset=${offSet}`,
      `start=${startDate}`,
      `search=${searchValue}`,
      `end=${endDate}`,
    ];
    let query = queries.join("&");
    console.log(query);
    const res = await fetch(`/api/orders?${query}`);
    const temp = await res.json();
    setitems(temp);
    let totalAmount = temp.reduce(
      (acc, cur) =>
        acc +
        (cur["price_per_unit"] ? cur["price_per_unit"] * cur["quantity"] : 0),
      0
    );
    settotal(totalAmount);
  };

  const clearValue = () => {
    setsearchValue("");
    setstartDate("");
    setendDate("");
  };

  return (
    <div style={{ margin: "2rem" }}>
      <form noValidate autoComplete="off">
        <TextField
          fullwidth
          id="standard-basic"
          style={{ margin: 8, width: "100%" }}
          label="Search"
          value={searchValue}
          onChange={(e) => setsearchValue(e.target.value)}
          variant="outlined"
        />
      </form>
      <form noValidate style={{ margin: "1rem" }}>
        <TextField
          id="date"
          label="Start"
          type="date"
          value={startDate}
          onChange={(e) => setstartDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          id="date"
          label="End"
          style={{ marginLeft: "2rem" }}
          type="date"
          value={endDate}
          onChange={(e) => setendDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <span style={{ float: "right", margin: "auto" }}>
          <Button
            variant="outlined"
            color="secondary"
            style={{ marginRight: "2rem" }}
            onClick={clearValue}
          >
            Reset
          </Button>
          <Button variant="contained" color="primary" onClick={fetchItems}>
            Search
          </Button>
        </span>
      </form>
      <div style={{ margin: "2rem 1rem 1rem 1rem" }}>
        {" "}
        <b> Total Amount: ${total}</b>
      </div>
      <Table rows={items} sortItems={sortItems} />

      <div
        style={{
          margin: "3rem ",
          display: "flex",
          alignItems: "end",
          justifyContent: "space-between",
        }}
      >
        <Button
          disabled={offSet === 0}
          variant="contained"
          color="secondary"
          onClick={() => setoffSet((prev) => prev - 5)}
        >
          Previous
        </Button>
        <Button
          disabled={items.length < 5}
          variant="contained"
          color="primary"
          onClick={() => setoffSet((prev) => prev + 5)}
        >
          Next{" "}
        </Button>
      </div>
    </div>
  );
};

export default Orders;
