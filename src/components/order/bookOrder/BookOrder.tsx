import React, { useState, useEffect } from "react";
import warning from "../../../assets/icon/warning.svg";
import print from "../../../assets/icon/print.svg";
import download from "../../../assets/icon/download.svg";
import Input from "../../theme/input/Input";
import InputDate from "../../theme/inputDate/InputDate";
import { setLoading } from "../../../redux/slices/utilitySlice";
import "./BookOrder.css";
import axiosConfig from "../../../config/axiosConfig";
import { setCaseData, setCounter } from "../../../redux/slices/homeSlice";
import { useParams, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import notification from "../../theme/utility/notification";
import Order from "../Order";
import NameModal from './NameModal' ;
import setbookOrderData from './../../../redux/slices/bookneworderSlice';
import setorderDetails from './../../../redux/slices/newModalsSlice' ;
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setShipmentData } from "../../../redux/slices/shipmentSlice";






type PatientInfo = {
  name: Array<string>;
  insurance_company: string;
  delivery_address: string;
};

const BookOrder = () => {
  const param = useLocation();
  const [inputValue, setInputValue] = useState("");
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state?.user);
  const { caseData } = useAppSelector((state) => state?.home);
  //const { shipmentData } = useAppSelector((state) => state?.shipment);

  
  const navigate = useNavigate();
 
  const [summeryData, setSummeryData] = useState({});
  const [counter, setCounter] =useState(false)
  
  const [action, setAction] = useState("");

  const [openNameModal, setOpenNameModal] = useState<boolean>(false);
  const [Names, setNames] = useState<any>([]);

  const toggleNameModal = (name:any) => {
      setNames(name);
      setOpenNameModal((pre) => !pre);
  };
  const closeNameModal = () => {
      // setNames(name);
      setOpenNameModal((pre) => !pre);
  };

  const [orders, setOrders] = useState<any>({});


  const [bookstatus, setbookStatus] = useState(false);

  

  const [orderData, setorderData] = useState(
    {} //as { [key: string]: PatientInfo }
  );


  console.log('startingggggggggggggggggg');

const fetchAnalyst = async () => {
	dispatch(setLoading(true))
	console.log('insideeeeee fetch analyst');
	
	
	const URL = `/casesforshipment?email=${user}`;
	console.log(URL);
	try {
	console.log('inside tryyyyyyy');
	const { data } = await axiosConfig.get(URL);
	console.log(data);
	setorderData(data.data);
	setbookStatus(data.data);
	
	dispatch(setCaseData(data?.data));
	setCounter(true)
	dispatch(setLoading(false))
	} catch (error) {
	dispatch(setLoading(false));
	//@ts-ignore
	notification("error", error?.message);
	}
	
};
if (param.pathname=='/order' && !counter) fetchAnalyst();


