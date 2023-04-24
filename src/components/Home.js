import React, {useState, useEffect} from 'react';
import api from '../api';
import List from './lists/List';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { checkIfObjEmpty } from '../utilities';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
    const [title, setTitle] = useState('');
    const [lists, setLists] = useState([]);
    const [newItemName, setNewItemName] = useState('');

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
                        if(list._id === listId)
                            list = {...list, showTitleForm: false, ...data.data.list};
                        return list;
                    })
                } else {
                    const lastListIndex = [oldLists.length - 1];
                    oldLists[lastListIndex] = data.data.list;
                    return oldLists;
                }
            });
            setTitle('');
            const toastMessage = listId ? 'List updated successfully' : 'List created successfully';
            toast.success(toastMessage);
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }

    async function getAllLists() {
        try {
            const {data: {lists: fetchedLists}} = await api.getAllLists();
            const modifiedFetchedLists = await Promise.all(fetchedLists.map(async list => {
                return await getListItems(list);
            }));
            setLists(modifiedFetchedLists);
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }

    async function getListItems(list) {
        try {
            const {data: {items}} = await api.getListItems(list._id);
            list.items = items;
            return list;
        } catch (err) {
            toast.error(err.response.data.message);;
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
            toast.success('List deleted successfully');
        } catch (err) {
            toast.error(err.response.data.message);;
        }
    }

    function addNewList() {
        setLists(oldLists => [...oldLists, {}]);
    }

    const handleKeyDown = (e, listId = null) => {
        e.stopPropagation();
        if (e.key === 'Enter')
            handleOnSubmit(e, listId);
        else if (e.key === 'Escape') 
            toggleTitleForm(listId, false);
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
                {lists.map((list) => (
                    <List 
                        key={list._id ?? "new-list-key"} 
                        list={list} 
                        onDeleteHandler={() => deleteList(list._id)}
                        onChangeHandler={(e) => handleOnChange(e, list._id)}
                        onSubmitHandler={(e) => handleOnSubmit(e, list._id)}
                        titleValue={title} 
                        handleKeyDown={(e) => handleKeyDown(e, list._id)}
                        handleShowTitleForm={() => toggleTitleForm(list._id, true)}
                        itemOnChangeHandler={itemOnChangeHandler}
                        itemOnDeleteHandler={itemOnDeleteHandler}
                        itemOnSubmitHandler={itemOnSubmitHandler}
                        itemOnCheckHandler={itemOnCheckHandler}
                        itemOnHandleKeyDown={itemOnHandleKeyDown}
                        addNewItemHandler={addNewItem}
                        itemNameValue={newItemName}
                        handleShowItemNameForm={toggleItemForm}
                        handleClickOutsideForm={handleClickOutsideForm}
                    />
                ))}
                <div className='col-md-3 my-3'>
                    <div className='card shadow'>
                        <div className='card-body d-flex align-items-center justify-content-center my-5'>
                            <span 
                                className={'cursor-pointer d-flex align-items-center hoverable ' +  (lists && lists.length > 0 && checkIfObjEmpty(lists[lists?.length - 1])  ? 'pe-none' : '')}  
                                onClick={addNewList}
                            >
                                <FontAwesomeIcon className='mr-2' icon={faCirclePlus} style={{ fontSize: "2rem" }} />
                                <strong>Add List</strong>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    /* Items Handlers */
    const itemOnCheckHandler = async (e, itemId) => {
        const formData = { done: e.target.checked }

        try {
            const {data: {item: updatedItem}} = await api.updateItem(itemId, formData);
            setLists(oldLists =>
                oldLists.map(list => {
                    list.items = list.items.map(item => {
                        if(item._id === itemId) {
                            return { ...item, done: updatedItem.done };
                        }
                        return item;
                    })
                    return list;
                })
            );
        } catch (err) {
            toast.error(err.response.data.message);;
        }
    }

    const itemOnDeleteHandler = async (listId, itemId) => {
        if(!itemId) {
            setLists(oldLists => oldLists.map(list => {
                if (list._id === listId)
                    list = {...list, items: list.items.slice(0, -1)}
                return list;
            }));
        } else {
            try {
                const {data: successMessage} = await api.deleteItem(itemId);
                setLists(oldLists => 
                    oldLists.map(list => {
                        list.items = list.items.filter(item => item._id !== itemId);
                        return list;
                    })
                );
            } catch (err) {
                toast.error(err.response.data.message);;
            }
        }
    }

    const toggleItemForm = (listId, itemFromForm, shouldShow) => {
        if (!itemFromForm._id) {
            itemOnDeleteHandler(listId);
            return;
        } else if (itemFromForm.done) {
            return;
        }

        setLists(oldLists => 
            oldLists.map(list => {
                if(list._id === listId) {
                    const modifiedItems = list.items.map(item => {
                        if (item._id === itemFromForm._id)
                            item.showNameForm = shouldShow;
                        else
                            item.showNameForm = false;
                        
                        return item;
                    });
                    list = {...list, items: [...modifiedItems]};
                }
                return list;
            })
        );
    }
    
    const addNewItem = (e, listId) => {
        setLists(oldLists => (
            oldLists.map(list => {
                if(list._id === listId) {
                    if(!list.items) 
                        list.items = [];
                    list = {...list, items: [...list.items, {}]}
                }
                return list;
            })
        ));
    }

    const itemOnSubmitHandler = async (e, listId, itemFromForm) => {
        e.preventDefault();

        const formData = {
            "name":  itemFromForm.name ?? newItemName,
            "listId": listId,
        }

        try {
            let data;
            if(itemFromForm._id)
                data = await api.updateItem(itemFromForm._id, formData);
            else
                data = await api.createItem(formData);
            
            setLists(oldLists => 
                oldLists.map(list => {
                    if(list._id === listId) {
                        if(itemFromForm._id) {
                            const modifiedListItems = list.items.map(item => {
                                if(item._id === itemFromForm._id)
                                    item = data.data.item;
                                return item;
                            });
                            list = {...list, items: [...modifiedListItems]};
                        } else {
                            const lastItemIndex = list.items.length - 1;
                            list.items[lastItemIndex] = data.data.item;
                        }
                    }
                    return list;
                }) 
            );
            setNewItemName('');
        } catch (err) {
            toast.error(err.response.data.message);;
        }
    }

    const itemOnChangeHandler = (e, listId, itemId) => {
        if (itemId) {
            setLists(oldLists => 
                oldLists.map(list => {
                    if(list._id === listId) {
                        const modifiedItems = list.items.map(item => {
                            if(item._id === itemId)
                                item.name = e.target.value
                            return item;
                        });
                        list = {...list, items: [...modifiedItems]}
                    } 
                    return list;
                })
            )
        } else {
            setNewItemName(e.target.value);
        }
    }

    const itemOnHandleKeyDown = (e, listId, item) => {
        if (e.key === 'Enter')
            itemOnSubmitHandler(e, listId, item);
        else if (e.key === 'Escape')
            toggleItemForm(listId, item, false);
    }

    const handleClickOutsideForm = (listId, item) => {
        if(!listId) 
            return;

        if(item && !item._id) {
            itemOnDeleteHandler(listId);
            return;
        }

        if(item) 
            toggleItemForm(listId, item, false);
        else
            toggleTitleForm(listId, false);
    }

    return (
        <>
            <ToastContainer />
            <div className="mt-4 d-flex align-items-center flex-column">
                <h1 className="text-center mb-5">Welcome to your TodoList!</h1>
                {displayAllLists()}
            </div>
        </>
    );
}