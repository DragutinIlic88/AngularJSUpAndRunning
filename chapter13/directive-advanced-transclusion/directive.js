angular.module('stockMarketApp')
    .directive('simpleStockRepeat', [function(){
        return {
            restrict: 'A',
            //copy entire element along with directives present on it for transclusion
            transclude: 'element',
            //fourth argument is directive controllers
            //fifth argument is transclusion function generated when we use transclude key above
            //it is a constructor that allows us to create new instance of our template as many
            //times as needed; function takes optional scope if new is needed (or inherits
            // directive's scope) and mandatory clone linking function
            link: function($scope, $element, $attrs, ctrl, $transclude){
                var myArray = $scope.$eval($attrs.simpleStockRepeat);

                var container = angular.element(
                    '<div class="container"></div>');
                
                for( var i = 0; i < myArray.length; i++){
                    var instance = $transclude($scope.$new(),
                        function(clonedElement, newScope){
                            newScope.currentIndex = i;
                            newScope.stock = myArray[i];
                    });

                    container.append(instance);
                }

                $element.after(container);
            }
        }; 
    }]);