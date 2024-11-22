export function formatSnekScore(score: number): string {
	return score.toString().padStart(3, '0');
}
