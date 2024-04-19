export const getDuplicates = (array, comparator) => {
	if (array.length === 0 || array.length === 1) {
		return [];
	} else {
		const duplicates = [];

		const arrayCopy = [...array].sort(comparator);
		for (let i = 0; i < arrayCopy.length; i++) {
			const item = arrayCopy[i];

			let start = i;
			let end = i + 1;

			while (item === arrayCopy[end]) {
				end++;
			}

			if (end - start > 1) {
				duplicates.push(item);
			}
		}

		return duplicates;
	}
};