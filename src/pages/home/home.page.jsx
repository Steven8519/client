import React from 'react';
import DeveloperService from '../../services/developer.service';
import Developer from '../../models/developer';

export default class HomePage extends React.Component{
    constructor(props) {
        super(props);


        this.state = {
            errorMessage: '',
            infoMessage: '',
            currentDeveloper: new Developer()
        }
    }

    componentDidMount() {
        DeveloperService.currentDeveloper.subscribe(data => {
            this.setState({
                currentDeveloper: data
            });
        })
    }
    
}