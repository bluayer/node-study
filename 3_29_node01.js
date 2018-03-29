// Express 기본 모듈 불러오기
var express = require('express')
	, http = require('http')
	, path = require('path');

// Express의 미들웨어 불러오기
var bodyParser = require('body-parser')
	, static = require('serve-static');

// 익스프레스 객체 생성
var app = express();

var expressErrorHandler = require('express-error-handler');

// 기본 속성 설정
app.set('port', process.env.PORT || 3000);

// body-parser를 사용해 application/x-www-form-urlencoded 파싱
app.use(bodyParser.urlencoded({ extended: false }));

// body-parser를 사용해 appliction/json 파싱
app.use(bodyParser.json());

app.use(static(path.join(__dirname, 'public')));

// 라우터 객체 참조
var router = express.Router();

// 라우팅 함수 등록

router.route('/process/login').post(function(req, res) {
	console.log('/process/login 처리함.');

	var paramId = req.body.id || req.query.id;
	var paramPassword = req.body.password || req.query.password;

	res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
	res.write('<h1>Express 서버에서 응답한 결과입니다.</h1>');
	res.write('<div><p>Param id : ' + paramId + '</p></div>');
	res.write('<div><p>Param password : ' + paramPassword + '</p></div>');
	res.write(" <br><br><a href='/public/login2.html'>로그인 페이지로 돌아가기</a>");
	res.end();

});

app.all('*', function(req, res) {
	res.status(404).send('<h1>ERROR</h1>')
});

// 라우터 객체를 app 객체에 등록
app.use('/', router);


// 미들웨어에서 파라미터 확인
app.use(function(req, res, next) {
	console.log('첫 번째 미들웨어에서 요청을 처리함.');

	var paramId = req.body.id || req.query.id;
	var paramPassword = req.body.password || req.query.password;

	res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
	res.write('<h1>Express 서버에서 응답한 결과입니다.</h1>');
	res.write('<div><p>Param id : ' + paramId + '</p></div>');
	res.write('<div><p>Param password : ' + paramPassword + '</p></div>');
	res.end();

});

var errorHandler = expressErrorHandler({
	static: {
		'404': './public/404.html'
	}
});

app.use( expressErrorHandler.httpError(404) );
app.use( errorHandler );


// Express 서버 시작헀습니다
http.createServer(app).listen(app.get('port'), function() {
	console.log('익스프레스 서버를 시작헀습니다 : ' + app.get('port'))
});