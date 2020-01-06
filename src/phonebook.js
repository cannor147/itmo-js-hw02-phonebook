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

function isNonEmptyString(argument) {
  return typeof argument === 'string' && argument !== '';
}
function toString(argument) {
  if (typeof argument === 'string') {
    return argument;
  } else if (typeof argument === 'undefined') {
    return '';
  }

  return argument.toString();
}

const phoneValidator = /^(\d\d\d)(\d\d\d)(\d\d)(\d\d)$/;
function formatPhone(phone) {
  return phone.replace(phoneValidator, '+7 ($1) $2-$3-$4');
}
function validatePhone(phone) {
  return typeof phone === 'string' && phoneValidator.test(phone);
}
function validateArguments(phone, name, email) {
  return (
    validatePhone(phone) &&
    isNonEmptyString(name) &&
    (typeof email === 'undefined' || typeof email === 'string')
  );
}

/**
 * Добавление записи в телефонную книгу
 * @param {string} phone
 * @param {string} [name]
 * @param {string} [email]
 * @returns {boolean}
 */
function add(phone, name, email) {
  if (!validateArguments(phone, name, email)) {
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
  if (!validateArguments(phone, name, email)) {
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
  if (!isNonEmptyString(query)) {
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
  return internalFind(query)
    .map(phone =>
      toString(phoneBook[phone]['name']).concat(
        ', ',
        toString(formatPhone(phone)),
        toString(phoneBook[phone]['email'] !== undefined ? ', ' + phoneBook[phone]['email'] : '')
      )
    )
    .sort();
}

/**
 * Удаление записей по запросу из телефонной книги
 * @param {string} query
 * @returns {number}
 */
function findAndRemove(query) {
  if (!isNonEmptyString(query)) {
    return 0;
  }
  const result = internalFind(query);
  result.map(function(phone) {
    delete phoneBook[phone];
  });

  return result.length;
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
