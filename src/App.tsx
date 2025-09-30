import leftCircle from "@/assets/left-circle.svg";
import rightCircle from "@/assets/right-circle.svg";
import Earth from "@/assets/earth.png";
import Aviation from "@/assets/aviation.png";
import Satellite from "@/assets/satellite.png";
import GPS from "@/assets/gps.png";
import PowerGrid from "@/assets/powergrid.png";
import Radio from "@/assets/radio.png";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

const SLIDERDATA = {
  solarFlare: {
    heading: "Solar Flare Intensity",
    description:
      "Use the slider to increase or decrease the intensity of solar flare ",
  },

  cme: {
    heading: "CME Intensity",
    description: "Use the slider to increase or decrease the intensity of CME ",
  },

  solarWind: {
    heading: "Solar Wind Intensity",
    description:
      "Use the slider to increase or decrease the intensity of solar wind ",
  },
};

function App() {
  const [solarFlareIntensity, setSolarFlareIntensity] = useState(0);
  const [cmeIntensity, setCmeIntensity] = useState(0);
  const [solarWindIntensity, setSolarWindIntensity] = useState(0);

  let aviationAffected = false;
  let satelliteAffected = false;
  let gpsAffected = false;
  let powerGridAffected = false;
  let radioAffected = false;

  if (solarFlareIntensity > 40) {
    radioAffected = true;
    aviationAffected = true;
  }

  if (solarFlareIntensity > 80) {
    gpsAffected = true;
  }

  if (cmeIntensity > 40) {
    satelliteAffected = true;
    gpsAffected = true;
  }
  if (cmeIntensity > 80) {
    powerGridAffected = true;
  }
  return (
    <main className="bg-page-bg relative min-h-screen w-full overflow-hidden">
      {/* Left circle */}
      <img src={leftCircle} alt="" className="absolute -top-50 -left-20" />

      {/* Right circle */}
      <img src={rightCircle} alt="" className="absolute -top-60 -right-30" />

      {/* earth */}
      <img
        src={Earth}
        alt=""
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform"
      />

      <div className="flex justify-between">
        <div className="ml-4 flex flex-col gap-3">
          <SliderCard
            key={SLIDERDATA.solarFlare.heading}
            heading={SLIDERDATA.solarFlare.heading}
            description={SLIDERDATA.solarFlare.description}
            sliderValue={solarFlareIntensity}
            setSliderValue={setSolarFlareIntensity}
          />

          <SliderCard
            key={SLIDERDATA.cme.heading}
            heading={SLIDERDATA.cme.heading}
            description={SLIDERDATA.cme.description}
            sliderValue={cmeIntensity}
            setSliderValue={setCmeIntensity}
          />
          <SliderCard
            key={SLIDERDATA.solarWind.heading}
            heading={SLIDERDATA.solarWind.heading}
            description={SLIDERDATA.solarWind.description}
            sliderValue={solarWindIntensity}
            setSliderValue={setSolarWindIntensity}
          />
        </div>

        <div className="mt-5 mr-5 grid grid-cols-2 gap-3">
          <AffectedField
            imgPath={Aviation}
            caption={"Aviation"}
            affected={aviationAffected}
          />
          <AffectedField
            imgPath={Satellite}
            caption={"Satellite"}
            affected={satelliteAffected}
          />
          <AffectedField
            imgPath={GPS}
            caption={"GPS Tracker"}
            affected={gpsAffected}
          />
          <AffectedField
            imgPath={PowerGrid}
            caption={"Power Grid"}
            affected={powerGridAffected}
          />
          <AffectedField
            imgPath={Radio}
            caption={"Radio Communications"}
            affected={radioAffected}
          />
        </div>
      </div>
    </main>
  );
}

function SliderCard({ heading, description, sliderValue, setSliderValue }) {
  function onSliderValueChange(value) {
    setSliderValue(value[0]);
    // console.log(value[0]);
  }
  return (
    <div className="flex max-w-[300px] flex-col gap-2 rounded-xl border border-white bg-gradient-to-b from-[#F3F3F3]/12 to-[#8D8D8D]/0 p-2">
      <h1 className="text-xl font-black text-white">{heading}</h1>
      <p className="text-xs text-white">{description}</p>
      <p className="text-red-500">{sliderValue}</p>
      <Slider
        defaultValue={[0]}
        value={[sliderValue]}
        onValueChange={(value) => onSliderValueChange(value)}
        max={100}
        step={1}
        className="mt-3 mb-0"
      />
    </div>
  );
}

function AffectedField({ imgPath, caption, affected }) {
  // const [affected, toggleAffected] = useState(false);
  const affectedStyle = affected ? "color-red-500/10" : "";
  return (
    <figure className={"relative z-10 w-20 rounded-full" + affectedStyle}>
      <div className="relative flex justify-center">
        <img
          src={imgPath}
          alt=""
          className={`rounded-full border-2 ${affected ? "border-red-500" : ""}`}
        />
        <div
          className={`absolute inset-0 z-20 rounded-full ${affected ? "bg-red-500/30" : ""} `}
        ></div>
      </div>
      <figcaption className="text-center text-white">{caption}</figcaption>
    </figure>
  );
}
export default App;
