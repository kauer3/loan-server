const moment = require('moment');

moment.locale('pt-br');

const format = (n) => {
	return Number(n.toFixed(2));
}

exports.checkLoan = (data) => {
	let isValid = true;
	let message = '';
	let simulation = {};
	const UFFees = {MG: 1, SP: 0.8, RJ: 0.9, ES: 1.11};

	data = {...data, loan_amount: Number(data.loan_amount), monthly_payback: Number(data.monthly_payback)};
	console.log(data);
	if (data.cpf.length !== 11) {
		console.log(data.cpf);
		isValid = false;
		message = 'CPF inválido!';
	} else if (!UFFees.hasOwnProperty(data.uf)) {
		isValid = false;
		message = 'Indisponível para este estado!';
	} else if (data.loan_amount < 50000) {
		isValid = false;
		message = 'Valor mínimo de R$ 50.000,00';
	} else if (data.monthly_payback < data.loan_amount/100) {
		isValid = false;
		message = `O valor mínimo da parcela para um empréstimo de R$ ${data.loan_amount},00 é de R$ ${data.loan_amount/100},00.`;
	}

	if (isValid) {
		const fee = UFFees[data.uf];
		const totalFees = (data.loan_amount / (100/fee));
		let toBePaid = data.loan_amount;
		let date = moment();
		let monthly_update = [];
		let oldFee = 0;
		let months = 0;

		while (toBePaid > 0) {
			months++;
			date = date.add(1, 'months');
			const currentFee = format(toBePaid / (100/fee));
			const currentPayback = format(toBePaid > data.monthly_payback ? data.monthly_payback : toBePaid + currentFee);
			monthly_update.push({
				expiration_date: date.format('DD/MM/YYYY'),
				to_be_paid: toBePaid,
				to_be_paid_with_fees: format(toBePaid + currentFee),
				current_payback: currentPayback,
				current_fee: currentFee,
			});
			toBePaid = format(toBePaid + currentFee - currentPayback);
			oldFee = currentFee;
		};

		simulation =  {
			...data,
			approved: true,
			monthly_fee: fee,
			total_fees: totalFees,
			months: months,
			monthly_update: monthly_update
		}
	} else {
		simulation =  {
			approved: false,
			message: message
		}
	}
	return simulation;
};
