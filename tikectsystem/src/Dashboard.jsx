import React, { useEffect, useState } from 'react';
import TicketForm from './ticketForm';
import TicketList from './ticketList';
import axios from 'axios';
import './Dashboard.css';

function Dashboard() {

    const [formData, setFormData] = useState({
        customerName: '',
        email: '',
        category: '',
        description: ''
    });

    const interval = setInterval(() => {

        fetchTickets();
    }, 5000);
    const [tickets, setTickets] = useState([]);


    useEffect(() => {

        fetchTickets();

    }, []);

    const fetchTickets = async () => {

        try {

            const response = await axios.get(
                'http://127.0.0.1:8000/api/tickets/'
            );

            setTickets(response.data.tickets || []);

        } catch (error) {

            console.error(
                'Error fetching tickets:'
            );
        }
    };

    return (

        <>

            <header>
                <h1>Dashboard</h1>
            </header>

            <div className="container">

                <div className="left">

                    <TicketForm  formData={formData}setFormData={setFormData}
                    />

                </div>

                <div className="right">

                    <TicketList tickets={tickets}/>

                </div>

            </div>

        </>
    );
}

export default Dashboard;