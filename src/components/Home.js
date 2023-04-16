import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import api from '../api';
import Button from './Button';

export default function Home() {
    const [title, setTitle] = useState('');
    const [lists, setLists] = useState([]);
    const [items, setItems] = useState([]);
    const [listDeleted, setListDeleted] = useState(false);
    const [listAdded, setListAdded] = useState(false);
    const history = useHistory();

    useEffect(() => {
        getAllLists();
        setListDeleted(false);
        setListAdded(false)
    }, [listDeleted, listAdded]);

    async function handleOnSubmit(e) {
        e.preventDefault();
        const formData = { title };

        try {
            const {data: successMessage} = await api.createList(formData);
            setListAdded(true);
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
            setListDeleted(true);
        } catch (err) {
            console.error(err);
        }
    }

    function handleRedirectToEdit(id) {
        history.push(`/editlist/${id}`);
    }

    function displayAllLists() {
        return(
            <ul>
            {lists.map((list, index) => {
                       return( 
                           <div className="row mb-4" key={index}>
                                <li className="mt-1"><Link to={`/list/${list._id}`}>{list.title}</Link></li>&emsp;
                                <Button className="btn-primary" onClickHandler={() => handleRedirectToEdit(list._id)} innerText="Edit" />
                                <Button className="btn-danger" onClickHandler={() => deleteList(list._id)} innerText="Delete" />
                            </div>
                       );
                    })
            }
            </ul>
        );
     
    }

    return (
        <div className="mt-4">
            <h1 className="mx-auto mb-5" style={{ width:'500px' }}>Welcome to your TodoList!</h1>
                <div className="input-group mb-3">
                    <input 
                        className="ml-5 px-2"
                        style={{ width:'250px' }}
                        aria-describedby="button-addon2"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Please enter a title for your list"
                    />
                    <Button 
                        className="btn-outline-primary"  
                        onClickHandler={(e) => handleOnSubmit(e)}
                        innerText="Add"
                        id="button-addon2"
                    />
                </div>
                <div className="ml-5">
                    {displayAllLists()}
                </div>
        </div>
    );
}