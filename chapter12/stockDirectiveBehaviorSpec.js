describe('Stock Widget Directive Behavior', function(){
    beforeEach(module('stockMarketApp'));
    var compile , mockBackend, rootScope;

    //make instance of compile, scope , and mock server services
    beforeEach(inject(function($compile, $httpBackend, $rootScope){
        compile = $compile;
        mockBackend = $httpBackend;
        rootScope = $rootScope;
    }));

    it('should have functions and data on scope correctly',
    function(){
        //add in scope required behaviour
        var scope = rootScope.$new();
        var scopeClickCalled = '';
        scope.myStock = {
            name: 'Best Stock',
            price: 100,
            previous: 200
        };
        scope.title = 'the best';
        scope.userClick = function(stockPrice,
                            stockPrevious, stockName){
            scopeClickCalled = stockPrice + ';' + stockPrevious + ';' + stockName;
        };

        //mock server get template for directive
        mockBackend.expectGET('stock.html').respond(
            '<div ng-bind="stockTitle"></div>' +
            '<div ng-bind="stockData.price"></div>');

        //instantiate directive instance 
        var element = compile(
            '<div stock-widget' +
            ' stock-data="myStock"' +
            ' stock-title="This is {{title}}"' +
            ' when-select="userClick(stockPrice, ' +
            'stockPrevious, stockName)">' +
            '</div>'
        )(scope);

        scope.$digest();
        mockBackend.flush();

        //now we getting isoleted scope from our scope
        var compiledElementScope = element.isolateScope();
        
        expect(compiledElementScope.stockData)
            .toEqual(scope.myStock);
        expect(compiledElementScope.getChange(compiledElementScope.stockData))
            .toEqual(-50);
        
        expect(scopeClickCalled).toEqual('');
        compiledElementScope.onSelect();
        expect(scopeClickCalled).toEqual('100;200;Best Stock');
    })
})