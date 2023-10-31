import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import '../styles/NavigationBar.css';

function NavigationBar() {
    return ( 
        <AppBar position='static' className="bg-quarternary">
            <Toolbar disableGutters>
                <div className='navbar'>
                    <ul className='nav-list'>
                        <li className='nav-item'><a href='/'><i className='fa fa-home fa-2x secondary'></i></a></li>
                        <li className='nav-item'><a href='/lists'><i className='fa fa-list fa-2x secondary'></i></a></li>
                    </ul>
                </div>
            </Toolbar>
        </AppBar>
    )
}

export default NavigationBar;