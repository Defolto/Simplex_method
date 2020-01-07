// Класс для дробных чисел
class FractionNumber{
    static fractionMultiplication(i,j){
        let numerator1 = '';
        let denominator1 = '';
        let numerator2 = '';
        let denominator2 = '';
        let flag = false;

        for (let a = 0; a < String(i).length; a++) {
            if(i[a] == '/'){
                numerator1 = Number(numerator1);
                flag = true;
                continue;
            }
            if (flag) {
                denominator1 += i[a];
            }else{
                numerator1 += i[a]; 
            }
        }

        if (denominator1 == '') {
            denominator1 = 1;
        }else{
            denominator1 = Number(denominator1);
        }

        flag = false;
        for (let a = 0; a < String(j).length; a++) {
            if(j[a] == '/'){
                numerator2 = Number(numerator2);
                flag = true;
                continue;
            }
            if (flag) {
                denominator2 += j[a];
            }else{
                numerator2 += j[a]; 
            }
        }
        if (denominator2 == '') {
            denominator2 = 1;
        }else{
            denominator2 = Number(denominator2);
        }
        numerator1 = Number(numerator1);
        numerator2 = Number(numerator2);
        if (denominator1*denominator2 == 0) {
            alert(`Невозможно умножить: ${i} и ${j}! Начните всё сначала:)`);
            return;
        }

        if (numerator1 < 0 && denominator1 < 0) {
            numerator1 = numerator1 * -1;
            denominator1 = denominator1 * -1;
        }
        if (numerator2 < 0 && denominator2 < 0) {
            numerator2 = numerator2 * -1;
            denominator2 = denominator2 * -1;
        }
        if (numerator1*numerator2 < 0 && denominator1*denominator2 < 0) {
            return `${(numerator1*numerator2)*(-1)}/${(denominator1*denominator2)*(-1)}`;
        }

        if (((numerator1*numerator2)%(denominator1*denominator2)) == 0) {
            return `${(numerator1*numerator2)/(denominator1*denominator2)}`;
        }
        else{
            return `${numerator1*numerator2}/${denominator1*denominator2}`;
        }
    }
    static fractionDivision(i,j){

        let numerator1 = '';
        let denominator1 = '';
        let numerator2 = '';
        let denominator2 = '';
        let flag = false;

        for (let a = 0; a < String(i).length; a++) {
            if(i[a] == '/'){
                numerator1 = Number(numerator1);
                flag = true;
                continue;
            }
            if (flag) {
                denominator1 += i[a];
            }else{
                numerator1 += i[a]; 
            }
        }

        if (denominator1 == ``) {
            denominator1 = 1
        }else{
            denominator1 = Number(denominator1);
        }


        flag = false;
        for (let a = 0; a < String(j).length; a++) {
            if(j[a] == '/'){
                numerator2 = Number(numerator2);
                flag = true;
                continue;
            }
            if (flag) {
                denominator2 += j[a];
            }else{
                numerator2 += j[a]; 
            }
        }

        if (denominator2 == 0) {
            denominator2 = 1;
        }else{
            denominator2 = Number(denominator2);
        }

        numerator1 = Number(numerator1);
        numerator2 = Number(numerator2);

        if (denominator1*numerator2 == 0) {
            alert(`Невозможно умножить: ${i} и ${j}! Начните всё сначала:)`);
            return;
        }

        if (numerator1 < 0 && denominator1 < 0) {
            numerator1 = numerator1 * -1;
            denominator1 = denominator1 * -1;
        }
        if (numerator2 < 0 && denominator2 < 0) {
            numerator2 = numerator2 * -1;
            denominator2 = denominator2 * -1;
        }
        if (numerator1*denominator2 < 0 && denominator1*numerator2 < 0) {
            return `${(numerator1*denominator2)*(-1)}/${(denominator1*numerator2)*(-1)}`;
        }

        if (((numerator1*denominator2)%(denominator1*numerator2)) == 0) {
            return `${(numerator1*denominator2)/(denominator1*numerator2)}`;
        }
        else{
            return `${numerator1*denominator2}/${denominator1*numerator2}`;
        }
    }

    nok(a,b) {
        var constA = a;
        var constB = b;
        while (a !=b) {
            if (a < b) {
                a = a + constA;
            }else{
                b = b + constB;
            }
        }
        return a;
    }

