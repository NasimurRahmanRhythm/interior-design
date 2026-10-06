"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

export const EASE = "cubic-bezier(0.35,0.35,0,1)";

export { gsap, ScrollTrigger, SplitText, useGSAP };
