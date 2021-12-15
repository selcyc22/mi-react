import React, { Profiler } from "react";
import vilendeku from "../style/img/vilendeku.jpg";

export default function() {
  return(
    <div className="content-page-wrapper">
      <div 
        className="left=column" style={{
          background: "url(" + vilendeku + ") no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }} 
      />
      <div className="right-column">
        Maecenas faucibus mollis interdum. Integer posuere erat
        dapibus posuere velit aliquet. Sed posuere consectetur
        Etiam porta sem malesuada magna mollis euismod. Donec sc
        Aenean lacinia bibendum nulla sed consectetur. Maecenas
        risus varius blandit sit amet non magna. Morbi leo risu:
        consectetur ac, vestibulum at eros. Donec id elit non m:
        at eget metus. Donec sed odio dui. Cras mattis consecte
        amet fermentum. Etiam porta sem malesuada magna mollis
        vitae elit libero, a pharetra augue. Aenean eu leo quam
        ornare sem lacinia quam venenatis vestibulum. Duis mol
        commodo luctus, nisi erat porttitor ligula, eget lacinia
        elit. Praesent commodo cursus magna, vel scelerisque ni
        et. Lorem ipsum dolor sit amet, consectetur adipiscing
        commodo cursus magna, vel scelerisque nisl consectetur
        risus eget urna mollis ornare vel eu leo. Morbi leo ris
      </div>
    </div>
  );
}
