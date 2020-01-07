$('#auto').hide();
$('#bazis').hide();
$('#manually').hide();
$('#save').hide();
$('#textSave').hide();
$('.go').hide();
$('.goAuto').hide();
$('#simplexTable').hide();

// глобальная перменная размерности
var size;
var arrSimplexTable = [];
var AutoGo = false;
var noBazis = true;
let goSimplexTableCopy = [];
let pattern = new RegExp("^[0-9]{1,}/[0-9]{1,}$", "g");
let pattern1 = new RegExp("^[0-9]{1,}$", "g");

// Указание ограничений и размерности
$('#ready1').click(function () { 
    size = Number($('#form1').val()) + 1;
    let lim = Number($('#form2').val());
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
});

// Указание базисной переменной
$('#bazis').click(function () { 
    $('#save').show();
    for (let i = 1; i < size; i++) {
        $('#tableBazis tr:first-child').append(`<td>x${i}</td>`);
        $('#tableBazis tr:last-child').append(`<td><input type="text" required id="Bazx${i}"></td>`);
    }
    $('#bazis').hide();
});

// Сохранение базовой переменной
var bazis = [];
$('#save').click(function () { 
    noBazis = false;
    bazis = []
    for (let i = 1; i < size; i++) {
        // let string = Number($(`#Bazx${i}`).val());
        // if (pattern1.test(string)) {
            bazis.push(Number($(`#Bazx${i}`).val()));
        // }else{
        //     alert(`Введены некоректные данные в базисную. Страница будет перезагружена!`);
        //     location.reload();
        // }
    }
    $('#save').hide();
    $('#textSave').show();
    setTimeout(() => {
        $('#textSave').hide();
        $('#save').show();
    }, 3000);
});

// Метод Жордана-Гаусса
function methodGaussa(){
    // ОПТИМИЗИРОВАТЬ МЕТОД ГАУССА
    for (let i = 0; i < Number($('#form2').val()); i++) {
        if (table[i][i] == 0) {
            alert('Переставьте строки для базиса!');
            setTimeout(() => {
                location.reload();
            }, 2000);
        }
    }
    let flag = 0;
    for (let i = 0; i < size; i++) {
        if(bazis[i] == 1){
            for (let l = flag + 1; l < Number($('#form2').val()); l++) {
                let constMulti = `${FractionNumber.Minus(FractionNumber.fractionDivision(table[l][i], table[flag][i]))}`;
                // let constMulti = `${(-(Number(table[flag+1][i])))}/${Number(table[flag][i])}`;
                for (let j = 0; j < Number($('#form1').val())+1; j++) {
                    table[l][j] = FractionNumber.fractionPlus(FractionNumber.fractionMultiplication(table[flag][j], constMulti), table[l][j]);
                }
            }
            flag++;
        }
    }
}

// Обратный метод Жордана-Гаусса
function invertMethodGaussa(){
    let flag = 0;
    for (let i = 0; i < size; i++) {
        if(bazis[i] == 1){
            for (let l = flag - 1; l > -1; l--) {
                let constMulti = `${FractionNumber.Minus(FractionNumber.fractionDivision(table[l][i], table[flag][i]))}`;
                for (let j = 0; j < Number($('#form1').val())+1; j++) {
                    table[l][j] = FractionNumber.fractionPlus(FractionNumber.fractionMultiplication(table[flag][j], constMulti), table[l][j]);
                }
            }
            flag++;
        }
    }
}

function mainDivision() {
    let used = [];
    for (let x = 0; x < Number($('#form1').val()); x++) {
        used[x] = false;
    }
    for (let i = 0; i < Number($('#form2').val()); i++) {
        for (let j = 0; j < Number($('#form1').val()); j++) {
            let not = 0;
            for (let a = 0; a < Number($('#form2').val()); a++) {
                if (table[a][j] != 0 && not < 2) {
                    not++;
                }
                if (used[j]) {
                    not++;
                }
            }
            if (not < 2) {
                let constTable = table[i][j];
                for (let z = 0; z < Number($('#form1').val()) + 1; z++) {
                    table[i][z] = FractionNumber.fractionDivision(table[i][z], constTable);
                }
                used[j] = true;
                break;
            }
        }
    }
}

