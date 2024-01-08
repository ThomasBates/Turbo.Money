declare var require: any
var React = require('react');

import axios from 'axios';
import { useState, useEffect } from 'react';

const client = axios.create({
    baseURL: "https://api.money.turbobutterfly.com"
});

function Dashboard() {

    //const [accounts, setAccounts] = useState([]);

    //useEffect(() => {
    //    client
    //        .get('ListBudgetAccounts')
    //        .then((response) => {
    //            setAccounts(response.data);
    //        });
    //}, []);

    return (
        <div className="posts-container">
            <h1>Dashboard</h1>

            {/*accounts.map((account) => {
                return (
                    <div className="post-card" key={account.id}>
                        <h2 className="post-title">{account.name}</h2>
                        <p className="post-body">{account.description}</p>
                    </div>
                );
            })*/}
        </div>
    );
}

export default Dashboard;