import React from 'react';
import Dashboard from './dashboard/Dashboard';
// import "./index.css"

/**
 * @param {*} props
 * @return {JSX.Element}
 */
export default function Home(props) {
  return (
    <Dashboard {...props}/>
  );
}
