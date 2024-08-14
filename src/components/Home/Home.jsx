import { Helmet } from "react-helmet";
import CategoriesSlider from "../Categories_Slider/Categories_Slider";
import FeatureProduct from "../FeatureProduct/FeatureProduct";
import MinSlider from "../MinSlider/MinSlider";

export default function Home() {
 document.title = " fresh cart | Home ";

  return (
    <>
  
      <MinSlider />
      <CategoriesSlider />
      <FeatureProduct />
 
    </>
  );
}
