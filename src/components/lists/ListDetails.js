import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import api from '../../api';
import Button from '../common/Button';
import Item from '../items/Item';
import { useHistory } from 'react-router-dom';
import Form from '../common/Form';

export default function ListDetails() {
    const [list, setList] = useState();
    const [newItemName, setNewItemName] = useState('');
    const [items, setItems] = useState([]);
    const params = useParams();
    const history = useHistory();

    useEffect(() => {
        getChosenList();
        getListItems();
    }, [params.id]);

    async function getChosenList() {
        try {
            const {data: {list: fetchedList}} = await api.getList(params.id);
            setList(fetchedList);
        } catch (err) {
            console.error(err);
        }
    }

    async function getListItems() {
        try {
            const {data: {items: fetchedItems}} = await api.getListItems(params.id);
            setItems(fetchedItems);
        } catch (err) {
            console.error(err);
        }
    }

    async function handleStatusChange(e, id) {
        const formData = { done: e.target.checked }

        try {
            const {data: {item: updatedItem}} = await api.updateItem(id, formData);
            setItems(oldItems =>
                oldItems.map(item => {
                    if(item._id === id) {
                        return { ...item, done: formData.done };
                    }
                    return item;
                })
            );
        } catch (err) {
            console.error(err);
        }
    }

    async function deleteItem(id) {
        try {
            const {data: successMessage} = await api.deleteItem(id);
            setItems(oldItems => oldItems.filter(item => item._id !== id));
        } catch (err) {
            console.error(err);
        }
    }

    function displayListItems() {
        return(
            <ul>
                {items.map((item,index) => 
                    <Item 
                        key={`item${index}`} 
                        item={item} 
                        onChangeHandler={(e) => handleStatusChange(e, item._id)}    
                        onDeleteHandler={() => deleteItem(item._id)}
                    />
                )}
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
            const {data: {item: newItem}} = await api.createItem(formData);
            setNewItemName('');
            setItems(oldItems => [...oldItems, newItem]);
        } catch (err) {
            console.error(err);
        }
    }

    return(
        <div className="container mt-4">
            <Button className="btn-secondary mb-3" onClickHandler={() => history.push('/')} innerText="Go Back" />
            {list && <h2 className="mb-5">You are viewing now {list.title}</h2>}
            <Form 
                value={newItemName} 
                handleOnChange={(e) => setNewItemName(e.target.value)} 
                handleOnSubmit={(e) => handleOnSubmit(e)} 
                inputPlaceholder="Enter item name i.e., Shopping, chores..." 
            />
            <div className="mt-4">
                <h4>List's Items</h4>
                {displayListItems()}
            </div>
        </div>
    );
}