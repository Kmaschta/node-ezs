import { Transform } from 'stream';

export default class Output extends Transform {
    constructor(options) {
        super({
            ...options,
            writableObjectMode: true,
            readableObjectMode: false,
        });
    }

    _transform(chunk, encoding, done) {
        if (Buffer.isBuffer(chunk)) {
            this.push(chunk);
        } else if (typeof chunk === 'object') {
            this.push(Buffer.from(chunk.toString()));
        } else {
            this.push(Buffer.from(chunk));
        }
        done();
    }
}
