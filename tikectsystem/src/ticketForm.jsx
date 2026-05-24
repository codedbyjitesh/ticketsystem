import React from 'react';
import axios from 'axios';
import './ticketForm.css';

function TicketForm(props) {

    const { formData, setFormData } = props;

    const onchange = (e) => {

        const updatedFormData = {
            ...formData,
            [e.target.name]: e.target.value
        };

        setFormData(updatedFormData);
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await axios.post(
                'http://127.0.0.1:8000/api/tickets/create/',
                formData
            );;

            alert('Ticket Created Successfully');

            setFormData({
                customerName: '',
                email: '',
                category: '',
                description: ''
            });

        } catch (error) {

            alert('Error creating ticket');
        }
    };

    return (

        <form onSubmit={handleSubmit}>

            <div className="input-box">
                <label htmlFor="customerName">Name:</label>

                <input
                    type="text"
                    id="customerName"
                    name="customerName"
                    value={formData.customerName || ''}
                    placeholder="Enter your name"
                    onChange={onchange}
                    required
                />
            </div>

            <div className="input-box">

                <label htmlFor="email">Email:</label>

                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email || ''}
                    placeholder="Enter your email"
                    onChange={onchange}
                    required
                />
            </div>

            <div className="input-box">

                <label htmlFor="category">Issue Category:</label>

                <input
                    list="categories"
                    id="category"
                    name="category"
                    value={formData.category || ''}
                    placeholder="Select an issue category"
                    onChange={onchange}
                    required
                />
            </div>

            <datalist id="categories">
                <option value="Payment" />
                <option value="Technical" />
                <option value="General" />
            </datalist>

            <div className="input-box">

                <label htmlFor="description">Description:</label>

                <textarea
                    id="description"
                    name="description"
                    value={formData.description || ''}
                    placeholder="Describe your issue"
                    onChange={onchange}
                    required
                ></textarea>
            </div>

            <button type="submit">
                Submit Ticket
            </button>

        </form>
    );
}

export default TicketForm;