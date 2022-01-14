import React, { useEffect } from 'react'
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Redirect, useHistory } from 'react-router';
import OrderList from './orders/OrderList';
export default function OrderListCheck() {
    const [user] = useAuthState(auth);
    const history = useHistory();
    useEffect(() => {
        if (!user) {
            history.push("/");
        }
    }, [user]);
    return (
        <div>
            <OrderList />
        </div>
    )
}
