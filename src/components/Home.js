import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import api from '../api';
import Button from './Button';
import Form from './Form';

export default function Home() {
    const [title, setTitle] = useState('');
    const [lists, setLists] = useState([]);
    const [areListsChanged, setAreListsChanged] = useState(false);
    const history = useHistory();

    useEffect(() => {
        getAllLists();
    }, [areListsChanged]);

    async function handleOnSubmit(e) {
        e.preventDefault();
        const formData = { title };

        try {
            const {data: successMessage} = await api.createList(formData);
            setAreListsChanged(oldValue => !oldValue);
            setTitle('');
        } catch (err) {
            console.error(err);
        }
    }

    async function getAllLists() {
        try {
            const {data: {lists}} = await api.getAllLists();
            setLists(lists);
        } catch (err) {
            console.err(err);
        }
    }

    async function deleteList(id) {
        try {
            const {data: successMessage} = await api.deleteList(id);
            setAreListsChanged(oldValue => !oldValue);
        } catch (err) {
            console.error(err);
        }
    }

    function displayAllLists() {
        return(
            <ul>
                {lists.map((list, index) => (
                    <div className="row mb-4" key={index}>
                        <li className="mt-1 mr-4"><Link to={`/list/${list._id}`}>{list.title}</Link></li>
                        <Button className="btn-primary" onClickHandler={() => history.push(`/editlist/${list._id}`)} innerText="Edit" />
                        <Button className="btn-danger" onClickHandler={() => deleteList(list._id)} innerText="Delete" />
                    </div>
                    )
                )}
            </ul>
        );
     
    }

    return (
        <div className="mt-4 row align-items-center flex-column">
            <h1 className="text-center mb-5">Welcome to your TodoList!</h1>
            <Form handleOnChange={(e) => setTitle(e.target.value)} value={title} handleOnSubmit={(e) => handleOnSubmit(e)} />
            <div className="ml-5">
                {displayAllLists()}
            </div>
        </div>
    );
}