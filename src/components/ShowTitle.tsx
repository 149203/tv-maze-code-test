// import { toListText, toShowDate } from "../utils/helpers";
import React from "react";

interface Props {
   name: string;
}

export const ShowTitle: React.FC<Props> = ({ name }) => {
   return (
      <section>
         <h1>{name}</h1>
         <p className="text-muted mb-3">
            {/* {toListText(genres)} | Premiered on {toShowDate(premiered)} */}
         </p>
      </section>
   );
};
