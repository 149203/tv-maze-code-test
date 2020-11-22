import { iShow } from "../models/clientInterfaces";
import axios from "axios";

export default function getShow(url: string) {
   return axios
      .get(url)
      .then((res) => {
         const show: iShow = {
            ...res.data,
            premieredAt: res.data.premiered,
         };
         return show;
      })
      .catch((error) => console.log(error));
}
