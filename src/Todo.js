import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom"

function Todo() {
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token') === null) {
            navigate('/signin')
        }
      }, [])

    return(
        <div>

        </div>
    )
}

export default Todo