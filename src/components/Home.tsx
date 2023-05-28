/* eslint-disable no-restricted-globals */
import React, {useState, useEffect} from 'react';
import List from './lists/List';
import { checkIfObjEmpty } from '../utilities';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ListObject, ItemObject } from '../models';
import AddEmptyList from './lists/AddEmptyList';
import { GET_LISTS } from '../graphql/queries';
import { useQuery, useMutation, FetchResult } from '@apollo/client';
import { CREATE_LIST, DELETE_LIST, UPDATE_LIST, CREATE_ITEM, UPDATE_ITEM, DELETE_ITEM } from '../graphql/mutations';
import { CreateItemDto, ListDto, EditItemDto } from '../graphql/input.type';
import Header from './common/Header';

const Home: React.FC = () => {
    const [title, setTitle] = useState<string>('');
    const [lists, setLists] = useState<ListObject[]>([]);
    const [newItemName, setNewItemName] = useState<string>('');
    const [createListMutation, {}] = useMutation(CREATE_LIST);
    const [updateListMutation, {}] = useMutation(UPDATE_LIST);
    const [deleteListMutation, {}] = useMutation(DELETE_LIST);
    const [createItemMutation, {}] = useMutation(CREATE_ITEM);
    const [updateItemMutation, {}] = useMutation(UPDATE_ITEM);
    const [deleteItemMutation, {}] = useMutation(DELETE_ITEM);
    const { loading: loadingLists, error: listsError, data: listsData } = useQuery(GET_LISTS);


    useEffect(() => {
        if(!loadingLists)
            setLists(listsData.getLists.lists);

        if(listsError)
            toast.error(listsError.message);
    }, [loadingLists]);

    async function handleOnSubmit(e: React.FormEvent<EventTarget>, listId: string | null = null) {
        e.preventDefault();
        let formData: ListDto = { title };
        if (listId) {
            const listToUpdate = lists.find((list: ListObject) => list._id === listId);
            formData.title = listToUpdate && listToUpdate.title ? listToUpdate.title : '';
        }

        try {
            let response: FetchResult<any>;
            if (listId)
                response = await updateListMutation({ variables: { id: listId, dto: formData } });
            else
                response = await createListMutation({ variables: { dto: formData } });

            setLists(oldLists => {
                if (listId) {
                    return oldLists.map((list: ListObject) => {
                        let updatedList = { ...list };
                        if(updatedList._id === listId)
                            updatedList = { ...updatedList, showTitleForm: false, ...response.data.updateList.list };
                        return updatedList;
                    });
                } else {
                    oldLists[oldLists.length - 1] = { ...response.data.createList.list, showTitleForm: false };
                    return oldLists;
                }
            });
            setTitle('');
            const toastMessage = listId ? 'List updated successfully' : 'List created successfully';
            toast.success(toastMessage);
        } catch (err) {
            toast.error(err?.graphQLErrors[0]?.message);
        }
    }

    async function deleteList(id: string | null = null) {
        if (!id) {
            setLists(oldLists => oldLists.slice(0, -1));
            return;
        }

        if (!confirm("Are you sure you want to delete this list? All related items will be removed as well"))
            return;

        try {
            const { data: { deleteList: successMessage } } = await deleteListMutation({ variables: { id } });
            setLists(oldLists => oldLists.filter((list: ListObject) => list._id !== id));
            toast.success(successMessage);
        } catch (err) {
            toast.error(err?.graphQLErrors[0]?.message);
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
            let toggledList = { ...list };
            if (list._id === listId) {
                toggledList.showTitleForm = shouldShow;
            } else if (checkIfObjEmpty(list)) 
                deleteList();
            else 
                toggledList.showTitleForm = false;
            return toggledList;
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
        const formData: EditItemDto = { done: e.target.checked }

        try {
            const { data: { updateItem: {  item: updatedItem } } } = await updateItemMutation({ variables: { id: itemId, dto: formData } });
            setLists((oldLists) =>
                oldLists.map((list: ListObject) => {
                    const modifiedList = { ...list };
                    if(modifiedList.items) {
                        modifiedList.items = modifiedList.items.map((item: ItemObject) => {
                            if(item._id === itemId) {
                                return { ...item, done: updatedItem.done };
                            }
                            return item;
                        })
                    }
                    return modifiedList;
                })
            );
            toast.success('Item updated successfully');
        } catch (err) {
            toast.error(err?.graphQLErrors[0]?.message);
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
                const {data: {deleteItem: successMessage}} = await deleteItemMutation({ variables: { id: itemId } });
                setLists(oldLists => 
                    oldLists.map((list: ListObject) => {
                        const modifiedList = { ...list };
                        if (modifiedList.items)
                            modifiedList.items = modifiedList.items.filter((item: ItemObject) => item._id !== itemId);
                        return modifiedList;
                    })
                );
                toast.success(successMessage);
            } catch (err) {
                toast.error(err?.graphQLErrors[0]?.message);
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
                            const modifiedItem = { ...item };
                            if (item._id === itemFromForm._id)
                                modifiedItem.showNameForm = shouldShow;
                            else
                                modifiedItem.showNameForm = false;
                            
                            return modifiedItem;
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

        const formData: CreateItemDto | EditItemDto = {
            "name":  itemFromForm.name ?? newItemName,
            "listId": listId,
        }

        try {
            let response: FetchResult<any>;
            if(itemFromForm._id)
                response = await updateItemMutation({ variables: {id: itemFromForm._id, dto: formData} });
            else
                response = await createItemMutation({ variables: { dto: formData } });
            
            setLists(oldLists => 
                oldLists.map((list: ListObject) => {
                    if(list._id === listId && list.items) {
                        if(itemFromForm._id) {
                            const modifiedListItems = list.items.map((item: ItemObject) => {
                                if(item._id === itemFromForm._id)
                                    item = response.data.updateItem.item;
                                return item;
                            });
                            list = {...list, items: [...modifiedListItems]};
                        } else {
                            const lastItemIndex = list.items.length - 1;
                            list.items[lastItemIndex] = response.data.createItem.item;
                        }
                    }
                    return list;
                }) 
            );
            setNewItemName('');
            const message = itemFromForm._id ? 'Item updated successfully' : 'Item created successfully';
            toast.success(message);
        } catch (err) {
            toast.error(err?.graphQLErrors[0]?.message);
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
            <Header />
            <div className="mt-4 d-flex align-items-center flex-column">
                <h1 className="text-center mb-5">Welcome to your TodoList!</h1>
                {displayAllLists()}
            </div>
        </>
    );
}

export default Home;