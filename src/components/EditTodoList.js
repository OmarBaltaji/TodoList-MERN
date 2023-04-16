import React, {useState, useEffect} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import api from '../api';
import Button from './Button';

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
         <Button className="btn-secondary mb-3" onClickHandler={() => history.push(`/`)} innerText="Go Back" />
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
                <Button 
                    className="btn-outline-primary"  
                    id="button-addon2"
                    onClickHandler={(e) => handleOnSubmit(e)} 
                  innerText='Edit'
                />
            </div>
        </div>
    );
}