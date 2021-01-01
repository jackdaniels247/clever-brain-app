import React from 'react';

import './App.css';
import Navigation from './components/Navigation/Navigation.js';
import Logo from './components/Logo/Logo.js';
import ImageFormLink from './components/ImageFormLink/ImageFormLink.js';
import Rank from './components/Rank/Rank.js';
import Particles from 'react-particles-js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js';
import Signin from './components/Signin/Signin.js';
import Register from './components/Register/Register.js';

 



const particalsOptions={
  particles: {
   number:{
     value:120,
     density:{
       enable:true,
       value_area:800
     }
   }
}
}
const initialState={input:'',
imageUrl:'',
box:{},
route:'signin',
isSignedIn:false,
user:{
  id:'',
  name:'',
  email:'',
  
  entries:0,
  joined:''}
}
class App extends React.Component{
constructor(){
  super();
  this.state=initialState;

  }


loadUser=(data)=>{
this.setState({
  user:{
    id:data.id,
    name:data.name,
    email:data.email,
    
    entries:data.entries,
    joined:data.joined
}
})
}

calculate=(data)=>{
  const clariface=data.outputs[0].data.regions[0].region_info.bounding_box;
  const image = document.getElementById('inputimage');
  const iwidth=Number(image.width);
  const iheight=Number(image.height);
  console.log(iwidth,iheight);
  return {
    leftCol: clariface.left_col * iwidth,
    topRow:clariface.top_row * iheight,
    rightCol:iwidth-(clariface.right_col * iwidth),
    
    bottomRow:iheight-(clariface.bottom_row *iheight)
    
  };

}
displayFaceBox=(box)=>{
  console.log(box);
  this.setState({box:box});
  
}


onInputChange=(event)=>{
  this.setState({input:event.target.value});
}
onButtonSubmit=()=>{
  this.setState({imageUrl:this.state.input});
  fetch('https://whispering-savannah-29487.herokuapp.com/imageurl',{
    method:'post',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({
      input:this.state.input
      
    })
  })
    .then(response=>response.json())
.then(response=> {
  if(response){
    fetch('https://whispering-savannah-29487.herokuapp.com/image',{
    method:'put',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({
      id:this.state.user.id
      
    })
  })
  .then(response=>response.json())
  .then(count=>{
    this.setState(Object.assign(this.state.user,{entries:count}));
  })
  .catch(console.log);
  }
  this.displayFaceBox(this.calculate(response))
})
.catch(err=>{console.log(err)});
}
onClickChange=(route)=>{
  
  if(route==='signout'){
    this.setState(initialState);
  }else if(route==='home'){
    this.setState({isSignedIn:true});
  }
  this.setState({route:route});
 
}

  render(){
    return (
      <div className="App">
        <Particles className='particles'
                params={particalsOptions}
                
              />
        <Navigation isSignedIn={this.state.isSignedIn} onClickChange={this.onClickChange} />
        { this.state.route==='home' 
       ? <div>
       <Logo />
        <Rank name={this.state.user.name} entries={this.state.user.entries}/>
        <ImageFormLink onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
        <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
        </div>
       : (this.state.route==='signin'
          ? <Signin loadUser={this.loadUser} onClickChange={this.onClickChange} />
          :<Register loadUser={this.loadUser} onClickChange={this.onClickChange} /> 
       )
        }
        
       
        
      </div>
    );
  }
}

  


export default App;
