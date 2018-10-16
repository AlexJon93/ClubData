import React from 'react';
import axios from 'axios';
import Spinner from './Spinner'
import '../stylesheets/MemberList.css';

class MemberList extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            loading: true,
            data: []
        };
    }

    componentDidMount() {
        axios.get('http://localhost:5000/users')
            .then(res => {
                const data = res.data;
                this.setState({
                    data:data,
                    loading:false
                });
            })
    }

    render(){
        return(
            <div>
                {
                    this.state.loading ?
                    <Spinner /> :
                    <MemberListTable data={this.state.data}/>
                    
                }
            </div>
        );
    }
}

const MemberListHeader = () => {
    return(
        <thead>
            <tr className='memberListTableHeadRow'>
                <th>User ID</th>
                <th>Club</th>
                <th>Password</th>
            </tr>
        </thead>   
    );
}

const MemberRow = (props) => {
    return(
        <tr className='memberListTableRow'>
            <td>{props.user.userId}</td>
            <td>{props.user.club}</td>
            <td>{props.user.password}</td>
        </tr>
    );
}

const MemberListTable = (props) => {
    return(
        <table className='memberListTable'>
        <MemberListHeader />
        <tbody>
            {
                props.data.map((user, index) => <MemberRow user={user} key={user._id}/>)
            }
        </tbody>  
    </table>  
    );
}

export default MemberList