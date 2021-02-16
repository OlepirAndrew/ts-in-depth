/* eslint-disable no-var*/
// 06.01
var Utility;
(function (Utility) {
    var Feez;
    (function (Feez) {
        function calculateLateFee(daysLate) {
            return daysLate * 0.25;
        }
        Feez.calculateLateFee = calculateLateFee;
    })(Feez = Utility.Feez || (Utility.Feez = {}));
    function maxBooksAllowed(age) {
        return age < 12 ? 4 : 10;
    }
    Utility.maxBooksAllowed = maxBooksAllowed;
    function privateFunc() {
        console.log('This is private function');
    }
})(Utility || (Utility = {}));
/// <reference path="utility-functions.ts"/>
var n = Utility.maxBooksAllowed(50);
console.log(n);
var util = Utility.Feez;
var x = util.calculateLateFee(22);
console.log(x);
