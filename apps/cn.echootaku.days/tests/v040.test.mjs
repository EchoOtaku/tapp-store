import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const source = fs.readFileSync(new URL('../main.js', import.meta.url), 'utf8');
const sandbox = { console, Date, Intl, JSON, Math, Number, Object, Array, String, Boolean, RegExp, Promise, setTimeout, clearTimeout };
vm.createContext(sandbox);
vm.runInContext(source, sandbox, { filename: 'main.js' });

test('normalizes supported reminder offsets and time', () => {
  const events = sandbox.daysNormalizeEvents([{ id: 'one', title: 'Test', date: '2027-01-02', reminders: { enabled: true, offsets: [7, 1, 7, 99], time: '08:30' } }]);
  assert.equal(events.length, 1);
  assert.deepEqual(Array.from(events[0].reminders.offsets), [7, 1]);
  assert.equal(events[0].reminders.time, '08:30');
  assert.equal(events[0].reminders.enabled, true);
});

test('rejects impossible calendar dates instead of rolling them forward', () => {
  assert.equal(sandbox.daysParseDate('2027-02-29'), null);
  assert.equal(sandbox.daysParseDate('2027-02-31'), null);
  assert.equal(sandbox.daysParseDate('2028-02-29')?.getDate(), 29);
});

test('preserves reminders for legacy events after invalid records are filtered', () => {
  const events = sandbox.daysNormalizeEvents([
    { title: 'Invalid', date: '2027-02-31' },
    { title: 'Legacy', date: '2027-03-02', reminders: { enabled: true, offsets: [1], time: '08:30' } },
  ]);
  assert.equal(events.length, 1);
  assert.equal(events[0].id, 'legacy-0');
  assert.equal(events[0].reminders.enabled, true);
  assert.deepEqual(Array.from(events[0].reminders.offsets), [1]);
});

test('backup parser rejects foreign formats and preserves valid reminders', () => {
  assert.throws(() => sandbox.daysParseBackup('{"format":"other"}'));
  const backup = { format: 'cn.echootaku.days.backup', schemaVersion: 1, data: { events: [{ id: 'one', title: 'Test', date: '2027-01-02', reminders: { enabled: true, offsets: [0], time: '09:00' } }], categories: [], theme: {} } };
  const parsed = sandbox.daysParseBackup(JSON.stringify(backup));
  assert.equal(parsed.events[0].reminders.enabled, true);
  assert.deepEqual(Array.from(parsed.events[0].reminders.offsets), [0]);
  backup.data.events.push({ id: 'one', title: 'Duplicate', date: '2027-02-02' });
  assert.throws(() => sandbox.daysParseBackup(JSON.stringify(backup)));
});

test('merge uses imported event ids but keeps the current theme', () => {
  const currentTheme = sandbox.daysNormalizeTheme({ preset: 'ocean' });
  const incomingTheme = sandbox.daysNormalizeTheme({ preset: 'forest' });
  const merged = sandbox.daysMergeBackup({ events: [{ id: 'same', title: 'Old' }], categories: [], theme: currentTheme }, { events: [{ id: 'same', title: 'New' }], categories: [], theme: incomingTheme });
  assert.equal(merged.events.length, 1);
  assert.equal(merged.events[0].title, 'New');
  assert.equal(merged.theme.preset, 'ocean');
});

test('annual occurrence clamps leap day in non-leap years', () => {
  const date = sandbox.daysOccurrenceInYear({ date: '2024-02-29' }, 2025);
  assert.equal(date.getFullYear(), 2025);
  assert.equal(date.getMonth(), 1);
  assert.equal(date.getDate(), 28);
});

test('one-time reminder applies the selected local time and offset', () => {
  const at = sandbox.daysReminderDate({ date: '2099-06-20', annual: false, reminders: { time: '08:15' } }, 7);
  assert.equal(at.getFullYear(), 2099);
  assert.equal(at.getMonth(), 5);
  assert.equal(at.getDate(), 13);
  assert.equal(at.getHours(), 8);
  assert.equal(at.getMinutes(), 15);
});
