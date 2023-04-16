import React, {useState, useEffect} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import api from '../../api';
import Button from '../common/Button';
import Form from '../common/Form';

export default function EditItem() {
    const [item, setItem] = useState();
    const params = useParams();
    const history = useHistory();

    useEffect(() => {
        getItem();
    }, []);

    async function getItem() {
        try {
            const {data: {item: fetchedItem}} = await api.getItem(params.id)
            setItem(fetchedItem);
        } catch (err) {
            console.error(err);
        }
    }

    async function handleOnSubmit(e) {
        e.preventDefault();
        const formData = { name: item.name }

        try {
            api.updateItem(params.id, formData)
            history.goBack();
        } catch (err) {
            console.error(err);
        } 
    }

    return (
        <div className="container mt-4">
        <Button className="btn-secondary mb-3" onClickHandler={() => history.push(`/list/${item.listId}`)} innerText="Go Back" />
        {item && <Form 
            value={item.name}
            handleOnChange={(e) => setItem(oldValue => ({ ...oldValue, name: e.target.value}))}
            handleOnSubmit={(e) => handleOnSubmit(e)}
            isEdit={true}
            inputPlaceholder='Enter item name i.e., Shopping, chores...'
        />}
        </div>
    );
}