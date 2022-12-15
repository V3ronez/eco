import Content from './content';

test('it should be able to create a notification content', () => {
  expect(
    () => new Content('Voce tem uma nova mensagem de amizade'),
  ).toBeTruthy();
});

test('it should not to be able to create a notification content with less 5 characters', () => {
  expect(() => new Content('aaa')).toThrow();
});

test('it should not be able to create a notification content with more then 240 characters', () => {
  expect(() => new Content('a'.repeat(241))).toThrow();
});
