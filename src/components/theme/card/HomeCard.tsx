import React from "react";
import styles from "./HomeCard.module.css";

type HomeCardProps = {
  icon: any;
  name: string;
  amount: number;
};

const HomeCard = ({ icon, name, amount }: HomeCardProps) => {
  return (
    <div className={`${styles.card} cursor-pointer`}>
      <div className="flex">
        <img src={icon} alt="icon" className="text-lg text-fontColor mr-4" />
        <p className="text-base text-fontColor">{name}</p>
      </div>

      <p
        className={`text-4xl text-fontColor ${
          name?.length > 14 ? "mt-0" : "mt-4"
        } `}
      >
        {amount}
      </p>
    </div>
  );
};

export default HomeCard;
