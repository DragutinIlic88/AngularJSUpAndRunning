angular.module('googleChartApp')
    .factory('googleChartLoaderPromise',
        ['$q', '$rootScope', '$window',
        function($q, $rootScope, $window){
            //deferred object - async task that will be fulfilled in the future
            var deferred = $q.defer();

            //load visualization library once at load
            $window.google.load('visualization','1',{
                packages: ['corechart'],
                callback: function(){
                    //because callback is called outsid life cycle of AngularJS
                    //we need to wrap it in a $rootScope.$apply
                    $rootScope.$apply(function(){
                        deferred.resolve();
                    });
                }
            });

            //we return promise so it can be chain when load is complete
            return deferred.promise;
 }]);