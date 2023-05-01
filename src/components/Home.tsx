/* eslint-disable no-restricted-globals */
import React, {useState, useEffect} from 'react';
import api from '../api';
import List from './lists/List';
import { checkIfObjEmpty } from '../utilities';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ListObject, ItemObject, ListResponse, ItemResponse } from '../models';
import { AxiosResponse } from 'axios';
import AddEmptyList from './lists/AddEmptyList';


const Home: React.FC = () => {
    const [title, setTitle] = useState<string>('');
    const [lists, setLists] = useState<ListObject[]>([]);
    const [newItemName, setNewItemName] = useState<string>('');

    useEffect(() => {
        getAllLists();
    }, []);

    async function handleOnSubmit(e: React.FormEvent<EventTarget>, listId: string | null = null) {
        e.preventDefault();
        let formData = { title };
        if (listId) {
            const listToUpdate = lists.find((list: ListObject) => list._id === listId);
            formData.title = listToUpdate && listToUpdate.title ? listToUpdate.title : '';
        }

        try {
            let response: AxiosResponse<ListResponse>;
            if (listId) {
                response = await api.updateList(listId, formData);
            } else {
                response = await api.createList(formData);
            }

            setLists(oldLists => {
                if (listId) {
                    return oldLists.map((list: ListObject) => {
                        if(list._id === listId)
                            list = {...list, showTitleForm: false, ...response.data.list};
                        return list;
                    })
                } else {
                    oldLists[oldLists.length - 1] = response.data.list;
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
            setLists(fetchedLists);
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }

    async function deleteList(id: string | null = null) {
        if (!id) {
            setLists(oldLists => oldLists.slice(0, -1));
            return;
        }

        if (!confirm("Are you sure you want to delete this list?"))
            return;

        const list = lists.find((list: ListObject) => list._id === id);
        if(list && list.items && list.items.length > 0) {
            toast.error("Can't delete list before removing its related items");
            return;
        }

        try {
            const {data: successMessage} = await api.deleteList(id);
            setLists(oldLists => oldLists.filter((list: ListObject) => list._id !== id));
            toast.success(successMessage);
        } catch (err) {
            toast.error(err.response.data.message);;
        }
    }

    function addNewList() {
        setLists(oldLists => [...oldLists, {}]);
    }

    function handleKeyDown (e: React.KeyboardEvent, listId: string | null = null) {
        e.stopPropagation();
        if (e.key === 'Enter')
            handleOnSubmit(e, listId);
        else if (e.key === 'Escape') 
            toggleTitleForm(listId, false);
    }

    function toggleTitleForm (listId: string | null = null, shouldShow: boolean = false) {
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

    function handleOnChange (e: React.ChangeEvent<HTMLInputElement>, listId: string | undefined) {
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

    function handleClickOutsideForm (listId: string | undefined, item: ItemObject | undefined) {
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

    function displayAllLists() {
        return(
            <div className='row col-md-12 px-5'>
                {lists.map((list: ListObject) => (
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
                <AddEmptyList lists={lists} addNewList={addNewList} />
            </div>
        );
    }

    /* Items Handlers */
    const itemOnCheckHandler = async (e: React.ChangeEvent<HTMLInputElement>, itemId: string) => {
        const formData = { done: e.target.checked }

        try {
            const {data: {item: updatedItem}} = await api.updateItem(itemId, formData);
            setLists((oldLists) =>
                oldLists.map((list: ListObject) => {
                    if(list.items) {
                        list.items = list.items.map((item: ItemObject) => {
                            if(item._id === itemId) {
                                return { ...item, done: updatedItem.done };
                            }
                            return item;
                        })
                    }
                    return list;
                })
            );
            toast.success('Item updated successfully');
        } catch (err) {
            toast.error(err.response.data.message);;
        }
    }

    const itemOnDeleteHandler = async (listId: string | undefined, itemId: string | null = null) => {
        if(!itemId) {
            setLists(oldLists => oldLists.map((list: ListObject) => {
                if (list._id === listId && list.items)
                    list = {...list, items: list.items.slice(0, -1)}
                return list;
            }));
        } else {
            if (!confirm("Are you sure you want to delete this item?"))
                return;

            try {
                const {data: successMessage} = await api.deleteItem(itemId);
                setLists(oldLists => 
                    oldLists.map((list: ListObject) => {
                        if (list.items)
                            list.items = list.items.filter((item: ItemObject) => item._id !== itemId);
                        return list;
                    })
                );
                toast.success(successMessage);
            } catch (err) {
                toast.error(err.response.data.message);;
            }
        }
    }

    const toggleItemForm = (listId: string | undefined, itemFromForm: ItemObject, shouldShow: boolean) => {
        if (!itemFromForm._id) {
            itemOnDeleteHandler(listId);
            return;
        } else if (itemFromForm.done) {
            return;
        }

        setLists(oldLists => 
            oldLists.map((list: ListObject) => {
                if(list._id === listId) {
                    if(list.items) {
                        const modifiedItems = list.items.map((item: ItemObject) => {
                            if (item._id === itemFromForm._id)
                                item.showNameForm = shouldShow;
                            else
                                item.showNameForm = false;
                            
                            return item;
                        });
                        list = {...list, items: [...modifiedItems]};
                    }
                }
                return list;
            })
        );
    }
    
    const addNewItem = (listId: string | undefined) => {
        setLists(oldLists => (
            oldLists.map((list: ListObject) => {
                if(list._id === listId) {
                    if(!list.items) 
                        list.items = [];
                    list = {...list, items: [...list.items, {}]}
                }
                return list;
            })
        ));
    }

    const itemOnSubmitHandler = async (e: React.FormEvent<EventTarget>, listId: string | undefined, itemFromForm: ItemObject) => {
        e.preventDefault();

        const formData = {
            "name":  itemFromForm.name ?? newItemName,
            "listId": listId,
        }

        try {
            let data: AxiosResponse<ItemResponse>;
            if(itemFromForm._id)
                data = await api.updateItem(itemFromForm._id, formData);
            else
                data = await api.createItem(formData);
            
            setLists(oldLists => 
                oldLists.map((list: ListObject) => {
                    if(list._id === listId && list.items) {
                        if(itemFromForm._id) {
                            const modifiedListItems = list.items.map((item: ItemObject) => {
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
            const message = itemFromForm._id ? 'Item updated successfully' : 'Item created successfully';
            toast.success(message);
        } catch (err) {
            toast.error(err.response.data.message);;
        }
    }

    const itemOnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>, listId: string | undefined, itemId: string | undefined) => {
        if (itemId) {
            setLists(oldLists => 
                oldLists.map((list: ListObject) => {
                    if(list._id === listId && list.items) {
                        const modifiedItems = list.items.map((item: ItemObject) => {
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

    const itemOnHandleKeyDown = (e: React.KeyboardEvent, listId: string, item: ItemObject) => {
        if(listId) {
            if (e.key === 'Enter')
                itemOnSubmitHandler(e, listId, item);
            else if (e.key === 'Escape')
                toggleItemForm(listId, item, false);
        }
    }

    return (
        <>
            <ToastContainer autoClose={3000} />
            <div className="mt-4 d-flex align-items-center flex-column">
                <h1 className="text-center mb-5">Welcome to your TodoList!</h1>
                {displayAllLists()}
            </div>
        </>
    );
}

export default Home;