export default class DateHelper {
	/**
	 * @param {Date|string} date
	 * @param {Number} days
	 * @returns {Date}
	 */
	static addDays(date, days) {
		var result = new Date(date);
		result.setDate(result.getDate() + days);
		return result;
	}
}
