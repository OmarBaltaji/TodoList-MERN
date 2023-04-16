import React, {useState, useEffect} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import api from '../../api';
import Button from '../common/Button';
import Form from '../common/Form';

export default function EditList() {
    // const [newListTitle, setNewListTitle] = useState('');
    const [list, setList] = useState();
    const params = useParams();
    const history = useHistory();

    useEffect(() => {
        getList();
    }, [params.id]);

    async function getList() {
        try {
            const {data: { list }} = await api.getList(params.id)
            setList(list);
        } catch (err) {
            console.error(err);
        }
    }

    async function handleOnSubmit(e) {
        e.preventDefault();
        const formData = { title: list.title }

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
            {list && <Form 
                value={list.title}
                handleOnChange={(e) => setList(oldValue => ({ ...oldValue, title: e.target.value }))}
                handleOnSubmit={(e) => handleOnSubmit(e)}
                isEdit={true}
            />}
        </div>
    );
}