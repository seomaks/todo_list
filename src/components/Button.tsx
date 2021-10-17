import React from 'react';
import './../App.css';

type propsType = {
  callBack: () => void
  name:string
  filter?:string
}


const Button = (props: propsType) => {
  const onClickHandler = () => {
    props.callBack()
  }
  return (
    <button className={props.filter === props.name ? "activeFilter" : ""} onClick={onClickHandler}>{props.name}</button>
  );
};

export default Button;