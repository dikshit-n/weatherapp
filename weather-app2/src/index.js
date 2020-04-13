import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
var one = document.getElementById('o')
var two = document.getElementById('t')
two.onmouseover=() => two.style="border: 1px solid whitesmoke;";
two.onmouseleave=()=> two.style="border:none;"
two.onclick=() => {
    if(two.innerHTML==="C"){
        two.innerHTML="F"
        one.innerHTML="C"
    }
    else if(two.innerHTML==="F"){
        two.innerHTML="C"
        one.innerHTML="F"
    }
}
registerServiceWorker();