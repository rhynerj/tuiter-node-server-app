import posts from './tuits.js';

let tuits = posts;

const createTuit = (req, res) => {
    const tuit = req.body;

    const newTuit = {
        _id: (new Date()).getTime() + '',
        handle: '@nasa',
        username: 'NASA',
        image: 'nasa.png',
        time: '0h',
        replies: 0,
        retuits: 0,
        likes: 0,
        liked: false,
        dislikes: 0,
        disliked: false,
        ...tuit
    }

    // newTuit._id = (new Date()).getTime() + '';
    // newTuit.handle = '@nasa';
    // newTuit.username = 'NASA';
    // newTuit.image = 'nasa.png';
    // newTuit.time = '0h';
    // newTuit.replies = 0;
    // newTuit.retuits = 0;
    // newTuit.likes = 0;
    // newTuit.liked = false;
    // newTuit.dislikes = 0;
    // newTuit.disliked = false;

    tuits.push(newTuit);
    res.json(newTuit);
}
const findTuits = (req, res) => {
    res.json(tuits);
}
const updateTuit = (req, res) => {
    const tuitId = req.params.tid;
    const updates = req.body;
    const tuitIndex = tuits.findIndex((t) => t._id === tuitId);
    tuits[tuitIndex] = { ...tuits[tuitIndex], ...updates };
    res.sendStatus(200);
}
const deleteTuit = (req, res) => {
    const tuitIdToDelete = req.params.tid;
    tuits = tuits.filter((t) =>
        t._id !== tuitIdToDelete);
    res.sendStatus(200);
}

export default (app) => {
    app.post('/api/tuits', createTuit);
    app.get('/api/tuits', findTuits);
    app.put('/api/tuits/:tid', updateTuit);
    app.delete('/api/tuits/:tid', deleteTuit);
}