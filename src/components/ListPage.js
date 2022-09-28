import React from 'react';
import { ReactComponent as Close } from '../close.svg';
import { ReactComponent as New } from '../new.svg';
import { ReactComponent as Delete } from '../delete.svg';

const ListPage = ({
  close,
  getReminders,
  show,
  newReminder,
  deleteItem,
  checked,
  setChecked,
}) => {
  const reminders = getReminders(show.title);

  return (
    <>
      {show.open ? (
        <div className="h-full z-40 p-5 w-full absolute left-0 bg-white">
          <Close
            onClick={close}
            className="ml-auto scale-75 text-gray-400 hover:text-gray-600 hover:cursor-pointer"
          />
          <h1 className="text-3xl font-bold mb-6">{show.title}</h1>
          <div className="h-fit">
            {reminders.map((reminder) => (
              <div
                className="h-fit border-b border-gray-200 mb-2"
                key={reminder.title}
              >
                <span className="flex items-center">
                  <input
                    type="checkbox"
                    className="scale-125"
                    onChange={(e) => {
                      setChecked(reminder.title, show.title);
                      const obj = {
                        title: reminder.title,
                        type: 'reminder',
                        list: show.title,
                      };
                      setTimeout(() => {
                        checked(reminder.title, show.title)
                          ? deleteItem(obj)
                          : console.log('item unchecked');
                      }, 1500);
                    }}
                    name={reminder.title}
                    id={reminder.title}
                  />
                  <label
                    htmlFor={reminder.title}
                    className={`ml-4 text-lg ${
                      checked(reminder.title, show.title)
                        ? 'text-gray-400 line-through'
                        : 'no-underline text-black'
                    }`}
                  >
                    {reminder.title}
                  </label>
                </span>
                <span className="inline-block text-sm text-gray-400 italic ml-8">
                  {reminder.notes}
                </span>
              </div>
            ))}
          </div>
          <div className="w-full flex flex-row justify-between mt-6">
            <button
              onClick={() => newReminder({ open: true, title: show.title })}
              className="w-fit flex items-center text-gray-400 hover:text-gray-600 hover:cursor-pointer"
            >
              <New className="inline-block scale-50" />
              <span className="font-bold">New To-do</span>
            </button>
            <button
              onClick={() => {
                const obj = {
                  title: show.title,
                  type: 'list',
                  list: show.title,
                };
                deleteItem(obj);
              }}
              className="w-fit flex items-center text-gray-400 hover:text-gray-600 hover:cursor-pointer"
            >
              <Delete className="inline-block scale-50" />
              <span className="font-bold">Delete list</span>
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ListPage;
