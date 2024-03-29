import React from 'react'
import './Quote.css'
import { useState } from 'react'
import { useEffect } from 'react'
import Spinner from './Spinner'
export default function Card() {
    const [catagory, setcatagory] = useState('education')
    const [Quote,setQuote]=useState({})
    const [isLoading,setLoading]=useState(false)
    const quotegenerator = async () => {
        setLoading(true)
        console.log(catagory)
        const url = 'https://api.api-ninjas.com/v1/quotes?category=' + catagory;
        const data = await fetch(url, {
            method: 'GET',
            headers: {
                'X-Api-Key': 'Uyd2qnkgar2kZKOx6A3pTw==QBqwEyUEnNw2zoWa',
                'Content-Type': 'application/json', // Corrected 'Content-Type'
            }
        });        
        const result=await data.json()
        console.log(result)
        setQuote(result[0])
        setLoading(false)
    }
    useEffect(()=>{
        quotegenerator()
    },[])
    return (
        <div>
            <div className="relative flex w-96 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md shadow-lg shadow-blue-gray-500/40">
                {isLoading?<Spinner/>:null}
                <div className="p-6">
                    <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                        {isLoading?null:(Quote.quote)}
                    </h5>
                    <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
                        {isLoading?null:(Quote.author)}
                    </p>
                </div>
                <div className="p-6 pt-0 flex justify-between">
                    <select value={catagory} onChange={(e) => setcatagory(e.target.value)}>
                        <option value="alone">Alone</option>
                        <option value="beauty">Beauty</option>
                        <option value="birthday">Birthday</option>
                        <option value="education">Education</option>
                        <option value="famous">Famous</option>
                        <option value="forgiveness">Forgiveness</option>
                        <option value="friendship">Friendship</option>
                        <option value="funny">Funny</option>
                    </select>
                    <button
                        onClick={quotegenerator}
                        className="btn select-none rounded-lg bg-pink-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="button"
                        data-ripple-light="true"
                    >
                        Generate
                    </button>
                </div>
            </div>
            <link
                rel="stylesheet"
                href="https://unpkg.com/@material-tailwind/html@latest/styles/material-tailwind.css"
            />

            <script src="https://unpkg.com/@material-tailwind/html@latest/scripts/ripple.js"></script>
        </div>
    )
}
