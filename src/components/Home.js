import React, {useState, useEffect} from 'react';
import { useHistory} from 'react-router-dom';
import api from '../api';
import List from './lists/List';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';

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
            setLists(oldLists => {
                const lastListIndex = [oldLists.length - 1];
                oldLists[lastListIndex] = newList;
                return oldLists;
            });
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

    function addNewList() {
        setLists(oldLists => [...oldLists, {}]);
    }

    const handleKeyDown = (e) => {
        if(e.key === 'Enter')
            handleOnSubmit(e);
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
                        onChangeHandler={(e) => setTitle(e.target.value)}
                        onSubmitHandler={(e) => handleOnSubmit(e)}
                        titleValue={title} 
                        handleKeyDown={handleKeyDown}
                    />
                ))}
                <div className='col-md-3 my-3'>
                    <div className='card'>
                        <div className='card-body d-flex align-items-center justify-content-center'>
                            <strong className='mr-3'>Add a new list</strong>
                            <FontAwesomeIcon icon={faCirclePlus} style={{ fontSize: "3rem" }} onClick={addNewList} />
                        </div>
                    </div>
                </div>
            </div>
        );
     
    }

    return (
        <div className="mt-4 d-flex align-items-center flex-column">
            <h1 className="text-center mb-5">Welcome to your TodoList!</h1>
            {displayAllLists()}
        </div>
    );
}