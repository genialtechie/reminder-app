import React from 'react';
import { ReactComponent as Close } from '../close.svg';

const NewReminder = ({ close, show, addReminder, lists }) => {
  return (
    <>
      {show.open ? (
        <div className="absolute -top-96 h-fit p-6 w-full z-50 rounded-t-xl bg-gray-50">
          <Close
            onClick={close}
            className="ml-auto scale-75 text-gray-400 hover:text-gray-600 hover:cursor-pointer"
          />
          <h1 className="mb-9 font-bold text-3xl">Create New Reminder</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const newReminder = {
                title: e.target.title.value,
                notes: e.target.notes.value || '',
                completed: false,
              };
              const title = e.target.list.value;
              addReminder(newReminder, title);
              close();
            }}
            className="w-11/12 mx-auto"
          >
            <input
              name="title"
              type="text"
              className="bg-slate-200 mb-5 p-2 italic w-full rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500"
              placeholder="Enter reminder title"
            />
            <input
              name="notes"
              type="text"
              className="bg-slate-200 mb-5 p-2 italic w-full rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500"
              placeholder="Notes"
            />
            <select
              name="list"
              id="list"
              className="w-full mb-2 p-2 px-1 bg-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500"
            >
              {show.title ? (
                <option value={show.title}>{show.title}</option>
              ) : (
                lists.map((list) => (
                  <option
                    key={list.title}
                    value={list.title}
                  >
                    {list.title}
                  </option>
                ))
              )}
            </select>

            <button className="rounded-lg text-center p-3 bg-slate-300 transition duration-500 hover:bg-slate-400 my-4">
              Add
            </button>
          </form>
        </div>
      ) : null}
    </>
  );
};

export default NewReminder;
