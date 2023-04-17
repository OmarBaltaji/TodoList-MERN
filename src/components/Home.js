import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import api from '../api';
import Button from './common/Button';
import Form from './common/Form';
import List from './lists/List';

export default function Home() {
    const [title, setTitle] = useState('');
    const [lists, setLists] = useState([]);
    const history = useHistory();

    useEffect(() => {
        getAllLists();
    }, []);

    async function handleOnSubmit(e) {
        e.preventDefault();
        const formData = { title };

        try {
            const {data: {list: newList}} = await api.createList(formData);
            setLists(oldLists => [...oldLists, newList]);
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
            setLists(oldLists => oldLists.filter(list => list._id !== id));
        } catch (err) {
            console.error(err);
        }
    }

    function displayAllLists() {
        return(
            <div className='row col-md-12 px-5'>
                {lists.map((list, index) => (
                    <List 
                        key={index} 
                        list={list} 
                        onEditHandler={() => history.push(`/editlist/${list._id}`)} 
                        onDeleteHandler={() => deleteList(list._id)}     
                    />
                ))}
            </div>
        );
     
    }

    return (
        <div className="mt-4 d-flex align-items-center flex-column">
            <h1 className="text-center mb-5">Welcome to your TodoList!</h1>
            <Form handleOnChange={(e) => setTitle(e.target.value)} value={title} handleOnSubmit={(e) => handleOnSubmit(e)} />
            {displayAllLists()}
        </div>
    );
}