// Прорисовка данных
let simplexTable = [];
function writeMain() {
    let used = [];
    for (let x = 0; x < Number($('#form1').val()); x++) {
        used[x] = false;
    }
    for (let i = 0; i < Number($('#form2').val()); i++) {
        for (let j = 0; j < Number($('#form1').val()); j++) {
            let not = 0;
            for (let a = 0; a < Number($('#form2').val()); a++) {
                if (table[a][j] != 0 && not < 2) {
                    not++;
                }
                if (used[j]) {
                    not++;
                }
            }
            if (not < 2) {
                $('#writeMain').append(`<p>X<sub>${j+1}</sub> = <span></span></p>`);
                // let constTable = table[i][j];
                for (let z = 0; z < Number($('#form1').val()); z++) {
                    if (z != j && table[i][z] != 0) {
                        $('#writeMain p:last-child span').append(`${FractionNumber.Minus(table[i][z])}<sub>X${z+1}</sub> + `);
                        simplexTable[i][z] = table[i][z];
                    }
                    // table[i][z] = FractionNumber.fractionDivision(table[i][z], constTable);
                }
                $('#writeMain p:last-child span').append(`${table[i][Number($('#form1').val())]}`);
                simplexTable[i][Number($('#form1').val())] = table[i][Number($('#form1').val())];
                used[j] = true;
                break;
            }
        }
    }
}

function createSimplexTable() {
    $('.go').show();
    $('.goAuto').show();
    $('#simplexTable').show();
    for (let i = 0; i < Number($('#form1').val()); i++) {
        if (simplexTable[0][i] != '') {
            $(`#simplexTable tr:first-child`).append(`<td>X${i+1}</td>`);
        }else{
            $(`#simplexTable`).append(`<tr><td>X${i+1}</td></tr>`);
        }
    }
    for (let z = 0; z < Number($('#form2').val()); z++) {
        for (let x = 0; x < Number($('#form1').val())+1; x++) {
            if (simplexTable[z][x] != '') {
                $(`#simplexTable tr:nth-child(${z+2})`).append(`<td id='0Step${z}X${x}'>${simplexTable[z][x]}</td>`);
            }
        }
    }
    let lastRow = [];
    flag = 0;
    for (let j = 0; j < Number($('#form1').val()); j++) {
        if (bazis[j] == 0) {
            lastRow[flag] = `0`;
            flag++;
        }
    }
    lastRow[flag] = `0`;
    flagrow = 0;
    for (let j = 0; j < Number($('#form1').val()); j++) {
        let thisrow = 0;
        if(bazis[j] != 0){
            continue;
        }
        for (let c = 0; c < Number($('#form1').val()); c++) {
            if (bazis[c] == 0 && Number(($(`#x${j}`).attr('id'))[1]) == c) {
                lastRow[flagrow] = FractionNumber.fractionPlus(lastRow[flagrow], $(`#x${c}`).val());
            } 
            if (bazis[c] != 0) {
                lastRow[flagrow] = FractionNumber.fractionPlus(lastRow[flagrow], FractionNumber.fractionMultiplication($(`#x${c}`).val(), FractionNumber.Minus($(`#0Step${thisrow}X${j}`).text())));
                thisrow++;
            }
        }
        flagrow++;
    }
    let main = `0`;
    let flag1 = 0;
    let arrBazis = [];
    for (let i = 0; i < Number($('#form1').val()); i++) {
        arrBazis[i] = $(`#x${i}`).val();
    }
    for (let z = 0; z < Number($('#form1').val()); z++) {
        if (bazis[z] != 0) {
            main = FractionNumber.fractionPlus(main, FractionNumber.fractionMultiplication($(`#0Step${flag1}X${Number($('#form1').val())}`).text(), arrBazis[z]));
            flag1++;
        }
    }
    lastRow[flag] = FractionNumber.optimaze(FractionNumber.Minus(main));
    $(`#simplexTable`).append(`<tr><td></td></tr>`);
    for (let i = 0; i < lastRow.length; i++) {
        $(`#simplexTable tr:last-child`).append(`<td id='0Step${Number($('#form2').val())}X${i}'>${lastRow[i]}</td>`);
    }
}