    static fractionPlus(i,j){

        let numerator1 = '';
        let denominator1 = '';
        let numerator2 = '';
        let denominator2 = '';
        let flag = false;
        let a = 0;

        for (a = 0; a < String(i).length; a++) {
            if(i[a] == '/'){
                numerator1 = Number(numerator1);
                flag = true;
                continue;
            }
            if (flag) {
                denominator1 += i[a];
            }else{
                numerator1 += i[a]; 
            }
        }

        if (denominator1 == 0) {
            denominator1 = 1
        }else{
            denominator1 = Number(denominator1);
        }

        flag = false;
        for (a = 0; a < String(j).length; a++) {
            if(j[a] == '/'){
                numerator2 = Number(numerator2);
                flag = true;
                continue;
            }
            if (flag) {
                denominator2 += j[a];
            }else{
                numerator2 += j[a]; 
            }
        }
        if (denominator2 == 0) {
            denominator2 = 1
        }else{
            denominator2 = Number(denominator2);
        }
        numerator1 = Number(numerator1);
        numerator2 = Number(numerator2);

        if (numerator1 >= 0 && denominator1 < 0) {
            numerator1 = numerator1 * (-1);
            denominator1 = denominator1 * (-1);
        }

        if (numerator2 >= 0 && denominator2 < 0) {
            numerator2 = numerator2 * (-1);
            denominator2 = denominator2 * (-1);
        }

        if (numerator1 < 0 && denominator1 < 0) {
            numerator1 = numerator1 * -1;
            denominator1 = denominator1 * -1;
        }
        if (numerator2 < 0 && denominator2 < 0) {
            numerator2 = numerator2 * -1;
            denominator2 = denominator2 * -1;
        }

        let a1 = denominator1;
        let b1 = denominator2;
        while (a1 !=b1) {
            if (a1 < b1) {
                a1 = a1 + denominator1;
            }else{
                b1 = b1 + denominator2;
            }
        }
        if (numerator1*(a1/denominator1)+numerator2*(a1/denominator2) == 0) {
            return '0';
        }else{
            return `${numerator1*(a1/denominator1)+numerator2*(a1/denominator2)}/${a1}`;
        }
    }
    static fractionMinus(i,j){

        let numerator1 = '';
        let denominator1 = '';
        let numerator2 = '';
        let denominator2 = '';
        let flag = false;

        for (let a = 0; a < String(i).length; a++) {
            if(i[a] == '/'){
                numerator1 = Number(numerator1);
                flag = true;
                continue;
            }
            if (flag) {
                denominator1 += i[a];
            }else{
                numerator1 += i[a]; 
            }
        }

        if (denominator1 == 0) {
            denominator1 = 1
        }else{
            denominator1 = Number(denominator1);
        }
        numerator1 = Number(numerator1);
        flag = false;
        for (let a = 0; a < String(j).length; a++) {
            if(j[a] == '/'){
                numerator2 = Number(numerator2);
                flag = true;
                continue;
            }
            if (flag) {
                denominator2 += j[a];
            }else{
                numerator2 += j[a]; 
            }
        }
        if (denominator2 == 0) {
            denominator2 = 1
        }else{
            denominator2 = Number(denominator2);
        }
        numerator2 = Number(numerator2);

        if (numerator1 >= 0 && denominator1 < 0) {
            numerator1 = numerator1 * (-1);
            denominator1 = denominator1 * (-1);
        }

        if (numerator2 >= 0 && denominator2 < 0) {
            numerator2 = numerator2 * (-1);
            denominator2 = denominator2 * (-1);
        }

        if (numerator1 < 0 && denominator1 < 0) {
            numerator1 = numerator1 * -1;
            denominator1 = denominator1 * -1;
        }
        if (numerator2 < 0 && denominator2 < 0) {
            numerator2 = numerator2 * -1;
            denominator2 = denominator2 * -1;
        }

        var a = denominator1;
        var b = denominator2;
        while (a !=b) {
            if (a < b) {
                a = a + denominator1;
            }else{
                b = b + denominator2;
            }
        }

        return `${numerator1*(a/denominator1)-numerator2*(a/denominator2)}/${a}`;
    }

    static Minus(i){
        let numerator1 = '';
        let denominator1 = '';
        let flag = false;

        for (let a = 0; a < String(i).length; a++) {
            if(i[a] == '/'){
                numerator1 = Number(numerator1);
                flag = true;
                continue;
            }
            if (flag) {
                denominator1 += i[a];
            }else{
                numerator1 += i[a]; 
            }
        }

        if (denominator1 == ``) {
            denominator1 = 1
        }else{
            denominator1 = Number(denominator1);
        }
        numerator1 = Number(numerator1);

        if (denominator1 == 0) {
            alert(`Ошибка: ноль в знаменатиле`);
            return;
        }

        if (numerator1 == 0) {
            return `0`;
        }


        if (numerator1 < 0) {
            numerator1 = -numerator1;
        }else if (denominator1 < 0) {
            denominator1 = -denominator1;
        }else{
            numerator1 = -numerator1
        }
        
        return `${numerator1}/${denominator1}`;
    }

