var express = require('express')
	, http = require('http')
	,	path = require('path')

var bodyParser = require('body-parser')
	, cookieParser = require('cookie-parser')
	,	static = require('serve-static')
	,	errorHandler = require('errorhandler')

var expressErrorHandler = require('express-error-handler');

var expressSession = require('express-session')

var app = express();

