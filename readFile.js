function getXmlHttp() {
    var xmlhttp;
    try {
        xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
        try {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (E) {
            xmlhttp = false;
        }
    }
    if (!xmlhttp && typeof XMLHttpRequest != 'undefined') {
        xmlhttp = new XMLHttpRequest();
    }
    return xmlhttp;
}

var response;
(function () {
    var xmlhttp = getXmlHttp();
    xmlhttp.open('GET', 'file.txt', false);
    xmlhttp.send(null);
    if (xmlhttp.status == 200) {
        response = xmlhttp.responseText;
    }
})();

var limits = 1;
let number = '';
let i = 7;
let arrForMain = [];
$(`#readFile`).click(function () {
    size = 1; 
    while(response[i] != ';'){
        if (response[i] == ' ') {
            arrForMain.push(number);
            size++;
            number = '';
        }else{
            number += response[i];
        }
        i++;
    }
    arrForMain.push(number);
    while(response[i] != ':'){
        i++;
    }
    i += 3;
    forLim = i;
    while(response[i] != '.'){
        if (response[i] == ',') {
            limits++;
            i += 3;
            continue;
        }
        i++;
    }
    size++;
    let lim = limits;
    for (let i = 0; i < size-1; i++) {
        $('#target tr:first-child').append(`<td>x${i+1}</td>`);
        $('#limitations tr:first-child').append(`<td>x${i+1}</td>`);
        $('#target tr:last-child').append(`<td><input type="text" required id="x${i}"></td>`);
    }
    // $('#target tr:first-child').append(`<td>С</td>`);
    // $('#target tr:last-child').append(`<td><input type="text" required id="xС"></td>`);
    $('#target tr:last-child').append(`<td>min</td>`);
    // $('#limitations tr:first-child').append(`<td>С</td>`);
    for (let a = 0; a < lim; a++) {
        $('#limitations').append(`<tr></tr>`);
        for (let i = 0; i < size-1; i++) {
            $('#limitations tr:last-child').append(`<td><input type="text" required id="lim${a}X${i}"></td>`);
        }
        // $('#limitations tr:last-child').append(`<td><input type="text" required id="lim${a}XС"></td>`);
        $('#limitations tr:last-child').append(`<td>=</td>`);
        $('#limitations tr:last-child').append(`<td><input type="text" required id="lim${a}XEqually"></td>`);
    }
    $('#ready1').hide();
    $('#auto').show();
    $('#bazis').show();
    $('#manually').show();
    $(`#readFile`).hide();
    $(`#form1`).val(size - 1);
    $(`#form2`).val(limits);

    let row = 0;
    let column = 0;
    number = '';
    while(response[forLim] != '.'){
        if (response[forLim] == ',') {
            $(`#lim${row}XEqually`).val(number);
            number = '';
            row++;
            column = 0;
            forLim += 3;
            continue;
        }
        if (response[forLim] == ' ') {
            $(`#lim${row}X${column}`).val(number);
            column++;
            number = '';
            forLim++;
            continue;
        }else{
            number += response[forLim];
            forLim++;
        }
    }
    $(`#lim${row}XEqually`).val(number);
    for (let i = 0; i < size; i++) {
        $(`#x${i}`).val(arrForMain[i]);
    }
});