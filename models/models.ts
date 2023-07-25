export interface Rings {
    id: string, displayName: string, backgroundColor: string, headlineColor: string, entryStyle: {color: string, labelColor: string}
}

export interface Section {
    id: string, displayName: string
}

export interface TopicEntry {
    displayName: string, rings: TopicEntryRing[]
}

export interface TopicEntryRing {
    displayName: string, entries: []
}
