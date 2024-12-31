const Login = () => {
  return (
    <section className="text-gray-600 body-font h-screen flex items-center justify-center">
      <div className="container px-5 py-24 mx-auto flex justify-center items-center">
        <div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col w-full mt-10 md:mt-0">
          <h2 className="text-gray-900 text-lg font-medium title-font mb-5 text-center">Sign In</h2>
          <div className="relative mb-4">
            <label htmlFor="username" className="leading-7 text-sm text-gray-600">Username</label>
            <input type="text" id="full-name" name="full-name" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-2 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
          <div className="relative mb-4">
            <label htmlFor="password" className="leading-7 text-sm text-gray-600">Password</label>
            <input type="password" id="password" name="password" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-2 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
          <button className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg w-full">Sign In</button>
          <p className="text-xs text-gray-500 mt-3 text-center">Protected for Admins only.</p>
        </div>
      </div>
    </section>
  )
}

export default Login
