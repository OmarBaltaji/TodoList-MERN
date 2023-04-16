import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import api from '../api';
import Button from './Button';
import ListItem from './ListItem';
import { useHistory } from 'react-router-dom';

export default function OneList() {
    const [list, setList] = useState({});
    const [newItemName, setNewItemName] = useState('');
    const [items, setItems] = useState([]);
    const [areItemsChanged, setAreItemsChanged] = useState(false);
    const params = useParams();
    const history = useHistory();

    useEffect(() => {
        getChosenList();
        getListItems();
    }, [params.id, areItemsChanged]);

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
            setAreItemsChanged(oldAreItemsChanged => !oldAreItemsChanged);
        } catch (err) {
            console.error(err);
        }
    }

    function displayListItems() {
        return(
            <ul>
                {items.map((item,index) => 
                    <ListItem 
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
            const {data: successMessage} = await api.createItem(formData);
            setNewItemName('');
            setAreItemsChanged(oldAreItemsChanged => !oldAreItemsChanged);
        } catch (err) {
            console.error(err);
        }
    }

    return(
        <div className="container mt-4">
            <Button className="btn-secondary mb-3" onClickHandler={() => history.push('/')} innerText="Go Back" />
            <h2 className="mb-5">{list ? `You are viewing now ${list.title}` : 'loading...'}</h2>
            <div className="input-group mb-3">
                <label className="mt-1">Add a new item:</label>
                <input 
                className="ml-4 px-2"
                style={{ width:'250px' }}
                type="text"
                aria-describedby="button-addon2"
                required
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                placeholder="Shopping, chores, basketball..."
                />
                <Button 
                    className="btn-outline-primary" 
                    id="button-addon2"
                    onClickHandler={(e) => handleOnSubmit(e)}
                    innerText="Add"
                />
            </div>
            <div className="mt-4">
                <h4>List's Items</h4>
                {displayListItems()}
            </div>
        </div>
    );
}