import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';

export default function OneList() {
    const [listTitle, setListTitle] = useState();
    const [newItemName, setNewItemName] = useState('');
    const [items, setItems] = useState([]);
    const [itemAdded, setItemAdded] = useState(false);
    const [itemDeleted, setItemDeleted] = useState(false);
    const params = useParams();

    useEffect(() => {
        getChosenList();
        getListItems();
        setItemDeleted(false);
    }, [itemAdded, itemDeleted]);

    function getChosenList() {
        axios.get(`http://localhost:5000/lists/${params.id}`)
        .then(res => {
            setListTitle(res.data);
        })
    }

    function getListItems() {
        let listId = {"listId": params.id};
        axios.post(`http://localhost:5000/items/`, listId)
        .then(res => {
            setItems(res.data);
        })
        .catch(err => console.log(err))
    }

    function handleStatusChange(e, id) {
        e.preventDefault();
        let status;
        if(e.target.checked) {
            status = {
                "done": true,
            }
        }
        else {
            status = {
                "done": false,
            }
        }

        axios.put(`http://localhost:5000/items/update/${id}`, status)
        .then(res => { 
            window.location.reload();
        });
    }

    function deleteItem(id) {
        axios.delete(`http://localhost:5000/items/${id}`)
        .then(res => {
            if(res) {
                setItemDeleted(true);
            }
        })
    }

    function displayListItems() {
        return(
            <ul>
                {items.map((item,index) => {
                    return(
                        <div key={`item${index}`} className="row">
                            <li>{item.name}</li> &ensp;
                            <input className="mt-1" type="checkbox" onChange={(e) => handleStatusChange(e, item._id)}
                            checked={item.done === true ? true : false}  
                            /> &ensp;
                            <a href={`/edititem/${item._id}`}>Edit</a> &ensp;
                            <>|</> &ensp;
                            <a href='#' onClick={() => deleteItem(item._id)}>Delete</a>
                        </div>
                    );
                })}
            </ul>
        )
    }

    function handleOnSubmit(e) {
        e.preventDefault();

        const info = {
            "name":  newItemName,
            "listId": params.id,
        }
        
        axios.post('http://localhost:5000/items/add', info)
        .then(res => {
            console.log(res);
            if(res) {
                setItemAdded(true);
                document.getElementById('item_name').value = '';
                setItemAdded(false);
            }
        })
    }

    return(
        <div className="container mt-4">
            <a href="/" style={{ maginBottom:'30px' }}>Go Back</a>
            <h2 className="mb-5">{listTitle ? `You are viewing now ${listTitle.title}` : 'loading...'}</h2>
            <div className="input-group mb-3">
                <label className="mt-1">Add a new item:</label>
                <input 
                className="ml-4 px-2"
                style={{ width:'250px' }}
                id="item_name"
                type="text"
                aria-describedby="button-addon2"
                required
                onChange={(e) => setNewItemName(e.target.value)}
                placeholder="Shopping, chores, basketball..."
                />
                <button className="btn btn-outline-primary" 
                type="button" 
                id="button-addon2"
                onClick={(e) => handleOnSubmit(e)}>
                    Add
                </button>
            </div>
            <div className="mt-4">
                <h4>List's Items</h4>
                {displayListItems()}
            </div>
        </div>
    );
}