import React, {useState, useEffect} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import axios from 'axios';

export default function EditItem() {
    const [newItemName, setNewItemName] = useState('');
    const [itemInfo, setItemInfo] = useState([]);
    const params = useParams();
    const history = useHistory();

    useEffect(() => {
        getItemInfo();
    }, []);

    function getItemInfo() {
        axios.get(`http://localhost:5000/items/${params.id}`)
        .then(res => {
            console.log(res.data);
            setItemInfo(res.data);
        })
    }

    function handleOnSubmit(e) {
        e.preventDefault();

        const info = {
            name: newItemName,
        }

        axios.put(`http://localhost:5000/items/update/${params.id}`, info)
        .then(res => {
            history.goBack();
        })
        .catch(err => console.log(err))
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
                <button className="btn btn-outline-primary" 
                type="button" 
                id="button-addon2"
                onClick={(e) => handleOnSubmit(e)}>
                    Edit
                </button>
            </div>

        </div>
    );
}