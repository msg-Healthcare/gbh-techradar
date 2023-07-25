import fsPromises from "fs/promises";
import path from "path";
import {AccordionTableComponent} from "@/components/accordion-table/accordion-table.component";
import {Rings, Section, TopicEntry, TopicEntryRing} from "@/models/models";
import RadarComponent from "@/components/radar/radar.component";
let _ = require("lodash");

export default async function Home() {
    const entryConfigs: JSON = await loadEntries();

    const rings: Rings[] = [
        {
            id: 'adopt',
            displayName: 'ADOPT',
            backgroundColor: 'var(--primary-color)',
            headlineColor: '#fff',
            entryStyle: {
                color: '#fff',
                labelColor: '#000'
            },
        },
        {
            id: 'trial',
            displayName: 'TRIAL',
            backgroundColor: 'var(--secondary-ring-color)',
            headlineColor: 'var(--text-color)',
            entryStyle: {
                color: 'var(--text-color)',
                labelColor: 'var(--background-color)'
            },
        },
        {
            id: 'assess',
            displayName: 'ASSESS',
            backgroundColor: 'var(--tertiary-ring-color)',
            headlineColor: 'var(--text-color)',
            entryStyle: {
                color: 'var(--text-color)',
                labelColor: 'var(--background-color)'
            },
        },
        {
            id: 'hold',
            displayName: 'HOLD',
            backgroundColor: 'var(--quaternary-ring-color)',
            headlineColor: 'var(--text-color)',
            entryStyle: {
                color: 'var(--text-color)',
                labelColor: 'var(--background-color)'
            },
        },
    ];

    const sections: Section[] = [
        {
            id: 'languages',
            displayName: 'Languages',
        },
        {
            id: 'frameworks',
            displayName: 'Frameworks',
        },
        {
            id: 'storage',
            displayName: 'Data Storage & Message Broker',
        },
        {
            id: 'infrastructure',
            displayName: 'Infrastructure',
        },
        {
            id: 'tools',
            displayName: 'Tools',
        },
    ];

    const {accordionContent, entries} = update(entryConfigs);
    if(entries.length > 0) {
        return (
            <main className="flex min-h-screen flex-col items-center justify-between p-24">
                <div className="container-fluid">
                    <div className="row justify-content-evenly">
                        <div className="col-xxl d-none d-lg-flex justify-content-center">
                            <RadarComponent diameter={900} ringConfigs={rings} sectionConfigs={sections} entryConfigs={entries}></RadarComponent>
                        </div>
                        <div className="col-xxl">
                            <AccordionTableComponent content={accordionContent}></AccordionTableComponent>
                        </div>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            No Content
        </main>
    );
}

async function loadEntries(): Promise<JSON> {
    const filePath: string = path.join(process.cwd(), "/resources/data.json")
    const jsonData: Buffer = await fsPromises.readFile(filePath);
    return JSON.parse(jsonData.toString());
}



function update(entryConfigs: JSON) {
    let index = 0;

    const incrementAndGetIndex = () => {
        index += 1;
        return index;
    };

    const languages: TopicEntry = {
        displayName: 'Languages',
        rings: [
            {displayName: 'ADOPT', entries: computeEntries(entryConfigs, incrementAndGetIndex, 'languages', 'adopt')},
            {displayName: 'TRIAL', entries: computeEntries(entryConfigs, incrementAndGetIndex, 'languages', 'trial')},
            {
                displayName: 'ASSESS',
                entries: computeEntries(entryConfigs, incrementAndGetIndex, 'languages', 'assess')
            },
            {displayName: 'HOLD', entries: computeEntries(entryConfigs, incrementAndGetIndex, 'languages', 'hold')}
        ]
    };
    const frameworks: TopicEntry = {
        displayName: 'Frameworks',
        rings: [
            {
                displayName: 'ADOPT',
                entries: computeEntries(entryConfigs, incrementAndGetIndex, 'frameworks', 'adopt')
            },
            {
                displayName: 'TRIAL',
                entries: computeEntries(entryConfigs, incrementAndGetIndex, 'frameworks', 'trial')
            },
            {
                displayName: 'ASSESS',
                entries: computeEntries(entryConfigs, incrementAndGetIndex, 'frameworks', 'assess')
            },
            {displayName: 'HOLD', entries: computeEntries(entryConfigs, incrementAndGetIndex, 'frameworks', 'hold')}
        ]
    };
    const storage: TopicEntry = {
        displayName: 'Data Storage & Message Broker',
        rings: [
            {displayName: 'ADOPT', entries: computeEntries(entryConfigs, incrementAndGetIndex, 'storage', 'adopt')},
            {displayName: 'TRIAL', entries: computeEntries(entryConfigs, incrementAndGetIndex, 'storage', 'trial')},
            {displayName: 'ASSESS', entries: computeEntries(entryConfigs, incrementAndGetIndex, 'storage', 'assess')},
            {displayName: 'HOLD', entries: computeEntries(entryConfigs, incrementAndGetIndex, 'storage', 'hold')}
        ]
    };
    const infrastructure: TopicEntry = {
        displayName: 'Infrastructure',
        rings: [
            {
                displayName: 'ADOPT',
                entries: computeEntries(entryConfigs, incrementAndGetIndex, 'infrastructure', 'adopt')
            },
            {
                displayName: 'TRIAL',
                entries: computeEntries(entryConfigs, incrementAndGetIndex, 'infrastructure', 'trial')
            },
            {
                displayName: 'ASSESS',
                entries: computeEntries(entryConfigs, incrementAndGetIndex, 'infrastructure', 'assess')
            },
            {
                displayName: 'HOLD',
                entries: computeEntries(entryConfigs, incrementAndGetIndex, 'infrastructure', 'hold')
            }
        ]
    };
    const tools: TopicEntry = {
        displayName: 'Tools',
        rings: [
            {displayName: 'ADOPT', entries: computeEntries(entryConfigs, incrementAndGetIndex, 'tools', 'adopt')},
            {displayName: 'TRIAL', entries: computeEntries(entryConfigs, incrementAndGetIndex, 'tools', 'trial')},
            {displayName: 'ASSESS', entries: computeEntries(entryConfigs, incrementAndGetIndex, 'tools', 'assess')},
            {displayName: 'HOLD', entries: computeEntries(entryConfigs, incrementAndGetIndex, 'tools', 'hold')}
        ]
    };

    const accordionContent = [languages, frameworks, storage, infrastructure, tools];

    const entries = _.flatMap(accordionContent, (section: TopicEntry) => {
        return _.flatMap(section.rings, (ring: TopicEntryRing) => {
            return ring.entries;
        });
    });

    return {accordionContent, entries}
}

function computeEntries(entries: JSON, incrementAndGetIndex: () => {}, sectionId: string, ringId: string): [] {
    // @ts-ignore
    return entries.filter(e => e.section_id === sectionId && e.ring_id === ringId).map((entry: any) => {
        return {
            id: entry.id,
            labelLong: entry.label,
            labelShort: incrementAndGetIndex(),
            sectionId: entry.section_id,
            ringId: entry.ring_id,
            link: entry.link
        };
    });
}
