import React, { useState } from "react";
import BookOrder from "./bookOrder/BookOrder";
import OrderHistory from "./orderHistory/OrderHistory";
import TrackOrder from "./trackOrders/TrackOrder";

const tabs = ["Book order", "Track orders", "Order history"];

const Order = () => {
  const [activeTab, setActiveTab] = useState(0);

  const renderUI = () => {
    switch (activeTab) {
      case 0:
        return <BookOrder />;
      case 1:
        return <TrackOrder />;
      case 2:
        return <OrderHistory />;

      default:
        return <OrderHistory />;
    }
  };
  return (
    <div className={`px-8 py-6 `}>
      <p className="text-sm text-fontColor">
        Find details about your orders & shipments. You can track your orders by
        viewing track orders and your order history
      </p>
      <div className={`flex items-center border-b border-fontColor-darkGray mt-6`}>
        {tabs?.map((tab, index) => {
          return (
            <p
              key={index}
              className={`text-xs cursor-pointer mr-8 pb-2 ${
                activeTab === index
                  ? "text-fontColor border-b-2 border-fontColor"
                  : "text-fontColor-darkGray"
              }`}
              onClick={() => setActiveTab(index)}
            >
              {tab}
            </p>
          );
        })}
      </div>
      {renderUI()}
    </div>
  );
};

export default Order;
