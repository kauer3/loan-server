'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LoanSchema extends Schema {
  up () {
    this.create('loans', (table) => {
      table.increments('id').primary()
      table.integer('cpf').notNullable()
      table.string('uf').notNullable()
      table.date('birth').notNullable()
      table.decimal('loan_amount').notNullable()
      table.decimal('monthly_payback').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('loans')
  }
}

module.exports = LoanSchema
