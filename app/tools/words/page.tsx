'use client'
import Section from "#/components/Section";
import { useEffect, useState } from "react";
import { getWords, getCharacters, getSentences, getParagraphs, getTimeAmountOfTime, getAverageCharsPerSentence, getAverageWordsPerSentence, getAverageWordLength, getCharactersWithoutSpaces, getSyllables } from "./tools";
// TODO: Maybe use a clone/ fork of this package that is newer
import removeMd from "remove-markdown"


const defaultConfig = {
    // Default config
    showWordLength: true,
    showCharacters: true,
    showSentences: true,
    showParagraphs: true,

    // Time based
    showReadingTime: false,
    readingTimeWPM: 275,
    showSpeakingTime: false,
    speakingTimeWPM: 180,
    showHandWritingTime: false,
    handWritingLPM: 68,

    // Averages
    showAverageCharsPerSentence: false,
    showAverageWordsPerSentence: false,
    showAverageWordLength: false,

    showCharactersWithoutSpaces: false,
    showSyllables: false,
    showUniqueWords: false,

    showAmountOfLines: false,
    showLongestSentenceWords: false,
    showShortestSentenceWords: false,
    showPages: false,
    showReadingLevel: false,

}

export default function WordCounter() {
    const [text, setText] = useState("")

    const [config, setConfig] = useState(defaultConfig)

    useEffect(() => {
        const raw = localStorage.getItem("word_counter_config")
        if (raw) {
            const newConfig = JSON.parse(raw)
            setConfig({ ...config, ...newConfig })
        }
        else {
            localStorage.setItem("word_counter_config", JSON.stringify(config))
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function changeConfig(key: string, value: boolean) {
        setConfig({ ...config, [key]: value })
    }

    useEffect(() => {
        localStorage.setItem("word_counter_config", JSON.stringify(config))
    }, [config])


    function DataEnable({ configKey, title, enabled, value, autoPlural = true, forceEnabled = false, input }: { configKey: string, title: string, enabled: boolean, value: string, autoPlural?: boolean, forceEnabled?: boolean, input?: { configKey: string, value: string | number, type: 'number', name: string} }): JSX.Element {

        return (
            <label className="flex items-center">
                <input type="checkbox" className="form-checkbox" checked={enabled} title="Show this in the main section" disabled={forceEnabled} onChange={(e) => changeConfig(configKey, e.target.checked)} />
                <span className="ml-2">
                    <b>{value}</b>{' '}
                    {title}{autoPlural && value.length > 0 ? 's' : ''}
                    {input &&
                        <>
                            {/* @ts-expect-error: types being weird */}
                        <input type={input.type} className="ml-2 w-16 pl-1 pr-1" value={input.value} onChange={(e) => changeConfig(input.configKey, e.target.value)} title={"Default: " + defaultConfig[input.configKey] ?? 'none'} />
                            {input?.name && <span className="ml-2">{input.name}</span>}
                        </>
                    }
                </span>

            </label>
        )
    }

    return (
        <>
            <Section title="Word Counter">
                {/* text area */}
                <div className="m-2">
                    <textarea id="words" className="w-full min-h-[10rem] h-72 p-4 bg-gray-200 dark:bg-gray-800 rounded-md shadow-md" onChange={(e) => setText(e.target.value)} value={text} />

                </div>
                {/* word count */}
                <div className="mt-4 flex flex-row flex-wrap justify-center">
                    {/* Default */}
                    {config.showWordLength && <DataDisplay
                        name={`Words`}
                        value={getWords(text).toLocaleString()}
                        important
                    />}

                    {config.showCharacters && <DataDisplay
                        name={`Characters`}
                        value={getCharacters(text).toLocaleString()}
                    />}

                    {config.showSentences && <DataDisplay
                        name={`Sentences`}
                        value={getSentences(text).toLocaleString()}
                    />}

                    {config.showParagraphs && <DataDisplay
                        name={`Paragraphs`}
                        value={getParagraphs(text).toLocaleString()}
                    />}

                    {/* Time based */}
                    {config.showReadingTime && <DataDisplay
                        name={`Reading Time`}
                        value={getTimeAmountOfTime(text, config.readingTimeWPM)}
                        larger
                    />}

                    {config.showSpeakingTime && <DataDisplay
                        name={`Speaking Time`}
                        value={getTimeAmountOfTime(text, config.speakingTimeWPM)}
                        larger
                    />}

                    {config.showHandWritingTime && <DataDisplay
                        name={`Hand Writing Time`}
                        value={getTimeAmountOfTime(text, config.handWritingLPM, true)}
                        larger
                    />}

                    {/* Averages */}
                    {config.showAverageCharsPerSentence && <DataDisplay
                        name={`Avg. Sentence (chars)`}
                        value={getAverageCharsPerSentence(text).toLocaleString()}
                        larger
                    />}

                    {config.showAverageWordsPerSentence && <DataDisplay
                        name={`Avg. Sentence (words)`}
                        value={getAverageWordsPerSentence(text).toLocaleString()}
                        larger
                    />}

                    {config.showAverageWordLength && <DataDisplay
                        name={`Avg. Word Length`}
                        value={getAverageWordLength(text).toLocaleString()}
                    />}

                    {/* Extra */}
                    {config.showCharactersWithoutSpaces && <DataDisplay
                        name={`Characters (no spaces)`}
                        value={getCharactersWithoutSpaces(text).toLocaleString()}
                        larger
                    />}

                    {config.showSyllables && <DataDisplay
                        name={`Syllables`}
                        value={getSyllables(text).toLocaleString()}
                    />}

                </div>

                <div>
                    {/* Default */}
                    <DataEnable configKey="showWordLength" title="Word" enabled={config.showWordLength} forceEnabled value={getWords(text).toLocaleString()} />
                    <DataEnable configKey="showCharacters" title="Character" enabled={config.showCharacters} value={getCharacters(text).toLocaleString()} />
                    <DataEnable configKey="showSentences" title="Sentence" enabled={config.showSentences} value={getSentences(text).toLocaleString()} />
                    <DataEnable configKey="showParagraphs" title="Paragraph" enabled={config.showParagraphs} value={getParagraphs(text).toLocaleString()} />

                    {/* Time based */}
                    <DataEnable configKey="showReadingTime" title="of Reading Time at" autoPlural={false} enabled={config.showReadingTime} value={getTimeAmountOfTime(text, config.readingTimeWPM)} input={{ configKey: 'readingTimeWPM', name: 'WPM', type: 'number', value: config.readingTimeWPM}} />
                    <DataEnable configKey="showSpeakingTime" title="of Speaking Time at" autoPlural={false} enabled={config.showSpeakingTime} value={getTimeAmountOfTime(text, config.speakingTimeWPM)} input={{ configKey: 'speakingTimeWPM', name: 'WPM', type: 'number', value: config.speakingTimeWPM }} />
                    <DataEnable configKey="showHandWritingTime" title="of Hand Writing Time at" autoPlural={false} enabled={config.showHandWritingTime} value={getTimeAmountOfTime(text, config.handWritingLPM, true)} input={{ configKey: 'handWritingLPM', name: 'LPM', type: 'number', value: config.handWritingLPM }} />

                    {/* Averages */}
                    <DataEnable configKey="showAverageWordsPerSentence" title="Avg. Sentence (words)" autoPlural={false} enabled={config.showAverageWordsPerSentence} value={getAverageWordsPerSentence(text).toLocaleString()} />
                    <DataEnable configKey="showAverageCharsPerSentence" title="Avg. Sentence (chars)" autoPlural={false} enabled={config.showAverageCharsPerSentence} value={getAverageCharsPerSentence(text).toLocaleString()} />
                    <DataEnable configKey="showAverageWordLength" title="Avg. Word Length" autoPlural={false} enabled={config.showAverageWordLength} value={getAverageWordLength(text).toLocaleString()} />

                    {/* Advanced */}
                    <DataEnable configKey="showCharactersWithoutSpaces" title="Character (no spaces)" autoPlural={false} enabled={config.showCharactersWithoutSpaces} value={getCharactersWithoutSpaces(text).toLocaleString()} />
                    <DataEnable configKey="showSyllables" title="Syllables" autoPlural={false} enabled={config.showSyllables} value={getSyllables(text).toLocaleString()} />
                </div>

                <div>
                    {/* remove md button */}
                    <button className="m-2 p-2 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 rounded-md shadow-md" onClick={() => setText(removeMd(text))}>Remove Markdown</button>
                    
                    {/* reset config button */}
                    <button className="m-2 p-2 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 rounded-md shadow-md" onClick={() => setConfig(defaultConfig)}>Reset Config</button>

                </div>
            </Section>
        </>


    )
}



function DataDisplay({ name, value, important = false, larger = false }: { name: string, value: string, important?: boolean, larger?: boolean }): JSX.Element {
    return (
        <div className={`justify-center p-4 m-3 ${larger ? "w-64 md:w-52" : "w-32 md:w-40"} ${important ? "bg-gray-300 dark:bg-gray-700" : "bg-gray-200 dark:bg-gray-800"} rounded-md shadow-md text-center`}>
            <h1 className="text-2xl font-bold">{value}</h1>
            <p className="text-gray-400">{name}</p>
        </div>
    )
}
