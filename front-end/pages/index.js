import Dashboard from './dashboard/Dashboard'
import React, { useState } from 'react'

/**
 * The home page of the website.
 * @return {JSX.Element}
 */
export default function Home() {
  const [loggedIn, setLogin] = useState(true)
  const [display, setDisplay] = useState(0) //0, 1, 2 (dashboard, business process, log events)   
  const [bpFilters, setbpFilters] = useState(null)
  const [logeventFilters, setlogeventFilters] = useState(null)

  const [value, setValue] = React.useState(0);

  const toggleNav = (event, tab) => {
    setDisplay(tab);
  };


  if (loggedIn) {
    return (
      <div>
        {/* <NavBar onChange={toggleNav} />*/}
        {display == 0
          ? <Dashboard />
          : display == 1
            ? <div>Business Process</div>
            : <div>Log Events</div>
        }
      </div>
    )
  }
  return (
    <div>Login</div>
  )
}
