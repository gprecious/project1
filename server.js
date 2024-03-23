const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const app = express();
const PORT = 7070;

// SQLite 데이터베이스 연결
const db = new sqlite3.Database("senti.db", (err) => {
  if (err) {
    console.error("Error opening database", err.message);
  } else {
    console.log("Connected to the SQLite database.");
  }
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

// 서버 시작
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
