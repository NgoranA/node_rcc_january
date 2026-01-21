import http from "node:http"
import { URL } from "node:url"


const PORT = process.env.PORT || 3000
const { STATUS_CODES } = http


const pages = {
  '/': `
   <html>
      <head><title>Home</title></head>
      <body>
        <h1>Welcome</h1>
        <nav>
          <a href="/about">About</a> |
          <a href="/contact">Contact</a>
        </nav>
      </body>
    </html>`,
  '/about': `
    <html>
      <head><title>About</title></head>
      <body>
        <h1>About Us</h1>
        <a href="/">Home</a>
      </body>
    </html>
  `,
  '/contact': `
    <html>
      <head><title>Contact</title></head>
      <body>
        <h1>Contact Us</h1>
        <p>Email: hello@example.com</p>
        <a href="/">Home</a>
      </body>
    </html>
`
}


const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`)
  const page = url.pathname

  res.setHeader("Content-Type", 'text/html; charset=UTF-8')

  if (req.method !== "GET") {
    res.statusCode = 405
    res.end(`<h1>405 ${STATUS_CODES[405]}</h1><p>Method ${req.method} not allowed.</p>`)
    return
  }

  if (pages[page]) {
    res.statusCode = 200
    res.end(pages[page])
    return
  } else {
    res.statusCode = 404
    res.end(`<h1>404 ${STATUS_CODES[404]}</h1><p>The page '${page}' was not found.</p>`)
  }


})

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}/`)
})









