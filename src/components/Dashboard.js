import React, { useState } from 'react';
import { ReactComponent as List } from '../list.svg';
import { ReactComponent as Right } from '../right.svg';
import { ReactComponent as New } from '../new.svg';
import NewList from './NewList';
import ListPage from './ListPage';
import NewReminder from './NewReminder';

const lists = [
  {
    title: 'Learning',
    reminders: [
      {
        title: 'JS tutorial',
        notes: 'frontend masters tutorial',
        completed: false,
      },
      {
        title: 'Elements of style',
        notes: 'book',
        completed: false,
      },
    ],
  },
  {
    title: 'Shopping',
    reminders: [
      {
        title: 'M1 mac',
        notes: 'laptop',
        completed: false,
      },
      {
        title: 'extension cables',
        notes: '',
        completed: false,
      },
    ],
  },
];

const Dashboard = () => {
  const [newListBtn, setNewListBtn] = useState(false);
  const [data, setData] = useState({ lists: lists });
  const [openList, setOpenList] = useState({ open: false, title: '' });
  const [newReminder, setNewReminder] = useState({ open: false, title: '' });

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
    setData(
      data.lists.map((obj) => {
        if (obj.title === list) {
          obj.reminders.map((reminder) => {
            if (reminder.title === value.title) return reminder;
            else return { ...newReminder };
          });
        }
        return obj;
      })
    );
  }

  return (
    <div className="p-5 h-full flex justify-center">
      <div className="w-full relative flex flex-col justify-between lg:w-1/3">
        <div>
          <h1 className="mb-6 text-5xl font-bold">Reminders</h1>
          <div className="mx-auto bg-gray-100 p-8 mb-6 text-2xl rounded-lg hover:cursor-pointer transition duration-500 hover:bg-gray-200 ">
            All
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
            onClick={() => setNewReminder({ open: true })}
            className="float-left rounded-lg text-center pr-3 bg-gray-50 transition duration-500 hover:bg-gray-200"
          >
            <New className="scale-50 inline-block" />
            <span>New Reminder</span>
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
          />
        </div>
        <ListPage
          close={() => setOpenList({ open: false })}
          show={openList}
          getReminders={handleListPage}
          newReminder={setNewReminder}
        />
      </div>
    </div>
  );
};

export default Dashboard;
