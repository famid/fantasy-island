import React from "react";
import { Table } from "@mantine/core";
import Ticket from "./Ticket";

function Dashboard({ orders }) {
    console.log(orders);

    const rows = orders.map((order) => (
        <tr className="dashboard-table" key={order.unique_code}>
            <td>{order.name}</td>
            <td>{order.payment_status === 1 ? <span className="bg-green-400 p-1">Paid</span>: <span className="bg-red-400 p-1">Unpaid</span>}</td>
            <td>{order.phone}</td>
            <td>{order.tickets.length}</td>
            <td>{order.tickets.length}</td>
            <td>{order.tickets.length}</td>
            <td>
                {
                    order.tickets.map((ticket,i)=>{
                        return  <Ticket ticket={ticket}/>
                    })
                }

            </td>
        </tr>
    ));
    return (
        <div className="flex h-screen bg-white">
            {/* Left Sidebar */}
            <div className="flex flex-col w-72 bg-white border-r">
                <div className="flex flex-col items-center h-16 bg-gray-200 justify-center">
                    <span className="text-2xl font-bold">Dashboard</span>
                </div>
                <div className="flex flex-col pt-4">
                    {/* <a
                        href="#"
                        className="px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-gray-800"
                    >
                        Participants
                    </a> */}
                    <a
                        href="#"
                        className="px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-gray-800"
                    >
                        Order List
                    </a>
                    {/* <a
                        href="#"
                        className="px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-gray-800"
                    >
                        Ticket List
                    </a> */}
                </div>
            </div>

            {/* Main Content */}
            <div className="flex flex-col flex-1 overflow-y-auto">
                <div className="flex items-center justify-between px-6 py-4 bg-white border-b">
                    <span className="text-lg font-bold">Order List</span>
                    <button className="p-2 bg-gray-200 rounded-full hover:bg-gray-300">
                        <svg
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6 fill-current"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M4 4a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 2v10h12V6H6zm12 1.5a.5.5 0 00-.5-.5h-11a.5.5 0 000 1h11a.5.5 0 00.5-.5zm0 4a.5.5 0 00-.5-.5h-11a.5.5 0 000 1h11a.5.5 0 00.5-.5zm0 4a.5.5 0 00-.5-.5h-11a.5.5 0 000 1h11a.5.5 0 00.5-.5z"
                            />
                        </svg>
                    </button>
                </div>
                <div className="px-6 py-4">
                    <Table withColumnBorders highlightOnHover>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Payment Status</th>
                                {/* <th>Phone</th> */}
                                <th>Merchant Phone</th>
                                <th>Client Phone</th>
                                <th>Purchase Date</th>
                                <th>Transaction Id</th>
                                <th>Tickets Counts</th>
                                <th>Tickets</th>
                            </tr>
                        </thead>
                        <tbody>{rows}</tbody>
                    </Table>{" "}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
