import React, {useState, useEffect} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import api from '../api';

export default function EditItem() {
    const [newListTitle, setNewListTitle] = useState('');
    const [listInfo, setListInfo] = useState([]);
    const params = useParams();
    const history = useHistory();

    useEffect(() => {
        getListInfo();
    }, []);

    async function getListInfo() {
        try {
            const {data: { list }} = await api.getList(params.id)
            setListInfo(list);
        } catch (err) {
            console.error(err);
        }
    }

    async function handleOnSubmit(e) {
        e.preventDefault();

        const formData = { title: newListTitle }

        try {
            const {data: successMessage} = await api.updateList(params.id, formData);
            history.goBack();
        } catch(err) {
            console.error(err);
        } 
    }

    return (
        <div className="container mt-4">
         <a href={`/`} style={{ maginBottom:'30px' }}>Go Back</a>
            <div className="input-group mb-3">
                <label className="mt-1">Edit List:</label>
                <input 
                className="ml-4 px-2"
                style={{ width:'250px' }}
                id="item_name"
                type="text"
                aria-describedby="button-addon2"
                required
                defaultValue={listInfo.title}
                onChange={(e) => setNewListTitle(e.target.value)}
                placeholder="Insert title"
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