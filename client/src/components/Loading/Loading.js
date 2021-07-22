import React from 'react'
import { CircularProgress } from '@material-ui/core';
import './loading.css';

function Loading() {
    return (
        <div>
            <CircularProgress className="loading"/>
        </div>
    )
}

export default Loading
