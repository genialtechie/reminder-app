import React from 'react';
import { ReactComponent as Close } from '../close.svg';

const NewReminder = ({ close, show, addReminder }) => {
  return (
    <>
      {show.open ? (
        <div className="absolute -top-80 h-fit p-6 w-full z-50 rounded-t-xl bg-gray-50">
          <Close
            onClick={close}
            className="ml-auto scale-75 text-gray-400 hover:text-gray-600 hover:cursor-pointer"
          />
          <h1 className="mb-8 font-bold text-3xl">Create New Reminder</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const newReminder = {
                title: e.target.title.value,
                notes: e.target.title.notes || '',
                completed: false,
              };
              const title = show.title || '';
              // addReminder(newReminder, title);
              console.log(addReminder);
              close();
            }}
            className="w-11/12 mx-auto"
          >
            <input
              name="title"
              type="text"
              className="bg-slate-200 mb-3 p-2 italic w-full rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500"
              placeholder="Enter reminder title"
            />
            <input
              name="notes"
              type="text"
              className="bg-slate-200 mb-3 p-2 italic w-full rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500"
              placeholder="Notes"
            />

            <button className="rounded-lg text-center p-3 bg-slate-300 transition duration-500 hover:bg-slate-400 mt-4">
              Add
            </button>
          </form>
        </div>
      ) : null}
    </>
  );
};

export default NewReminder;
