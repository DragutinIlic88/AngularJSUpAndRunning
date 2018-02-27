angular.module('stockMarketApp')
    .directive('validZip',[function(){
        var zipCodeRegex = /^\d{5}(?:[-\s]\d{4})?$/g;
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function($scope, $element, $attrs, ngModelCtrl){

                //DOM Update --> Model update
                //added new parser to chain of parsers
                ngModelCtrl.$parsers.unshift(function(value){
                    //performing validity check
                    var valid = zipCodeRegex.test(value);
                    //set validity to ngModel controller
                    ngModelCtrl.$setValidity('validZip',valid);
                    //return correct value or undefined
                    return valid ? value: undefined;
                });

                //Handle Model Update --> DOMs
                //AngularJS runs data through formatting step
                ngModelCtrl.$formatters.unshift(function(value){
                    //seting validity to ngModel controller and returning validity
                    ngModelCtrl.$setValidity('validZip',zipCodeRegex.test(value));
                    return value;
                })
            }
        };
    }])