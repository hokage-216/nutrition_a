function calculateCalories(age, weight, sex, height_ft, height_in, activity_level) {
    const activityMultipliers = {
        0: 1.2, // sedentary
        1: 1.375, // lightly_active
        2: 1.55, // moderately_active
        3: 1.725, // very_active
        4: 1.9, // extra_active
    };

    // convert weight from pounds to kilograms
    const weight_kg = weight * 0.453592;

    // convert height to cm
    const height_cm = (height_ft * 30.48) + (height_in * 2.54); 

    let bmr;
    if (sex === "male") {
        bmr = 88.362 + (13.397 * weight_kg) + (4.799 * height_cm) - (5.677 * age);
    } else {
        bmr = 447.593 + (9.247 * weight_kg) + (3.098 * height_cm) - (4.330 * age);
    }
    
    // Ensure activity_level is a number and has a corresponding multiplier
    const activityMultiplier = activityMultipliers[activity_level];
    if (activityMultiplier === undefined) {
        console.error('Invalid activity level:', activity_level);
        return NaN; // Or handle this case as appropriate
    }

    return bmr * activityMultiplier;
}