console.log('path',orderData)
useEffect(() => {
	// debugger;
	fetchAnalyst();

	// eslint-disable-next-line react-hooks/exhaustive-deps
}, [orders]);

   
  // const arrayOfKeys = Object.keys(orderData).map((e) => e);
  // console.log(arrayOfKeys);

  var units = "";
  var arrayOfObj: any=[]
  if (counter) {
	 arrayOfObj = Object.entries(caseData).map((e) => ({ [e[0]] : e[1]}));
	console.log("the", arrayOfObj);
  
	arrayOfObj.map((item: any, index: any) => {
	  console.log("map",item);
	  const arrayOfItemObj : any = Object.values(item).map((e) => (e));
	  units = arrayOfItemObj[0].names.length;
  
	  console.log("units",units);
  
	},  )
  }


  //console.log("length" ,Object.keys(caseData).length);

  const bookStatusBtn = async(insurance_company:any) => {
    
  };

  const handleChange = (
    e:
      | React.ChangeEvent<
          HTMLInputElement | HTMLDataElement | HTMLSelectElement
        >
      | any
  ) => {
    const { name, value } = e?.target;
    setOrders((pre:any) => ({ ...pre, [name]: value }));
  };
  
  console.log("state  " , orders);
  
  let emptyStringArray: string[] = [];

  const handleBookOrder = async(key : any ,index : any,company:any) => {
            // console.log("index " , index);
            // console.log(orders[`length${index}`]);
            // console.log(orders[`breadth${index}`]);
            // console.log(orders[`height${index}`]);
            // console.log(orders[`weight${index}`]);
            // console.log(orders[`units${index}`]);
            // console.log(key);
            // console.log(company);

    //const userFormData = new FormData() ;
        
    if(!orders[`length${index}`] || !orders[`weight${index}`] || !orders[`height${index}`] || ! orders[`breadth${index}`]){
        notification("error","Please Fill All The Details");
        return ;
    }
    const weight = orders[`weight${index}`] ;
    // userFormData?.append("length", orders[`length${index}`]);
    // userFormData?.append("breadth",orders[`breadth${index}`]);
    // userFormData?.append("height",orders[`height${index}`]);
    // userFormData?.append("weight", orders[`weight${index}`]);
    // userFormData?.append("units", units);
    // dispatch(setLoading(true));

    // const postUrl = `/Authentication?email=palashshrivastava244@gmail.com&password=Palash@7067`;

    // const {data} =  await axiosConfig.post(postUrl);
    // const header = data.data.token ;

    // console.log(header);
    
    // const URL = `/bookorder?email=${user}&insurancecompany=${company}&id=${key}&token=${header}`;
    
    // console.log(URL);


    try {
      console.log("2");
      // @ts-ignore
      // const {data} = await axiosConfig.post(URL,userFormData);
      // console.log("shipped data = ",data);
      // const ship = data.data.shipment_id;
      // dispatch(setShipmentData(data.data));

      
      // dispatch(setorderDetails(data?.data));
      // @ts-ignore
      // dispatch(setbookOrderData(data?.data));
      // console.log("oder data " , orderData);
      // const URL1 = `/casesforshipment?email=${user}`;
      // const orderdata  = await axiosConfig.get(URL1);
      //   setorderData(orderdata.data);
      //   setbookStatus(orderdata.data);
        
        
        // dispatch(setLoading(false));
        // dispatch(setCaseData(data?.data));
      // dispatch(setLoading(false));
      // dispatch(setDACaseData(data?.data));
      // navigate('/order');
      navigate(`/new_modal/${company}/${weight}`,  { state: { length: orders[`length${index}`], breadth:  orders[`breadth${index}`], height: orders[`height${index}`], weight: orders[`weight${index}`], units : units, company: company, key: key } });
    } catch (error) {
      dispatch(setLoading(false));
      //@ts-ignore
      notification('error', error?.message);
    }
    
   
  }
  return (
    
   
    <div className="mt-4 flex flex-col lg:grid grid-cols-12 gap-4">
      <div className="col-span-9 flex flex-col overflow-x-hidden overflow-y-auto no-scrollbar pr-4" style={{height:"76vh"}}>
        {
          
		  arrayOfObj&&  arrayOfObj.map((item: any, index: any) => {
            console.log("map",item);

            const arrayOfItemObj : any = Object.values(item).map((e) => (e));
            const arrayOfItemKey : any = Object.keys(item).map((e) => (e));
            console.log("arry of item", arrayOfItemObj[0].names);
            console.log("arry of names lenght", arrayOfItemObj[0].names.length);
            console.log("arry of Keys", arrayOfItemKey);
            return (
              <div
                className="p-4 md:grid flex flex-col md:grid-cols-6 gap-2 w-full  bg-opacity-40 rounded mb-8 bg-secondary-light"
                style={{ minHeight: "290px" }}
              >
                <div className="col-span-2 mt-8">
                  <div>
                    <p className="text-xs text-fontColor-darkGray">
                      Patient Name
                    </p>
                    <p className="text-sm text-fontColor mt-2">
                      <div className="p-0">
                        
                        
                          <button onClick={ () => toggleNameModal(arrayOfItemObj[0].names.join(' , '))} className="bg-gray-400 text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center">
                            {arrayOfItemObj[0].names.join(' , ')}
                          </button>
                          
                          <ul
                            className="dropdown-menu absolute hidden text-gray-700 pt-1"
                            style={{ height: "10rem", overflow: "scroll" }}
                          >
                            
                          </ul>
                        
                      </div>
                    </p>
                  </div>
                  <div className="mt-6">
                    <p className="text-xs text-fontColor-darkGray">
                      Delivery Address
                    </p>
                    <p className="text-sm text-fontColor mt-2">
                      {arrayOfItemObj[0].delivery_address}
                    </p>
                  </div>
                  
                  
                </div>
                <div className="col-span-2 mt-2 ml-8">
                  <div className="mt-6">
                    <p className="text-xs text-fontColor-darkGray">
                      Insurance TPA
                    </p>
                    <p className="text-sm text-fontColor mt-2">
                      {arrayOfItemObj[0].insuranceCompany}
                    </p>
                  </div>
                  <div className="col-span-2 mt-10">
                  <p className="text-xs text-fontColor-darkGray">
                    Dimensions(in CM)
                  </p>
                  <div className="flex flex-row">
                    <div className="mt-2">
                      <p className="text-xs text-fontColor-darkGray">Length</p>
                      <div className="mr-2 mt-2 flex items-center">
                        <input
                          onChange={handleChange}
                          name={`length${index}`}
                          // value={`${orders}.length${index}`}
                          type="number"
                          style={{
                            maxWidth: "50px",
                            border: "none",
                            outline: "none",
                            height: "30px",
                            backgroundColor: "#FFFFFF17",
                            fontSize: "14px",
                            padding: "0 0 0 3px",
                            borderRadius: "2px",
                            color:"white",
                          }}
                        />
                        {/*  <p className="mr-2 ml-2 text-sm text-fontColor">cm</p> */}
                      </div>
                    </div>
      
                    <div className="mt-2">
                      <p className="text-xs text-fontColor-darkGray">Width</p>
                      <div className="mr-2 mt-2 flex items-center">
                        <input
                          onChange={handleChange}
                          name={`breadth${index}`}
                          type="number"
                          style={{
                            maxWidth: "50px",
                            border: "none",
                            outline: "none",
                            height: "30px",
                            backgroundColor: "#FFFFFF17",
                            fontSize: "14px",
                            padding: "0 0 0 3px",
                            borderRadius: "2px",
                            color:"white",
                          }}
                        />
                        {/* <p className="mr-2 ml-2 text-sm text-fontColor">cm</p> */}
                      </div>
                    </div>
                    <div className="mt-2">
                      <p className="text-xs text-fontColor-darkGray">Height</p>
                      <div className="mt-2 flex items-center">
                        <input
                          onChange={handleChange}
                          name={`height${index}`}
                          // value={`${orders}.height${index}`}
                          type="number"
                          style={{
                            maxWidth: "50px",
                            border: "none",
                            outline: "none",
                            height: "30px",
                            backgroundColor: "#FFFFFF17",
                            fontSize: "14px",
                            padding: "0 0 0 3px",
                            borderRadius: "2px",
                            color:"white",
                          }}
                        />
                        {/* <p className="mr-2 ml-2 text-sm text-fontColor">cm</p> */}
                      </div>
                    </div>
                  </div>
                  </div>
                  
      
                  {/* <div className="flex flex-col sm:flex-row items-start sm:items-center mt-2 sm:mt-10 mb-2">
                    <div className="flex items-center mr-8">
                      <img src={download} alt="icon" className="mr-2" />
                      <p className="text-xs text-fontColor">Download</p>
                    </div>
                    <div className="flex items-center mt-2 sm:mt-0 mr-8">
                      <img src={print} alt="icon" className="mr-2" />
                      <p className="text-xs text-fontColor">Print</p>
                    </div>
                  </div> */}
                </div>
                <div className="col-span-2">
                  <div className="mt-4 ml-10">

                  <div className="flex flex-row">
                    <div className="mt-4">
                      <p className="text-xs text-fontColor-darkGray">
                        Files count
                      </p>
                      <div className="mt-2 flex items-center">
                        <span style={{
                            maxWidth: "70px",
                            width : "70px",
                            border: "none",
                            outline: "none",
                            height: "30px",
                            backgroundColor: "#FFFFFF17",
                            fontSize: "14px",
                            padding: "0 0 0 3px",
                            borderRadius: "2px",
                            color:"white",
                          }}>
                          {arrayOfItemObj[0].names.length}
                        </span>
                      
                        {/* <p className="text-sm text-fontColor">Kg</p> */}
                      </div>
                    </div>
      
                    <div className="ml-4 mt-4">
                      <p className="text-xs text-fontColor-darkGray">Weight</p>
                      <div className="mt-2 flex items-center">
                        <input
                          onChange={handleChange}
                          name={`weight${index}`}
                          // value={`weight[${index}]`}
                          type="number"
                          style={{
                            maxWidth: "70px",
                            border: "none",
                            outline: "none",
                            height: "30px",
                            backgroundColor: "#FFFFFF17",
                            fontSize: "14px",
                            padding: "0 0 0 3px",
                            borderRadius: "2px",
                            color:"white",
                          }}
                        />
                        <p className="ml-1 text-sm text-fontColor">Kg</p>
                      </div>
                    </div>
                  </div>
                 
                    <button
                      className="border border-fontColor mt-20 rounded-sm outline-none h-auto w-40 bg-secondary-dark text-base text-fontColor"
                      style={{ minHeight: "3rem"}}
                      onClick={() => handleBookOrder(arrayOfItemKey[0],index,arrayOfItemObj[0].insuranceCompany)}
                     
                    >

                     

                      {bookstatus ? "Book now" : "Book Now"}
                    </button>
                    
                  </div>
                </div>
              </div>
            );
          })
        }
      </div>
      <div className="col-span-3 flex flex-col">
        <div className="flex items-center">
          <p className="text-xs text-fontColor-darkGray border-b border-fontColor-darkGray mr-2">
            Disclaimer
          </p>
          <img src={warning} alt="warning" />
        </div>
        <p className="text-sm text-fontColor pt-2">
          If the weight vary in any case then the price will vary too
        </p>

        <p className="text-sm text-fontColor pt-4">
          Charges may apply if you cancel order after the courier is despatched.
        </p>
      </div>
      <NameModal
        // key={index}

        closeModal={closeNameModal}
        isOpen={openNameModal}
        Data={Names}
        // action={toggleNameModal}
      />
    </div>
    
  );
};

export default BookOrder;
