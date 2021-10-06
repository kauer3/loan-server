'use strict'

const { checkLoan } = require('../../utils/checkLoan');

const Loan = use('App/Models/Loan');

class LoanController {
	/**
	 * Show a list of all loans.
	 * GET loans
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 * @param {View} ctx.view
	 */
	async index({ request, response, view }) {
		const loans = await Loan.query().fetch()

		return loans;
	}

	/**
	 * Create/save a new loan.
	 * POST loans
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 */
	async store({ request, response }) {
		let params = request.all();
		const loan = await Loan.create(params);
		const loans = await Loan.all();
		return loans;
	}

	/**
	 * Display a single loan.
	 * GET loans/:id
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 * @param {View} ctx.view
	 */
	async show({ request, response, view }) {
		const params = request.all();
		// console.log(params);
		return checkLoan(params);
	}

	/**
	 * Delete a loan with id.
	 * DELETE loans/:id
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 */
	async destroy({ params, request, response }) {
		const loan = await Loan.findOrFail(params.id);
		await loan.delete();
		const loans = await Loan.all();

		return loans;
	}
}

module.exports = LoanController
