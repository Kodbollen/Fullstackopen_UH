interface TrainingReport {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

// const getArgumentArray = (args: Array<string>): Array<number> => {
//     if(process.argv.length < 3) throw new Error('No arguments received');
//     return [...args].slice(2).map(n => Number(n));
// };

const calculateExercises = (history: Array<number>, target: number): TrainingReport => {
    const periodLength = history.length;
    const trainingDays = history.filter(day => day > 0).length;
    const average = history.reduce((acc, val) => acc + val) / history.length;
    const success = average >= target;
    const getRating = (average: number, target: number): {rating: number; ratingDescription: string} => {
        switch(true) {
            case average >= target + 2:
                return {rating: 3, ratingDescription: 'Brilliant!'};
            case average >= target:
                return {rating: 2, ratingDescription: 'Good work'};
            default:
                return {rating: 1, ratingDescription: 'Not good enough'};
        }
    };
    const {rating, ratingDescription} = getRating(average, target);

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    };
};

export default calculateExercises;
