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
