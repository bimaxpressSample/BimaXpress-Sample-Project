import React, { useState } from 'react';

export default function InsurerData1() {

    // const elements = ['HDFC EGRO GENERAL INSURANCE', 'ICICI LIFE INSURANCE', 'CHOLAMANDALAM MS GENERAL INSURANCE','ADITYA BIRLA HEALTH INSURANCE','CARE HEALTH INSURANCE','BHARTI AXA GENERAL INSURANCE'];

    const elements = [
        { 
            id: "1",
            companyName : 'HDFC EGRO GENERAL INSURANCE' , 
            status : "not submitted"
        }, 
        { 
            id: "2",
            companyName : 'ICICI LIFE INSURANCE' , 
            status : "not submitted"
        }, 
        { 
            id: "3",
            companyName : 'CHOLAMANDALAM MS GENERAL INSURANCE' , 
            status : "submitted"
        }, 
        { 
            id: "4",
            companyName : 'ADITYA BIRLA HEALTH INSURANCE' , 
            status : "submitted"
        }, 
        { 
            id: "5",
            companyName : 'CARE HEALTH INSURANCE' , 
            status : "not submitted"
        }, 
        { 
            id: "6",
            companyName : 'BHARTI AXA GENERAL INSURANCE' , 
            status : "not submitted"
        }
    ];



    return (
        <>
            <div className="flex flex-col p-14">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                {/* <thead className="bg-gray-50"> */}
                                <thead className="bg-primary-lighter">
                                    <tr>
                                        {/* <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"> */}
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                            Name
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                            Documents
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                            Documents
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                            Download
                                        </th>
                                        {/* <th scope="col" className="relative px-6 py-3">
                                            <span className="sr-only">Edit</span>
                                        </th> */}
                                    </tr>
                                </thead>
                                {/* <tbody className="bg-white divide-y divide-gray-200"> */}
                                <tbody className="bg-primary-lighter divide-y divide-gray-900">
                                    {
                                        elements.map((value,index) => {
                                            return(
                                                <tr>
                                                    <td className="px-4 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            {/* <div className="flex-shrink-0 h-10 w-10">
                                                                <img className="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60" alt="" />
                                                            </div> */}
                                                            <div>
                                                                {/* <div className="text-sm font-medium text-gray-900"> */}
                                                                <div className="text-sm font-medium text-white">
                                                                    {value.companyName}
                                                                </div>
                                                                {/* <div className="text-sm text-gray-500">
                                                                    jane.cooper@example.com
                                                                </div> */}
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-4 whitespace-nowrap">
                                                        <div className="flex">
                                                            <div className="mb-3 w-32">
                                                                {/* <label htmlFor="formFile" className="form-label inline-block mb-2 text-gray-700">Default file input example</label> */}
                                                                {/* { value.status === 'submitted' ? (<input className="form-control block w-full px-3 py-1.5 text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" type="file" id="formFile" disabled/>) 
                                                                    : (<input className="form-control block w-full px-3 py-1.5 text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" type="file" id="formFile" />) } */}
                                                                { value.status === 'submitted' ? (<input className="form-control block w-full px-3 py-1.5 text-xs font-normal text-white bg-primary-lighter bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" type="file" id="formFile" disabled/>) 
                                                                    : (<input className="form-control block w-full px-3 py-1.5 text-xs font-normal text-white bg-primary-lighter bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" type="file" id="formFile" />) }
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-4 whitespace-nowrap">
                                                        <div className="flex">
                                                            <div className="mb-3 w-32">
                                                                {/* <label htmlFor="formFile" className="form-label inline-block mb-2 text-gray-700">Default file input example</label> */}
                                                                {/* { value.status === 'submitted' ? (<input className="form-control block w-full px-3 py-1.5 text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" type="file" id="formFile" disabled/>) 
                                                                    : (<input className="form-control block w-full px-3 py-1.5 text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" type="file" id="formFile" />) } */}
                                                                 { value.status === 'submitted' ? (<input className="form-control block w-full px-3 py-1.5 text-xs font-normal text-white bg-primary-lighter bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" type="file" id="formFile" disabled/>) 
                                                                    : (<input className="form-control block w-full px-3 py-1.5 text-xs font-normal text-white bg-primary-lighter bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" type="file" id="formFile" />) }
                                                                
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                    {
                                                        value.status === 'submitted' ? (<button disabled className="px-4 py-2 inline-flex text-sm leading-5 font-semibold rounded-full bg-green-50 text-green-800 hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                                                                Submitted
                                                            </button>):(
                                                            <button className="px-4 py-2 inline-flex text-sm leading-5 font-semibold rounded-full bg-green-400 text-green-900 hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                                                                Submit
                                                            </button>
                                                        )

                                                        
                                                    }
                                                        
                                                    </td>
                                                    
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-xs font-medium">
                                                        {/* <a href="#" className="text-indigo-600 hover:text-indigo-900">Edit</a> */}
                                                        {/* <button type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-xs font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-xs">
                                                            Click To Download
                                                        </button> */}
                                                        <button type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-primary-lighter text-xs font-medium text-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-xs">
                                                            Click To Download
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
