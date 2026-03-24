const express = require('express')

const app = express()

app.use(express.json()) // to read body

let todos = [];

//CREATE TODO
app.post('/', (req, res) => {
  
  const title = req.body.title // extract the title from the body
  const id = Date.now() // simple unique id
    
  todos.push({
    title,
    id
  });

  res.json({
    message: "Todo added",
    todos
  });
  });



// DELETE TODO
app.delete('/', (req, res) => {
  const id = req.body.id // get id from body
  todos = todos.filter(todo => todo.id !== id);

  res.json({
    message: "Todo deleted",
    todos
  });
});


// UPDATE TODO
app.put('/', (req, res) => {
  const id = req.body.id;
  const newTitle = req.body.title;

  let found = false;

  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id === id) {
      todos[i].title = newTitle; // update title
      found = true;
      break;
    }
  }

  if (found) {
    res.json({
      message: "Todo updated",
      todos
    });
  }

  else {
    res.json({
      message: "Todo not found"
    });
  }
});


// GET ALL TODOS
app.get('/', (req, res) => {
  res.json({
    todos 
  });
});


app.listen(3000, () => { //which port
  console.log("Server running on http://localhost:3000");
}) 

