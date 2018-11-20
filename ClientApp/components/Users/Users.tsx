import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import { User } from './User';

interface UsersState {
    users: IUser[];
    editUser: any;
    editIndex: number;
    userHidden: boolean
    loading: boolean;
}

export class Users extends React.Component<RouteComponentProps<{}>, UsersState> {
    constructor() {
        super();
        this.state = { users: [], editUser: null, editIndex: -1, loading: true, userHidden: true };

        fetch('api/SampleData/GetUsers')
            .then(response => response.json() as Promise<IUser[]>)
            .then(data => {
                this.setState({ users: data, loading: false });
            });
    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : <table className='table'>
                <thead>
                    <tr>
                        <th>First</th>
                        <th>Last</th>
                        <th>Address</th>
                        <th>Age</th>
                        <th><a onClick={() => this.addUser()}><span className='glyphicon glyphicon-plus'></span></a></th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.users.map(user =>
                        <tr key={user.id}>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.address}</td>
                            <td>{user.age}</td>
                            <td><a onClick={() => this.editUser(user.id)}><span className='glyphicon glyphicon-edit'></span></a></td>
                        </tr>
                    )}
                </tbody>
            </table>;

        return <div>
            <h1>Users</h1>
            <p>This component demonstrates fetching data from the server.</p>
            {contents}
            {!this.state.userHidden && this.renderUserEdit() }
        </div>;
    }
    private handleChange(user: IUser) {
        const users = this.state.users.slice();
        if (user.id === -1) {
            user.id = users.length;
            users.push(user);
        }
        else if(user.id !== undefined){
            users[this.state.editIndex] = user;
        }
        this.setState({ users: users, editIndex: -1, editUser: null, userHidden: true });

    }
    private static renderUsersTable(users: IUser[]) {
        return 
    }

    private addUser() {
        this.setState({ editUser: { id: -1 }, userHidden: false });
    }

    private editUser (idx: number) {
        this.setState({ editIndex: idx, editUser: this.state.users[idx], userHidden: false });
    }

    public renderUserEdit() {
        if (this.state.editUser !== null) {
            var user = this.state.editUser;
            return <User onChange={(user:IUser) => this.handleChange(user)} id={user.id} firstName={user.firstName} lastName={user.lastName} address={user.address} age={user.age} />;
        }
    }

    public getUserObject(i: number){
        return {
            id: this.state.users[i].id,
            firstName: this.state.users[i].firstName,
            lastName: this.state.users[i].lastName,
            address: this.state.users[i].address,
            age: this.state.users[i].age
        }
    }
}

interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    address: string;
    age: number;
}
