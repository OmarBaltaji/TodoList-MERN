import React, {useState, useEffect} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import axios from 'axios';

export default function EditItem() {
    const [newListTitle, setNewListTitle] = useState('');
    const [listInfo, setListInfo] = useState([]);
    const params = useParams();
    const history = useHistory();

    useEffect(() => {
        getListInfo();
    }, []);

    function getListInfo() {
        axios.get(`http://localhost:5000/api/v1/lists/${params.id}`)
        .then(res => {
            console.log(res.data);
            setListInfo(res.data);
        })
    }

    function handleOnSubmit(e) {
        e.preventDefault();

        const info = {
            title: newListTitle,
        }

        axios.put(`http://localhost:5000/api/v1/lists/${params.id}`, info)
        .then(res => {
            history.goBack();
        })
        .catch(err => console.log(err))
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