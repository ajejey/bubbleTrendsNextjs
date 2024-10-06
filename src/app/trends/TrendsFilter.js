import React from 'react';
import { redirect } from 'next/navigation'

export default function TrendsFilter() {

  async function handleSubmit(formData) {
    'use server'
    const date = formData.get('date');
    redirect(`/trends?date=${date}`);
  }

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().slice(0, 10);

  return (
    <form action={handleSubmit} className="flex justify-center gap-4 max-w-sm mx-auto mt-6">
      <div className="mb-4">
        <label htmlFor="date" className="block text-gray-700 text-sm font-bold mb-2">
          Filter by Date:
        </label>
        <input
          type="date"
          id="date"
          name="date"
          max={today}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="flex items-center justify-between mt-4">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Apply
        </button>
      </div>
    </form>
  );
}