function createSimplexTable1(){
    for (let i = 1; i < row1; i++) {
        for (let j = 1; j < column1; j++) {
            simplexTable_noBazis[i][j] = FractionNumber.optimaze(simplexTable_noBazis[i][j])
        }
    }
    $('.go').show();
    $('.goAuto').show();
    $('#simplexTable').show();
    for (let i = 1; i < column1; i++) {
        $(`#simplexTable tr:first-child`).append(`<td>${simplexTable_noBazis[0][i]}</td>`);
    }
    for (let z = 1; z < row1; z++) {
        $(`#simplexTable`).append(`<tr><td>${simplexTable_noBazis[z][0]}</td></tr>`);
    }
    let lastRow = [];
    for (let j = 0; j < column1 -1; j++) {
        lastRow[j] = `0`;
    }
    for (let i = 1; i < row1; i++) {
        for (let j = 1; j < column1; j++) {
            $(`#simplexTable tr:nth-child(${i+1})`).append(`<td>${simplexTable_noBazis[i][j]}</td>`);
        }
    }
    flagrow = 0;
    for (let i = 0; i < column1-1; i++) {
        for (let j = 0; j < row1-2; j++) {
            lastRow[flagrow] = FractionNumber.fractionPlus(lastRow[flagrow], FractionNumber.fractionMultiplication($(`#x${Number(String(simplexTable_noBazis[j+1][0])[1]) - 1}`).val(), simplexTable_noBazis[j+1][i+1]));
        }
        flagrow++;
    }

    lastRow[flagrow -1] = FractionNumber.Minus(lastRow[flagrow -1]);

    for (let z = 1; z < column1; z++) {
        $(`#simplexTable tr:last-child td:nth-child(${z+1})`).text(`${lastRow[z-1]}`);
    }
}

