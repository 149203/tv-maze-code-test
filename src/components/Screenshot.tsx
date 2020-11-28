import { episodeType } from "../models/clientInterfaces";

interface propsType {
   episode: episodeType;
}

export default function Screenshot(props: propsType) {
   const { episode } = props;
   if (episode.image) {
      return (
         <div className="img-placeholder">
            <img
               src={episode.image.medium}
               className="img-fluid mb-2 mb-sm-0 position-absolute"
               style={{ top: 0, left: 0, width: "100%" }}
               alt={`Screenshot of episode: ${episode.name}`}
            />
         </div>
      );
   } else {
      return (
         <div
            className="bg-secondary w-100 position-relative"
            style={{
               paddingTop: "56.25%",
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
                  top: "32%",
               }}
            >
               NA
            </h2>
         </div>
      );
   }
}
