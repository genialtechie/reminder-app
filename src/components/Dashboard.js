import React, { useState, useEffect } from 'react';
import { ReactComponent as List } from '../list.svg';
import { ReactComponent as Right } from '../right.svg';
import { ReactComponent as New } from '../new.svg';
import NewList from './NewList';
import ListPage from './ListPage';
import NewReminder from './NewReminder';

const Dashboard = () => {
  const [newListBtn, setNewListBtn] = useState(false);
  const [data, setData] = useState(() => {
    const lists = JSON.parse(localStorage.getItem('lists')) || [];
    return { lists: lists };
  });
  const [openList, setOpenList] = useState({ open: false, title: '' });
  const [newReminder, setNewReminder] = useState({ open: false, title: '' });

  useEffect(() => {
    localStorage.setItem('lists', JSON.stringify(data.lists));
  }, [data]);

  function handleNewList(value) {
    if (value.length > 0) {
      const newList = {
        title: value,
        reminders: [],
      };
      setData({
        lists: [...data.lists, newList],
      });
    }
  }

  function handleListPage(value) {
    if (openList.open) {
      const list = data.lists.filter((list) => list.title === value)[0]
        .reminders;
      return list;
    }
  }

  function handleNewReminder(value, list) {
    const newReminder = {
      title: value.title,
      notes: value.notes,
      completed: value.completed,
    };
    const tempList = [...data.lists];
    const id = tempList.findIndex((obj) => obj.title === list);
    id === -1
      ? console.log('list not found')
      : tempList[id].reminders.push(newReminder);
    setData({ lists: [...tempList] });
  }

  function checkCompleted(value, list) {
    const tempList = [...data.lists];
    const listId = tempList.findIndex((obj) => obj.title === list);
    const remId = tempList[listId].reminders.findIndex(
      (obj) => obj.title === value
    );
    return data.lists[listId].reminders[remId].completed;
  }

  function setCompleted(value, list) {
    const tempList = [...data.lists];
    const listId = tempList.findIndex((obj) => obj.title === list);
    const remId = tempList[listId].reminders.findIndex(
      (obj) => obj.title === value
    );
    if (!data.lists[listId].reminders[remId].completed) {
      tempList[listId].reminders[remId].completed = true;
      setData({ lists: [...tempList] });
    } else {
      tempList[listId].reminders[remId].completed = false;
      setData({ lists: [...tempList] });
    }
    return data.lists[listId].reminders[remId].completed;
  }

  function handleDelete(value) {
    const tempList = [...data.lists];
    const listId = tempList.findIndex((obj) => obj.title === value.list);
    if (value.type === 'reminder' && listId !== -1) {
      tempList[listId].reminders = tempList[listId].reminders.filter(
        (item) => item.title !== value.title
      );
      setData({ lists: [...tempList] });
    } else if (value.type === 'list' && listId !== -1) {
      const newList = tempList.filter((item) => item.title !== value.list);
      setOpenList({ open: false, title: '' });
      setData({ lists: [...newList] });
    }
  }

  return (
    <div className="p-5 h-full flex justify-center">
      <div className="w-full relative flex flex-col justify-between lg:w-1/3">
        <div>
          <h1 className="mb-6 text-5xl font-bold">To-dos</h1>
          <div className="mx-auto bg-gray-100 p-8 mb-6 text-2xl rounded-lg hover:cursor-pointer transition duration-500 hover:bg-gray-200 ">
            All To-dos
          </div>
          <div className="h-fit mb-6">
            <h1 className="mb-4 font-bold text-3xl">My Lists</h1>
            <div className="h-fit">
              {data.lists.map((list) => (
                <div
                  className="hover:cursor-pointer transition duration-500 hover:bg-gray-50"
                  key={list.title}
                  onClick={() => setOpenList({ open: true, title: list.title })}
                >
                  <List className="scale-50 inline-block" />
                  <span>{list.title}</span>
                  <Right className="inline-block scale-50 float-right" />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="relative h-fit">
          <button
            disabled={data.lists.length === 0}
            onClick={() => setNewReminder({ open: true })}
            className="float-left rounded-lg text-center pr-3 bg-gray-50 transition duration-500 hover:bg-gray-200 disabled:bg-gray-50"
          >
            <New className="scale-50 inline-block" />
            <span>New To-do</span>
          </button>
          <button
            onClick={() => setNewListBtn(true)}
            className="float-right rounded-lg text-center py-3 px-6 bg-gray-50 transition duration-500 hover:bg-gray-200"
          >
            New List
          </button>

          <NewList
            onChange={handleNewList}
            show={newListBtn}
            close={() => setNewListBtn(false)}
          />
          <NewReminder
            show={newReminder}
            close={() => setNewReminder({ open: false, title: '' })}
            addReminder={handleNewReminder}
            lists={data.lists}
          />
        </div>
        <ListPage
          close={() => setOpenList({ open: false })}
          show={openList}
          getReminders={handleListPage}
          newReminder={setNewReminder}
          deleteItem={handleDelete}
          checked={checkCompleted}
          setChecked={setCompleted}
        />
      </div>
    </div>
  );
};

export default Dashboard;
