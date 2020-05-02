// interface biometrics {
//     height: number,
//     weight: number
// }

// const parseArguments = (args: Array<string>): biometrics => {
//     if(args.length < 4) throw new Error('Not enough arguments')
//     if(args.length > 4) throw new Error('Too many arguments')
//     if(!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
//         return {
//             height: Number(args[2]),
//             weight: Number(args[3])
//         }
//     }
//     return {height: NaN, weight: NaN}
// }

const calculateBMI = (height: number, weight: number): string => {
    const bmi = weight / (height / 100) ** 2
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
            throw new Error('Error: BMI not classified')
    }
}

export default calculateBMI
