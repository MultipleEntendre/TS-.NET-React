import * as React from 'react';
import { RouteComponentProps } from 'react-router';

interface UserState {
    id: number;
    firstName: string;
    lastName: string;
    address: string;
    age: number;
}

export class User extends React.Component<IUser, UserState> {
    constructor(props: IUser) {
        super(props);
        this.state = { id: props.id, firstName: props.firstName, lastName: props.lastName, address: props.address, age: props.age };
    }

    public render() {
        return <div>
            <div>
                First Name: <input onChange={e => this.handleChange(e, 'firstName')} value={this.state.firstName}/>
            </div>
            <div>
                Last Name: <input onChange={e => this.handleChange(e, 'lastName')} value={this.state.lastName} />
            </div>
            <div>
                Address: <input onChange={e => this.handleChange(e, 'address')} value={this.state.address } />
            </div>
            <div>
                Age: <input onChange={e => this.handleChange(e, 'age')} value={this.state.age} />
            </div>
            <div>
                <button onClick={() => this.props.onChange(this.state)}>Save</button>
                <button onClick={() => this.props.onChange({})}>Cancel</button>
            </div>
        </div>;
    }

    handleChange(e:any, item: string) {
        var val = e.target.value;
        switch (item) {
            case 'age':
                this.setState({ age: val });
                break;
            case 'address':
                this.setState({ address: val })
                break;
            case 'firstName':
                this.setState({ firstName: val })
                break;
            case 'lastName':
                this.setState({ lastName: val })
                break;
            default:
                break;
        }
        
        
    }
}

interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    address: string;
    age: number;
    onChange: Function;
}