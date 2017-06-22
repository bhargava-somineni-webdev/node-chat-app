const expect = require('expect');
var { generateMessage } = require('./message');

describe('generatMessage', () => {

    it('should generate correct message object', () => {
        var from = 'demuser';
        var text = 'hi! how are ya!';

        var message = generateMessage(from, text);
        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({ from, text });
        //expect(message.from).toBe(from);
        //expect(message.text).toBe(text);
    });

});