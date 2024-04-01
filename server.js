const cors = require("cors");
const express = require("express");
const path = require("path");
const sqlite3 = require("sqlite3").verbose();
const app = express();
const PORT = 7070;

app.use(cors());

const dbPath = path.join(__dirname, "senti2.db");

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    return console.error("Error opening database", err.message);
  }
  console.log("Connected to the SQLite database.");
});

// 모든 테이블의 polarity 합산
app.get("/data/total", (req, res) => {
  const sql = `
    SELECT university_name, SUM(polarity) as total_polarity
    FROM (
      SELECT university_name, polarity FROM 교수
      UNION ALL
      SELECT university_name, polarity FROM 등록금
      UNION ALL
      SELECT university_name, polarity FROM 수업
      UNION ALL
      SELECT university_name, polarity FROM 장학금
    )
    GROUP BY university_name
  `;

  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(400).send({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: rows,
    });
  });
});

// 교수 테이블의 polarity 합산
app.get("/data/professors", (req, res) => {
  const sql = `
    SELECT university_name, SUM(polarity) as total_polarity
    FROM 교수
    GROUP BY university_name
  `;

  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(400).send({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: rows,
    });
  });
});

// 수업 테이블의 polarity 합산
app.get("/data/lecture", (req, res) => {
  const sql = `
    SELECT university_name, SUM(polarity) as total_polarity
    FROM 수업
    GROUP BY university_name
  `;

  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(400).send({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: rows,
    });
  });
});

// 장학금 테이블의 polarity 합산
app.get("/data/jang", (req, res) => {
  const sql = `
    SELECT university_name, SUM(polarity) as total_polarity
    FROM 장학금
    GROUP BY university_name
  `;

  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(400).send({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: rows,
    });
  });
});

// 등록금 테이블의 polarity 합산
app.get("/data/deung", (req, res) => {
  const sql = `
    SELECT university_name, SUM(polarity) as total_polarity
    FROM 등록금
    GROUP BY university_name
  `;

  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(400).send({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: rows,
    });
  });
});

// 교수 테이블의 년도별 polarity
app.get("/data/year/professors", (req, res) => {
  const sql = `
    SELECT university_name,
    strftime('%Y', date) AS year,
    SUM(polarity) AS sum_polarity
    FROM 교수
    GROUP BY university_name, year
    ORDER BY university_name, year
  `;

  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(400).send({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: rows,
    });
  });
});

// 수업 테이블의 년도별 polarity
app.get("/data/year/lecture", (req, res) => {
  const sql = `
    SELECT university_name,
    strftime('%Y', date) AS year,
    SUM(polarity) AS sum_polarity
    FROM 수업
    GROUP BY university_name, year
    ORDER BY university_name, year
  `;

  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(400).send({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: rows,
    });
  });
});

// 장학금 테이블의 년도별 polarity
app.get("/data/year/jang", (req, res) => {
  const sql = `
    SELECT university_name,
    strftime('%Y', date) AS year,
    SUM(polarity) AS sum_polarity
    FROM 장학금
    GROUP BY university_name, year
    ORDER BY university_name, year
  `;

  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(400).send({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: rows,
    });
  });
});

// 등록금 테이블의 년도별 polarity
app.get("/data/year/deung", (req, res) => {
  const sql = `
    SELECT university_name,
    strftime('%Y', date) AS year,
    SUM(polarity) AS sum_polarity
    FROM 등록금
    GROUP BY university_name, year
    ORDER BY university_name, year
  `;

  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(400).send({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: rows,
    });
  });
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
