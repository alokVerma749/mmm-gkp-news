'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import bcrypt from 'bcryptjs';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Hash the password before sending it to the server
    const hashedPassword = await bcrypt.hash(password, 10);

    const response = await fetch('/api/admin-register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password: hashedPassword }),
    });

    const data = await response.json();

    if (response.ok) {
      router.push('/login');
    } else {
      setError(data.message);
    }
  };

  return (
    <section className="text-gray-600 body-font flex items-center justify-center">
      <div className="container px-5 py-24 mx-auto flex justify-center items-center">
        <form onSubmit={handleSubmit} className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col w-full mt-10 md:mt-0">
          <h2 className="text-gray-900 text-lg font-medium title-font mb-5 text-center">Register</h2>

          <div className="relative mb-4">
            <label htmlFor="username" className="leading-7 text-sm text-gray-600">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-2 px-3 leading-8 transition-colors duration-200 ease-in-out"
              required
            />
          </div>

          <div className="relative mb-4">
            <label htmlFor="password" className="leading-7 text-sm text-gray-600">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-2 px-3 leading-8 transition-colors duration-200 ease-in-out"
              required
            />
          </div>

          {error && <p className="text-red-500 text-xs mb-4">{error}</p>}
          <button type="submit" className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg w-full">Register</button>
          <p className="text-xs text-gray-500 mt-3 text-center">Protected for Admins only.</p>
        </form>
      </div>
    </section>
  );
};

export default Register;
