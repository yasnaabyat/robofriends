import React, { Component } from 'react';
import  CardList from '../components/CardList';
import  SearchBox from '../components/SearchBox.js';
import Scroll from '../components/Scroll.js';
import ErrorBoundry from '../components/ErrorBoundry';
import './App.css';

class App extends Component  {
    constructor(){
        super()
        this.state={

            robots : [], 
            SearchField :''
        }

    }

    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response=> response.json())
        .then(users => this.setState({robots: users}));
    }

    onSearchChange = (event)=>{
        this.setState({SearchField: event.target.value })
       
       
    }

    render(){
        const{robots, SearchField}= this.state
        const filteredRobots = robots.filter(robot =>{
            return robot.name.toLowerCase().includes(SearchField.toLowerCase())
        })
        return !robots.length ?
            <h1 className='tc'>Loading...</h1> :
        (
            <div className='tc'>
            <h1 className='f2'>Robo Friends</h1>
            <SearchBox SearchChange={this.onSearchChange}></SearchBox>
            <Scroll>
             <ErrorBoundry>
                  <CardList robots ={filteredRobots }/>
             </ErrorBoundry>
            </Scroll>
            </div>
    
        );

    }
    
}


export default App;