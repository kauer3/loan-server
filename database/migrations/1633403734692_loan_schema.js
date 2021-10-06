'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LoanSchema extends Schema {
  up () {
    this.table('loans', (table) => {
      table.decimal('monthly_fee', 3, 2).notNullable()
      table.integer('total_fees').notNullable()
      table.integer('months').notNullable()
    })
  }

  down () {
    this.table('loans', (table) => {
      table.dropColumn('monthly_fee')
      table.dropColumn('total_fees')
      table.dropColumn('months')
    })
  }
}

module.exports = LoanSchema
