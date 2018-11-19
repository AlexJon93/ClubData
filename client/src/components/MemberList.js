import React from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';
import Spinner from './Spinner'
import '../stylesheets/MemberList.css';

const cookies = new Cookies();

class MemberList extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            loading: true,
            data: []
        };
    }

    componentDidMount() {
        var config = {
            headers: {'Authorization': 'Bearer ' + cookies.get('jwt')}
        }

        axios.get(
            'http://localhost:5000/users',
            config
        )
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
            <td>{props.user.email}</td>
            <td>{props.user.club}</td>
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