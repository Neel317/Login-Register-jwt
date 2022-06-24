const controller = require('./controllers/main');

test('Checking age function', () => {
  expect(controller.getAge('2001-07-31')).toBe(20);
})