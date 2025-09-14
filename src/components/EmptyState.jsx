import React from 'react';
import emptyImage from '../assets/empty-state.png';

function EmptyState() {
    return (
        <div className="empty-state">
            <img src={emptyImage} alt="No tasks" />
            <p>No tasks yet. Add one above!</p>
        </div>
    );
}

export default EmptyState;
