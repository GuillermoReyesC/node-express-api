const express = require('express');
const app = express();

app.use(express.json());

let notes = [
    {
        "id": 1,
        "content": "this is the way",
        "date": "2019-05-30T17:30:31.094Z",
        "important": true
    },
    {
        "id": 2,
        "content": "don't forget to be awesome",
        "date": "2019-05-30T18:39:34.094Z",
        "important": false
    },
    {
        "id": 3,
        "content": "you are awesome",
        "date": "2019-05-30T19:48:45.094Z",
        "important": true
    },
    {
        "id": 4,
        "content": "wake me up in las vegas dud",
        "date": "2019-05-30T20:57:56.094Z",
        "important": false
    }
];


/* const app = http.createServer(
    (req, res) => {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(JSON.stringify(notes));
        //res.end(notes.map(note => note.content).join('\n'));   
    }); */

    app.get('/', (req, res) => {
        
        res.send('<h1>Hello World!</h1>');
    })

    app.get('/api/notes', (req, res) => {
        res.json(notes);
    });

    app.get('/api/notes/:id', (req, res) => {
        const id =Number( req.params.id);
       // console.log({id});
        const note = notes.find(note=> note.id === id);
       // console.log({note});
        if(note){
            res.json(note);
        } else {
            res.status(404).end();
        }
    });

    app.delete('/api/notes/:id', (req, res) => {
        const id =Number( req.params.id);
        const note = notes.find(note=> note.id === id);
        if(note){
            notes = notes.filter(note=> note.id !== id);
            res.status(204).end();
        } else {
            res.status(404).end();
        }
    });

   app.post('/api/notes', (req, res) => {
        const note = req.body

        if(!note || !note.content){
            return res.status(400).json({
                error: 'content missing'
            });
        }

        
        const ids = notes.map(note=> note.id);
        const maxId = Math.max(...ids);

        const newNote = {
            id:maxId + 1,
            content: note.content,
            important: typeof note.important === 'undefined' ? note.important : false,
            date: new Date().toISOString()
        }

        notes = [...notes, newNote];


        res.json(newNote);
   });

    

    const PORT = 3001;
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}/`);
    });