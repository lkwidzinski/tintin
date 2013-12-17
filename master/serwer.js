/*jshint node: true */
var http = require('http'),
    url = require('url'),
    querystring = require('querystring');

/*-----------------------------
 * Parametry gry
 *-----------------------------*/
var puzzleData = []; // układ liczb-kolorów do zganięcia
var puzzleSize = 5;  // liczba wykorzystywanych „kolumn”
var puzzleDim = 9;   // liczba dostępnych kolorów
var maxTries = null; // maksymalna liczba prób – wartość
                     // null oznacza brak ograniczeń

/*-----------------------------
 * Generowanie i ocena układów
 *-----------------------------*/
var newGame = function (args) {
    var i;
    puzzleData = [];
    for (i = 0; i < puzzleSize; i += 1) {
        puzzleData.push(Math.floor(Math.random() * puzzleDim));
    }
	console.log(puzzleData);
    // opcjonalne parametry „args.size” i „args.dim”
    // zawierają wartości konfiguracyjne gry – należy je
    // oczywiście uwzględnić
    return {
        'retMsg': puzzleData
    };
};

var markAnswer = function (args) {
	var black=0,white=0;
	var i,j,k;
	var tab=[];
	var tab2=[];
    puzzleData.forEach(function(value){
        tab2.push(value);
    });
	for(k=0;k<puzzleSize;k+=1)
	{
		tab[k]=parseInt(args[k],10);
	};
	for(i=0;i<puzzleSize;i+=1)
	{
		for(j=0;j<puzzleSize;j+=1)
		{
			if(tab[i]===puzzleData[j])
			{
				if(i===j)
				{
					black+=1;
					tab[i]=-1;
					tab2[i]=-2;
					
				}
			};
		};	
	};
	for(i=0;i<puzzleSize;i+=1)
	{
		for(j=0;j<puzzleSize;j+=1)
		{
			if(tab[i]===puzzleData[j])
			{
					white+=1;
					tab[i]=-1;
					tab2[i]=-2;
			};
		};
		
	};
	//console.log(puzzleData);
    // parametry „args['0'], … , args['puzzleDim']”
    // zawierają podany przez gracza układ do oceny
    return {
        "black": black.toString(),
        "white": white.toString()
    };
};

/*-----------------------------------------------------
 * Konfiguracja serwera – pozostawić (prawie) bez zmian.
 *-----------------------------------------------------*/
var serwer = http.createServer(function (req, res) {
    var urlObj = url.parse(req.url),
        path = urlObj.pathname,
        args = querystring.parse(urlObj.query),
        retCode = 501,
        retObj = null;
    if (req.method === 'GET') {
        switch (path) {
        case '/play':
            console.log('CMD: /play');
            retObj = newGame(args);
            break;
        case '/mark':
            console.log('CMD: /mark');
            retObj = markAnswer(args);
        }
    }
    if (retObj !== null) {
        retCode = 200;
        retObj.retCode = 'OK';
    } else {
        retObj = {
            'retCode': 'ERR'
        };
    }
    res.writeHead(retCode, {
        'Access-Control-Allow-Origin': '*',
        'Pragma': 'no-cache',
        'Content-Type': 'application/json; charset=utf8'
    });
    res.end(JSON.stringify(retObj));
});

serwer.listen(3000, function () {
    console.log('Adres serwera: http://localhost:3000/\n');
});
