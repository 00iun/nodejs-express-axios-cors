// server.js

const express = require('express')
const cors = require('cors')

// CORS 설정을 위한 헤더
const headers = {
  'Access-Control-Allow-Origin': "http://127.0.0.1:5500",
  'Access-Control-Allow-Methods': 'OPTIONS, POST, GET, PUT, DELETE',
  'Access-Control-Allow-Headers': 'Content-Type',
};

let data = { message: '여러분 화이팅!' };

const app = express()

app.use(cors({
  origin: headers['Access-Control-Allow-Origin'],
  methods: headers['Access-Control-Allow-Methods']
}))

app.use(express.json())
app.use(express.text())

app.options('/', (rep, res) => {
  return res.send('요청 보내세요.')
})

app.get('/', (rep, res) => {
  console.log(data)
  return res.json(data)
})

app.post('/', (rep, res) => {
  data.message = rep.body.message;
  res.send(`받은 POST 데이터: ${rep.body.message}`);
})

app.put('/', (req, res) => {
  data.message = req.body.newMessage;
  res.send(`업데이트된 데이터: ${req.body.newMessage}`);
});

app.delete('/', (req, res) => {
  data = {};
  res.send('데이터가 삭제되었습니다.');
})

// const server = http.createServer((req, res) => {
//   if (req.method === 'OPTIONS') {
//     res.writeHead(204, headers);
//     res.end();
//     return;
//   }

//   if (req.method === 'GET') {
//     res.writeHead(200, { 'Content-Type': 'application/json', ...headers });
//     res.end(JSON.stringify(data));
//   }

//   if (req.method === 'POST') {
//     let body = '';
//     req.on('data', (chunk) => {
//       body += chunk.toString();
//     });

//     req.on('end', () => {
//       data.message = body;
//       res.writeHead(200, headers);
//       res.end(`받은 POST 데이터: ${body}`);
//     });
//   }

//   if (req.method === 'PUT') {
//     let body = '';
//     req.on('data', (chunk) => {
//       body += chunk.toString();
//     });

//     req.on('end', () => {
//       data.message = body;
//       res.writeHead(200, headers);
//       res.end(`업데이트된 데이터: ${body}`);
//     });
//   }

//   if (req.method === 'DELETE') {
//     data = {};
//     res.writeHead(200, headers);
//     res.end('데이터가 삭제되었습니다.');
//   }
// });

app.listen(3000, () => {
  console.log('서버가 http://localhost:3000 에서 실행 중입니다.');
});
