import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {useState} from 'react';
import {useRef} from 'react';



const Item = ({note, id, destroy, list, setList,isChecked }) =>{
  const [checked, setChecked] = useState(isChecked);

  const handleComplete = () => {
    setChecked(!checked);
    const updatedList = list.map((item) =>
      item.id === id ? { ...item, isChecked: !checked } : item
    );
    setList(updatedList);
    
  };
  
  
    return<li >
    <div className="view" 
>
        <input 
          className="toggle" 
          type="checkbox"
          checked={checked}
          onChange={handleComplete}
         />
        <label style={{textDecoration: checked ? "line-through" : "none"}}>{note}</label>
        <button 
          className="destroy"
          onClick={() => destroy(id)}
        />
    </div>
</li>
}


const List = ({list, destroy, setList,filter}) =>{

    const filteredList = list.filter((item) => {
      if (filter === "Active") {
        return !item.isChecked;
      }
      else if(filter === "Completed") {
        return item.isChecked;
      }
      return true;
    });
  

    return    <section className="main">
    <input id="toggle-all" className="toggle-all" type="checkbox" />
    <label htmlFor="toggle-all">Mark all as complete</label>
    <ul className="todo-list" id="todo-list">
    {filteredList.map((item) => {
        const {note,id,isChecked } = item;
        return (
          <Item
            key={id}
            id={id}
            note={note}
            destroy={destroy}
            isChecked={isChecked}
            list={list}
            setList={setList}
          />
        );
        })}

    </ul>
  </section>
}

const Edit = ({add}) =>{
  const [note, setNote] = useState("");
  const inputRef = useRef(null);
          function noteChange(e) {
            setNote(e.target.value);
          }
  

    function newInput(event){
      if (event.key === "Enter"){
        if (note.length === 0){
            return false
        }else{
          add(prevList =>{
            const newId = new Date().getTime();
            return [       
              {
                note,
                id:newId,
                isChecked:false,
                
              },
              ...prevList,
            ];
          });
          setNote("");
          inputRef.current.focus();
          
          }
            

        }     
        
        }
    
    
    return    <header className="header">
    <h1>todoList</h1>
    <input
    className="new-todo"
    id="new-todo"
    value = {note}
    onChange={noteChange}
    onKeyDown={newInput}
    placeholder="What needs to be done?"
    ref={inputRef}
    autoFocus
    
    />
  </header>
}

const Footer = ({destroycomplete,setFilter,list}) =>{

  const activeCount = list.filter((item) => !item.isChecked).length;
  
    return <footer className="footer">
    <span className="todo-count">{activeCount} items left</span>
    <ul className="filters">
      <li onClick={() => setFilter("All")}>
        All
      </li>
      <li onClick={() => setFilter("Active")}>
        Active
      </li>
      <li onClick={() => setFilter("Completed")}>
        Completed
      </li>
    </ul>
    <button className="clear-completed" onClick={destroycomplete}>Clear completed</button>
  </footer>
}

const Page = () =>{
  
    const [myList,setMyList] = useState([])
    console.log(myList)

    const [filter, setFilter] = useState("All");
    
    const handleDestroy = (id) => {
      setMyList(myList.filter((item) => item.id !== id));
    };
    
    const handleDestroyComplete = () => {
      setMyList((prevList) => prevList.filter((item) => !item.isChecked));
    };
    
    return<section className="todoapp">
        <Edit 
          add={setMyList}
          />
        <List 
          list={myList} 
          destroy={handleDestroy} 
          setList={setMyList} 
          filter={filter}
          />
        <Footer 
          list={myList} 
          destroycomplete={handleDestroyComplete}
          setFilter={setFilter}
          />
    </section>
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Page />);