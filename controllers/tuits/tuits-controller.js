// import posts from './tuits.js';

// let tuits = posts;

import * as tuitsDao from './tuits-dao.js';

const createTuit = async (req, res) => {
    const tuit = req.body;

    const newTuit = {
        // _id: (new Date()).getTime() + '',
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

    // tuits.push(newTuit);
    const insertedTuit = await tuitsDao.createTuit(newTuit);
    res.json(insertedTuit);
}
const findTuits = async (req, res) => {
    const tuits = await tuitsDao.findTuits();
    console.log(tuits)
    res.json(tuits);
}
const updateTuit = async (req, res) => {
    const tuitIdToUpdate = req.params.tid;
    const updates = req.body;
    // const tuitIndex = tuits.findIndex((t) => t._id === tuitId);
    // tuits[tuitIndex] = { ...tuits[tuitIndex], ...updates };
    const status = await tuitsDao.updateTuit(tuitIdToUpdate);
    res.json(status);
}
const deleteTuit = async (req, res) => {
    const tuitIdToDelete = req.params.tid;
    // tuits = tuits.filter((t) =>
    //     t._id !== tuitIdToDelete);
    const status = await tuitsDao.deleteTuit(tuitIdToDelete);
    res.json(status);
}

export default (app) => {
    app.post('/api/tuits', createTuit);
    app.get('/api/tuits', findTuits);
    app.put('/api/tuits/:tid', updateTuit);
    app.delete('/api/tuits/:tid', deleteTuit);
}