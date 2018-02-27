angular.module('dynamicFormApp')
    .directive('formElement', [function(){
        return {
            restrict: 'E',
            //form-element require to be child of form
            require: '^form',
            //form-element has unique scope so functions we added are restricted
            //and do not overide global variables and functions
            scope: true,
            //compile function is executed before scope is available
            //so it does not get scope injected in
            //compile is only used when we need to do major trasforamtions at runtime
            compile: function($element, $attrs){

                //extracting and parsing form-element
                //and picking out validation rules, messages, existing attributes
                var expectedInputAttrs = {
                    'required': 'required',
                    'ng-minlength': 'ngMinlength',
                    'ng-pattern': 'ngPattern'
                };

                var validationKeys = $element.find('validation');
                var presentValidationKeys = {};
                var inputName = $attrs.name;
                angular.forEach(validationKeys, function(validationKey) {
                validationKey = angular.element(validationKey);
                presentValidationKeys[validationKey.attr('key')] =
                validationKey.text();
                });

                //generation of html that will be used for directive
                //because we will be adding AngularJS directives dynamically
                //we are doing this in the compile
                var elementHtml = '<div>' +
                    '<label>' + $attrs.label + '</label>';
                //we add input tag with ng-model
                elementHtml += '<input type="' + $attrs.type +
                        '" name="' + inputName +
                        '" ng-model="' + $attrs.bindTo + '"';

                //we add all validations
                $element.removeAttr('type');
                $element.removeAttr('name');
                for (var i in expectedInputAttrs) {
                    if ($attrs[expectedInputAttrs[i]] !== undefined) {
                        elementHtml += ' ' + i + '="' +
                        $attrs[expectedInputAttrs[i]] + '"';
                    }
                    $element.removeAttr(i);
                }
                elementHtml += '>';
                elementHtml +=
                    '<span ng-repeat="(key, text) in validators" ' +
                    ' ng-show="hasError(key)"' +
                    ' ng-bind="text"></span>';
                elementHtml += '</div>';
                //replacing existing content with new one
                $element.html(elementHtml);

                //returning postLink function
                //with validators array and hasError function
                return function($scope, $element, $attrs, formCtrl) {
                    $scope.validators = angular.copy(presentValidationKeys);
                    $scope.hasError = function(key) {
                        return !!formCtrl[inputName]['$error'][key];
                    };
                };
            }
        };
    }]);

    /*
    Angular global functions
        angular.forEach
        angular.fromJson
        angular.toJson
        angular.copy
        angular.equals
        angular.isObject
        angular.isArray
        angular.isFunction
        angular.isString
        angular.isNumber
        angular.isDate
    */