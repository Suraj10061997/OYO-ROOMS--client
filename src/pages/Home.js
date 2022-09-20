import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRooms,setFilteredRooms,setduplicateRooms,setCategoryRooms} from '../redux/features/roomSlice';

import { DatePicker } from 'antd';
import moment from "moment";

import Room from "../components/Room";
import Spinner from '../components/Spinner';

const Home = () => {
    const { RangePicker } = DatePicker;
    const [fromDate, setFromDate] = useState();
    const [toDate, setToDate] = useState();
    const dispatch = useDispatch();
    const { rooms, loading,duplicateRooms,filteredRooms,categoryRooms } = useSelector(state => ({ ...state.room }));

    const [searchkey, setSearchkey] = useState("");
    const [type, setType] = useState("all")

    useEffect(() => {
        dispatch(getAllRooms());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    /*
        so this filterByDate(dates) recieves an dates object which is nothing but
        an array contains the starting and ending date.
        console.log(date)-->you gonna understand
        so, the output you see is actually in the format of moment which is actually hard to understand.
        Hence that is the reason we use moment.js library to make it simpler and as well as understandable.

        console.log(moment(dates[0].format("DD-MM-YYYY")));-->16-06-1997


        var bool1 = moment('2010-10-20').isBetween('2010-10-19', '2010-10-25'); // true
     */

    function filterByDate(dates) {
        setFromDate(moment(dates[0]).format("DD-MM-YYYY"));
        setToDate(moment(dates[1]).format("DD-MM-YYYY"));
        const fromDate1 = moment(dates[0]).format("DD-MM-YYYY");
        const toDate1 = moment(dates[1]).format("DD-MM-YYYY");

        const container = [];
        for (let i = 0; i < filteredRooms.length; i++) {
            const room = filteredRooms[i];
            if (room.currentbookings.length > 0) {
                for (let j = 0; j < room.currentbookings.length; j++) {

                    const respectiveBooking = room.currentbookings[j];
                    if (!(moment(fromDate1).isBetween(respectiveBooking.fromDate, respectiveBooking.toDate) && moment(toDate1).isBetween(respectiveBooking.fromDate, respectiveBooking.toDate))) {

                        if (fromDate1 !== respectiveBooking.fromDate && fromDate1 !== respectiveBooking.toDate && toDate1 !== respectiveBooking.fromDate && toDate1 !== respectiveBooking.toDate) {
                            container.push(room);
                        }

                    }
                    else {
                        container.push(room);
                    }
                }
            }
            else {
                container.push(room);
            }
        }
        dispatch(setFilteredRooms(container));
    }
    if (loading) {
        return <Spinner/>
    }


    function filterBySearch(){
        const container=duplicateRooms.filter(room=>room.name.toLowerCase().includes(searchkey.toLowerCase()));
        dispatch(setduplicateRooms(container));
    }

    function filterByCategory(e){
        console.log("category",e.target.value.toLowerCase())
        setType(e.target.value.toLowerCase());
        if(e.target.value.toLowerCase() !== "all"){
            const container = categoryRooms.filter(room=>room.type.toLowerCase() === e.target.value.toLowerCase());
            dispatch(setCategoryRooms(container));
        }
        else{
            dispatch(setCategoryRooms(categoryRooms));
        }
       
    }

    return (
        <div className='container'>
            <div className="row mt-5 bs">
                <div className="col-md-3">
                    <RangePicker format="DD-MM-YYYY" onChange={filterByDate} />
                </div>
                <div className="col-md-5">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="search rooms" 
                        value={searchkey}
                        onChange={(e)=>setSearchkey(e.target.value)}
                        onKeyUp={filterBySearch}
                        />
                </div>

                <div className='col-md-3'>
                    <select className="form-control" value={type} onChange={filterByCategory}>
                        <option value="all">All</option>
                        <option value="delux">Deluxe</option>
                        <option value="non-delux">Non-Deluxe</option>
                    </select>
                </div>

            </div>

            <div className="row justify-content-center">
                {rooms.length ? (rooms.map((room) => {
                    return (
                        <Room key={room._id} room={room} fromDate={fromDate} toDate={toDate} />
                    )
                })):(<h1>No Rooms Found</h1>)}
            </div>
        </div>
    )
}

export default Home

