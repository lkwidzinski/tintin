var formIterator=1;
function sendRequest(){
	var formString = "<form action=\"#\" id=\"formularz\"><input type=\"text\" name=\"a\"><input type=\"text\" name=\"b\"><input type=\"text\" name=\"c\"><input type=\"text\" name=\"d\"><input type=\"text\" name=\"e\"><input type=\"button\" name=\"send\" value=\"Submit\" id=\"sButton\"></form>";
    var a = document.forms[formIterator].a.value;
    var b = document.forms[formIterator].b.value;
    var c = document.forms[formIterator].c.value;
    var d = document.forms[formIterator].d.value;
    var e = document.forms[formIterator].e.value;
    that=this;
        $.ajax({
            type : "GET",
            url : 'http://localhost:3000/mark?0=' + a + '&1=' + b + '&2=' + c +'&3=' + d + '&4=' + e,
            dataType: "json",
            success : function (data) {
                $('#hits').text(data.retVal);
                document.forms[formIterator].a.disabled=true;
                document.forms[formIterator].b.disabled=true;
                document.forms[formIterator].c.disabled=true;
                document.forms[formIterator].d.disabled=true;
                document.forms[formIterator].e.disabled=true;
                document.forms[formIterator].send.disabled=true;
                if(data.black==="5"){
                    alert("Wygrales!!");
                };

                $('#formularz:last-child').append("B:" + data.black + "W:" + data.white);
                $('#main').append(formString);
                that.formIterator+=1;
                $("#sButton:last-child").click(function(){sendRequest();});

            },
			error : function (xhr, status, error) {
                $('#hits').html('Status: ' + status + '<br>Kod: ' + xhr.status + '<br>Komunikat: ' + error);
            }
        });

};

function playRequest(){
        $.ajax({
            type : "GET",
            url : 'http://localhost:3000/play',
            dataType: "json",
            success : function (data) {
                $('#result').text("Wylosowano:" + data.retMsg);
            },
            error : function (xhr, status, error) {
                $('#result').text('Status: ' + status + '<br>Kod: ' + xhr.status + '<br>Komunikat: ' + error);
            }
        });

};

$(document).ready(function(){
		$("#sButton").click(function(){sendRequest();});
        $("#pButton").click(function(){playRequest();});

});