 import loader from "../../../assets/images/45.gif"
 import css from './Preloader.module.css'
 import React from "react";

 let Preloader = (props) => {
     return <div className={css.preloader}><img className={css.preloader_img} src={loader}/></div>

 }
 export default Preloader