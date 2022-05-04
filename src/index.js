import React from 'react'
import ReactDOM from 'react-dom/client'
import SeasonDisplay from './SeasonDisplay';
import Spinner from './Spinner';

class App extends React.Component {

    state = {lat: null, errorMessage: ''};

    componentDidMount(){
        window.navigator.geolocation.getCurrentPosition(
            (position) => 
                //call setState to update state!
                this.setState({lat: position.coords.latitude}),
            (error) => 
                this.setState({errorMessage: error.message})
        );
    }

    renderContent(){
        if(this.state.errorMessage && !this.state.lat){
            return <div>Error: {this.state.errorMessage}</div>
        }
        if(!this.state.errorMessage && this.state.lat){
            return <SeasonDisplay lat={this.state.lat} />
        }
        return <Spinner message='Please accept location request'/>
    }

    //render required or will get error
    render(){
        return (
            <div className='border red'>
                {this.renderContent()}
            </div>
        )
    }
}

const container = document.querySelector('#root');
const root = ReactDOM.createRoot(container)
root.render(
    <App />,
)