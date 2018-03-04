describe('Routing Test', function(){
    it('should show teams on the first page', function(){
        browser.get('/');

        var rows = element.all(
            by.repeater('team in teamListCtrl.teams'));
        expect(rows.count()).toEqual(5);

        var firstRowRank = element(
            by.repeater('team in teamListCtrl.teams')
            .row(0).column('team.rank')
        );

        var firstRowName = element(
            by.repeater('team in teamListCtrl.teams')
            .row(0).column('team.name')
        );

        expect(firstRowRank.getText()).toEqual('1');
        expect(firstRowName.getText()).toEqual('Spain');

        var lastRowRank = element(
            by.repeater('team in teamListCtrl.teams')
            .row(4).column('team.rank')
        );

        var lastRowName = element(
            by.repeater('team in teamListCtrl.teams')
            .row(4).column('team.name')
        );

        expect(lastRowRank.getText()).toEqual('5');
        expect(lastRowName.getText()).toEqual('Uruguay');

        expect(element(by.css('.login-link')).isDisplayed())
            .toBe(true);
        expect(element(by.css('.logout-link')).isDisplayed())
            .toBe(false);

    });

    it('should allow logging in', function(){
        browser.get('#/login');

        var username = element(
            by.model('loginCtrl.user.username')
        );

        var password = element(
            by.model('loginCtrl.user.password')
        );

        username.sendKeys('admin');
        password.sendKeys('admin');

        element(by.css('.btn.btn-success')).click();

        expect(browser.getCurrentUrl())
            .toEqual('http://localhost:8000/#/');

        expect(element(by.css('.login-link')).isDisplayed()).toBe(false);
        expect(element(by.css('.logout-link')).isDisplayed()).toBe(true);
    });
});