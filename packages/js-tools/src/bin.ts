import { run } from '@oclif/command';
import * as flush from '@oclif/command/flush';
import { handle } from '@oclif/errors';

run().then(flush, handle);
