import React, { useEffect, useState } from 'react'
import app from '../firebaseConfig/firebaseConfig'
import 'firebase/firestore'
import '../App.css'

var db = app.firestore()

const Home = () => {
    const [item1,setItem1] = useState(0)
    const [item2,setItem2] = useState(0)
    const [docId,setDocId] = useState("")

    const handleClick = (e) => {
        e.target.innerHTML === "Add"
        ?   e.target.className === "item1"
            ?   setItem1(item1 + 1)
            :   setItem2(item2 + 1)
        :   e.target.className === "item1"
            ?   setItem1(item1 - 1)
            :   setItem2(item2 - 1)
    }

    useEffect(()=>{
        var currentUser = app.auth().currentUser.email
        db.collection("users").where("name","==",`${currentUser}`).get()
        .then(doc => setDocId(doc.docs[0].id))
        .catch(err => console.log(err))
    },[])

    useEffect(()=>{
        if(docId !== ""){
            db.collection("users").doc(docId).get()
            .then(doc => {
                if(doc.exists){
                    setItem1(doc.data().item1)
                    setItem2(doc.data().item2)
                }
            })
            .catch(err => console.log(err))
        }
    },[docId])

    const handleLogOut = async () => {
        await db.collection("users").doc(docId).update({
            item1: item1,
            item2: item2
        })
        app.auth().signOut()
    }

    return (
        <div style={{display: "-webkit-inline-box"}}>
            <div className="card">
                <img 
                    src="data:image/jpeg;base64,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" 
                    alt="Mustang Logo" 
                    style={{width:"100%"}}
                />
                <div className="container">
                    <h4><b>Ford Mustang</b></h4> 
                    <p>
                        <button 
                            onClick={(e) => handleClick(e)} 
                            className="item1">
                            Add
                        </button>
                            <span style={{margin:"0px 45px"}}>{item1}</span>
                        <button 
                            onClick={(e) => handleClick(e)}
                            style={item1 <= 0 ? {pointerEvents:"none", textDecoration:"line-through"} : null }
                            className="item1">
                            Remove
                        </button>
                    </p>
                </div>
            </div>
            <div className="card">
                <img 
                    src="https://www.car-logos.org/wp-content/uploads/2011/09/mclaren.png" 
                    alt="McLaren Logo" 
                    style={{width:"100%"}}
                />
                <div className="container">
                    <h4><b>McLaren</b></h4>
                    <p>
                        <button 
                            onClick={(e) => handleClick(e)}
                            className="item2">
                            Add
                        </button>
                            <span style={{margin:"0px 45px"}}>{item2}</span>
                        <button 
                            onClick={(e) => handleClick(e)} 
                            style={item2 <= 0 ? {pointerEvents:"none", textDecoration:"line-through"} : null }
                        >
                            Remove
                        </button>
                    </p>
                </div>
            </div>
            <button 
                onClick={() => handleLogOut()}
            >
                Sign Out
            </button>
        </div>
    )
}

export default Home