var row1;
var column1;
function letsGo1(i, j) {
    for (let z = 0; z < row1; z++) {
        goSimplexTableCopy[z] = [];
        for (let x = 0; x < column1; x++) {
            goSimplexTableCopy[z][x] = ''; 
        }
    }
    for (let z = 0; z < row1; z++) {
        for (let x = 0; x < column1; x++) {
            goSimplexTableCopy[z][x] = simplexTable_noBazis[z][x]; 
        }
    }
    arrSimplexTable[stepsTable] = [];
    for (let z = 0; z < row1; z++) {
        arrSimplexTable[stepsTable][z] = [];
        for (let x = 0; x < column1; x++) {
            arrSimplexTable[stepsTable][z][x] = simplexTable_noBazis[z][x]; 
        }
    }
    // замена Х
    let a = '';
    a = simplexTable_noBazis[0][j];
    simplexTable_noBazis[0][j] = simplexTable_noBazis[i][0];
    simplexTable_noBazis[i][0] = a;

    // замена столбца
    for (let z = 1; z < row1; z++) {
        if (z != i) {
            simplexTable_noBazis[z][j] = FractionNumber.Minus(FractionNumber.fractionDivision(goSimplexTableCopy[z][j], goSimplexTableCopy[i][j])); 
        }
    }
    // Замена строки
    for (let x = 1; x < column1; x++) {
        if (x != j) {
            simplexTable_noBazis[i][x] = FractionNumber.fractionDivision(goSimplexTableCopy[i][x], goSimplexTableCopy[i][j]);
        }
    }
    simplexTable_noBazis[i][j] = FractionNumber.fractionDivision('1', goSimplexTableCopy[i][j]);

    for (let z = 1; z < row1; z++) {
        for (let x = 1; x < column1; x++) {
            if (z != i && x != j) {
                simplexTable_noBazis[z][x] =  FractionNumber.fractionDivision(FractionNumber.fractionMinus(FractionNumber.fractionMultiplication(goSimplexTableCopy[z][x],goSimplexTableCopy[i][j]), FractionNumber.fractionMultiplication(goSimplexTableCopy[z][j], goSimplexTableCopy[i][x])), goSimplexTableCopy[i][j]);
            }
        }
    }
    stepsTable++;
    column1--;
    // УДАЛИТЬ СТОЛБЕЦ
    for (let z = 0; z < row1; z++) {
        simplexTable_noBazis[z][j] = 'delete';
    }
    for (let i = 0; i < row1; i++) {
        simplexTable_noBazis[i].splice(j, 1);
    }
    if (simplexTable_noBazis[row1-1][column1-1] == 0) {
        for (let i = 0; i < row1; i++) {
            simplexTable[i] = [];
            for (let j = 0; j < column1; j++) {
                simplexTable[i][j] = '';
            }
        }
        for (let i = 1; i < row1; i++) {
            for (let j = 1; j < column1; j++) {
                simplexTable[i-1][j-1] = simplexTable_noBazis[i][j];
            }            
        }  
        showArtificialTable();
        createSimplexTable1(); 
    }
    else{
        showArtificialTable();
    }
    if (AutoGo) {
        for (let i = 0; i < row1; i++) {
            for (let j = 0; j < column1; j++) {
                if (FractionNumber.smaller(simplexTable_noBazis[row1-1][j]) && FractionNumber.bigger(simplexTable_noBazis[i][j])) {
                    setTimeout(() => {
                        letsGo1(i,j);
                    }, 500);
                }
            }
        }
    }
}

function showArtificialTable() {
    for (let i = 1; i < row1; i++) {
        for (let j = 1; j < column1; j++) {
            simplexTable_noBazis[i][j] = FractionNumber.optimaze(simplexTable_noBazis[i][j]);
        }
    }
    $(`#work1`).append(`<p>Шаг: ${stepNoBazis}</p>`);
    $(`#work1`).append(`<table id='step${stepNoBazis}'></table>`);
    for (let i = 0; i < row1; i++) {
        $(`#work1 table:last-child`).append(`<tr></tr>`);
        for (let j = 0; j < column1; j++) {
            $(`#work1 table:last-child tr:last-child`).append(`<td>${simplexTable_noBazis[i][j]}</td>`);
        }
    }
    for (let i = 1; i < column1 - 1; i++) {
        let minSumm = [0,0];
        summ = `10000000000000`;
        for (let j = 1; j < row1 - 1; j++) {
            if (FractionNumber.bigger(simplexTable_noBazis[j][i]) && FractionNumber.smallerTwo(FractionNumber.fractionDivision(simplexTable_noBazis[j][column1 - 1], simplexTable_noBazis[j][i]), summ)) {
                minSumm[0] = j;
                minSumm[1] = i;
                summ = FractionNumber.fractionDivision(simplexTable_noBazis[j][column1 - 1], simplexTable_noBazis[j][i]);
            }
        }
        if (minSumm[0] == 0 && minSumm[1] == 0) {
            continue;
        }else{
            $(`#work1 table:last-child tr:nth-child(${minSumm[0] + 1}) td:nth-child(${minSumm[1] + 1})`).addClass('get').attr('onclick', `letsGo1(${minSumm[0]}, ${minSumm[1]})`);
        }
    }
    stepNoBazis++;
}

