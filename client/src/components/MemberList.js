import React from 'react';
import '../stylesheets/MemberList.css'

class MemberList extends React.Component {

    constructor(props){
        super(props);
        this.state = {
          data: []
        };
    }

    componentDidMount() {
        fetch('http://localhost:5000/user')
          .then(response => response.json())
          .then(data => this.setState({ data }));
    }

    render(){
        return(
            <div>
                <table className='memberListTable'>
                    <MemberListHeader />
                    <MemberRow user={data}/>
                </table>
            </div>
            
        );
    }
}

const MemberListHeader = () => {
    return(
        <thead>
            <tr className='memberListTableHeadRow'>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Age</th>
                <th>Student Number</th>
                <th>Phone Number</th>
                <th>Email</th>
                <th>Type of Study</th>
                <th>Course</th>
                <th>Postcode</th>
                <th>Party Member</th>
            </tr>
        </thead>   
    );
}

const MemberRow = (props) => {
    return(
        <tbody>
            <tr className='memberListTableRow'>
                <td>{props.user.lName}</td>
                <td>{props.user.fName}</td>
                <td>{props.user.age}</td>
                <td>{props.user.studentNo}</td>
                <td>{props.user.phoneNo}</td>
                <td>{props.user.email}</td>
                <td>{props.user.studyType}</td>
                <td>{props.user.course}</td>
                <td>{props.user.postcode}</td>
                <td>{props.user.member}</td>
            </tr>
        </tbody>   
    );
}

export default MemberList