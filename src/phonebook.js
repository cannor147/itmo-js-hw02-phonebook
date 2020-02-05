'use strict';

/**
 * Если вы решили сделать дополнительное задание и реализовали функцию importFromDsv,
 * то выставьте значение переменной isExtraTaskSolved в true.
 */
const isExtraTaskSolved = false;

/**
 * Телефонная книга
 */
const phoneBook = {};

const PHONE_VALIDATOR = /^(\d\d\d)(\d\d\d)(\d\d)(\d\d)$/;

function ensureString(argument) {
  return typeof argument === 'string';
}
function ensurePhoneNumber(argument) {
  return ensureString(argument) && PHONE_VALIDATOR.test(argument);
}
function ensureNonEmptyString(argument) {
  return ensureString(argument) && argument !== '';
}
function ensureStringIfSpecified(argument) {
  return typeof argument === 'undefined' || ensureString(argument);
}
function ensureContact(phone, name, email) {
  return ensurePhoneNumber(phone) && ensureNonEmptyString(name) && ensureStringIfSpecified(email);
}

function toString(argument) {
  if (typeof argument === 'string') {
    return argument;
  } else if (typeof argument === 'undefined') {
    return '';
  }

  return argument.toString();
}
function formatPhone(phone) {
  return phone.replace(PHONE_VALIDATOR, '+7 ($1) $2-$3-$4');
}

/**
 * Добавление записи в телефонную книгу
 * @param {string} phone
 * @param {string} [name]
 * @param {string} [email]
 * @returns {boolean}
 */
function add(phone, name, email) {
  if (!ensureContact(phone, name, email)) {
    return false;
  }

  let added = false;
  if (!(phone in phoneBook)) {
    phoneBook[phone] = { name, email };
    added = true;
  }

  return added;
}

/**
 * Обновление записи в телефонной книге
 * @param {string} phone
 * @param {string} [name]
 * @param {string} [email]
 * @returns {boolean}
 */
function update(phone, name, email) {
  if (!ensureContact(phone, name, email)) {
    return false;
  }

  let updated = false;
  if (phone in phoneBook) {
    phoneBook[phone] = { name, email };
    updated = true;
  }

  return updated;
}

function internalFind(query) {
  let result = [];
  if (!ensureNonEmptyString(query)) {
    return result;
  } else if (query === '*') {
    result = Object.keys(phoneBook);
  } else {
    result = Object.keys(phoneBook).filter(
      phone =>
        phone.includes(query) ||
        phoneBook[phone]['name'].includes(query) ||
        toString(phoneBook[phone]['email']).includes(query)
    );
  }

  return result;
}

/**
 * Поиск записей по запросу в телефонной книге
 * @param {string} query
 * @returns {string[]}
 */
function find(query) {
  if (!ensureString(query)) {
    throw new TypeError('Query should be a string.');
  }

  return internalFind(query)
    .map(phone => ({
      phone: phone,
      name: phoneBook[phone]['name'],
      email: phoneBook[phone]['email']
    }))
    .sort((a, b) => a.name.localeCompare(b.name))
    .map(contact =>
      toString(contact.name).concat(
        ', ',
        toString(formatPhone(contact.phone)),
        toString(contact.email !== undefined ? ', ' + contact.email : '')
      )
    );
}

/**
 * Удаление записей по запросу из телефонной книги
 * @param {string} query
 * @returns {number}
 */
function findAndRemove(query) {
  if (!ensureString(query)) {
    throw new TypeError('Query should be a string.');
  } else if (!ensureNonEmptyString(query)) {
    return 0;
  }

  const deletingPhones = internalFind(query);
  deletingPhones.map(function(phone) {
    delete phoneBook[phone];
  });

  return deletingPhones.length;
}

/**
 * Импорт записей из dsv-формата
 * @param {string} dsv
 * @returns {number} Количество добавленных и обновленных записей
 */
function importFromDsv(dsv) {}

module.exports = {
  add,
  update,
  find,
  findAndRemove,
  importFromDsv,

  isExtraTaskSolved
};
