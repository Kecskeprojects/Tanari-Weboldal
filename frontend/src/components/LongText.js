export default function LongText({ text = '', maxLength = 10 }) {
	if (text.length <= maxLength) {
		return text;
	}
	return `${text.substring(0, maxLength)}...`;
}
