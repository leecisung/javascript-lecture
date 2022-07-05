var express = require("express");    //express 모듈을 로드
var app = express(); //express 모듈안에 있는 express class 불러오는 과정

//mysql2 라이브러리 로드
var mysql = require("mysql2");
//mysql 접속 정보 지정
var connection = mysql.createConnection(
    {
    host : "localhost",
    port : 3306,
    user : "root",
    password : "1557",
    database : "blockchain",
    }
);

//__dirname : index.js 파일이 있는 위치
// +"/views" : 하위폴더 views으로 이동
//보여줄 html의 위치를 지정, views폴더를 만든다.
app.set("views",__dirname + "/views");

//보여줄 페이지들 엔진을 어떤 것을 사용하여 보여줄지 지정
//ejs엔진은 html 구동할 때 사용하는 엔진 중 하나, html도 있으나 복잡
app.set("view engene", "ejs");

//name 오류 해결 post값 안보내질떄
app.use(express.json()); // json 형식의 테이터를 사용
app.use(express.urlencoded({extended:false}));  
// post 형식 데이터를 받을떄 True 패키지 새로 설치 해야됨 
// false 형태일떄는 추가 패키지 설치 필요 X


// [2] make api
//웹 서버가 시작 -> api를 생성
// 통신방식 get, post / get은 데이터가 쿼리에 post는 데이터가 body에
app.get("/", function(req, res){ //localhost:3000/(자기자신PC) 로 호출했을 때 req(요청) res(응답)
    res.render("index.ejs"); //render 덮어씌우겠다, index.ejs 파일을 브라우저에 덮어준다.
    
})

app.get("/second", function(req, res){ //localhost:3000/second 로 호출했을 때
    //res.render("second.ejs");
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
    // console.log("query : ", req.query) //get은 데이터가 쿼리에 post는 데이터가 body에 있다.
    // console.log("ID : ", req.query.ID)
    // console.log("password : ", req.query.password)

    // id : test, password : 1234 로그인 성공
    // 로그인이 성공하면 Second page 출력
    // 로그인이 실패하면 Login fail 출력
    if(req.query.id == "test" && req.query.pass == "1234"){
      res.render("second.ejs"); //데이터를 보내준다.보통 공공데이터 전송시
    }
    else{
        res.redirect("/");
    }
})

//localhost:3000/signup 주소로 요청을 보내면 signup.ejs 보여주겠다.
app.get("/signup", function(req, res){
    res.render("signup.ejs")
})

app.post("/signup2", function(req, res){
    //signup 페이지에서 데이터를 2개를 send
    //두 데이터의 값을 ㅂㄴ수로 지정
    //DB insert()
    var input_id = req.body.id;
    var input_pass = req.body.pass;
    connection.query(
        `insert into user_info(user_id, user_pass) values (?, ?)`,
        [input_id, input_pass],
        function(err, result) {
            if(err) { //sql이 에러가 났을때
                console.log(err);
                res.send("sql error");
            }else {
              res.redirect("/"); //로그인이 실패
                }
            })
        }
    )


//회원정보 수정 페이지로 이동 api 생성
app.get("/update", function(req, res){
    res.render("update.ejs");
})


//회원정보수정
//조건 : 아이디값이 같은 데이터의 password를 변경
//id와 password 두 데이터를 유저에게서 받아오는 작업
// 1. api 생성, 2. 유저가 보내온 데이터를 변수에 저장 3. sql쿼리문을 이용하여 수정 4. index.ejs로 돌아간다.
app.post("/update2", function(req,res){
    var input_id =req.body.id;
    var input_pass=req.body.pass;
    console.log(input_id);
    console.log(input_pass);
    connection.query(
        `update user_info set user_pass = ? where user_id = ?`,
        [input_pass, input_id],
        function(err, result) {
            if(err) { //sql이 에러가 났을때
                console.log(err);
                res.send("sql error");
            }else {
              res.redirect("/"); 
                }
            }
    )
})


//회원 탈퇴
//회원 탈퇴 페이지 이동 api 생성
app.get("/delete", function(req, res){
    res.render("delete.ejs");
})

app.post("/delete2", function(req,res){
    var input_id =req.body.id;
    var input_pass=req.body.pass;
    console.log(input_id);
    console.log(input_pass);
    connection.query(
        `delete from user_info where user_id = ?`,
        [input_id],
        function(err, result) {
            if(err) { //sql이 에러가 났을때
                console.log(err);
                res.send("sql error");
            }else {
              res.redirect("/"); 
                }
            }
    )

})

app.post("/login", function(req,res){
    var input_id = req.body.id;
    var input_password = req.body.pass;
    //input 데이터를 sql 담아서 쿼리문 실행 결과값 리턴
    connection.query( //띄어쓰기 조심해야됨
        `select * from user_info where user_id= ? and user_pass = ?`,
        [input_id, input_password],
        function(err, result) {
            if(err) { //sql이 에러가 났을때
                console.log(err);
                res.send("sql error");
            }else {
                if(result.length > 0) { //id와 password의 조건이 둘다 참이므로
                    console.log(result);
                    res.render("second.ejs"); //데이터가 존재하는 경우(로그인 성공)
                }else {
                    console.log(result);
                    res.redirect("/"); //로그인이 실패
                }
            }
        }
    )
})

//localhost:3000/third
//get 형식은 url 데이터를 담아서 보내고 POST 형식은 body에 숨겨서 데이터를 보낸다.
app.post("/third", function(req,res){
    console.log(req.body);
    var input_name = req.body.user_name;
    var input_phone = req.body.user_phone;
    console.log(input_name, input_phone);
    res.render("third.ejs",
        {
            name : input_name,
            phone : input_phone,
        }
    );
})

//[1] server start
var port = 3000;
app.listen(port, function(){
    console.log("웹 서버 시작");
})

//cmd에서 node inex.js 서버시작, ctrl + c 서버 종료
//내용이 변경되면 다시 시작