// Создание таблицы для Жордана-Гаусса или создание таблицы для искуственного базиса
var table = [];
var simplexTable_noBazis = [];
var stepNoBazis = 0;
$('#manually').click(function () { 
    if (noBazis) {
        row1 = Number($('#form2').val()) + 2;
        column1 = Number($('#form1').val()) + 2;
        for (let i = 0; i < Number($('#form2').val()) + 2; i++) {
            simplexTable_noBazis[i] = [];
            for (let j = 0; j < Number($('#form1').val()) + 2; j++) {
                simplexTable_noBazis[i][j] = '';
            }
        }
        simplexTable_noBazis[0][0] = `X*`;
        for (let i = 1; i < Number($('#form1').val()) + 1; i++) {
            simplexTable_noBazis[0][i] = `X${i}`;
        }
        for (let i = 1; i < Number($('#form2').val()) + 1; i++) {
            simplexTable_noBazis[i][0] = `X${Number($('#form1').val()) + i}`;
        }
        for (let i = 1; i < Number($('#form2').val()) + 1; i++) {
            for (let j = 1; j < Number($('#form1').val()) + 1; j++) {
                simplexTable_noBazis[i][j] = $(`#lim${i-1}X${j-1}`).val();
            }
            simplexTable_noBazis[i][Number($('#form1').val()) + 1] = $(`#lim${i-1}XEqually`).val();
        }
        for (let i = 1; i < Number($('#form1').val()) + 2; i++) {
            let summ = `0`;
            for (let j = 1; j < Number($('#form2').val()) + 1; j++) {
               summ = FractionNumber.fractionPlus(summ, simplexTable_noBazis[j][i]);
            }
            simplexTable_noBazis[Number($('#form2').val()) + 1][i] = FractionNumber.Minus(summ);
        }
        $(`#work1`).append(`<p>Искуственный базис</p>`);
        showArtificialTable();
    }
    else{
        for (let i = 0; i < Number($('#form2').val()); i++) {
            table[i] = [];
            simplexTable[i] = [];
            for (let j = 0; j < Number($('#form1').val()); j++) {
                table[i][j] = $(`#lim${i}X${j}`).val();
                simplexTable[i][j] = '';
            }
            table[i][Number($('#form1').val())] = $(`#lim${i}XEqually`).val();
            simplexTable[i][Number($('#form1').val())] = '';
        }
        methodGaussa();
        invertMethodGaussa();
        mainDivision();
        for (let a = 0; a < Number($('#form2').val()); a++) {
            for (let b = 0; b < Number($('#form1').val())+1; b++) {
               table[a][b] = FractionNumber.optimaze(table[a][b]);
            }
        }
        writeMain();
        createSimplexTable();
    }
});

var stepsTable = 0;
let goSimplexTable = [];
let row = 0;
let column = 0;

$(`.go`).click(function() { 
    for (let i = 0; i < $('#simplexTable tr').length; i++) {
        column = 0;
        row++;
        goSimplexTable[i] = [];
        for (let j = 0; j < $('#simplexTable tr:last-child td').length; j++) {
            goSimplexTable[i][j] = $(`#simplexTable tr:nth-child(${i+1}) td:nth-child(${j+1})`).text();
            column++;
        }
    }
    $('#work').append(`<p id='workStep${stepsTable}'>Шаг: ${stepsTable}</p>`);
    $('#work').append(`<table id='work${stepsTable}'></table>`);
    let min = [];
    for (let i = 0; i < column; i++) {
        min[i] = 0;
    }


    for (let i = 0; i < row; i++) {
        $('#work table:last-child').append(`<tr></tr>`);
        for (let j = 0; j < column; j++) {
            $('#work table:last-child tr:last-child').append(`<td>${goSimplexTable[i][j]}</td>`);
        }
    }


    for (let i = 1; i < column1 - 1; i++) {
        let minSumm = [0,0];
        summ = `10000000000000`;
        for (let j = 1; j < row1 - 1; j++) {
            if (FractionNumber.bigger(goSimplexTable[j][i]) && FractionNumber.smallerTwo(FractionNumber.fractionDivision(goSimplexTable[j][column1 - 1], goSimplexTable[j][i]), summ) && FractionNumber.smaller(goSimplexTable[row1 - 1][i])) {
                minSumm[0] = j;
                minSumm[1] = i;
                summ = FractionNumber.fractionDivision(goSimplexTable[j][column1 - 1], goSimplexTable[j][i]);
            }
        }
        if (minSumm[0] == 0 && minSumm[1] == 0) {
            continue;
        }else{
            $(`#work table:last-child tr:nth-child(${minSumm[0] + 1}) td:nth-child(${minSumm[1] + 1})`).addClass('get').attr('onclick', `letsGo(${minSumm[0]}, ${minSumm[1]})`);
        }
    }


});

