describe('ItemCtrl1 With global mock', function(){
    var ctrl;
    beforeEach(module('notesApp1'));
    beforeEach(module('notesApp1Mocks'));

    beforeEach(inject(function($controller){
        ctrl = $controller('ItemCtrl1');
    }));

    it('should load mocked out items', function(){
        expect(ctrl.items).toEqual([{id: 1, label: 'Mock'}]);
    });
});