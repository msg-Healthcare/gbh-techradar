"use client"
import React, {useEffect, useRef} from 'react';
import {render} from 'lit-html';
import {RadarElement} from 'radar-element';
import {EntryConfig} from "radar-element/dist/src/RadarElement";

interface RadarComponentProps {
    diameter: number,
    ringConfigs: any,
    sectionConfigs: any,
    entryConfigs: EntryConfig[]
}

// @ts-ignore
const RadarComponent = (props: RadarComponentProps) => {
    const litComponentRef = useRef(null);

    useEffect(() => {
        if (litComponentRef.current) {
            renderLitComponent();
        }
        return () => {
            cleanupLitComponent();
        };
    }, []);

    const renderLitComponent = () => {
        const element: any = litComponentRef.current;
        if (element instanceof HTMLElement) {
            const radar = new RadarElement();
            radar.diameter = props.diameter;
            radar.ringConfigs = props.ringConfigs;
            radar.sectionConfigs = props.sectionConfigs;
            radar.entryConfigs = props.entryConfigs;
            radar.requestUpdate()
            render(
                radar,
                element
            );
        }
    };

    const cleanupLitComponent = () => {
        const element: any = litComponentRef.current;
        if (element instanceof HTMLElement) {
            render('', element);
        }
    };

    return <div ref={litComponentRef}></div>;
};

export default RadarComponent;
