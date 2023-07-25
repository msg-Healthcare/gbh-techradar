"use client"
import {Component, Fragment} from "react";
import {Accordion, Container} from "react-bootstrap";
import "./accordion-table.component.scss"
import {TopicEntry, TopicEntryRing} from "@/models/models";

export class AccordionTableComponent extends Component<{ content: TopicEntry[] }> {

    render() {
        return (
            <Container className="container">
                <Accordion className="accordion" id="accordionExample">
                    {this.props.content.map((section: TopicEntry, i: number) =>
                        <Accordion.Item key={section.displayName} className="accordion-item table-border"
                                        eventKey={"" + i}>
                            <Accordion.Header className="accordion-header" id={'heading-' + i}>
                                {section.displayName}
                            </Accordion.Header>
                            <Accordion.Collapse eventKey={"" + i} id={'collapse-' + i}
                                                className="accordion-collapse collapse py-2"
                                                data-bs-parent="#accordionExample">
                                <div className="row row-cols-1 row-cols-sm-2 px-3">
                                    {section.rings.map((ring: TopicEntryRing) =>
                                        <div key={ring.displayName} className="col">
                                            <p className="d-flex justify-content-start fw-bold">{ring.displayName}</p>
                                            {ring.entries.map((entry: any) =>
                                                <Fragment key={entry.labelShort}>
                                                    <div
                                                        className="table-element">{entry.labelShort}. {entry.labelLong}</div>
                                                </Fragment>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </Accordion.Collapse>
                        </Accordion.Item>
                    )}
                </Accordion>
            </Container>
        );
    }

}
