describe('Stock Widget Directive Rendering', function(){
    beforeEach(module('stockMarketApp'));
    var compile, mockBackend, rootScope;

    //Get the $compile service injected into our test
    beforeEach(inject(function($compile, $httpBackend, $rootScope){
        compile = $compile;
        mockBackend = $httpBackend;
        rootScope = $rootScope;
    }));

    it('should render HTML based on scope correctly', function(){
        //Create and setup our scope with necessary variables
        var scope = rootScope.$new();
        scope.myStock = {
            name: 'Best Stock',
            price: 100,
            previous: 200
        };

        scope.title = 'the best';

        //determint template to load because our server is mocked out
        mockBackend.expectGET('stock.html').respond(
            '<div ng-bind="stockTitle"></div>' +
            '<div ng-bind="stockData.price"></div>'
        );

        //instantiate an instance of our directive using $compile service
        var element = compile('<div stock-widget' +
            ' stock-data="myStock"' +
            ' stock-title="This is {{title}}"></div>')(scope);

        scope.$digest();
        mockBackend.flush();

        //expectations for rendering and behaviour
        expect(element.html()).toEqual(
            '<div ng-bind="stockTitle" class="ng-binding">' +
            'This is the best' +
            '</div>' +
            '<div ng-bind="stockData.price" class="ng-binding">' +
            '100' +
            '</div>'); 
        
    });
});