import axios from 'axios';
import {BehaviorSubject} from 'rxjs';
import {register} from "../serviceWorker";

const API_URL = 'http://devhubsocial.com/api/v1/developers';
const currentDeveloperSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentDeveloper')));
class DeveloperService {
    get currentDeveloperValue() {
        return currentDeveloperSubject.value;
    }

    get currentDeveloper() {
        return currentDeveloperSubject.asObservable();
    }

    login(developer) {
        const headers = {
            authorization: 'Basic ' + btoa(developer.username + ':' + developer.password)
        };
        return axios.get(API_URL + 'login', {headers: headers}).then(response => {
            localStorage.setItem('currentDeveloper', JSON.stringify(response.data));
        });
    }

    logOut() {
        return axios.post(API_URL + 'logout', {}).then(response => {
            localStorage.removeItem('currentDeveloper');
            currentDeveloperSubject.next(null);

        });
    }

    register(developer) {
        return axios.post(API_URL + 'registration', JSON.stringify(developer),
            {headers: {'Content=Type': 'application/json; charset-UTF-8'}});
    }
}

export default new DeveloperService();
