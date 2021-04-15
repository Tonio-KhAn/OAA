import React, { useState, useEffect } from 'react';
import '../../App.css';
import {connect} from 'react-redux';
import axios from "axios";
import { Bar } from 'react-chartjs-2';

import {Row, Col, Card} from 'react-bootstrap';

import Aux from "../../hoc/_Aux/index";

function Reports(props) {
    
    const [chartUser, setUser] = useState({
        labels: ['Users'],
        datasets:[
            {label: "No. Of Users",
            data: [],
            color: "#3ebfea"
            }
        ]
    })

    

    const [chartCourse, setCourse] = useState({
        labels: ['Courses'],
        datasets:[
            {
                label: 'No. of Enrolled Courses',
                data:[ 
                ],
                backgroundColor:[
                ]
            }
        ]
    })

    const [chartSkill, setSkill] = useState({
        labels: ['Skills'],
        datasets:[
            {
                label: 'No. of Skills',
                data:[ 
                ],
                backgroundColor:[
                ]
            }
        ]
    })
    
    function userData() {
        const config = {
            headers: {}
        };

        axios
            .get(
                "/adminroute/users/",
                config
            )
            .then(
                result => {
                    const userType = [];
                    for (let index = 0; index < result.data.length; index++) {
                        userType[index] = result.data[index].type;
                    }
                    const uniqueType = [...new Set(userType)];
                    const userCount = [];
                    for (let loc = 0; loc < uniqueType.length; loc++) {
                        userCount[loc] = 0;
                    }
                    for (let loc = 0; loc < uniqueType.length; loc++) {
                        for (let index = 0; index < result.data.length; index++) {
                            if (result.data[index].type === uniqueType[loc]) {
                                userCount[loc]++;
                            }    
                        }
                    }

                    setUser({
                        labels: uniqueType,
                        datasets:[
                            {
                                label: 'No. of Users',
                                data:userCount,
                                backgroundColor:[
                                'rgba(255, 99, 132, 0.6)',
                                'rgba(54, 162, 235, 0.6)'
                                ]
                            }
                        ]
                    });
                    
                }
            )
            .catch(error => console.log(error));       
    }
    function courseData() {
        const config = {
            headers: {}
        };

        axios
            .get(
                "/adminroute/qualifications/",
                config
            )
            .then(
                result => {
                    const courseType = [];
                    let count = 0;
                    for (let index = 0; index < result.data.length; index++) {
                        for (let loc = 0; loc < result.data[index].courses.length; loc++) {
                            courseType[count] = result.data[index].courses[loc].name;
                            count++;
                        } 
                    }
                    const uniqueType = [...new Set(courseType)];
                    const courseCount = [];
                    for (let loc = 0; loc < uniqueType.length; loc++) {
                        courseCount[loc] = 0;
                    }
                    for (let loc = 0; loc < uniqueType.length; loc++) {
                        for (let index = 0; index < result.data.length; index++) {
                            for (let x = 0; x < result.data[index].courses.length; x++) {
                                if (result.data[index].courses[x].name === uniqueType[loc]) {
                                    courseCount[loc]++;
                                } 
                            }   
                        }
                    }

                    setCourse({
                        labels: uniqueType,
                        datasets:[
                            {
                                label: 'No. of Enrolled Courses',
                                data: courseCount,
                                backgroundColor:[
                                'rgba(255, 99, 132, 0.6)',
                                'rgba(54, 162, 235, 0.6)'
                                ]
                            }
                        ]
                    });
                }
            )
            .catch(error => console.log(error));       
    }

    function skillData() {
        const config = {
            headers: {}
        };

        axios
            .get(
                "/adminroute/qualifications/",
                config
            )
            .then(
                result_qual => {
                    axios
                        .get(
                            "/adminroute/course/",
                            config
                        )
                        .then(
                            result_course => {
                                axios
                                    .get(
                                        "/adminroute/skill",
                                        config
                                    )
                                    .then(
                                        result_skill => {
                                            const skillType = [];
                                            for (let index = 0; index < result_skill.data.length; index++) {
                                                    skillType[index] = result_skill.data[index].name
                                            }
                                            const uniqueType = [...new Set(skillType)];
                                            const skillCount = [];
                                            for (let loc = 0; loc < uniqueType.length; loc++) {
                                                skillCount[loc] = 0;
                                            }
                                            for (let loc = 0; loc < uniqueType.length; loc++) {
                                                for (let index = 0; index < result_qual.data.length; index++) {
                                                    for (let x = 0; x < result_course.data.length; x++) {
                                                        if (result_qual.data[index].courses.find(({ name }) => name === result_course.data[x].courseTitle)) {
                                                            if (result_course.data[x].skills.find(({ name }) => name === uniqueType[loc])) {
                                                                skillCount[loc]++;
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                            setSkill({
                                                labels: uniqueType,
                                                datasets:[
                                                    {
                                                        label: 'No. of Skills',
                                                        data: skillCount,
                                                        backgroundColor:[
                                                        'rgba(255, 99, 132, 0.6)',
                                                        'rgba(54, 162, 235, 0.6)'
                                                        ]
                                                    }
                                                ]
                                            });
                                        }
                                    )
                                    .catch(error => console.log(error));
                            }
                        )
                        .catch(error => console.log(error));
                }
            )
            .catch(error => console.log(error));      
    }
 
    useEffect(() => {
        userData();
        courseData();
        skillData();
    }, []);
    
    return (
        <div >
            <Card><Card.Header><h1 className='hh'>Reports </h1></Card.Header></Card>
            <Aux>
                <Row>
                    <Col md={6}>
                        <Card>
                            <Card.Header>
                                <Card.Title className='biglabel'>Types Of Users</Card.Title>
                            </Card.Header>
                            <Card.Body>
            <div type="discreteBarChart">
                <Bar type="discreteBarChart"
                    data={chartUser}
                    options={{
                        maintainAspectRatio: false
                    }}
                />
            </div>
            </Card.Body>
            </Card></Col>
            <Col md={6}>
                        <Card>
                            <Card.Header>
                                <Card.Title className='biglabel'>Types Of Skills</Card.Title>
                            </Card.Header>
                            <Card.Body>
            <div className='chart'>
                <Bar
                    data={chartSkill}
                    options={{
                        maintainAspectRatio: false
                    }}
                />
            </div>
            </Card.Body>
            </Card></Col>
            
            <Col sm={12}>
                        <Card>
                            
                        <Card.Header>
                                <Card.Title className='biglabel'>Enrolled Courses</Card.Title>
                            </Card.Header>
            <div className='chart'>
                <Bar
                    data={chartCourse}
                    options={{
                        maintainAspectRatio: false
                    }}
                />
            </div>
            
            </Card>
                            </Col>
            </Row></Aux>
        </div>
    );
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    )(Reports);