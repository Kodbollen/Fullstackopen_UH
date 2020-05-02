
const calculateBMI = (height: number, weight: number): string => {
	const bmi = weight / (height / 100)**2
	switch(true) {
		case bmi < 15:
			return 'Very severely underweight'
		case bmi < 16:
			return 'Severely underweight'
		case bmi < 18.5:
			return 'Underweight'
		case bmi < 25:
			return 'Normal (Healthy weight)'
		case bmi < 30:
			return 'Overweight'
		case bmi < 35:
			return 'Obese class I (Moderately obese)'
		case bmi < 40:
			return 'Obese class II (Severely obese)'
		case bmi >= 40:
			return 'Obese class III (Very Severely obese)'
		default:
			return 'Error: BMI not classified'
	}
}

console.log(calculateBMI(180, 74))

