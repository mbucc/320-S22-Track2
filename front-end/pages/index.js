import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

import {TextField} from '@mui/material';
import Dashboard from './dashboard/Dashboard';

/**
 * The home page of the website.
 * @return {JSX.Element}
 */
export default function Home() {
  return (
    <Dashboard />
  );
}