$(`.goAuto`).click(function() { 
    AutoGo = true;
    for (let i = 0; i < $('#simplexTable tr').length; i++) {
        column = 0;
        row++;
        goSimplexTable[i] = [];
        for (let j = 0; j < $('#simplexTable tr:last-child td').length; j++) {
            goSimplexTable[i][j] = $(`#simplexTable tr:nth-child(${i+1}) td:nth-child(${j+1})`).text();
            column++;
        }
    }
    $('#work').append(`<p id='workStep${stepsTable}'>Шаг: ${stepsTable}</p>`);
    $('#work').append(`<table id='work${stepsTable}'></table>`);
    let min = [];
    for (let i = 0; i < column; i++) {
        min[i] = 0;
    }
    for (let i = 0; i < row; i++) {
        $('#work table:last-child').append(`<tr></tr>`);
        for (let j = 0; j < column; j++) {
            if (FractionNumber.smaller(goSimplexTable[row-1][j]) && FractionNumber.bigger(goSimplexTable[i][j])) {
                $('#work table tr:last-child').append(`<td class='get' onclick="letsGo(${i}, ${j})">${goSimplexTable[i][j]}</td>`);
                setTimeout(() => {
                    letsGo(i,j);
                }, 1000);
            }else{
                $('#work table tr:last-child').append(`<td>${goSimplexTable[i][j]}</td>`);
            }
        }
    }
});

function showTable() {
    for (let z = 1; z < row; z++) {
        for (let x = 1; x < column; x++) {
            goSimplexTable[z][x] = FractionNumber.optimaze(goSimplexTable[z][x]); 
        }
    }
    $('#work').append(`<p id='workStep${stepsTable}'>Шаг: ${stepsTable}</p>`);
    $('#work').append(`<table id='work${stepsTable}'></table>`);
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < column; j++) {
            FractionNumber.optimaze(goSimplexTable[i][j]);
        }
    }
    // TODO ДОДЕЛАТЬ РЕАЛИЗАЦИЮ ПРАВИЛЬНОГО ВЫВОДА!!!!!!!!!!!!!!!!!!!!!!!!!!
    // for (let i = 0; i < row; i++) {
    //     $('#work table:last-child').append(`<tr></tr>`);
    //     for (let j = 0; j < column; j++) {
    //         if (FractionNumber.smaller(goSimplexTable[row-1][j]) && FractionNumber.bigger(goSimplexTable[i][j])) {
    //             $('#work table:last-child tr:last-child').append(`<td class='get' onclick="letsGo(${i}, ${j})">${goSimplexTable[i][j]}</td>`);
    //         }else{
    //             $('#work table:last-child tr:last-child').append(`<td>${goSimplexTable[i][j]}</td>`);
    //         }
    //     }
    // }

    for (let i = 0; i < row; i++) {
        $('#work table:last-child').append(`<tr></tr>`);
        for (let j = 0; j < column; j++) {
            $('#work table:last-child tr:last-child').append(`<td>${goSimplexTable[i][j]}</td>`);
        }
    }


    for (let i = 1; i < column1 - 1; i++) {
        let minSumm = [0,0];
        summ = `10000000000000`;
        for (let j = 1; j < row1 - 1; j++) {
            if (FractionNumber.bigger(goSimplexTable[j][i]) && FractionNumber.smallerTwo(FractionNumber.fractionDivision(goSimplexTable[j][column1 - 1], goSimplexTable[j][i]), summ) && FractionNumber.smaller(goSimplexTable[row1 - 1][i])) {
                minSumm[0] = j;
                minSumm[1] = i;
                summ = FractionNumber.fractionDivision(goSimplexTable[j][column1 - 1], goSimplexTable[j][i]);
            }
        }
        if (minSumm[0] == 0 && minSumm[1] == 0) {
            continue;
        }else{
            $(`#work table:last-child tr:nth-child(${minSumm[0] + 1}) td:nth-child(${minSumm[1] + 1})`).addClass('get').attr('onclick', `letsGo(${minSumm[0]}, ${minSumm[1]})`);
        }
    }

    
    $('#work').append(`<p id="workBack${stepsTable}" onclick="backStep()"'>Отменить шаг</p>`);
}

