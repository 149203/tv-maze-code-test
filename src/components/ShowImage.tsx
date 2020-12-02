interface propsType {
   image: {
      medium: string;
   };
   name: string;
}

export default function ShowImage(props: propsType) {
   const { image, name } = props;
   if (image) {
      return (
         <img
            src={image.medium}
            alt={`Promotional poster for ${name}`}
            className="img-fluid"
         />
      );
   } else {
      return (
         <div
            className="bg-secondary w-100 position-relative"
            style={{
               width: "207px",
               height: "291px",
            }}
         >
            <h2
               className="text-white"
               style={{
                  position: "absolute",
                  left: 0,
                  bottom: 0,
                  right: 0,
                  textAlign: "center",
                  top: "44%",
               }}
            >
               NA
            </h2>
         </div>
      );
   }
}
