import React, { useState } from "react";
import Title from "./comps/Title";
import UploadForm from "./comps/UploadForm";
import ImageGrid from "./comps/ImageGrid";
import Modal from "./comps/Modal";

function App(props) {
  const [selectedImg, setSelectedImg] = useState(null);

  return (
    <div className="App-1">
      <Title name={props.vendorname} />
      <UploadForm name={props.vendorname} />
      <ImageGrid name={props.vendorname} setSelectedImg={setSelectedImg} />
      {selectedImg && (
        <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} />
      )}
    </div>
  );
}

export default App;