    static optimaze(i){
        let numerator1 = '';
        let denominator1 = '';
        let flag = false;
        let simpleNumber = [2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53];
        simpleNumber = simpleNumber.reverse();

        for (let a = 0; a < String(i).length; a++) {
            if(i[a] == '/'){
                numerator1 = Number(numerator1);
                flag = true;
                continue;
            }
            if (flag) {
                denominator1 += i[a];
            }else{
                numerator1 += i[a]; 
            }
        }

        if (denominator1 == '') {
            denominator1 = 1
        }else{
            denominator1 = Number(denominator1);
        }

        if (numerator1 == 0) {
            return `0`;
        }else{
            numerator1 = Number(numerator1);
        }

        if (numerator1 == 0 && denominator1 == 0) {
            alert(`Попытка деления двух нулей`);
            return;
        }

        for (let j = 0; j < simpleNumber.length; j++) {
            while (((numerator1%simpleNumber[j]) == 0) && (denominator1%simpleNumber[j] == 0)) {
                numerator1 = numerator1/simpleNumber[j];
                denominator1 = denominator1/simpleNumber[j];
            }
        }

        if (denominator1 < 0 && numerator1 < 0) {
            denominator1 = denominator1 * (-1);
            numerator1 = numerator1 * (-1);
        }

        if (denominator1 == 0) {
            alert(`Ошибка оптимизации: ноль в знаменатиле`);
            return;
        }

        if (numerator1 == 0) {
            return `0`;
        }

        if (denominator1 == 1) {
            return `${numerator1}`;
        }else{
            return `${numerator1}/${denominator1}`
        }
    }

    static smaller(i){
        let numerator1 = '';
        let denominator1 = '';
        let flag = false;

        for (let a = 0; a < String(i).length; a++) {
            if(i[a] == '/'){
                numerator1 = Number(numerator1);
                flag = true;
                continue;
            }
            if (flag) {
                denominator1 += i[a];
            }else{
                numerator1 += i[a]; 
            }
        }

        if (denominator1 == 0) {
            denominator1 = 1
        }else{
            denominator1 = Number(denominator1);
        }
        numerator1 = Number(numerator1);

        if (numerator1<0 && denominator1 < 0) {
            return false;
        }else if (denominator1 < 0) {
            return true;
        }else if (numerator1 < 0) {
            return true;
        }else{
            return false;
        }
    }

    static bigger(i){
        let numerator1 = '';
        let denominator1 = '';
        let flag = false;

        for (let a = 0; a < String(i).length; a++) {
            if(i[a] == '/'){
                numerator1 = Number(numerator1);
                flag = true;
                continue;
            }
            if (flag) {
                denominator1 += i[a];
            }else{
                numerator1 += i[a]; 
            }
        }

        if (denominator1 == 0) {
            denominator1 = 1
        }else{
            denominator1 = Number(denominator1);
        }
        numerator1 = Number(numerator1);

        if (numerator1<0 && denominator1 < 0) {
            return true;
        }else if (denominator1 > 0 && numerator1 > 0) {
            return true;
        }else{
            return false;
        }
    }
    static smallerTwo(i,j){

        let numerator1 = '';
        let denominator1 = '';
        let numerator2 = '';
        let denominator2 = '';
        let flag = false;
        let a = 0;

        for (a = 0; a < String(i).length; a++) {
            if(i[a] == '/'){
                numerator1 = Number(numerator1);
                flag = true;
                continue;
            }
            if (flag) {
                denominator1 += i[a];
            }else{
                numerator1 += i[a]; 
            }
        }

        if (denominator1 == 0) {
            denominator1 = 1
        }else{
            denominator1 = Number(denominator1);
        }

        flag = false;
        for (a = 0; a < String(j).length; a++) {
            if(j[a] == '/'){
                numerator2 = Number(numerator2);
                flag = true;
                continue;
            }
            if (flag) {
                denominator2 += j[a];
            }else{
                numerator2 += j[a]; 
            }
        }
        if (denominator2 == 0) {
            denominator2 = 1
        }else{
            denominator2 = Number(denominator2);
        }
        numerator1 = Number(numerator1);
        numerator2 = Number(numerator2);
        if(denominator1 < 0){
            numerator1 = numerator1 * -1;
            denominator1 = denominator1 * -1;
        }
        if(denominator2 < 0){
            numerator2 = numerator2 * -1;
            denominator2 = denominator2 * -1;
        }
        let a1 = denominator1;
        let b1 = denominator2;
        while (a1 !=b1) {
            if (a1 < b1) {
                a1 = a1 + denominator1;
            }else{
                b1 = b1 + denominator2;
            }
        }
        if (numerator1*(a1/denominator1) < numerator2*(a1/denominator2)) {
            return true;
        }else{
            return false;
        }
    }
}
