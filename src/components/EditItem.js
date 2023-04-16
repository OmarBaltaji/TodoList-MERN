import React, {useState, useEffect} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import api from '../api';
import Button from './Button';

export default function EditItem() {
    const [newItemName, setNewItemName] = useState('');
    const [itemInfo, setItemInfo] = useState([]);
    const params = useParams();
    const history = useHistory();

    useEffect(() => {
        getItemInfo();
    }, []);

    async function getItemInfo() {
        try {
            const {data: {item}} = await api.getItem(params.id)
            setItemInfo(item);
        } catch (err) {
            console.error(err);
        }
    }

    async function handleOnSubmit(e) {
        e.preventDefault();

        const formData = { name: newItemName }

        try {
            api.updateItem(params.id, formData)
            history.goBack();
        } catch (err) {
            console.error(err);
        } 
    }

    return (
        <div className="container mt-4">
         <a href={`/list/${itemInfo.listId}`} style={{ maginBottom:'30px' }}>Go Back</a>
            <div className="input-group mb-3">
                <label className="mt-1">Edit item:</label>
                <input 
                className="ml-4 px-2"
                style={{ width:'250px' }}
                id="item_name"
                type="text"
                aria-describedby="button-addon2"
                required
                defaultValue={itemInfo.name}
                onChange={(e) => setNewItemName(e.target.value)}
                placeholder="Shopping, chores, basketball..."
                />
                <Button 
                    className="btn-outline-primary" 
                    id="button-addon2"
                    onClickHandler={(e) => handleOnSubmit(e)}
                    innerText="Edit"
                />
                    
            </div>

        </div>
    );
}