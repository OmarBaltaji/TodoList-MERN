import React, {useState, useEffect} from 'react';
import api from '../api';
import List from './lists/List';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { checkIfObjEmpty } from '../utilities';

export default function Home() {
    const [title, setTitle] = useState('');
    const [lists, setLists] = useState([]);

    useEffect(() => {
        getAllLists();
    }, []);

    async function handleOnSubmit(e, listId) {
        e.preventDefault();
        let formData = { title };
        if (listId) {
            const listToUpdate = lists.find(list => list._id === listId);
            formData.title = listToUpdate.title;
        }

        try {
            let data;
            if (listId) {
                data = await api.updateList(listId, formData);
            } else {
                data = await api.createList(formData);
            }

            setLists(oldLists => {
                if (listId) {
                    return oldLists.map(list => {
                        if(list._id === listId) {
                            return data.data.list;
                        }
                        return list;
                    })
                } else {
                    const lastListIndex = [oldLists.length - 1];
                    oldLists[lastListIndex] = data.data.list;
                    return oldLists;
                }
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
            console.error(err);
        }
    }

    async function deleteList(id) {
        if (!id) {
            setLists(oldLists => oldLists.slice(0, -1));
            return;
        }

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

    const handleKeyDown = (e, listId = null) => {
        if (e.key === 'Enter')
            handleOnSubmit(e, listId);
        else if (e.key === 'Escape') {
            toggleTitleForm(listId, false);
        }
    }

    const toggleTitleForm = (listId, shouldShow) => {
        if (!listId) {
            deleteList();
            return;
        } 

        setLists(oldLists => oldLists.map(list => {
            if (list._id === listId)
                list.showTitleForm = shouldShow;
            else if (checkIfObjEmpty(list)) 
                deleteList();
            else 
                list.showTitleForm = false;
            return list;
        }));
    }

    const handleOnChange = (e, listId) => {
        if (listId) {
            setLists(oldLists => oldLists.map(list => {
                if (list._id === listId)
                    list.title = e.target.value;
                return list;
            }))
        } else {
            setTitle(e.target.value);
        }
    }

    function displayAllLists() {
        return(
            <div className='row col-md-12 px-5'>
                {lists.map((list, index) => (
                    <List 
                        key={index} 
                        list={list} 
                        onDeleteHandler={() => deleteList(list._id)}
                        onChangeHandler={(e) => handleOnChange(e, list._id)}
                        onSubmitHandler={(e) => handleOnSubmit(e, list._id)}
                        titleValue={title} 
                        handleKeyDown={(e) => handleKeyDown(e, list._id)}
                        handleShowTitleForm={() => toggleTitleForm(list._id, true)}
                        handleOnMouseLeave={() => toggleTitleForm(list._id, false)}
                    />
                ))}
                <div className='col-md-3 my-3'>
                    <div className='card'>
                        <div className='card-body d-flex align-items-center justify-content-center'>
                            <span className='cursor-pointer d-flex align-items-center' onClick={addNewList}>
                                <strong className='mr-3'>Add a new list</strong>
                                <FontAwesomeIcon icon={faCirclePlus} style={{ fontSize: "3rem" }} />
                            </span>
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