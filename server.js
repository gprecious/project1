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

// 모든 테이블의 result 합산 교과 교수 등록금 복지 비교과 시설 진로
app.get("/data/total", (req, res) => {
  const sql = `
    SELECT university_name,
    AVG(
      CASE result
          WHEN '매우 부정' THEN 1
          WHEN '부정' THEN 2
          WHEN '중립' THEN 3
          WHEN '긍정' THEN 4
          WHEN '매우 긍정' THEN 5
      END
    ) AS average_result
    FROM (
      SELECT university_name, result FROM 교수
      UNION ALL
      SELECT university_name, result FROM 등록금
      UNION ALL
      SELECT university_name, result FROM 복지
      UNION ALL
      SELECT university_name, result FROM 비교과
      UNION ALL
      SELECT university_name, result FROM 시설
      UNION ALL
      SELECT university_name, result FROM 진로
      UNION ALL
      SELECT university_name, result FROM 교과
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

// 교수 테이블의 result 합산
app.get("/data/professors", (req, res) => {
  const sql = `
    SELECT university_name,
    AVG(
        CASE result
            WHEN '매우 부정' THEN 1
            WHEN '부정' THEN 2
            WHEN '중립' THEN 3
            WHEN '긍정' THEN 4
            WHEN '매우 긍정' THEN 5
        END
    ) AS average_result
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

// 교과 테이블의 result 합산
app.get("/data/lecture", (req, res) => {
  const sql = `
    SELECT university_name,
    AVG(
        CASE result
            WHEN '매우 부정' THEN 1
            WHEN '부정' THEN 2
            WHEN '중립' THEN 3
            WHEN '긍정' THEN 4
            WHEN '매우 긍정' THEN 5
        END
    ) AS average_result
    FROM 교과
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

// 등록금 테이블의 result 합산
app.get("/data/deung", (req, res) => {
  const sql = `
    SELECT university_name,
    AVG(
        CASE result
            WHEN '매우 부정' THEN 1
            WHEN '부정' THEN 2
            WHEN '중립' THEN 3
            WHEN '긍정' THEN 4
            WHEN '매우 긍정' THEN 5
        END
    ) AS average_result
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

// 복지 테이블의 result 합산
app.get("/data/bok", (req, res) => {
  const sql = `
    SELECT university_name,
    AVG(
        CASE result
            WHEN '매우 부정' THEN 1
            WHEN '부정' THEN 2
            WHEN '중립' THEN 3
            WHEN '긍정' THEN 4
            WHEN '매우 긍정' THEN 5
        END
    ) AS average_result
    FROM 복지
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

// 비교과 테이블의 result 합산
app.get("/data/be", (req, res) => {
  const sql = `
    SELECT university_name,
    AVG(
        CASE result
            WHEN '매우 부정' THEN 1
            WHEN '부정' THEN 2
            WHEN '중립' THEN 3
            WHEN '긍정' THEN 4
            WHEN '매우 긍정' THEN 5
        END
    ) AS average_result
    FROM 비교과
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

// 시설 테이블의 result 합산
app.get("/data/si", (req, res) => {
  const sql = `
    SELECT university_name,
    AVG(
        CASE result
            WHEN '매우 부정' THEN 1
            WHEN '부정' THEN 2
            WHEN '중립' THEN 3
            WHEN '긍정' THEN 4
            WHEN '매우 긍정' THEN 5
        END
    ) AS average_result
    FROM 시설
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

// 진로 테이블의 result 합산
app.get("/data/jin", (req, res) => {
  const sql = `
    SELECT university_name,
    AVG(
        CASE result
            WHEN '매우 부정' THEN 1
            WHEN '부정' THEN 2
            WHEN '중립' THEN 3
            WHEN '긍정' THEN 4
            WHEN '매우 긍정' THEN 5
        END
    ) AS average_result
    FROM 진로
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

// 교수 테이블의 년도별 result
app.get("/data/year/professors", (req, res) => {
  const sql = `
    SELECT university_name,
    strftime('%Y', date) AS year,
    AVG(
        CASE result
            WHEN '매우 부정' THEN 1
            WHEN '부정' THEN 2
            WHEN '중립' THEN 3
            WHEN '긍정' THEN 4
            WHEN '매우 긍정' THEN 5
        END
    ) AS average_result
    FROM 교수
    GROUP BY university_name, strftime('%Y', date)
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

// 수업 테이블의 년도별 result
app.get("/data/year/lecture", (req, res) => {
  const sql = `
    SELECT university_name,
    strftime('%Y', date) AS year,
    AVG(
        CASE result
            WHEN '매우 부정' THEN 1
            WHEN '부정' THEN 2
            WHEN '중립' THEN 3
            WHEN '긍정' THEN 4
            WHEN '매우 긍정' THEN 5
        END
    ) AS average_result
    FROM 교과
    GROUP BY university_name, strftime('%Y', date)
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

// 장학금 테이블의 년도별 result
app.get("/data/year/bok", (req, res) => {
  const sql = `
    SELECT university_name,
    strftime('%Y', date) AS year,
    AVG(
        CASE result
            WHEN '매우 부정' THEN 1
            WHEN '부정' THEN 2
            WHEN '중립' THEN 3
            WHEN '긍정' THEN 4
            WHEN '매우 긍정' THEN 5
        END
    ) AS average_result
    FROM 복지
    GROUP BY university_name, strftime('%Y', date)
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

// 등록금 테이블의 년도별 result
app.get("/data/year/deung", (req, res) => {
  const sql = `
    SELECT university_name,
    strftime('%Y', date) AS year,
    AVG(
        CASE result
            WHEN '매우 부정' THEN 1
            WHEN '부정' THEN 2
            WHEN '중립' THEN 3
            WHEN '긍정' THEN 4
            WHEN '매우 긍정' THEN 5
        END
    ) AS average_result
    FROM 등록금
    GROUP BY university_name, strftime('%Y', date)
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

// 지금부터 막대그래프용
// 교과 테이블의 긍부정 카운트
app.get("/data/bar/lecture", (req, res) => {
  const sql = `
    SELECT university_name,
    COUNT(CASE WHEN result = '매우 부정' THEN 1 END) AS count1,
    COUNT(CASE WHEN result = '부정' THEN 1 END) AS count2,
    COUNT(CASE WHEN result = '중립' THEN 1 END) AS count3,
    COUNT(CASE WHEN result = '긍정' THEN 1 END) AS count4,
    COUNT(CASE WHEN result = '매우 긍정' THEN 1 END) AS count5
    FROM 교과
    GROUP BY university_name
    ORDER BY university_name
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

// 교수 테이블의 긍부정 카운트
app.get("/data/bar/professors", (req, res) => {
  const sql = `
    SELECT university_name,
    COUNT(CASE WHEN result = '매우 부정' THEN 1 END) AS count1,
    COUNT(CASE WHEN result = '부정' THEN 1 END) AS count2,
    COUNT(CASE WHEN result = '중립' THEN 1 END) AS count3,
    COUNT(CASE WHEN result = '긍정' THEN 1 END) AS count4,
    COUNT(CASE WHEN result = '매우 긍정' THEN 1 END) AS count5
    FROM 교수
    GROUP BY university_name
    ORDER BY university_name
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

// 등록금 테이블의 긍부정 카운트
app.get("/data/bar/deung", (req, res) => {
  const sql = `
    SELECT university_name,
    COUNT(CASE WHEN result = '매우 부정' THEN 1 END) AS count1,
    COUNT(CASE WHEN result = '부정' THEN 1 END) AS count2,
    COUNT(CASE WHEN result = '중립' THEN 1 END) AS count3,
    COUNT(CASE WHEN result = '긍정' THEN 1 END) AS count4,
    COUNT(CASE WHEN result = '매우 긍정' THEN 1 END) AS count5
    FROM 등록금
    GROUP BY university_name
    ORDER BY university_name
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

// 복지 테이블의 긍부정 카운트
app.get("/data/bar/bok", (req, res) => {
  const sql = `
    SELECT university_name,
    COUNT(CASE WHEN result = '매우 부정' THEN 1 END) AS count1,
    COUNT(CASE WHEN result = '부정' THEN 1 END) AS count2,
    COUNT(CASE WHEN result = '중립' THEN 1 END) AS count3,
    COUNT(CASE WHEN result = '긍정' THEN 1 END) AS count4,
    COUNT(CASE WHEN result = '매우 긍정' THEN 1 END) AS count5
    FROM 복지
    GROUP BY university_name
    ORDER BY university_name
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

// 비교과 테이블의 긍부정 카운트
app.get("/data/bar/be", (req, res) => {
  const sql = `
    SELECT university_name,
    COUNT(CASE WHEN result = '매우 부정' THEN 1 END) AS count1,
    COUNT(CASE WHEN result = '부정' THEN 1 END) AS count2,
    COUNT(CASE WHEN result = '중립' THEN 1 END) AS count3,
    COUNT(CASE WHEN result = '긍정' THEN 1 END) AS count4,
    COUNT(CASE WHEN result = '매우 긍정' THEN 1 END) AS count5
    FROM 비교과
    GROUP BY university_name
    ORDER BY university_name
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

// 시설 테이블의 긍부정 카운트
app.get("/data/bar/si", (req, res) => {
  const sql = `
    SELECT university_name,
    COUNT(CASE WHEN result = '매우 부정' THEN 1 END) AS count1,
    COUNT(CASE WHEN result = '부정' THEN 1 END) AS count2,
    COUNT(CASE WHEN result = '중립' THEN 1 END) AS count3,
    COUNT(CASE WHEN result = '긍정' THEN 1 END) AS count4,
    COUNT(CASE WHEN result = '매우 긍정' THEN 1 END) AS count5
    FROM 시설
    GROUP BY university_name
    ORDER BY university_name
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

// 진로 테이블의 긍부정 카운트
app.get("/data/bar/jin", (req, res) => {
  const sql = `
    SELECT university_name,
    COUNT(CASE WHEN result = '매우 부정' THEN 1 END) AS count1,
    COUNT(CASE WHEN result = '부정' THEN 1 END) AS count2,
    COUNT(CASE WHEN result = '중립' THEN 1 END) AS count3,
    COUNT(CASE WHEN result = '긍정' THEN 1 END) AS count4,
    COUNT(CASE WHEN result = '매우 긍정' THEN 1 END) AS count5
    FROM 진로
    GROUP BY university_name
    ORDER BY university_name
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
