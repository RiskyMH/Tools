
export function getWords(text: string): number {
    if (text === "") return 0

    const latin = text.replace(/\s+/g, '').match(/([^\x00-\x7F\u2013\u2014])+/gi);
    if (latin === null) {
        return text.match(/\S+/g)?.length ?? 0;
    }

    return text
        .replace(/[;!:—\/]/g, ' ')
        .replace(/\.\s+/g, ' ')
        .replace(/[^a-zA-Z\d\s&:,]/g, '')
        .replace(/,([^0-9])/g, ' $1')
        .match(/\S+/g)
        ?.length ?? 0;
}

export function getCharacters(text: string): number {
    if (text.length < 100000) {
        return text.match(/(?:[^\r\n]|\r(?!\n))/g)?.length ?? 0;
    }

    return text.length
}

export function getCharactersWithoutSpaces(text: string): number {
    if (text === "") return 0

    return text.replace(/\s/g, '').length;
}

export function getAverageCharsPerSentence(text: string): number {
    if (text === "") return 0

    const sentences = getSentences(text);
    const characters = getCharacters(text);

    return Math.round(characters / sentences);
}

export function getAverageWordsPerSentence(text: string): number {
    if (text === "") return 0

    const sentences = getSentences(text);
    const words = getWords(text);

    return Math.round(words / sentences);
}

export function getAverageWordLength(text: string): number {
    if (text === "") return 0

    const words = getWords(text);
    const characters = getCharactersWithoutSpaces(text);

    return Math.round((characters / words) * 10) / 10;
}

export function getParagraphs(text: string): number {
    if (text === "") return 0

    return text.match(/(\n\n?|^).+?(?=\n?\n?|$)/g)?.length ?? 0
}

export function getSentences(text: string): number {
    if (text === "") return 0
    // return text.split(".").length

    const sentences = text.match(/[^.!?][^.!?]*(?:[.!?](?!['"]?|$)[^.!?]*)*[.!?]?['"]?(?=|$)([.!?]\s+[A-Z0-9])/g);
    if (sentences) {
        return sentences.reduce((acc, cur) => {
            if (cur.match(/[0-9a-zA-Z]+/)) acc++;
            return acc;
        }, 0)
    }

    return text.match(/[0-9a-zA-Z]+/) ? 1 : 0;

}

/**
 * 
 * @param string The string
 * @param speed WPM (words per minute)
 * @param useLetters If true, it will use the amount of letters instead of words
 * @returns (2sec) (3min 3sec) (1hr 3min)
 */
export function getTimeAmountOfTime(string: string, speed: number, useLetters = false): string {
    const count = useLetters ? getCharacters(string) : getWords(string)

    if (count === 0) return "0 sec"

    const duration = count / speed

    if (duration < 1) {
        return `${Math.ceil(duration * 60)} sec`
    }

    else if (duration >= 1 && duration < 60) {
        const newDuration = Math.round(duration * 100) / 100
        const minutes = Math.floor(newDuration);
        const seconds = Math.round(newDuration % 1 * 60);
        // int_part_of_number + ' ' + (int_part_of_number == 1 ? editor.selectedLanguage.minute : editor.selectedLanguage.mins) + ' ' + decimal_part_of_number + ' ' + editor.selectedLanguage.sec
        return `${minutes} ${minutes === 1 ? "min" : "mins"} ${seconds} sec`
    }

    else {
        const newDuration = Math.round((duration / 60) * 100) / 100;
        const hours = Math.floor(newDuration);
        const minutes = Math.round(newDuration % 1 * 60);
        return `${hours} ${hours === 1 ? "hr" : "hrs"} ${minutes} ${minutes === 1 ? "min" : "mins"}`
    }


}


export function getSyllables(text: string): number {
    const wordExceptions: Record<string, number> = {
        'geographic': 4,
        'geographics': 4
    };
    const wordsArr = text.split(/\W+/);
    let wordsSyllables = 0;
    for (let word of wordsArr) {
        word = word.toLowerCase();
        if (word in wordExceptions) {
            wordsSyllables += wordExceptions[word];
        }
        else if (word.length <= 2 && word.length >= 1) {
            wordsSyllables++;
        }
        else if (word.length > 2) {
            word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
            word = word.replace(/^y/, '');

            if (!word.match(/[aeiouy]{1,2}/g)) {
                wordsSyllables++;
            }
            else {
                var wordSyllables = word.match(/[aeiouy]{1,2}/g)?.length;
                wordsSyllables += wordSyllables ?? 0;
            }
        }
    }

    return wordsSyllables;
}
