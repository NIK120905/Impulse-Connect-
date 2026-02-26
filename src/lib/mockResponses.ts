export const getMockResponse = (message: string) => {
    const lowerMsg = message.toLowerCase();

    // High intensity
    const highTriggerWords = [
        "angry", "furious", "ridiculous", "unfair", "hate", "stupid",
        "unbelievable", "done with", "quit", "resign", "lawsuit"
    ];

    // Medium intensity
    const mediumTriggerWords = [
        "miss you", "please", "need you", "disappointed", "hurt",
        "can't believe", "expected more", "let me down"
    ];

    let flaggedPhrases: string[] = [];

    const highFound = highTriggerWords.filter(word => lowerMsg.includes(word));
    if (highFound.length > 0) {
        flaggedPhrases = [...highFound];
        return {
            score: Math.floor(Math.random() * (95 - 85 + 1) + 85),
            flaggedPhrases,
            rewrite: "I wanted to address the recent situation. I feel strongly about this and would like to find a constructive way forward. Perhaps we can schedule a time to discuss my concerns in detail."
        };
    }

    const mediumFound = mediumTriggerWords.filter(word => lowerMsg.includes(word));
    if (mediumFound.length > 0) {
        flaggedPhrases = [...mediumFound];
        return {
            score: Math.floor(Math.random() * (65 - 45 + 1) + 45),
            flaggedPhrases,
            rewrite: "I noticed things haven't been going exactly as planned. I value our connection and think it would be helpful to communicate clearly about where things stand."
        };
    }

    // Low intensity / Default
    return {
        score: Math.floor(Math.random() * (30 - 15 + 1) + 15),
        flaggedPhrases: [],
        rewrite: "Your message looks calm and constructive. Minor suggestions below:\n" + message
    };
};
