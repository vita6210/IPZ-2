### Вступ

У наступному прикладі показано, як реалізувати JSON та JSONP запит / відповідь за допомогою Node.js та Express.js.

Перш за все, вам потрібно завантажити та встановити node.js за таким посиланням, пізніше вам потрібно створити нову папку, яка буде містити всі файли проекту, і запустити таку команду всередині нової папки:

    $ npm install express

Проект розділений на дві частини: index.html, який містить усі запити до сервера, server.js, який працює у процесі сервера node.js.

#### Запит / відповідь JSON

Наступний код описує JSON-частину прикладу.

#### Клієнтська сторона 

Index.html містить посилання, яке робить запит ajax при кожному натисканні.

```html
<html>
    <head>
        <title>JSON - JSONP tests</title>
        <!--Include jquery-->
        <script src="http://code.jquery.com/jquery-1.8.2.min.js"></script>      
        <script type="text/javascript">
            $(function(){
                    //DEF response        
                    var data = {};
                    data.title = "title";
                    data.message = "message";
                       
             //Handler on JSON anchor click                 
             $('#select_link_JSON').click(function(e){
                 
                    e.preventDefault();
                    //LOG
                    console.log('select_link_JSON clicked');
                   
                   //JSON request     
                    $.ajax({
                        data: JSON.stringify(data),
                        contentType: 'application/json',
                        url: 'http://localhost:3000/endpointJSON',                      
                        success: function(data) {
                            console.log('success');
                            console.log(JSON.stringify(data));
                        }
                    });
                }); 
            });
        </script>
    </head>
    <body>
        <div id="select_div_JSON"><a href="#" id="select_link_JSON">Test JSON</a></div>    
    </body>
</html>
```

Запит надсилає об’єкт, який містить заголовок та повідомлення на таку адресу:

    http://localhost:3000/endpointJSON


#### Серверна сторона

Server.js отримує об'єкт даних, надісланий index.html, і повертає дані клієнту:

```js
//DEPENDENCIES
var express = require('express');

//Initialize Express.js
var app = express();

//JSON Get Request
app.get('/endpointJSON', function(req, res){

//LOG
console.log('JSON response');
```

Наступна команда запускає сервер node.js:

    node PROJECT_PATH\server.js

Міркування щодо CORS:

Можливо, попередній код вийде з ладу, оскільки браузери не дозволяють спільне використання ресурсів Cross-Origin:

    XMLHttpRequest cannot load http://localhost:3000/endpointJSON?{%22title%22:%22title%22,%22message%22:%22message%22}. 
    No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'null' is therefore not allowed access.

Нам потрібно використовувати JSONP, щоб уникнути проблеми.

#### Запит / відповідь JSONP

JSONP - це дійсно простий трюк для подолання тієї ж політики домену XMLHttpRequest. (Як відомо, не можна надсилати запит AJAX (XMLHttpRequest) до іншого домену.

#### Клієнтська сторона

Наступний код додає новий запит JSONP AJAX до index.html:

```html
<html>
    <head>
        <title>JSON - JSONP tests</title>
        <!--Include jquery-->
        <script src="http://code.jquery.com/jquery-1.8.2.min.js"></script>      
        <script type="text/javascript">
            $(function(){
                    //DEF response        
                    var data = {};
                    data.title = "title";
                    data.message = "message";
                    
                    
                //Handler on JSONP anchor click                 
                $('#select_link_JSONP').click(function(e){
                 
                    e.preventDefault();
                    //LOG
                    console.log('select_link_JSONP clicked');
                    
                    //JSONP request 
                    $.ajax({
                        dataType: 'jsonp',
                        data: JSON.stringify(data),                      
                        jsonp: 'callback',
                        url: 'http://localhost:3000/endpointJSONP?callback=?',                     
                        success: function(data) {
                             //LOG
                             console.log('success');
                             console.log(JSON.stringify(data));               
                        }
                    });
                }); 



             //Handler on JSON anchor click                 
             $('#select_link_JSON').click(function(e){
                 
                    e.preventDefault();
                    //LOG
                    console.log('select_link_JSON clicked');
                   
                   //JSON request     
                    $.ajax({
                        data: JSON.stringify(data),
                        contentType: 'application/json',
                        url: 'http://localhost:3000/endpointJSON',                      
                        success: function(data) {
                            console.log('success');
                            console.log(JSON.stringify(data));
                        }
                    });
                }); 

            });
        </script>
    </head>
    <body>
        <div id="select_div_JSONP"><a href="#" id="select_link_JSONP">Test JSONP</a></div>
        <div id="select_div_JSON"><a href="#" id="select_link_JSON">Test JSON</a></div>    
    </body>
</html>
```

Запит JSONP додає функцію javascript, яка збирається містити дані, повернені сервером node.js.

#### Серверна сторона

Наступний код додає новий обробник до server.js, який отримує всі запити JSONP:

```js
//DEPENDENCIES
var express = require('express');
 
//Initialize Express.js 
var app = express();

//JSONP Get Request
app.get('/endpointJSONP', function(req, res){

  //LOG  
  console.log('JSONP response');
  console.log(req.query);
  //JSONP Response (doc: http://expressjs.com/api.html#res.jsonp) 
  res.jsonp(req.query) 
});

//JSON Get Request
app.get('/endpointJSON', function(req, res){
  
  //LOG
    console.log('JSON response');
  console.log(req.query);
  
  //JSON Response
    res.json(req.query);
});
 
//Starting the server 
app.listen(3000);
```

#### Висновок

У прикладі показано, як імітувати запити AJAX між клієнтом та сервером, а також показано, як уникнути помилки CORS за допомогою JSONP.
