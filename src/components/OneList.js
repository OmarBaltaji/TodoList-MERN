import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import api from '../api';

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

    async function getChosenList() {
        try {
            const {data: {list}} = await api.getList(params.id)
            setListTitle(list.title);
        } catch (err) {
            console.error(err);
        }
    }

    async function getListItems() {
        try {
            const {data: {items}} = await api.getListItems(params.id);
            setItems(items);
        } catch (err) {
            console.error(err);
        }
    }

    async function handleStatusChange(e, id) {
        const formData = { done: e.target.checked }

        try {
            const {data: successMessage} = await api.updateItem(id, formData);
            window.location.reload();
        } catch (err) {
            console.error(err);
        }
    }

    async function deleteItem(id) {
        try {
            const {data: successMessage} = await api.deleteItem(id);
            setItemDeleted(true);
        } catch (err) {
            console.error(err);
        }
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

    async function handleOnSubmit(e) {
        e.preventDefault();

        const formData = {
            "name":  newItemName,
            "listId": params.id,
        }

        try {
            const {data: successMessage} = await api.createItem(formData)
            console.log(successMessage);
            setItemAdded(true);
            document.getElementById('item_name').value = '';
            setItemAdded(false);
        } catch (err) {
            console.error(err);
        }
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