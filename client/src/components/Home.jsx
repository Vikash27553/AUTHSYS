
function Home() {
  return (
    <div>
     <header>      
       <nav className='mx-auto flex bg-gradient-to-r from-blue-500 to-purple-600 items-center  justify-around p-4 gap-10 relative w-full'>
        {/* <img src={logo} className='h-10  w-10 left-15 top-2 z-10  absolute'/> */}
        <ul className='flex  text-white  gap-10'>
          <li> <a href="/"> Home </a></li>
          <li> <a href="/about"> About </a></li>
          <li> <a href="/contact"> Contact </a></li>

        </ul>

      </nav>
     </header>
    </div>
  )
}

export default Home
