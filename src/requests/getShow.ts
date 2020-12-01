import { showType } from "../models/clientInterfaces";
import axios from "axios";

export default function getShow(url: string) {
   return axios
      .get(url)
      .then((res: { data: showType }) => {
         const show: showType = {
            ...res.data,
            premieredAt: res.data.premiered,
         };
         return show;
      })
      .catch((error) => error);
}
