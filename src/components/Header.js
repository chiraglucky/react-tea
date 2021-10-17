/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { useHistory } from 'react-router';


const Header = () => {
    const history=useHistory();

    const handleClick=()=>{
        history.push({
            pathname:"/search",
            state:{
                flag:false,
            }
          })
    }

    return (
        <div id="main">
            <div className="header-heading">
                <h3>A REST API for finest teas </h3>
                <h1><span>TEA </span>FOR<br/>WEEK</h1>
                <h3 className="details">Ek Chai ho Jaaye ?</h3>
                <div className="header-btns">
                    <button className="header-btn" onClick={handleClick}>Sip Now</button>
                </div>
            </div>
        </div>
    )
}

export default Header;
