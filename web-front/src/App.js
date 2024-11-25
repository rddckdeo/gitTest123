import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios'; // axios를 import합니다.

function App() {
    // useState로 수정합니다.
    const [data, setData] = useState(''); // useState로 수정

    useEffect(() => {
        axios.get('http://localhost:8080/api/data')  // Spring Boot API URL
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the data!", error);
            });
    }, []);

    return (
        <div>
            <h1>Received from Spring Boot:</h1>
            <p>{data}</p>
        </div>
    );

    // 아래의 주석 처리된 코드는 필요에 따라 사용할 수 있습니다.
    // return (
    //   <div className="App">
    //     <header className="App-header">
    //       <img src={logo} className="App-logo" alt="logo" />
    //       <p>
    //         Edit <code>src/App.js</code> and save to reload.
    //       </p>
    //       <a
    //         className="App-link"
    //         href="https://reactjs.org"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         Learn React
    //       </a>
    //     </header>
    //   </div>
    // );
}

export default App;
