import test from 'ava';
import execa from 'execa';

const BIN_FILE = 'bin/decrypt-dlc';
const TEST_FILE = 'test/test.dlc';
const TEST_CONTAINER = 'https://raw.githubusercontent.com/sydev/decrypt-dlc/master/test/test.dlc';
const TEST_FILE_CORRUPTED = 'test/test_corrupted.dlc';
const TEST_CONTAINER_CORRUPTED = 'https://raw.githubusercontent.com/sydev/decrypt-dlc/master/test/test_corrupted.dlc'
const TEST_OUTPUT = 'test/urls.txt';


// decrypt local file
test('decrypt local file', async t => {
	const dlc = await execa(BIN_FILE, [TEST_FILE]);
  t.regex(dlc.stdout, /Urls stored at /);
});

test('decrypt local file with ouput parameter', async t => {
  const dlc = await execa(BIN_FILE, [TEST_FILE, '-o', TEST_OUTPUT]);
  t.regex(dlc.stdout, /Urls stored at /);
});


// decrypt remote container
test('decrypt remote container', async t => {
  const dlc = await execa(BIN_FILE, [TEST_CONTAINER]);
  t.regex(dlc.stdout, /Urls stored at /);
});

test('decrypt remote container with output parameter', async t => {
  const dlc = await execa(BIN_FILE, [TEST_CONTAINER, '-o', TEST_OUTPUT]);
  t.regex(dlc.stdout, /Urls stored at /);
});


// decrypt corrupted local file
test('decrypt corrupted local file', async t => {
	const { stdout } = await execa(BIN_FILE, [TEST_FILE_CORRUPTED]);
	t.regex(stdout, /fatal/);
});

// decrypt corrupted remote container
test('decrypt corrupted remote file', async t => {
	const { stdout } = await execa(BIN_FILE, [TEST_CONTAINER_CORRUPTED]);
	t.regex(stdout, /fatal/);
});
