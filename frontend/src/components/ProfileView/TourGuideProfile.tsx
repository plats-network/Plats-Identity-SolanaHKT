'use client'
import React from "react";
import { useEffect, useState } from "react";
import type { CallBackProps, Step } from "react-joyride";
import Joyride, { EVENTS, STATUS } from "react-joyride";
import Image from "next/image";

interface State {
  run: boolean;
  stepIndex: number;
  steps: Step[];
}

interface TourGuideProps {
  start: boolean;
  setStartTour: (value: boolean) => void;
  onTourEnd: () => void;
}

const TourGuideProfile = () => {

      
    const [startTour, setStartTour] = useState(false);

  
  
  
    const handleStartTour = () => {
      setStartTour(true);
    };
  
    const handleTourEnd = () => {
      setStartTour(false);
    };
  
  const [progress, setProgress] = useState<number>(1);
  const totalSteps: number = 4;

  const generateSteps = (val: number): Step[] => [
    {
        content: (
            <div className="mb-4 flex flex-col gap-4 px-2 text-left">
              {/* <p className="mr-4 text-base font-bold">New next.js Starter file</p> */}
              <p className="mr-2 text-sm">
              After successfully creating a unified ID, Plats Network will retrieve insights about the address, such as balance, volume, etc. Please wait for about 1-2 minutes

              </p>
              <div className="absolute bottom-[30px] left-[38%] text-sm text-neutral-400">
                {val} of {totalSteps}
              </div>
            </div>
          ),
      locale: { skip: <strong aria-label="skip">Skip</strong> },
      styles: {
        options: {
          width: 380,
        },
      },
      placement: "center",
      target: "body",
    },
    {
      content: (
        <div className="mb-4 flex flex-col gap-4 px-2 text-left">
          {/* <p className="mr-4 text-base font-bold">Add new account</p> */}
          <p className="mr-2 text-sm">
          Assume you have multiple wallets (on-chain) or social accounts . Add a new wallet/ twitter and merge it into a single unified ID

          </p>
          <div className="absolute bottom-[30px] left-[38%] text-sm text-neutral-400">
            {val} of {totalSteps}
          </div>
        </div>
      ),
      styles: {
        options: {
          width: 380,
        },
      },
      placement: "bottom",
      target: "#step-1",
      title: "",
    },
    {
      content: (
        <div className="mb-4 flex flex-col gap-4 px-2 text-left">
          {/* <p className="mr-4 text-base font-bold">Active application</p> */}
          <p className="mr-2 text-sm">Grant permission to access sensitive information
          </p>
          <div className="absolute bottom-[30px] left-[38%] text-sm text-neutral-400">
            {val} of {totalSteps}
          </div>
        </div>
      ),
      styles: {
        options: {
          width: 380,
        },
      },
      placement: "bottom",
      target: "#step-2",
      title: "",
    },
    {
      content: (
        <div className="mb-4 flex flex-col gap-4 px-2 text-left">
          {/* <p className="mr-4 text-base font-bold">Next.js Links</p> */}
          <p className="mr-2 text-sm">
          Go to third party application
          </p>
          <div className="absolute bottom-[30px] left-[8%] text-sm text-neutral-400">
            {val} of {totalSteps}
          </div>
        </div>
      ),
      styles: {
        options: {
          width: 380,
        },
      },
      placement: "top",
      target: "#step-3",
      title: "",
    },
  ];

  const [{ run, steps }, setState] = useState<State>({
    run: startTour,
    stepIndex: 0,
    steps: generateSteps(progress),
  });

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      steps: generateSteps(progress),
    }));
  }, [progress]);

  useEffect(() => {
    const hasSeenTour = localStorage.getItem('hasSeenTour');
    if (!hasSeenTour ) {
      setState((prevState) => ({
        ...prevState,
        run: true,
        stepIndex: 0,
      }));
    }
  }, []);

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status, type, index } = data;

    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];

    if (finishedStatuses.includes(status)) {
      setState({ steps, run: false, stepIndex: 0 });
      setStartTour(false);
      handleTourEnd();
      localStorage.setItem('hasSeenTour', 'true');
    } else if (([EVENTS.STEP_BEFORE] as string[]).includes(type)) {
      setProgress(index + 1);
    }
  };

  return (
    <Joyride
      continuous
      callback={handleJoyrideCallback}
      run={run}
      steps={steps}
      disableOverlay
      scrollToFirstStep

      hideCloseButton={false}
      // disableCloseOnEsc
      // disableOverlayClose
      spotlightPadding={10}
      showProgress
      showSkipButton
      debug
      styles={{
        overlay: {
          border: "6px solid lightblue",
        },
        spotlight: {
          border: "2px solid lightblue",
        },
        buttonClose: {
          marginTop: "5px",
          marginRight: "5px",
          width: "12px",
        },
        buttonNext: {
          outline: "2px solid transparent",
          outlineOffset: "2px",
          backgroundColor: "#1c7bd4",
          borderRadius: "5px",
          color: "#FFFFFF",
        },
        buttonSkip: {
          color: "A3A3A3",
        },
        tooltipFooter: {
          margin: "0px 16px 10px 10px",
        },
        buttonBack: {
          outline: "2px solid transparent",
          outlineOffset: "2px",
        },
        options: {
          zIndex: 100,
          arrowColor: "#1F1F1F",
          backgroundColor: "#1F1F1F",
          textColor: "#FFFFFF",
          overlayColor: "rgba(0, 0, 0, 0.9)",
          primaryColor: "#1c7bd4",
        },
      }}
      locale={{
        back: (
          <p className="font-bold focus:ring-transparent focus-visible:outline-none">
            {`<-`}
          </p>
        ),
      }}
    />
  );
};

export default TourGuideProfile;
