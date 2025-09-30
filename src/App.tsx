import leftCircle from "@/assets/left-circle.svg";
import rightCircle from "@/assets/right-circle.svg";
import Earth from "@/assets/earth.png";
import EarthFields from "@/assets/earth-with-magnetic-fields.png";
import Aviation from "@/assets/aviation.png";
import Satellite from "@/assets/satellite.png";
import GPS from "@/assets/gps.png";
import PowerGrid from "@/assets/powergrid.png";
import Radio from "@/assets/radio.png";
import { Slider } from "@/components/ui/slider";
import React, { useState } from "react";
import ParticlesComponent from "@/particles";

// Type definitions
interface SliderGroupProps {
  solarFlareIntensity: number;
  setSolarFlareIntensity: (value: number) => void;
  cmeIntensity: number;
  setCmeIntensity: (value: number) => void;
  solarWindIntensity: number;
  setSolarWindIntensity: (value: number) => void;
  className?: string;
}

interface SliderCardProps {
  heading: string;
  description: string;
  sliderValue: number;
  setSliderValue: (value: number) => void;
}

interface AffectedFieldProps {
  imgPath: string;
  caption: string;
  affected: boolean;
  className?: string;
  style?: React.CSSProperties;
}

interface AffectedFieldData {
  imgPath: string;
  caption: string;
  affected: boolean;
  angle: number;
}

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

function SliderGroup(props: SliderGroupProps): React.ReactElement {
  return (
    <div className={`ml-4 flex flex-col gap-3 ${props.className}`}>
      <SliderCard
        key={SLIDERDATA.solarFlare.heading}
        heading={SLIDERDATA.solarFlare.heading}
        description={SLIDERDATA.solarFlare.description}
        sliderValue={props.solarFlareIntensity}
        setSliderValue={props.setSolarFlareIntensity}
      />

      <SliderCard
        key={SLIDERDATA.cme.heading}
        heading={SLIDERDATA.cme.heading}
        description={SLIDERDATA.cme.description}
        sliderValue={props.cmeIntensity}
        setSliderValue={props.setCmeIntensity}
      />
      <SliderCard
        key={SLIDERDATA.solarWind.heading}
        heading={SLIDERDATA.solarWind.heading}
        description={SLIDERDATA.solarWind.description}
        sliderValue={props.solarWindIntensity}
        setSliderValue={props.setSolarWindIntensity}
      />
    </div>
  );
}

function App(): React.ReactElement {
  const [solarFlareIntensity, setSolarFlareIntensity] = useState<number>(0);
  const [cmeIntensity, setCmeIntensity] = useState<number>(0);
  const [solarWindIntensity, setSolarWindIntensity] = useState<number>(0);
  const fieldStrength = Math.max(
    solarFlareIntensity,
    cmeIntensity,
    solarWindIntensity
  );
  let aviationAffected: boolean = false;
  let satelliteAffected: boolean = false;
  let gpsAffected: boolean = false;
  let powerGridAffected: boolean = false;
  let radioAffected: boolean = false;

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
  const affectedFields: AffectedFieldData[] = [
    {
      imgPath: Aviation,
      caption: "Aviation",
      affected: aviationAffected,
      angle: -90,
    },
    {
      imgPath: Satellite,
      caption: "Satellite",
      affected: satelliteAffected,
      angle: -45,
    },
    {
      imgPath: GPS,
      caption: "GPS Tracker",
      affected: gpsAffected,
      angle: 0,
    },
    {
      imgPath: PowerGrid,
      caption: "Power Grid",
      affected: powerGridAffected,
      angle: 45,
    },
    {
      imgPath: Radio,
      caption: "Radio Communications",
      affected: radioAffected,
      angle: 90,
    },
  ];
  return (
    <main className="bg-page-bg relative min-h-screen w-full overflow-hidden max-sm:overflow-scroll">
      <ParticlesComponent />
      {/* Left circle */}
      <img src={leftCircle} alt="" className="absolute -top-50 -left-20" />

      {/* Right circle */}
      <img src={rightCircle} alt="" className="absolute -top-60 -right-30" />

      <div className="absolute top-1/2 left-1/2 max-w-md -translate-x-1/2 -translate-y-1/2">
        <SliderGroup
          solarFlareIntensity={solarFlareIntensity}
          setSolarFlareIntensity={setSolarFlareIntensity}
          cmeIntensity={cmeIntensity}
          setCmeIntensity={setCmeIntensity}
          solarWindIntensity={solarWindIntensity}
          setSolarWindIntensity={setSolarWindIntensity}
          className="absolute top-1/20 -left-60 max-sm:fixed max-sm:-top-60 max-sm:-left-20 max-sm:max-w-[150px]"
        />

        {/* Earth */}
        <img
          src={Earth}
          alt=""
          className="animate-spin-slow h-full w-full rounded-full"
        />
        {/* <SpinningEarth /> */}
        {/* Magnetic Fields */}
        <img
          src={EarthFields}
          alt="Magnetic Fields"
          className="absolute inset-0 h-full w-full rounded-full transition-all duration-200"
          style={{
            opacity: fieldStrength / 100, // slider controls opacity
            // transform: `scale(${1 + fieldStrength / 200})`, // expand slightly with strength
          }}
        />
        {/* Fields on right arc */}
        <div className="absolute top-1/2 left-1/2 h-full w-full -translate-x-1/4 -translate-y-1/2">
          {affectedFields.map((field, idx) => (
            <AffectedField
              key={idx}
              imgPath={field.imgPath}
              caption={field.caption}
              affected={field.affected}
              style={{
                transform: `rotate(${field.angle}deg) translate(220px) rotate(${-field.angle}deg)`,
              }}
            />
          ))}
        </div>
      </div>
    </main>
  );
}

function SliderCard({
  heading,
  description,
  sliderValue,
  setSliderValue,
}: SliderCardProps): React.ReactElement {
  function onSliderValueChange(value: number[]): void {
    setSliderValue(value[0]);
    // console.log(value[0]);
  }
  return (
    <div className="flex max-w-[225px] flex-col gap-2 rounded-xl border border-white bg-gradient-to-b from-[#F3F3F3]/12 to-[#8D8D8D]/0 p-2">
      <h1 className="font-bold text-white">{heading}</h1>
      <p className="text-[10px] text-white">{description}</p>
      <p className="text-[10px] text-red-500">{sliderValue}</p>
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

function AffectedField({
  imgPath,
  caption,
  affected,
  className = "",
  style,
}: AffectedFieldProps): React.ReactElement {
  return (
    <figure
      className={`absolute top-1/2 left-1/2 z-10 grid -translate-x-[50%] -translate-y-[40%] place-items-center ${className}`}
      style={style}
    >
      <div
        className={`relative flex max-w-15 justify-center rounded-full border-2 ${affected ? "border-red-500" : ""}`}
      >
        <img src={imgPath} alt="" className={`w-full`} />
        <div
          className={`absolute inset-0 z-20 rounded-full ${
            affected ? "animate-blink bg-red-500/30" : ""
          }`}
        ></div>
      </div>
      <figcaption className="text-center text-xs text-white">
        {caption}
      </figcaption>
    </figure>
  );
}
export default App;
