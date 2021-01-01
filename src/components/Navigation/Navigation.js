import React from 'react';

const Navigation = ({onClickChange,isSignedIn}) =>{
    
        if(isSignedIn){ 
            return(
<nav style={{display:'flex', justifyContent:'flex-end'}}>
            <p onClick={()=>onClickChange('signout')} className='f3 link dim black underline pa3 pointer'>Sign Out</p>
        </nav>
            ); 
            
        }else{
            return(
<nav style={{display:'flex', justifyContent:'flex-end'}}>
        <p onClick={()=>onClickChange('signin')} className='f3 link dim black underline pa3 pointer'>Sign In</p>
        <p onClick={()=>onClickChange('register')} className='f3 link dim black underline pa3 pointer'>Register</p>
        </nav>
            );

        }
        
   
        
        
    
}

export default Navigation;