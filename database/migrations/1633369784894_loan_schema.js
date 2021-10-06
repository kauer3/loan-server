'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LoanSchema extends Schema {
  up () {
    this.alter('loans', (table) => {
      table.bigInteger('cpf').notNullable().alter()
    })
  }

  down () {
    this.alter('loans', (table) => {
      table.integer('cpf').notNullable().alter()
    })
  }
}

module.exports = LoanSchema
