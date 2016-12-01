import test from 'ava';
import execa from 'execa';

test('decrypt', async t => {
  const dlc = await execa('bin/decrypt-dlc', ['test/test.dlc', '-o', 'test/urls.txt']);
  t.regex(dlc.stdout, /Successfully/);
});
