angular.module('sliderApp')
    .directive('noUiSlider',[function(){
        return {
            restrict: 'E',
            //ngModel directive must be use on the same element as noUiSlider directive
            //possible prefixes: ? - null if ngModel is not used , ^- ngModel is used in
            // parent element 
            require: 'ngModel',
            link: function($scope,$element,$attrs, ngModelCtrl){
                //creating noUiSlider with his constructor
                //we can call constructor on our element, because jQuery integrates into AngularJS
                $element.noUiSlider({
                    start: 0,
                    range: {
                        min: Number($attrs.rangeMin),
                        max: Number($attrs.rangeMax)
                    }
                });

                //when data changes within AngularJS we can update UI component
                //by overiding $render method of ngModel
                ngModelCtrl.$render = function(){
                    //latest value is available in $viewValue variable
                    $element.val(ngModelCtrl.$viewValue);
                };

                //when data changes outside AngularJS, we update AngularJS with new value
                // call $setViewValue function with new value inside set listener.
                $element.on('set', function(args){
                    //if component is outside the AngularJS life cycle, we need to manually
                    //call $scope.$apply function which takes optional function as argument
                    //and ensures that digest cycle is triggered.
                    $scope.$apply(function(){
                        ngModelCtrl.$setViewValue($element.val());
                    });
                });
            }
        };
    }])