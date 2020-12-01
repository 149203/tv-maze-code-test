interface propsType {
   rating: number;
   size: string;
}

export default function Score(props: propsType) {
   const getScoreClass = (rating: number): string => {
      let scoreClass = "bg-warning";
      if (rating > 80) scoreClass = "bg-success";
      if (rating < 60) scoreClass = "bg-danger";
      return scoreClass;
   };

   if (props.rating === 0) return <></>;

   if (props.size === "md") {
      return (
         <span
            className={
               "p-4 text-white rounded float-right " +
               getScoreClass(props.rating)
            }
         >
            <h4 className="mb-0">{props.rating}</h4>
         </span>
      );
   }
   if (props.size === "sm") {
      return (
         <span
            className={"p-2 text-white rounded " + getScoreClass(props.rating)}
            style={{ fontSize: "16px" }}
         >
            {props.rating}
         </span>
      );
   }
   return <></>;
}
