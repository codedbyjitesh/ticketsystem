import React from 'react';
import axios from 'axios'; 
import './tiketList.css';
function TicketList(props) {

    const { tickets = [] } = props;

    const updateStatus = async (id) => {

        try {


            await axios.put(
                `http://127.0.0.1:8000/api/tickets/${id}/`,
                {
                    status: tickets.find(ticket => ticket.id === id)?.status === "open" ? "closed" : "open"
                }
            );

            alert("Status Updated");

        } catch (error) {

            console.log(error);
        }
    };

    return (

        <>

            <div className="ticket-list-header">
                <h1>Ticket List</h1>
            </div>

            {
                tickets.length === 0 ? (

                    <p>No tickets found</p>

                ) : (

                    tickets.map((ticket, index) => (

                        <div  className="ticket-card" key={index}>
                            <div className="tickets">
                            <h2>Submitted Ticket</h2>

                            <p>
                                <strong>Name:</strong>
                                {ticket.customerName}
                            </p>

                            <p>
                                <strong>Email:</strong>
                                {ticket.email}
                            </p>

                            <p>
                                <strong>Category:</strong>
                                {ticket.category}
                            </p>

                            <p>
                                <strong>Description:</strong>
                                {ticket.description}
                            </p>

                            <p>
                                <strong>CreatedAt:</strong>
                                {ticket.createdAt}
                            </p>

                            <p>
                                <strong>Status:</strong>
                                {ticket.status}
                            </p>
                            </div>
                            <div className="sub-btn">
                            <button
                                onClick={() => updateStatus(ticket.id)}
                            >
                                Mark {ticket.status === "open" ? "close" : "open"}
                            </button>
                            </div>

                        </div>
                    ))
                )
            }

        </>
    );
}

export default TicketList;