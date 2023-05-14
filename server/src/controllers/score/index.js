const createScore = async (req, res) => {
    const {
        session,
        db: { Score },
        body: { wordsTyped, wordsMissed },
    } = req;

    const score = await Score.create({ userId: session.userId, wordsMissed, wordsTyped });
    res.send({ msg: 'score added!', score });
};

const getScores = async (req, res) => {
    const {
        session,
        db: { Score },
    } = req;

    const scores = await Score.listScoresByUserId(session.userId);
    res.send(scores);
};

module.exports = {
    createScore,
    getScores
}