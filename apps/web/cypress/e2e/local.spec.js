context('Check for console output', function () {
  it('should display the correct text', function () {
    cy.origin('http://localhost:3000', () => {
      cy.visit('/');
      cy.get('label').should(
        'contain',
        'To upload data - click on the text or drag a file into the area'
      );
    });
  });
});
