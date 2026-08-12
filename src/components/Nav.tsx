function Nav() {
  return (
    <nav>
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <ul className="flex space-x-4">
          <li><a href="#" className="px-4 py-2 bg-gray-300 hover:bg-gray-500 hover:text-amber-200 rounded-b-md">Workflows</a></li>
          <li><a href="#" className="px-4 py-2 bg-gray-300 hover:bg-gray-500 hover:text-amber-200 rounded-b-md">Login</a></li>
        </ul>
      </div>
    </nav>
  )
}

export default Nav