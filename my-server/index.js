const express=require('express'); // triệu gọi express.js cho API
const app=express(); // khởi tạo ứng dụng express
const port=3000; // định nghĩa cổng mà server sẽ lắng nghe
const morgan=require("morgan")
const cors=require("cors")
const path=require("path")

// Middleware
app.use(morgan("combined"))
app.use(cors()) // cho phép tất cả các nguồn truy cập API
app.use(express.json()); // parse application/json
app.use(express.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
app.use(express.static(path.join(__dirname,"public")))

// Database
let database=[
    {"BookId":"b1","BookName":"Kỹ thuật lập trình cơ bản", "Price":70,"Image":"b1.jpg"},
    {"BookId":"b2","BookName":"Kỹ thuật lập trình nâng cao", "Price":100,"Image":"b2.jpg"},
    {"BookId":"b3","BookName":"Máy học cơ bản","Price":200,"Image":"b3.jpg"},
    {"BookId":"b4","BookName":"Máy học nâng cao","Price":300,"Image":"b4.jpg"},
    {"BookId":"b5","BookName":"Lập trình Robot cơ bản","Price":250,"Image":"b5.jpg"},
]

// Routes
// Định nghĩa một route cơ bản (create default)
app.get('/',(req,res)=>{
    res.send("Hello <font color='red'> Restful API! </font>"); // gửi phản hồi "Hello World!" khi truy cập route gốc
})

// Định nghĩa route /about để trả về bảng thông tin sinh viên (HTTP GET ABOUT)
app.get("/about",(req,res)=>{
    tb1="<table border='1'>"
    tb1+="<tr>"
    tb1+="<td>Họ và tên</td><td>Nguyen Thi Anh Ngoc</td>"
    tb1+="</tr>"
    tb1+="<tr>"
    tb1+="<td>MSSV</td><td>K234111404</td>"
    tb1+="</tr>" 
    tb1+="<tr>"
    tb1+="<td colspan='2'><img src='images/panda.webp' width='100%'></td>"
    tb1+="</tr>"
    tb1+="</table>"
    res.send(tb1); // gửi phản hồi là bảng thông tin sinh viên
})

app.get("/books",(req,res)=>{
    res.json(database);
})

app.get("/books/:id",(req,res)=>{
    id=req.params["id"]
    let p=database.find(x=>x.BookId==id)
    res.send(p)
})

app.post("/books",(req,res)=>{
    console.log(req.body)
    res.send("Server received your data, Your data:"+req.body)
})

// Khởi động server và lắng nghe trên cổng đã định nghĩa
app.listen(port,()=>{
    console.log(`Server is running at http://localhost:${port}`); // in thông báo khi server đã chạy
})

const bodyParser=require("body-parser")
app.use(bodyParser.json())

app.put("/books",cors(),(req,res)=>{
    book=database.find(x=>x.BookId==req.body.BookId)
    if(book!=null)
    {
        book.BookName=req.body.BookName
        book.Price=req.body.Price
        book.Image=req.body.Image
    }
    res.send(database)
})
app.delete("/books/:id",cors(),(req,res)=>{
    id=req.params["id"]
    database = database.filter(x => x.BookId !== id);
    res.send(database)
})