interface propsType {
   rating: number;
   size: string;
}

export default function Score(props: propsType) {
   if (props.size === "md") {
      return (
         <span className="p-4 text-white rounded float-right bg-success">
            <h4 className="mb-0">{props.rating}</h4>
         </span>
      );
   }
   if (props.size === "sm") {
      return (
         <span
            className="p-2 text-white rounded bg-success"
            style={{ fontSize: "16px" }}
         >
            {props.rating}
         </span>
      );
   }
   return <></>;
}
