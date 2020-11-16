import { run } from '@oclif/command';
import { handle } from '@oclif/errors';
import flush = require('@oclif/command/flush');

run().then(flush, handle);
