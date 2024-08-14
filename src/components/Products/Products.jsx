import { useEffect, useState } from "react";
import FeatureProduct from "../FeatureProduct/FeatureProduct";
export default function Products() {
  const [searchItem, setSearchItem] = useState("");
  document.title = " fresh cart | Products ";

  const handelonInput = (e) => {
    const searchTerm = e?.target?.value;
    setSearchItem(searchTerm);
  };

  useEffect(() => {
    handelonInput();
  }, []);
  return (
    <>
       <h3 className=" text-main h1 text-center my-2 py-5  " >Products</h3>
      <div className=" container mb-5 pb-5">
     
        <div className="col-md-10 mx-auto my-3 ">
          <input
            id="searchItem"
            value={searchItem || ""}
            onInput={handelonInput}
            type="text"
            className="form-control py-2"
            placeholder="serch by name..."
          />
        </div>

        <FeatureProduct searchValue={searchItem} />
      </div>
    </>
  );
}
