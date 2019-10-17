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

const phoneValidator = /^(\d\d\d)(\d\d\d)(\d\d)(\d\d)$/;
function validatePhone(phone) {
  return typeof phone === 'string' && phoneValidator.test(phone);
}
function formatPhone(phone) {
  return phone.replace(phoneValidator, '+7 ($1) $2-$3-$4');
}

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

/**
 * Добавление записи в телефонную книгу
 * @param {string} phone
 * @param {string} [name]
 * @param {string} [email]
 * @returns {boolean}
 */
function add(phone, name, email) {
  if (!validatePhone(phone) || !isNonEmptyString(name) || (email && typeof email !== 'string')) {
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
  if (!validatePhone(phone) || !isNonEmptyString(name) || (email && typeof email !== 'string')) {
    return false;
  }

  let updated = false;
  if (phone in phoneBook) {
    phoneBook[phone] = { name, email };
    updated = true;
  }

  return updated;
}

/**
 * Поиск записей по запросу в телефонной книге
 * @param {string} query
 * @returns {string[]}
 */
function find(query) {
  let result;
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

  return result
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
  let result;
  if (!isNonEmptyString(query)) {
    return 0;
  } else if (query === '*') {
    result = phoneBook;
  } else {
    result = Object.keys(phoneBook).filter(
      phone =>
        phone.includes(query) ||
        phoneBook[phone]['name'].includes(query) ||
        toString(phoneBook[phone]['email']).includes(query)
    );
  }

  result.forEach(function(phone) {
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
