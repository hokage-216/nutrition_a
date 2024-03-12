function calculateMacros(calories) {
    const proteinCalories = calories * 0.3;
    const fatCalories = calories * 0.3;
    const carbCalories = calories * 0.4;

    const proteinGrams = proteinCalories / 4;
    const fatGrams = fatCalories / 9;
    const carbGrams = carbCalories / 4;

    return {fatGrams, carbGrams, proteinGrams };
  }