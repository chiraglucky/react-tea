import React from 'react'
import { useHistory } from 'react-router';
import UserDataService from '../api/UserDataService';


const ProductBox = (props) => {
    const {name,image}=props;
    const history=useHistory();

    const handleClick=()=>{
        UserDataService.getTeasByCollection(name).then(
            (response)=>{
                // console.log(response.data);
                window.scrollTo(0,0);
                history.push({
                    pathname:"/search",
                    state:{
                        flag:true,
                        data:response.data
                    }
                  })
            }
        )
    }

    
    return (
        <div className="a-box">
            <div className="a-b-img">
                <img src={image} alt=""/>
            </div>

            <div className="a-b-text">
                <h2>{name}</h2>
                <button className="productbox-button" onClick={handleClick}>Explore Now</button>
            </div>
        </div>
    )
}

export default ProductBox;
