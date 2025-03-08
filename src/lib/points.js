export const calculatePoints = (player) => {
    const {
        totalRuns = 0,
        ballsFaced = 0,
        inningPlayed = 0,
        wickets = 0,
        oversBowled = 0,
        runsConceded = 0,
    } = player;

    const totalBallsBowled = oversBowled * 6;
    const battingStrikeRate = ballsFaced > 0 ? (totalRuns / ballsFaced) * 100 : 0;
    const battingAverage = inningPlayed > 0 ? (totalRuns / inningPlayed) : 0;
    const bowlingStrikeRate = wickets > 0 ? totalBallsBowled / wickets : Infinity;
    const economyRate = totalBallsBowled > 0 ? runsConceded / oversBowled : 0;

    const points = (battingStrikeRate / 5) +
        (battingAverage * 0.8) +
        (bowlingStrikeRate === Infinity ? 0 : 500 / bowlingStrikeRate) +
        (economyRate > 0 ? 140 / economyRate : 0);

    return points;
};

export const calculateValue = (points) => {
    const valueInRupees = (9 * points + 100) * 1000;
    return Math.round(valueInRupees / 50000) * 50000;
};