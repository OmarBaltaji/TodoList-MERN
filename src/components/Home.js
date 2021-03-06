import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import axios from 'axios';

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

    function handleOnSubmit(e) {
        e.preventDefault();

        const info = {
            title: title,
        };

        axios.post('http://localhost:5000/lists/add', info)
        .then(res => {
            console.log(res.data);
            setListAdded(true);
        })
        .catch(err => console.log(err));
    }

    function getAllLists() {
        axios.get('http://localhost:5000/lists')
        .then(res => {
            console.log(res.data)
            setLists(res.data);
        })
        .catch(err => console.log(err));
    }

    function deleteList(id) {
        axios.delete(`http://localhost:5000/lists/${id}`)
        .then(res => {
            if(res) {
                setListDeleted(true);
            }
        })
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
                                <button className="btn btn-primary" onClick={() => handleRedirectToEdit(list._id)}>
                                    Edit
                                </button> &ensp;
                                <>|</> &ensp;
                                <button className="btn btn-secondary" onClick={() => deleteList(list._id)}>Delete</button>
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
                    type="text"
                    aria-describedby="button-addon2"
                    required
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Please enter a title for your list"
                    />
                    <button className="btn btn-outline-primary" 
                    type="button" 
                    id="button-addon2"
                    onClick={(e) => handleOnSubmit(e)}>
                        Add
                    </button>
                </div>
                <div className="ml-5">
                    {displayAllLists()}
                </div>
        </div>
    );
}