function backStep() { 
    for (let z = 0; z < row; z++) {
        for (let x = 0; x < column; x++) {
            goSimplexTable[z][x] = arrSimplexTable[stepsTable-1][z][x]; 
        }
    }
    $(`#workStep${stepsTable}`).detach();
    $(`#work${stepsTable}`).detach();
    $(`#workBack${stepsTable}`).detach();
    arrSimplexTable[stepsTable-1] = '';
    stepsTable--;
};

function letsGo(i,j) {
    for (let z = 0; z < row; z++) {
        goSimplexTableCopy[z] = [];
        for (let x = 0; x < column; x++) {
            goSimplexTableCopy[z][x] = ''; 
        }
    }
    for (let z = 0; z < row; z++) {
        for (let x = 0; x < column; x++) {
            goSimplexTableCopy[z][x] = goSimplexTable[z][x]; 
        }
    }
    arrSimplexTable[stepsTable] = [];
    for (let z = 0; z < row; z++) {
        arrSimplexTable[stepsTable][z] = [];
        for (let x = 0; x < column; x++) {
            arrSimplexTable[stepsTable][z][x] = goSimplexTable[z][x]; 
        }
    }
    // замена Х
    let a = '';
    a = goSimplexTable[0][j];
    goSimplexTable[0][j] = goSimplexTable[i][0];
    goSimplexTable[i][0] = a;

    // замена столбца
    for (let z = 1; z < row; z++) {
        if (z != i) {
            goSimplexTable[z][j] = FractionNumber.Minus(FractionNumber.fractionDivision(goSimplexTableCopy[z][j], goSimplexTableCopy[i][j])); 
        }
    }
    // Замена строки
    for (let x = 1; x < column; x++) {
        if (x != j) {
            goSimplexTable[i][x] = FractionNumber.fractionDivision(goSimplexTableCopy[i][x], goSimplexTableCopy[i][j]);
        }
    }
    goSimplexTable[i][j] = FractionNumber.fractionDivision('1', goSimplexTableCopy[i][j]);

    for (let z = 1; z < row; z++) {
        for (let x = 1; x < column; x++) {
            if (z != i && x != j) {
                goSimplexTable[z][x] =  FractionNumber.fractionDivision(FractionNumber.fractionMinus(FractionNumber.fractionMultiplication(goSimplexTableCopy[z][x],goSimplexTableCopy[i][j]), FractionNumber.fractionMultiplication(goSimplexTableCopy[z][j], goSimplexTableCopy[i][x])), goSimplexTableCopy[i][j]);
            }
        }
    }
    stepsTable++;
    showTable();
    if (AutoGo) {
        for (let i = 0; i < row; i++) {
            for (let j = 0; j < column; j++) {
                if (FractionNumber.smaller(goSimplexTable[row-1][j]) && FractionNumber.bigger(goSimplexTable[i][j])) {
                    setTimeout(() => {
                        letsGo(i,j);
                    }, 500);
                }
            }
        }
    }
}
let string = '2/0';
console.log(pattern.test(string) || pattern1.test(string));


