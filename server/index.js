var express = require("express")    //express 모듈을 로드
var app = express() //express 모듈안에 있는 express class 불러오는 과정

//__dirname : index.js 파일이 있는 위치
// +"/views" : 하위폴더 views으로 이동
//보여줄 html의 위치를 지정, views폴더를 만든다.
app.set("views",__dirname + "/views");

//보여줄 페이지들 엔진을 어떤 것을 사용하여 보여줄지 지정
//ejs엔진은 html 구동할 때 사용하는 엔진 중 하나, html도 있으나 복잡
app.set("view engene", "ejs");

//name 오류 해결
app.use(express.json()) 
app.use(express.urlencoded({extended:false}))


// 웹 서버가 시작 -> api를 생성
// 통신방식 get, post
app.get("/", function(req, res){ //localhost:3000/(자기자신PC) 로 호출했을 때 req(요청) res(응답)
    res.render("index.ejs"); //render 덮어씌우겠다
})

app.get("/second", function(req, res){ //localhost:3000/second 로 호출했을 때
    /*
        list 형태의 데이터
        [10,20,30]
        10을 출력하려면? -> list[0] 위치를 알아야함!!

        json은 key값을 알게 되면 value값을 호출한다.
        웹상에 데이터는 json형태로 메시지 주고 받는다.
        {
            key : value
            key2 : value2
            ID : id
            password : PASSWORD
        }
        id를 출력하려면? -> message.ID
          */
    //get 형태로 데이터를 보내줄떄는 데이터의 위치가
    //req.query -> json의 형태
    //입력한 ID 값은 req.query.ID
    //입력한 password 값은 req.query.password 에 들어온다.
    console.log("query : ", req.query) //get은 데이터가 쿼리에 post는 데이터가 body에 있다.
    console.log("ID : ", req.query.ID)
    console.log("password : ", req.query.password)

    // id : test, password : 1234 로그인 성공
    // 로그인이 성공하면 Second page 출력
    // 로그인이 실패하면 Login fail 출력
    if(req.query.ID == "test" && req.query.password == "1234"){
        res.send("Second page"); //데이터를 보내준다.보통 공공데이터 전송시
    }
    else{
        res.send("Login fail");
    }
})

app.post("/third", function(req,res){
    console.log("body : ", req.body)
    console.log("name : ", req.body.name)
    res.send("Thrid page");
})

var port = 3000;
app.listen(port, function(){
    console.log("웹 서버 시작");
})

//cmd에서 node inex.js 서버시작, ctrl + c 서버 종료
//내용이 변경되면 다시 시작