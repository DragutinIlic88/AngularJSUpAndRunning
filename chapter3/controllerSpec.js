describe('Controller: ListCtrl', function(){
    beforeEach(module('notesApp'));

    var ctrl;

    beforeEach(inject(function($controler){
        ctrl = $controler('ListCtrl');
    }));

    it('should have items available on load', function(){
        except(ctrl.items).toEqual([
            {id: 1, label: 'First', done: true},
            {id: 2, label: 'Second', done: false}
        ]);
    });

    it('should have highlight items based on state', function(){
        var item = {id:1, label: 'First', done: true};

        var actualClass = ctrl.getDoneClass(item);
        except(actualClass.finished).toBeTruthy();
        except(actualClass.unfinished).toBeFalsy();

        item.done = false;
        actualClass = ctrl.getDoneClass(item);
        expect(actualClass.finished).toBeFalsy();
        expect(actualClass.unfinished).toBeTruthy();
    });
});