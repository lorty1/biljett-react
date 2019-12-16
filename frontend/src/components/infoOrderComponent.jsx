import React from 'react'

export default function infoOrderComponent() {
    return (
        <div className="flex-container--column">
            <p>Commande n°{orderSelected.reference}</p>
            <p>Nombre de ticket: {orderSelected.tickets_list.length}</p>
        </div>
    )
}
