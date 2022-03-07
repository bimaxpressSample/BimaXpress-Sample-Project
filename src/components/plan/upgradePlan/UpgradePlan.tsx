import React, { Dispatch, SetStateAction, useState } from "react";
import BuyModal from './BuyModal' ;
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import PreAuthModal from './PreAuthModal';


type UpgradePlanProps = {
    setCurrentPlan: Dispatch<SetStateAction<string>>;
    currentPlan: string;
};

const UpgradePlan = ({ setCurrentPlan, currentPlan }: UpgradePlanProps) => {
    // const [plans, setPlans] = useState<any[]>([]);
    const dispatch = useAppDispatch();
    const { allPlans } = useAppSelector((state) => state?.plan);
    const { user } = useAppSelector((state) => state?.user);



    // const fetchAllPlans = async() =>{
    //     dispatch(setLoading(true));
    //     const URL = `/allplansdetails`;
    //     try {
    //     const { data } = await axiosConfig.get(URL);
    //     dispatch(setLoading(false));
    //     console.log("all plan from api " ,data.data);
    //     dispatch(setAllPlans(data?.data));
    //     console.log("all [lan" ,allPlans);
    //     } catch (error) {
    //     dispatch(setLoading(false));
    //     //@ts-ignore
    //     notification("error", error?.message);
    //     }
       
    // }


    // useEffect(() => {
    //     fetchAllPlans();
    // },[]);

    // console.log("plans " ,plans);
    console.log("All plans " ,allPlans);

     // @ts-ignore
     const monthlyPlan = allPlans.filter( plan => plan.duration < 40);
     // @ts-ignore
     const yearlyPlan = allPlans.filter( plan => plan.duration > 40);
     console.log("monthly plans" , monthlyPlan);
     console.log("monthly plans" , yearlyPlan);

    const tabs = ["Monthly", "Annually"] ;

    const [activeTab, setActiveTab] = useState(0);
    const { userPlanData } = useAppSelector((state) => state?.user);

    console.log("User data in upgrade plans",userPlanData); 

    console.log(activeTab);

    const [selectedPlanDetial , setselectedPlanDetial] = useState({
        planType : "",
        planAmount : "",
        totalClaims : "",
        planId : "",
    })
    const [openBuyModal, setOpenBuyModal] = useState<boolean>(false);
    const toggleBuyModal = (planType :any , planAmount:any , totalClaims:any , planId:any) => {
        setselectedPlanDetial({
            planType : planType,
            planAmount : planAmount,
            totalClaims : totalClaims,
            planId: planId ,
        });
        setOpenBuyModal((pre) => !pre);
    };
    // const toggleBuyModal =  => {
    //     setOpenBuyModal((pre) => !pre);
    // };
    
    

    return (
        <div className="px-8 py-6">
            <h2 className="text-3xl text-fontColor font-semibold">
                Upgrade your plan
            </h2>
            {/* <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10 pt-8">
                {plans &&
                    plans?.map((plan, index) => {
                        return (
                            <div
                                className={`w-full ml-auto mr-auto max-h-6 border border-fontColor rounded-2xl px-4 py-6 mb-6 flex flex-col ${styles.container}`}
                                key={index}
                            >
                                <img
                                    src={standard}
                                    alt="icon"
                                    className={`w-8 text-fontColor ${styles.svg}`}
                                />
                                <p className="font-light text-xl pt-4 text-fontColor capitalize">
                                    {plan?.name}
                                </p>
                                <div className="flex items-center pt-6">
                                    <img src={rupi} alt="icon" />
                                    <h2 className="text-5xl text-fontColor font-semibold pl-2 -mt-3">
                                        {plan?.price}
                                    </h2>
                                </div>
                                <p className="text-xs font-thin pt-8 text-fontColor">
                                    Features
                                </p>
                                <div className={`h-3 ${styles.contentBox}`}>
                                    {plan?.features?.map((fetures: any, index: number) => {
                                        return (
                                            <div className="pt-4 flex items-center" key={index}>
                                                <span className={styles.boldIcon}></span>
                                                <p className="text-sm text-fontColor pl-2">{fetures}</p>
                                            </div>
                                        );
                                    })}
                                </div>

                                <div className="mb-4">
                                    <PlanSelectButton
                                        text="Buy now"
                                        disable={plan?.title === currentPlan}
                                        style={
                                            plan?.title === currentPlan
                                                ? { backgroundColor: "#5a5a5a", cursor: "default" }
                                                : {}
                                        }
                                        handleClick={() => setCurrentPlan(plan?.title)}
                                    />
                                </div>
                            </div>
                        );
                    })}
            </div> */}

            <section>
                <div className="container px-6 py-8 mx-auto">
                    <div className="max-w-xl p-1.5 mx-auto overflow-hidden bg-gray-100 rounded-lg dark:bg-gray-700">
                        <div className="grid gap-2 md:grid-cols-2">
                        {tabs?.map((tab, index) => {
                        return (
                            <button onClick={() => setActiveTab(index)} key={index} className={`${activeTab === index ? "bg-gray-400 ":"hover:bg-gray-200"} px-3 py-2 font-medium text-gray-800 uppercase transition-colors duration-200 transform bg-transparent rounded-lg focus:outline-none dark:text-gray-200 dark:hover:bg-gray-600`}>
                                {tab}
                            </button>
                        );
                        })}
                            

                            {/* <button className="flex items-center justify-center px-3 py-2 font-medium text-gray-800 uppercase transition-colors duration-200 transform bg-gray-200 rounded-lg dark:bg-gray-600 focus:outline-none dark:text-gray-200">
                                <span className="mx-1">Biannually</span>
                                <span className="text-xs mx-1 font-normal text-white bg-blue-500 rounded-full py-0.5 px-1.5">
                                    save 10%
                                </span>
                            </button>

                            <button className="flex items-center justify-center px-3 py-2 font-medium text-gray-800 uppercase transition-colors duration-200 transform bg-transparent rounded-lg focus:outline-none dark:text-gray-200 dark:hover:bg-gray-600 hover:bg-gray-200">
                                <span className="mx-1">Annually</span>
                                <span className="text-xs mx-1 font-normal text-white bg-blue-500 rounded-full py-0.5 px-1.5">
                                    save 20%
                                </span>
                            </button> */}
                        </div>
                    </div>
                    {/* {renderUI} */}
                    {
                        activeTab ? (
                            // <YearlyPlans />
                            <div className="flex flex-col items-center justify-center mt-16 space-y-6 md:items-end md:-mx-5 md:space-y-0 md:flex-row">
                                {
                                    // @ts-ignore
                                    yearlyPlan.slice(0).reverse().map( (plan:any , index :any) =>{
                                        return(
                                            <div key={index} className="w-full overflow-hidden transition-colors duration-200 transform rounded-lg md:mx-5 md:w-96 bg-gray-50 dark:bg-gray-700">
                                                {/* <p className="py-2 text-sm text-center text-white uppercase bg-blue-500">Recommended</p> */}
                                                <div className="px-6 py-4">
                                                    <div className="text-center">
                                                        <p className="text-4xl font-semibold text-gray-800 dark:text-gray-100">{plan.name}</p>
                                                        <p className="mt-4 text-gray-500 dark:text-gray-300">Claims : {plan.claims}</p>
                                                        <h4 className="mt-2 text-gray-600 line-through dark:text-gray-400">₹ {plan.price + 1000}</h4>
                                                        <h4 className="mt-2 text-5xl font-semibold text-gray-800 dark:text-gray-100">₹ {plan.price}</h4>
                                                        <p className="mt-4 text-gray-500 dark:text-gray-300">/Per Year</p>
                                                        {/* <p className="mt-4 text-gray-500 dark:text-gray-300">Bill all 6 months</p> */}

                                                    </div>

                                                    <div className="mt-8 space-y-8">
                                                        {
                                                            plan.features.map((feature : any) => {
                                                                return(
                                                                    <div className="flex items-center">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                                                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                                        </svg>

                                                                        <span className="mx-4 text-gray-700 dark:text-gray-300">{feature}</span>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div>

                                                    <button onClick={() => toggleBuyModal(plan.name , plan.price , plan.claims , plan.planId)} className="w-full px-4 py-2 mt-10 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                                                        Choose {plan.name}
                                                    </button>
                                                </div>
                                            </div>
                                        )
                                    } )

                                }
                                
                            </div>
                        ):(
                            <div className="flex flex-col items-center justify-center mt-16 space-y-6 md:items-end md:-mx-5 md:space-y-0 md:flex-row">
                                {
                                    // @ts-ignore
                                    monthlyPlan.slice(0).reverse().map( (plan:any , index :any) =>{
                                        return(
                                            <div key={index} className="w-full overflow-hidden transition-colors duration-200 transform rounded-lg md:mx-5 md:w-96 bg-gray-50 dark:bg-gray-700">
                                                {/* <p className="py-2 text-sm text-center text-white uppercase bg-blue-500">Recommended</p> */}
                                                <div className="px-6 py-4">
                                                    <div className="text-center">
                                                        <p className="text-4xl font-semibold text-gray-800 dark:text-gray-100">{plan.name}</p>
                                                        <p className="mt-4 text-gray-500 dark:text-gray-300">Claims : {plan.claims}</p>
                                                        <h4 className="mt-2 text-gray-600 line-through dark:text-gray-400">₹ {plan.price + 1000}</h4>
                                                        <h4 className="mt-2 text-5xl font-semibold text-gray-800 dark:text-gray-100">₹ {plan.price}</h4>
                                                        <p className="mt-4 text-gray-500 dark:text-gray-300">/Per Month</p>
                                                        {/* <p className="mt-4 text-gray-500 dark:text-gray-300">Bill all 6 months</p> */}

                                                    </div>

                                                    <div className="mt-8 space-y-8">
                                                        {
                                                            plan.features.map((feature : any) => {
                                                                return(
                                                                    <div className="flex items-center">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                                                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                                        </svg>

                                                                        <span className="mx-4 text-gray-700 dark:text-gray-300">{feature}</span>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div>

                                                    <button onClick={() => toggleBuyModal(plan.name , plan.price , plan.claims , plan.planId)} className="w-full px-4 py-2 mt-10 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                                                        Choose {plan.name}
                                                    </button>
                                                </div>
                                            </div>
                                        )
                                    } )
                                }
                                
                            </div>
                        )
                    }
                </div>
            </section>
            <BuyModal
                closeModal={() => setOpenBuyModal((pre) => !pre)}
                isOpen={openBuyModal}
                buyModalDetails={selectedPlanDetial}
            />
        </div>
    );
};

export default UpgradePlan;
